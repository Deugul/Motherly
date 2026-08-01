/**
 * Accessor for images recovered by `npm run recover:blog-images`.
 *
 * The manifest maps every historical WordPress image URL to the locally stored
 * copy, together with its true intrinsic dimensions and a blur placeholder —
 * everything `next/image` needs to avoid layout shift.
 *
 * Every helper degrades gracefully: an image that was never recovered simply
 * returns its original URL with no dimensions, so pages keep rendering.
 */

import manifestJson from "@/data/blog-image-manifest.json";
import placeholderJson from "@/data/blog-image-placeholders.json";

export type RecoveredImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  responsive: Array<{ src: string; width: number }>;
  recoveredFrom: { provider: string; sourceUrl: string; snapshot: string | null };
  originalUrl: string;
  roles: string[];
  posts: string[];
};

type Manifest = {
  generatedAt: string | null;
  publicPrefix: string;
  images: Record<string, RecoveredImage>;
  byOriginalUrl: Record<string, string>;
};

const manifest = manifestJson as unknown as Manifest;

type Placeholder = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

/**
 * Per-post cover artwork, keyed by slug. Each is rendered in the same layout as
 * the real blog covers and carries that post's own headline, so an unrecovered
 * post reads as designed rather than as a missing image.
 */
const placeholdersBySlug =
  (placeholderJson as { bySlug?: Record<string, Placeholder> }).bySlug ?? {};

/** True once a recovery run has produced at least one image. */
export const hasRecoveredImages = Object.keys(manifest.images).length > 0;

/**
 * Any image URL still pointing at a WordPress uploads path.
 *
 * Host-agnostic on purpose. The media lived on mothrly.com and
 * blog.mothrly.com, but the app rewrites post content to `WP_ORIGIN`, which
 * resolves to a parked Hostinger domain — so matching only mothrly.com lets
 * those through and they render as broken tiles.
 */
const DEAD_ORIGIN = /https?:\/\/[^"'\s)]+\/wp-content\/uploads\/[^"'\s)]+/gi;
const DEAD_ORIGIN_TEST = /\/wp-content\/uploads\//i;

/**
 * Branded cover for a post whose original image was not recovered.
 * `seed` is the post slug; a post without generated artwork returns null so the
 * caller can decide what to render rather than showing someone else's cover.
 */
export function getPlaceholder(seed = ""): Placeholder | null {
  return placeholdersBySlug[seed] ?? null;
}

/** Strip WordPress `-1024x768` style size suffixes to reach the original. */
function toOriginal(url: string): string {
  return url.replace(/-\d{2,5}x\d{2,5}(?=\.(?:jpe?g|png|webp|gif|avif)(?:$|[?#]))/i, "");
}

/**
 * Resolve any historical or local image URL to its recovered record.
 * Tries the exact URL, then the size-stripped original, then a path-only match
 * so a URL that moved between `mothrly.com` and `blog.mothrly.com` still hits.
 */
export function getRecoveredImage(url: string | null | undefined): RecoveredImage | null {
  if (!url?.trim()) return null;
  const clean = url.trim();

  // Already a local path.
  if (manifest.images[clean]) return manifest.images[clean];

  for (const key of [clean, toOriginal(clean)]) {
    const local = manifest.byOriginalUrl[key];
    if (local && manifest.images[local]) return manifest.images[local];
  }

  // Host-agnostic fallback: compare pathnames only.
  try {
    const path = new URL(clean, "https://placeholder.local").pathname;
    const target = toOriginal(path).toLowerCase();
    for (const [original, local] of Object.entries(manifest.byOriginalUrl)) {
      const candidate = new URL(original, "https://placeholder.local").pathname;
      if (toOriginal(candidate).toLowerCase() === target) return manifest.images[local] ?? null;
    }
  } catch {
    /* malformed URL — fall through */
  }

  return null;
}

/** Props ready to spread onto `next/image`, with sensible fallbacks. */
export function getBlogImageProps(
  url: string | null | undefined,
  fallbackAlt = "",
  fallback?: { width: number; height: number; seed?: string }
): {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  placeholder?: "blur";
} | null {
  const recovered = getRecoveredImage(url);

  if (recovered) {
    return {
      src: recovered.src,
      alt: recovered.alt || fallbackAlt,
      width: recovered.width,
      height: recovered.height,
      ...(recovered.blurDataURL
        ? { blurDataURL: recovered.blurDataURL, placeholder: "blur" as const }
        : {}),
    };
  }

  const trimmed = url?.trim() ?? "";

  // Not recovered. The old WordPress origin is retired, so pointing at it would
  // render a broken image — serve branded artwork instead.
  const isDead = !trimmed || DEAD_ORIGIN_TEST.test(trimmed);
  if (isDead) {
    const ph = getPlaceholder(fallback?.seed || trimmed || fallbackAlt);
    if (!ph) return null;
    return {
      src: ph.src,
      alt: fallbackAlt,
      width: ph.width,
      height: ph.height,
      ...(ph.blurDataURL ? { blurDataURL: ph.blurDataURL, placeholder: "blur" as const } : {}),
    };
  }

  // Some other host that may still be alive — keep it.
  return {
    src: trimmed,
    alt: fallbackAlt,
    width: fallback?.width ?? 1200,
    height: fallback?.height ?? 500,
  };
}

/**
 * Swap any surviving dead-origin image URL in post HTML for branded artwork,
 * so an unrecovered inline image never renders as a broken tile.
 */
export function neutraliseDeadImageUrls(html: string, seed = ""): string {
  if (!html) return html;
  const ph = getPlaceholder(seed);
  if (!ph) return html;

  // Inline images fall back to the post's own cover — it carries that post's
  // headline, so it stays on-topic wherever it appears in the article.
  return html.replace(DEAD_ORIGIN, () => ph.src);
}

/** Rewrite every recovered URL inside a WordPress HTML blob to its local copy. */
export function localiseImageUrls(html: string): string {
  if (!html || !hasRecoveredImages) return html;

  let out = html;
  // Longest keys first so a size variant is never partially matched.
  const keys = Object.keys(manifest.byOriginalUrl).sort((a, b) => b.length - a.length);

  for (const original of keys) {
    if (!out.includes(original)) continue;
    out = out.split(original).join(manifest.byOriginalUrl[original]);
  }
  return out;
}

/** Absolute URL for Open Graph / Twitter / structured data. */
export function getAbsoluteImageUrl(
  url: string | null | undefined,
  siteUrl: string
): string {
  const recovered = getRecoveredImage(url);
  const src = recovered?.src ?? url?.trim() ?? "";
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl.replace(/\/+$/, "")}${src.startsWith("/") ? "" : "/"}${src}`;
}

export const manifestGeneratedAt = manifest.generatedAt;
