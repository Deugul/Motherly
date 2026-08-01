/**
 * Builds the recovery inventory from the WordPress post dump.
 *
 * Two levels:
 *   Ref   — one occurrence of an image URL inside a post (carries role + alt text).
 *   Asset — one logical original image; owns many refs and many candidate URLs
 *           (host variants, WordPress -WxH size variants, scheme variants).
 */

import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|bmp|tiff?|svg)(?=$|[?#])/i;
/** WordPress generates `name-1024x768.jpg` derivatives beside the original. */
const SIZE_SUFFIX = /-(\d{2,5})x(\d{2,5})(?=\.[a-z]{3,4}(?:$|[?#]))/i;

export const ROLES = {
  FEATURED: "featured",
  INLINE: "inline",
  OG: "og:image",
  TWITTER: "twitter:image",
  SCHEMA: "schema",
  BACKGROUND: "css-background",
  GALLERY: "gallery",
  AUTHOR: "author",
};

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return m ? m[1].trim() : "";
}

function absolutise(url, base) {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return "";
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  try {
    return new URL(trimmed, base).toString();
  } catch {
    return "";
  }
}

/** Strip a WordPress size suffix to get the presumed original. */
export function toOriginalUrl(url) {
  return url.replace(SIZE_SUFFIX, "");
}

export function sizeFromUrl(url) {
  const m = url.match(SIZE_SUFFIX);
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

/** Identity used to merge the same image seen on different hosts. */
function assetKey(url) {
  try {
    const u = new URL(toOriginalUrl(url));
    return decodeURIComponent(u.pathname).toLowerCase();
  } catch {
    return toOriginalUrl(url).toLowerCase();
  }
}

function pushRef(refs, url, base, meta) {
  const abs = absolutise(url, base);
  if (!abs) return;
  if (!IMAGE_EXT.test(abs) && !/\/wp-content\/uploads\//i.test(abs)) return;
  // SVGs are vector; nothing to "recover at higher resolution", but still tracked.
  refs.push({ url: abs, ...meta });
}

/** Extract every image reference from a single post record. */
export function extractRefs(post, cfg) {
  const base = post.link || `https://${cfg.domains[0]}/`;
  const html = post.content || "";
  const refs = [];

  // 1. Featured image (top-level field on the dump)
  const featured = typeof post.featuredImage === "string"
    ? post.featuredImage
    : post.featuredImage?.url || post.featuredImage?.source_url || "";
  pushRef(refs, featured, base, { role: ROLES.FEATURED, alt: post.title || "", attr: "featuredImage" });

  // 2. <img> tags — src plus every lazy-loading variant, plus srcset entries
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const alt = attr(tag, "alt") || post.title || "";
    const cls = attr(tag, "class");
    const role = /author|avatar|gravatar/i.test(cls + tag)
      ? ROLES.AUTHOR
      : /gallery|wp-block-gallery/i.test(cls)
        ? ROLES.GALLERY
        : ROLES.INLINE;

    for (const a of ["src", "data-src", "data-lazy-src", "data-original", "data-full-url", "data-large-file"]) {
      pushRef(refs, attr(tag, a), base, { role, alt, attr: a });
    }
    for (const a of ["srcset", "data-srcset", "data-lazy-srcset"]) {
      const set = attr(tag, a);
      if (!set) continue;
      for (const part of set.split(",")) {
        const url = part.trim().split(/\s+/)[0];
        pushRef(refs, url, base, { role, alt, attr: a });
      }
    }
  }

  // 3. <picture><source srcset>
  for (const m of html.matchAll(/<source\b[^>]*>/gi)) {
    const set = attr(m[0], "srcset");
    if (!set) continue;
    for (const part of set.split(",")) {
      pushRef(refs, part.trim().split(/\s+/)[0], base, {
        role: ROLES.INLINE, alt: post.title || "", attr: "source[srcset]",
      });
    }
  }

  // 4. Social / SEO meta tags embedded in the exported HTML
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const prop = (attr(tag, "property") || attr(tag, "name")).toLowerCase();
    if (!prop) continue;
    const content = attr(tag, "content");
    if (prop === "og:image" || prop === "og:image:secure_url") {
      pushRef(refs, content, base, { role: ROLES.OG, alt: post.title || "", attr: prop });
    } else if (prop === "twitter:image" || prop === "twitter:image:src") {
      pushRef(refs, content, base, { role: ROLES.TWITTER, alt: post.title || "", attr: prop });
    }
  }

  // 5. CSS background-image url(...)
  for (const m of html.matchAll(/background(?:-image)?\s*:\s*[^;"']*url\(\s*['"]?([^'")]+)/gi)) {
    pushRef(refs, m[1], base, { role: ROLES.BACKGROUND, alt: post.title || "", attr: "css" });
  }

  // 6. JSON-LD structured data image fields
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    const urls = m[1].match(/https?:\/\/[^"'\s\\]+\.(?:jpe?g|png|webp|gif|avif)/gi) || [];
    for (const u of urls) {
      pushRef(refs, u, base, { role: ROLES.SCHEMA, alt: post.title || "", attr: "ld+json" });
    }
  }

  // 7. Bare <a href> pointing straight at an upload (full-size gallery links)
  for (const m of html.matchAll(/<a\b[^>]+href\s*=\s*["']([^"']*\/wp-content\/uploads\/[^"']+)["']/gi)) {
    pushRef(refs, m[1], base, { role: ROLES.GALLERY, alt: post.title || "", attr: "a[href]" });
  }

  return refs.map((r) => ({ ...r, postSlug: post.slug, postId: post.id, postTitle: post.title }));
}

/**
 * Build the deduplicated asset list.
 * Each asset carries the full candidate URL set so providers can try every
 * host/size permutation before declaring the image unrecoverable.
 */
export function buildInventory(cfg) {
  const raw = JSON.parse(fs.readFileSync(cfg.postsJsonPath, "utf8"));
  const posts = Array.isArray(raw) ? raw : raw.posts || [];

  const assets = new Map();

  for (const post of posts) {
    if (!post?.slug) continue;
    for (const ref of extractRefs(post, cfg)) {
      const key = assetKey(ref.url);
      let asset = assets.get(key);
      if (!asset) {
        asset = {
          key,
          /** Presumed original: size suffix stripped, first-seen host. */
          originalUrl: toOriginalUrl(ref.url),
          pathname: key,
          basename: path.posix.basename(key),
          refs: [],
          seenUrls: new Set(),
          roles: new Set(),
        };
        assets.set(key, asset);
      }
      asset.refs.push(ref);
      asset.seenUrls.add(ref.url);
      asset.roles.add(ref.role);
    }
  }

  for (const asset of assets.values()) {
    asset.candidates = buildCandidates(asset, cfg);
    asset.roles = [...asset.roles];
    asset.seenUrls = [...asset.seenUrls];
    asset.primarySlug = asset.refs.find((r) => r.role === ROLES.FEATURED)?.postSlug
      || asset.refs[0].postSlug;
    asset.alt = asset.refs.find((r) => r.alt?.trim())?.alt || "";
  }

  return { posts, assets: [...assets.values()] };
}

/**
 * Candidate URLs for one asset, ordered best-first:
 * originals across every known host, then descending size variants.
 */
function buildCandidates(asset, cfg) {
  const hosts = new Set(cfg.domains);
  for (const u of asset.seenUrls) {
    try {
      hosts.add(new URL(u).hostname);
    } catch { /* ignore malformed */ }
  }

  const originals = [];
  const variants = [];

  // Preserve original casing of the path — CDX urlkeys lowercase, servers may not.
  const casedPaths = new Set([asset.key]);
  for (const u of asset.seenUrls) {
    try {
      casedPaths.add(new URL(toOriginalUrl(u)).pathname);
    } catch { /* ignore */ }
  }
  for (const host of hosts) {
    for (const p of casedPaths) originals.push(`https://${host}${p}`);
  }

  // Known size derivatives, largest first — used only if the original is gone.
  const sized = [];
  for (const u of asset.seenUrls) {
    const size = sizeFromUrl(u);
    if (size) sized.push({ url: u, area: size.width * size.height });
  }
  sized.sort((a, b) => b.area - a.area);
  for (const s of sized) {
    for (const host of hosts) {
      try {
        const parsed = new URL(s.url);
        variants.push(`https://${host}${parsed.pathname}`);
      } catch { /* ignore */ }
    }
  }

  return [...new Set([...originals, ...variants])];
}
