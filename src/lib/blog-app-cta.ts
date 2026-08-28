/**
 * The app-download CTA that closes a blog post.
 *
 * Most posts carry their own copy of this block and `restoreWpBlocks` rebuilds
 * it from what survived the export. Two cases need the markup from scratch:
 * a post whose store links were flattened to plain text, and a post that never
 * had the block at all. Both reuse the constants here so every CTA on the site
 * points at the same places and renders through the same `.mb-cta` styles.
 */

/**
 * Deep links to the Motherly app.
 *
 * Note: most exported posts link to the bare store fronts
 * (`play.google.com/store/apps`), which lands the reader on the store's home
 * page rather than the app. Anything generated here uses the real listings.
 */
export const STORE_URLS = {
  google: "https://play.google.com/store/apps/details?id=com.mothrly&hl=en_IN",
  apple: "https://apps.apple.com/us/app/motherly-your-birth-companion/id6746041100",
} as const;

/**
 * Badge icons, copied from the posts that still ship them. The Google mark's
 * four fills are addressed individually by `wp-blog-mb.css`, so the colours
 * have to stay exactly as they are.
 */
export const STORE_SVG = {
  google:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">' +
    '<path fill="#00D0FF" d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.61 3 21.09 3 20.5z"/>' +
    '<path fill="#00F076" d="M16.81 15.12 6.05 21.34l8.51-8.51 2.25 2.29z"/>' +
    '<path fill="#FF3A44" d="M20.16 10.81c.34.27.59.69.59 1.19s-.22.92-.57 1.2l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.32c.35.28.57.68.57 1.18z"/>' +
    '<path fill="#FFB900" d="M6.05 2.66 16.81 8.88 14.56 11.17 6.05 2.66z"/>' +
    "</svg>",
  apple:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">' +
    '<path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>' +
    "</svg>",
} as const;

/** Copy shared by every generated CTA, taken from the posts that ship one. */
const HEADING = "You Deserve Proper Care Too — Not Just Your Baby";
const LEAD =
  "Book online or download the app to find your verified support specialist in Chennai.";
/**
 * Small print under the badges, word for word as the posts that carry it write
 * it. `mothrly.com` is plain text there rather than a link, so it stays plain
 * here too.
 */
const SUB_LINE =
  "Free to download &middot; Android &amp; iOS &middot; Book in under 2 minutes &middot; mothrly.com";

/** True when the article already ends with an app CTA of its own. */
export function hasAppCta(html: string): boolean {
  return /mb-store-badge|play\.google\.com|apps\.apple\.com/i.test(html);
}

function badge(kind: keyof typeof STORE_URLS, label: string, name: string): string {
  return (
    `<a class="mb-store-badge mb-store-badge--${kind}" href="${STORE_URLS[kind]}" ` +
    `target="_blank" rel="noopener noreferrer" aria-label="${label} ${name}">` +
    `<span class="mb-store-icon" aria-hidden="true">${STORE_SVG[kind]}</span>` +
    `<span class="mb-store-text">` +
    `<span class="mb-store-label">${label}</span>` +
    `<span class="mb-store-name">${name}</span>` +
    `</span></a>`
  );
}

/** The two store badges, wrapped as `restoreCta` emits them. */
export function buildStoreBadgesFromScratch(): string {
  return (
    `<div class="mb-cta-stores">` +
    badge("google", "Get it on", "Google Play") +
    badge("apple", "Download on the", "App Store") +
    `</div>`
  );
}

/** The full CTA block, for a post whose body carries none. */
export function buildAppCta(): string {
  return (
    `<div class="mb-cta">` +
    `<h3>${HEADING}</h3>` +
    `<p>${LEAD}</p>` +
    buildStoreBadgesFromScratch() +
    `<span class="mb-cta-sub">${SUB_LINE}</span>` +
    `</div>`
  );
}

/**
 * Append the CTA to a post that has none.
 *
 * Placed just before the FAQ when there is one, so the article still ends on
 * its questions the way every other post does; otherwise it closes the body.
 * A post with no real body is left alone — there is nothing to attach it to.
 */
export function ensureAppCta(html: string): string {
  if (!html.trim() || hasAppCta(html)) return html;

  const cta = buildAppCta();
  // The heading may be wrapped (`<h2><strong>Frequently Asked Questions</strong>`),
  // so allow inline tags between the heading and its text.
  const faq = html.search(
    /<div class="mb-faq"|<h[1-6][^>]*>(?:\s|<[^>]*>)*(?:FAQs?\b|Frequently Asked Questions)/i
  );
  if (faq >= 0) return html.slice(0, faq) + cta + html.slice(faq);

  const author = html.indexOf('<div class="mb-author"');
  if (author >= 0) return html.slice(0, author) + cta + html.slice(author);

  return html + cta;
}
