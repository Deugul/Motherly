import { getBlogSeo } from "@/data/blog-seo";
import { SITE_ORIGIN } from "@/lib/site-url";

/** Rank Math fields exposed by Motherly Dev REST Preview plugin on WP. */
export type RankMathSeoFromWp = {
  title?: string;
  description?: string;
  keywords?: string;
};

export type ResolvedBlogSeo = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  h1: string;
  canonical: string;
};

export function parseRankMathKeywords(raw: string | undefined): string[] | undefined {
  if (!raw?.trim()) return undefined;
  const list = raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length > 0 ? list : undefined;
}

/** Visible H1 from Rank Math / meta title (strip " | Motherly" suffix). */
export function displayH1FromMetaTitle(metaTitle: string): string {
  return metaTitle.split("|")[0]?.trim() || metaTitle.trim();
}

export function resolveBlogPostSeo(
  slug: string,
  post: {
    title: { rendered: string };
    excerpt: { rendered: string };
    rank_math_seo?: RankMathSeoFromWp | null;
  }
): ResolvedBlogSeo {
  const staticSeo = getBlogSeo(slug);
  const rm = post.rank_math_seo;

  const metaTitle =
    rm?.title?.trim() ||
    staticSeo?.metaTitle ||
    stripHtml(post.title.rendered);

  const metaDescription =
    rm?.description?.trim() ||
    staticSeo?.metaDescription ||
    stripHtml(post.excerpt.rendered).slice(0, 160).trim();

  const keywords =
    parseRankMathKeywords(rm?.keywords) ?? staticSeo?.keywords;

  /** Visible page title — always the WordPress post title, not the SEO meta title. */
  const h1 = staticSeo?.h1 || stripHtml(post.title.rendered);

  const canonical =
    staticSeo?.canonical ?? `${SITE_ORIGIN}/blogs/${slug}`;

  return { metaTitle, metaDescription, keywords, h1, canonical };
}

/** Card/list excerpt: Rank Math description beats stale WP excerpt field. */
export function resolvePostCardExcerpt(
  post: {
    excerpt: { rendered: string };
    rank_math_seo?: RankMathSeoFromWp | null;
  },
  maxLen = 140
): string {
  const raw =
    post.rank_math_seo?.description?.trim() ||
    stripHtml(post.excerpt.rendered);
  if (raw.length <= maxLen) return raw;
  return `${raw.slice(0, maxLen - 1).trim()}…`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** WordPress body often includes h1; page template already has one — demote for SEO. */
export function demoteContentHeadings(html: string): string {
  return html.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");
}
