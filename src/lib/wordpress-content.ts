/** WordPress post shape fields used for body HTML resolution. */
export type WpPostContentSource = {
  content?: { rendered?: string };
  motherly_content_html?: string | null;
};

export type StripDuplicateBlogChromeOptions = {
  /** Page H1 — used to drop a repeated opening title inside the WP body. */
  title?: string;
  /** Featured media URL — used to drop a repeated hero image in the WP body. */
  featuredImageUrl?: string;
};

/**
 * Prefer REST `content.rendered`; fall back to Elementor HTML from Motherly plugin
 * when post_content is empty (common for unsaved Elementor drafts).
 */
export function getWordPressPostBodyHtml(post: WpPostContentSource): string {
  const rendered = post.content?.rendered?.trim() ?? "";
  if (rendered.length > 0) {
    return rendered;
  }
  return post.motherly_content_html?.trim() ?? "";
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTitle(text: string): string {
  return stripTags(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** True when WP heading is the same article title the Next.js template already shows. */
export function titlesLookSame(pageTitle: string, headingHtml: string): boolean {
  const page = normalizeTitle(pageTitle);
  const heading = normalizeTitle(headingHtml);
  if (!page || !heading) return false;
  if (page === heading) return true;
  if (page.includes(heading) || heading.includes(page)) return true;

  const pageTokens = page.split(" ").filter((t) => t.length > 2);
  const headingTokens = heading.split(" ").filter((t) => t.length > 2);
  if (pageTokens.length < 3 || headingTokens.length < 3) return false;

  const pageSet = new Set(pageTokens);
  const hits = headingTokens.filter((t) => pageSet.has(t)).length;
  const ratio = hits / Math.min(pageTokens.length, headingTokens.length);
  return ratio >= 0.7;
}

function imageBasenameKey(url: string): string {
  try {
    const path = url.split("?")[0].split("#")[0];
    const file = path.substring(path.lastIndexOf("/") + 1);
    return file
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/-\d+x\d+$/i, "")
      .toLowerCase();
  } catch {
    return "";
  }
}

function htmlReferencesImage(html: string, featuredImageUrl: string): boolean {
  const key = imageBasenameKey(featuredImageUrl);
  if (!key || key.length < 4) return false;
  return html.toLowerCase().includes(key);
}

/**
 * Designed Motherly posts ship as `.mb-wrap` HTML. Editors often also leave a
 * Gutenberg lead (title + intro + featured image) *above* that block. The Next.js
 * blog template already renders H1 + featured image, so that lead shows twice.
 *
 * Always drop everything before the first `.mb-wrap` — the designed article is
 * the canonical body.
 */
function stripPrefixBeforeMbWrap(html: string): string {
  const match = html.match(/<div\b[^>]*\bclass="[^"]*\bmb-wrap\b[^"]*"[^>]*>/i);
  if (!match || match.index == null) return html;

  const prefix = html.slice(0, match.index);
  // Only strip when the prefix looks like chrome (headings/images/leads), not a
  // whole second article. Very large prefixes are left alone as a safety valve.
  const prefixText = stripTags(prefix);
  if (prefixText.length > 1200) return html;

  let out = html.slice(match.index);
  // Full-document exports leave closing body/html after the wrap.
  out = out.replace(/<\/(?:body|html)\s*>/gi, "");
  return out;
}

/**
 * Inside `.mb`, the first H1/H2 (often `id="toc-0"`) repeats the page title.
 * Remove it after block restore so fact-box reconstruction still has an anchor.
 */
function stripOpeningMbTitle(html: string, pageTitle?: string): string {
  const articleMatch = html.match(/<article\b[^>]*\bclass="[^"]*\bmb\b[^"]*"[^>]*>/i);
  if (!articleMatch || articleMatch.index == null) {
    return stripLeadingTitle(html, pageTitle);
  }

  const articleStart = articleMatch.index + articleMatch[0].length;
  const before = html.slice(0, articleStart);
  const after = html.slice(articleStart);

  const headingMatch = after.match(
    /^\s*(?:<!--[\s\S]*?-->\s*)*<h([12])\b([^>]*)>([\s\S]*?)<\/h\1>/i
  );
  if (!headingMatch) return html;

  const attrs = headingMatch[2] ?? "";
  const headingInner = headingMatch[3] ?? "";
  // Designed posts use id="toc-0" for the article title (also accept toc-0).
  const tocId = attrs.match(/\bid\s*=\s*["'](toc-0|toc-0)["']/i)?.[1];
  const isTocTitle = Boolean(tocId);
  const matchesPage =
    !pageTitle || titlesLookSame(pageTitle, headingInner);

  if (!isTocTitle && !matchesPage) return html;

  const idAnchor = tocId ? `<span id="${tocId}" hidden></span>` : "";
  return before + idAnchor + after.slice(headingMatch[0].length);
}

function stripLeadingTitle(html: string, pageTitle?: string): string {
  if (!pageTitle) return html;
  const match = html.match(
    /^\s*(?:<!--[\s\S]*?-->\s*)*<h([12])\b[^>]*>([\s\S]*?)<\/h\1>/i
  );
  if (!match) return html;
  if (!titlesLookSame(pageTitle, match[2] ?? "")) return html;
  return html.slice(match[0].length);
}

/**
 * Drop a leading featured image (bare <img>, <figure>, or <p><img>) when it is
 * the same asset the Next.js template already shows above the body.
 */
function stripLeadingFeaturedImage(
  html: string,
  featuredImageUrl?: string
): string {
  if (!featuredImageUrl) return html;

  const patterns = [
    /^\s*(?:<!--[\s\S]*?-->\s*)*<figure\b[^>]*>[\s\S]*?<\/figure>/i,
    /^\s*(?:<!--[\s\S]*?-->\s*)*<p\b[^>]*>\s*<img\b[^>]*>\s*<\/p>/i,
    /^\s*(?:<!--[\s\S]*?-->\s*)*<img\b[^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (!match) continue;
    if (!htmlReferencesImage(match[0], featuredImageUrl)) continue;
    return html.slice(match[0].length);
  }
  return html;
}

/**
 * The WordPress single-post template appends its own footer chrome after the
 * article body: a newsletter heading whose `[forminator_form]` shortcode is
 * never expanded by the REST API (it renders as literal text), then a "Keep
 * Reading" related-posts widget whose cards carry `edit post` wp-admin links
 * and point at legacy root URLs.
 *
 * The Next.js template renders its own Keep Reading section, so this block is a
 * visible duplicate. It is always appended after the article, so everything
 * from the first marker to the end of the body is chrome.
 */
const TRAILING_CHROME_MARKERS = [
  /<h[1-6]\b[^>]*>\s*Stay Updated with Motherly\s*<\/h[1-6]>/i,
  /\[forminator_form\b[^\]]*\]/i,
  /<h[1-6]\b[^>]*>\s*Keep Reading\s*<\/h[1-6]>/i,
];

function stripTrailingWpChrome(html: string): string {
  let cut = -1;
  for (const marker of TRAILING_CHROME_MARKERS) {
    const match = html.match(marker);
    if (match?.index == null) continue;
    if (cut < 0 || match.index < cut) cut = match.index;
  }
  if (cut < 0) return html;

  // Safety valve: the chrome is appended *after* the article, so it always sits
  // well into the tail (76%+ of the body across every affected post). A marker
  // in the first half means we matched real prose, so leave the body alone.
  if (cut < html.length / 2) return html;

  return html.slice(0, cut);
}

/**
 * Remove title/hero chrome that duplicates the Next.js blog post template.
 * Safe to run more than once. Call after `restoreWpBlocks` so fact-box restore
 * can still key off the opening heading.
 */
export function stripDuplicateBlogChrome(
  html: string,
  options: StripDuplicateBlogChromeOptions = {}
): string {
  if (!html) return html;

  let out = stripPrefixBeforeMbWrap(html);
  out = stripTrailingWpChrome(out);
  out = stripOpeningMbTitle(out, options.title);
  out = stripLeadingFeaturedImage(out, options.featuredImageUrl);
  // Title may sit above the featured image in classic posts.
  out = stripLeadingTitle(out, options.title);
  out = stripLeadingFeaturedImage(out, options.featuredImageUrl);
  return out.trim();
}
