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

/** WordPress post_tag names from REST `_embed` (Quick Edit → Tags). */
export function getWpPostTagNames(
  embedded?: {
    "wp:term"?: Array<Array<{ name?: string; taxonomy?: string }>>;
  } | null
): string[] | undefined {
  const groups = embedded?.["wp:term"];
  if (!groups?.length) return undefined;

  const names: string[] = [];
  for (const group of groups) {
    for (const term of group) {
      if (term.taxonomy === "post_tag" && term.name?.trim()) {
        names.push(term.name.trim());
      }
    }
  }
  return names.length > 0 ? names : undefined;
}

function mergeKeywordLists(...lists: (string[] | undefined)[]): string[] | undefined {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const list of lists) {
    for (const kw of list ?? []) {
      const key = kw.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(kw);
      }
    }
  }
  return merged.length > 0 ? merged : undefined;
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
    _embedded?: {
      "wp:term"?: Array<Array<{ name?: string; taxonomy?: string }>>;
    } | null;
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

  /** Tags (Quick Edit) = meta keywords; Rank Math focus keyword is a single SEO target. */
  const keywords = mergeKeywordLists(
    getWpPostTagNames(post._embedded),
    parseRankMathKeywords(rm?.keywords),
    staticSeo?.keywords
  );

  /** Visible page title — always the WordPress post title, not the SEO meta title. */
  const h1 = staticSeo?.h1 || stripHtml(post.title.rendered);

  const canonical =
    staticSeo?.canonical ?? `${SITE_ORIGIN}/blogs/${slug}`;

  return { metaTitle, metaDescription, keywords, h1, canonical };
}

/**
 * The exported WordPress excerpts were generated from full HTML documents, so
 * many begin with the `<title>` text followed by the raw contents of the
 * `<style>` block (`:root { --red: #ba0e56; … }`). That residue is literal text
 * in the data — there are no tags left to strip — so it is cut here.
 */
function sanitiseExcerpt(text: string): string {
  return text
    // Everything from the first CSS selector/rule onward is stylesheet residue.
    .replace(/(?::root\b|@media\b|\.[a-z][\w-]*\s*\{|\{[^}]*--[\w-]+\s*:)[\s\S]*$/i, "")
    // Leftover declarations such as "--red: #ba0e56;".
    .replace(/--[\w-]+\s*:\s*[^;{}]*;?/g, "")
    // Exported titles carry the site suffix; the card already shows the title.
    .replace(/\s*\|\s*Motherly\s*$/i, "")
    .replace(/[{};]+\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Is this string still mostly stylesheet/markup noise rather than prose? */
function looksLikeCss(text: string): boolean {
  return /:root|--[\w-]+\s*:|\{|\}|#[0-9a-f]{6}\b/i.test(text);
}

/** First real prose paragraph of the article, skipping bylines and credits. */
function leadParagraph(html: string): string {
  const body = html
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "");

  for (const match of body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = stripHtml(match[1]);
    if (text.length < 80) continue;
    // Editorial boilerplate that reads poorly as a card summary.
    if (/^(reviewed by|medically reviewed|written by|last updated)/i.test(text)) continue;
    if (/evidence-based content for/i.test(text)) continue;
    return text;
  }
  return "";
}

/** Card/list excerpt: Rank Math description beats stale WP excerpt field. */
export function resolvePostCardExcerpt(
  post: {
    excerpt: { rendered: string };
    content?: { rendered: string };
    title?: { rendered: string };
    rank_math_seo?: RankMathSeoFromWp | null;
  },
  maxLen = 140
): string {
  const rankMath = post.rank_math_seo?.description?.trim();
  const stored = sanitiseExcerpt(stripHtml(post.excerpt?.rendered ?? ""));

  // Once the stylesheet residue is removed, many excerpts are just the page
  // title — which the card already renders directly above. Treat that as unusable.
  const title = stripHtml(post.title?.rendered ?? "");
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const duplicatesTitle =
    !!title && (norm(stored).startsWith(norm(title)) || norm(title).startsWith(norm(stored)));

  // Prefer Rank Math, then a usable stored excerpt, then the article's own lead.
  let raw = rankMath || "";
  if (!raw && stored.length >= 40 && !looksLikeCss(stored) && !duplicatesTitle) raw = stored;
  if (!raw) raw = leadParagraph(post.content?.rendered ?? "");
  if (!raw) raw = stored;

  if (raw.length <= maxLen) return raw;
  return `${raw.slice(0, maxLen - 1).trim()}…`;
}

function stripHtml(html: string): string {
  return html
    // Exported posts are full HTML documents. Drop non-text regions entirely —
    // removing only the tags would leave CSS and script bodies in the excerpt.
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
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
