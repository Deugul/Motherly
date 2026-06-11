import { getWordPressFetchInit, WP_ORIGIN } from "@/lib/wordpress";

export type WpFeaturedImageSource = {
  featured_media?: number;
  link?: string;
  /** Exposed by Motherly Dev REST Preview plugin when media REST embed is restricted. */
  motherly_featured_image_url?: string | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      code?: string;
    }>;
  };
};

/** Valid URL from `_embed=wp:featuredmedia` (ignores REST error objects). */
export function getEmbeddedFeaturedImageUrl(post: WpFeaturedImageSource): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media || media.code || !media.source_url?.trim()) {
    return "";
  }
  return media.source_url.trim();
}

export function getEmbeddedFeaturedImageAlt(
  post: WpFeaturedImageSource,
  fallback: string
): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.code) return fallback;
  return media?.alt_text?.trim() || fallback;
}

/** WordPress oEmbed thumbnails often include `-768x455` style suffixes. */
export function upsizeWpThumbnailUrl(url: string): string {
  return url.replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp|gif)(?:\?|$))/i, "");
}

const OEMBED_BASE = `${WP_ORIGIN.replace(/\/+$/, "")}/wp-json/oembed/1.0/embed`;

async function fetchOEmbedThumbnailUrl(postLink: string): Promise<string> {
  if (!postLink.trim()) return "";

  try {
    const params = new URLSearchParams({ url: postLink.trim(), format: "json" });
    const res = await fetch(`${OEMBED_BASE}?${params.toString()}`, getWordPressFetchInit());
    if (!res.ok) return "";

    const data = (await res.json()) as { thumbnail_url?: string };
    const thumb = data.thumbnail_url?.trim();
    return thumb ? upsizeWpThumbnailUrl(thumb) : "";
  } catch {
    return "";
  }
}

/**
 * Featured image for blog cards and post headers.
 * Uses embedded media when available; falls back to public oEmbed only when embed is missing.
 */
export async function resolveFeaturedImageUrl(
  post: WpFeaturedImageSource
): Promise<string> {
  const pluginUrl = post.motherly_featured_image_url?.trim();
  if (pluginUrl) return pluginUrl;

  const embedded = getEmbeddedFeaturedImageUrl(post);
  if (embedded) return embedded;

  if ((post.featured_media ?? 0) > 0 && post.link?.trim()) {
    return fetchOEmbedThumbnailUrl(post.link);
  }

  return "";
}
