/**
 * Rewrites the post dump so recovered images are served from the local
 * public directory, and emits a manifest the Next.js app can consume.
 *
 * Only URLs that were actually recovered are rewritten. Unrecovered images keep
 * their original URL so a later run (or a restored backup) can still fix them,
 * and so nothing silently turns into a broken local path.
 */

import fs from "node:fs/promises";
import path from "node:path";

/** Build src -> local mapping for every URL form an asset was ever seen as. */
function buildUrlMap(results, cfg) {
  const map = new Map();

  for (const r of results) {
    if (!r.recovered) continue;
    const local = `${cfg.publicPrefix}/${r.filename}`;

    for (const seen of r.asset.seenUrls) {
      map.set(seen, local);
      map.set(seen.replace(/^https:/, "http:"), local);
      map.set(seen.replace(/^http:/, "https:"), local);
      // Protocol-relative and bare-path forms used inside exported HTML.
      try {
        const u = new URL(seen);
        map.set(`//${u.host}${u.pathname}`, local);
        map.set(u.pathname, local);
      } catch { /* ignore */ }
    }
  }
  return map;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Replace every mapped URL inside an HTML blob.
 * srcset attributes are rebuilt from the locally generated responsive set so the
 * browser is never told about widths we did not actually produce.
 */
function rewriteHtml(html, urlMap, byLocal, cfg) {
  let out = html;
  let replaced = 0;

  // 1. Rebuild srcset/data-srcset from local responsive derivatives.
  out = out.replace(/\b(srcset|data-srcset|data-lazy-srcset)\s*=\s*"([^"]*)"/gi, (full, attrName, value) => {
    const first = value.split(",")[0]?.trim().split(/\s+/)[0];
    const local = first && urlMap.get(first);
    if (!local) return full;

    const record = byLocal.get(local);
    if (!record) return full;

    const parts = [
      ...record.responsive.map((r) => `${cfg.publicPrefix}/${r.file} ${r.width}w`),
      `${local} ${record.width}w`,
    ];
    replaced++;
    return `${attrName}="${parts.join(", ")}"`;
  });

  // 2. Straight URL substitution, longest keys first so a size variant never
  //    gets partially matched by its own shorter original.
  const keys = [...urlMap.keys()].sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (!key || !out.includes(key)) continue;
    const re = new RegExp(escapeRegExp(key), "g");
    const before = out;
    out = out.replace(re, urlMap.get(key));
    if (out !== before) replaced++;
  }

  return { html: out, replaced };
}

export async function rewriteContent(results, inventory, cfg) {
  const urlMap = buildUrlMap(results, cfg);
  const byLocal = new Map(
    results.filter((r) => r.recovered).map((r) => [`${cfg.publicPrefix}/${r.filename}`, r])
  );

  const posts = inventory.posts;
  let postsTouched = 0;
  let totalReplacements = 0;

  for (const post of posts) {
    let touched = false;

    if (post.content) {
      const { html, replaced } = rewriteHtml(post.content, urlMap, byLocal, cfg);
      if (replaced > 0) {
        post.content = html;
        totalReplacements += replaced;
        touched = true;
      }
    }

    const featured = typeof post.featuredImage === "string" ? post.featuredImage : "";
    if (featured && urlMap.has(featured)) {
      post.featuredImage = urlMap.get(featured);
      totalReplacements++;
      touched = true;
    }

    if (touched) postsTouched++;
  }

  // Manifest: everything the app needs for next/image, keyed by local path
  // and cross-referenced by the original URL for canonical/OG rewriting.
  const manifest = {
    generatedAt: new Date().toISOString(),
    publicPrefix: cfg.publicPrefix,
    images: {},
    byOriginalUrl: {},
  };

  for (const r of results) {
    if (!r.recovered) continue;
    const local = `${cfg.publicPrefix}/${r.filename}`;
    manifest.images[local] = {
      src: local,
      width: r.width,
      height: r.height,
      alt: r.asset.alt || "",
      blurDataURL: r.blurDataURL || undefined,
      responsive: r.responsive.map((x) => ({ src: `${cfg.publicPrefix}/${x.file}`, width: x.width })),
      recoveredFrom: { provider: r.provider, sourceUrl: r.sourceUrl, snapshot: r.snapshot || null },
      originalUrl: r.asset.originalUrl,
      roles: r.asset.roles,
      posts: [...new Set(r.asset.refs.map((x) => x.postSlug))],
    };
    for (const seen of r.asset.seenUrls) manifest.byOriginalUrl[seen] = local;
  }

  if (!cfg.dryRun) {
    if (cfg.updateContent) {
      const payload = Array.isArray(JSON.parse(await fs.readFile(cfg.postsJsonPath, "utf8")))
        ? posts
        : { posts };
      // Back up once per run before the first destructive write.
      const backup = `${cfg.postsJsonPath}.backup-${Date.now()}.json`;
      await fs.copyFile(cfg.postsJsonPath, backup);
      await fs.writeFile(cfg.postsJsonPath, JSON.stringify(payload, null, 2), "utf8");
      manifest.postsBackup = path.basename(backup);
    }

    await fs.mkdir(path.dirname(cfg.manifestModulePath), { recursive: true });
    await fs.writeFile(cfg.manifestModulePath, JSON.stringify(manifest, null, 2), "utf8");
  }

  return { postsTouched, totalReplacements, manifest };
}
