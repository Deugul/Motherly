/**
 * WordPress REST API helpers for blog posts.
 *
 * WORDPRESS_BLOG_MODE (default: production)
 *   - production     → published posts only
 *   - development    → published + draft (requires WORDPRESS_PREVIEW_KEY + WP mu-plugin)
 *
 * Drafts are NOT public in WordPress. Without a preview key + small WP plugin,
 * development mode still only returns published posts.
 */

export const WP_API_BASE =
  process.env.WORDPRESS_API_URL?.replace(/\/+$/, "") ??
  "https://beige-swallow-278886.hostingersite.com/wp-json/wp/v2";

export const WP_ORIGIN =
  process.env.WORDPRESS_ORIGIN?.replace(/\/+$/, "") ??
  "https://beige-swallow-278886.hostingersite.com";

export type WordPressBlogMode = "production" | "development";
export type WordPressPostStatus = "publish" | "draft" | string;

const BLOG_REVALIDATE_SECONDS = 45;
const PREVIEW_KEY_PARAM = "motherly_preview_key";

/** Default is production when unset (e.g. Vercel before env vars are configured). */
export function getWordPressBlogMode(): WordPressBlogMode {
  const raw = process.env.WORDPRESS_BLOG_MODE?.trim().toLowerCase();
  return raw === "development" ? "development" : "production";
}

function getPreviewKey(): string | undefined {
  const key = process.env.WORDPRESS_PREVIEW_KEY?.trim();
  return key || undefined;
}

function isDevelopmentWithPreviewKey(): boolean {
  return getWordPressBlogMode() === "development" && Boolean(getPreviewKey());
}

/** Post status query for the WP REST API. */
export function getWordPressPostStatuses(): string {
  if (getWordPressBlogMode() === "production") return "publish";
  if (isDevelopmentWithPreviewKey()) return "publish,draft";
  return "publish";
}

/**
 * Adds mode-specific query params. Drafts require motherly_preview_key + WP mu-plugin.
 */
export function applyWordPressBlogQueryParams(params: URLSearchParams): URLSearchParams {
  params.set("status", getWordPressPostStatuses());

  if (isDevelopmentWithPreviewKey()) {
    params.set(PREVIEW_KEY_PARAM, getPreviewKey()!);
    params.set("context", "edit");
  }

  return params;
}

export function getWordPressFetchInit(): RequestInit {
  return {
    next: { revalidate: BLOG_REVALIDATE_SECONDS },
  };
}

export async function fetchWordPress<T>(
  path: string,
  searchParams?: URLSearchParams
): Promise<{ data: T | null; ok: boolean }> {
  const params = applyWordPressBlogQueryParams(
    new URLSearchParams(searchParams ?? undefined)
  );

  const query = params.toString();
  const url = query ? `${WP_API_BASE}${path}?${query}` : `${WP_API_BASE}${path}`;

  try {
    const res = await fetch(url, getWordPressFetchInit());

    if (getWordPressBlogMode() === "development" && !getPreviewKey()) {
      console.warn(
        "[wordpress] WORDPRESS_BLOG_MODE=development but WORDPRESS_PREVIEW_KEY is missing — only published posts are returned. Add the key and install wordpress/motherly-preview-rest.php on WordPress."
      );
    }

    if (!res.ok) {
      if (getWordPressBlogMode() === "development") {
        console.warn(
          `[wordpress] ${res.status} ${res.statusText} for ${url}. Install mu-plugin motherly-preview-rest.php and set the same secret in WordPress + .env.local`
        );
      }
      return { data: null, ok: false };
    }

    const data = (await res.json()) as T;
    return { data, ok: true };
  } catch (error) {
    console.error("[wordpress] fetch failed:", error);
    return { data: null, ok: false };
  }
}

/** Route path for a post (drafts may have no slug until published). */
export function getBlogPostPath(post: {
  slug?: string;
  wpId?: number;
  id?: number;
  status?: string;
}): string {
  const slug = post.slug?.trim();
  if (slug) return `/blogs/${slug}`;
  const id = post.wpId ?? post.id;
  if (id) return `/blogs/${id}`;
  return "/blogs";
}

/** Prefer draft in development when slug query returns multiple; else published. */
export function pickWordPressPostBySlug<T extends { status?: string }>(
  posts: T[]
): T | null {
  if (!posts.length) return null;
  if (getWordPressBlogMode() === "development") {
    const draft = posts.find((p) => p.status === "draft");
    if (draft) return draft;
  }
  const published = posts.find((p) => p.status === "publish");
  if (published) return published;
  return posts[0] ?? null;
}

export function isWordPressPostIdSegment(segment: string): boolean {
  return /^\d+$/.test(segment);
}
