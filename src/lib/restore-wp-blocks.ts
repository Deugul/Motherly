/**
 * Rebuilds the designed blocks in exported WordPress article HTML.
 *
 * The SQL-dump extraction unwrapped every `<div>` and stripped every `class`
 * attribute from post content, so the original blog design collapsed into bare
 * tags: the fact box became a loose "✓", the pull quote became naked text, the
 * app CTA became a row of links, and the author avatar became a stray letter.
 *
 * Each block is still identifiable by its structure, so these helpers detect
 * them and re-emit the original markup — same element hierarchy, same class
 * names — which `globals.css` then styles.
 *
 * Every transform is idempotent: content that already carries its classes is
 * left untouched, so re-running is safe.
 */

/** Give the article the class the stylesheet targets. */
function restoreArticle(html: string): string {
  return html.replace(/<article(?![^>]*\bclass=)([^>]*)>/i, '<article class="mb"$1>');
}

/**
 * Fact box: an isolated "✓" directly after the title, followed by the body
 * text up to the first paragraph.
 *
 * Accepts h1 or h2 because `demoteContentHeadings` runs earlier in the pipeline
 * and rewrites the article's h1 to an h2 for SEO.
 */
function restoreFactBox(html: string): string {
  return html.replace(
    /(<\/h[12]>)\s*✓\s*([\s\S]*?)\s*(?=<p\b|<h2\b|<div\b)/i,
    (_full, h1, body) =>
      `${h1}<div class="mb-fact">` +
      `<div class="mb-fact-icon">✓</div>` +
      `<div class="mb-fact-body">${body.trim()}</div>` +
      `</div>`
  );
}

/**
 * Pull quote: a bare quoted sentence sitting between two blocks, with no
 * element of its own.
 */
function restoreQuote(html: string): string {
  return html.replace(
    /(<\/p>)\s*([“"][^<]{20,}?[”"])\s*(?=<h2\b|<h3\b|<p\b|<div\b)/gi,
    (_full, close, quote) => `${close}<div class="mb-quote">${quote.trim()}</div>`
  );
}

/**
 * Numbered step cards: the card lost its wrapper, so its number badge now reads
 * as a stray digit floating above the heading. A bare number alone on its line
 * directly before an `<h3>` is only ever this badge — article prose never puts
 * one there.
 *
 * `.mb-method` is a flex row, so the heading and body need a wrapper of their
 * own or they line up beside the badge instead of stacking next to it.
 */
const STEP_RUN =
  /(?:[^\S\n]*\n[^\S\n]*\d{1,2}[^\S\n]*\n\s*<h3>[^<]*<\/h3>\s*<p>[\s\S]*?<\/p>)+/gi;
const STEP_ONE =
  /[^\S\n]*\n[^\S\n]*(\d{1,2})[^\S\n]*\n\s*<h3>([^<]*)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi;

function restoreMethods(html: string): string {
  return html.replace(STEP_RUN, (run) => {
    const cards = [...run.matchAll(STEP_ONE)]
      .map(
        ([, num, title, bodyText]) =>
          `<div class="mb-method">` +
          `<div class="mb-method-num">${num}</div>` +
          `<div class="mb-method-body"><h3>${title.trim()}</h3><p>${bodyText.trim()}</p></div>` +
          `</div>`
      )
      .join("");
    return cards ? `<div class="mb-methods">${cards}</div>` : run;
  });
}

const STORE_TEXT = {
  google: { label: "Get it on", name: "Google Play", aria: "Get it on Google Play" },
  apple: { label: "Download on the", name: "App Store", aria: "Download on the App Store" },
} as const;

type StoreKind = keyof typeof STORE_TEXT;

/**
 * Which store an anchor points at.
 *
 * Keyed off the href, not the `aria-label`: a third of the exports dropped the
 * label and inlined the badge styling instead, which left the two lines of text
 * concatenated ("Get it onGoogle Play") and the badge unstyled once the post's
 * own `<style>` block was removed.
 */
function storeKind(anchor: string): StoreKind | null {
  if (/play\.google\.com/i.test(anchor)) return "google";
  if (/apps\.apple\.com/i.test(anchor)) return "apple";
  return null;
}

/** Re-emit the store links as the two-line badges the design uses. */
function buildStoreBadges(tail: string): string {
  const badges: string[] = [];

  for (const m of tail.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const [, attrs, inner] = m;
    const kind = storeKind(attrs);
    if (!kind) continue;

    const text = STORE_TEXT[kind];
    const href = attrs.match(/href="([^"]*)"/i)?.[1] ?? "#";
    const svg = inner.match(/<svg[\s\S]*?<\/svg>/i)?.[0] ?? "";

    badges.push(
      `<a class="mb-store-badge mb-store-badge--${kind}" href="${href}" ` +
        `target="_blank" rel="noopener noreferrer" aria-label="${text.aria}">` +
        `<span class="mb-store-icon" aria-hidden="true">${svg}</span>` +
        `<span class="mb-store-text">` +
        `<span class="mb-store-label">${text.label}</span>` +
        `<span class="mb-store-name">${text.name}</span>` +
        `</span></a>`
    );
  }

  return badges.length ? `<div class="mb-cta-stores">${badges.join("")}</div>` : "";
}

/** The small print beneath the badges, with its link preserved. */
function buildSubLine(tail: string): string {
  const idx = tail.search(/Free to download/i);
  if (idx < 0) return "";

  const raw = tail.slice(idx);
  const link = raw.match(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
  const text = raw.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

  if (!link) return `<span class="mb-cta-sub">${text}</span>`;

  const label = link[2].replace(/<[^>]*>/g, "").trim();
  const lead = text.replace(new RegExp(`${label}\\s*$`), "").trim();
  return (
    `<span class="mb-cta-sub">${lead} ` +
    `<a href="${link[1]}" target="_blank" rel="noopener noreferrer">${label}</a></span>`
  );
}

/**
 * App CTA: heading, lead, one or more primary buttons, store badges and the
 * small print.
 *
 * Anchored on the store badges rather than on a specific button URL — some
 * posts link straight to a service page ("Find a Yoga Instructor Near You")
 * and several carry two buttons, so the button hrefs vary while the two store
 * links are always present and always last.
 */
function restoreCta(html: string): string {
  // Locate each store-badge cluster, then expand outwards to the block that
  // owns it. Index-based rather than one large regex: the CTA varies too much
  // (optional lead paragraph, one or two buttons, differing hrefs) for a single
  // pattern to stay both permissive and safe — a greedy one silently swallows
  // the author box and contents rail that follow it.
  const anchor = /href="[^"]*play\.google\.com/i;
  let out = "";
  let cursor = 0;

  while (true) {
    const rest = html.slice(cursor);
    const hit = rest.search(anchor);
    if (hit < 0) break;

    const abs = cursor + hit;

    // Start: the heading immediately preceding this cluster.
    const headOpen = html.lastIndexOf("<h3", abs);
    const headClose = html.indexOf("</h3>", headOpen);
    if (headOpen < cursor || headClose < 0 || headClose > abs) {
      cursor = abs + 1;
      continue;
    }

    // End: the next structural break after the cluster.
    const breaks = [html.indexOf("<hr", abs), html.indexOf("</article>", abs), html.indexOf("<h2", abs)]
      .filter((i) => i >= 0);
    const end = breaks.length ? Math.min(...breaks) : html.length;

    const block = html.slice(headClose + 5, end);
    const heading = html.slice(headOpen, headClose).replace(/^<h3[^>]*>/i, "");

    const links: string[] = block.match(/<a\b[\s\S]*?<\/a>/gi) ?? [];
    const firstStore = links.findIndex((a) => storeKind(a) !== null);

    if (firstStore < 0) {
      cursor = abs + 1;
      continue;
    }

    const lead = block.match(/<p>\s*([\s\S]*?)\s*<\/p>/i)?.[1] ?? "";
    const buttons = links
      .slice(0, firstStore)
      .map((a) => {
        const href = a.match(/href="([^"]*)"/i)?.[1] ?? "#";
        const label = a.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        return label
          ? `<a class="mb-cta-btn" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
          : "";
      })
      .filter(Boolean)
      .join("");

    // Small print lives after the final store link.
    const lastStoreEnd = block.lastIndexOf("</a>", block.length);
    const tail = block.slice(Math.max(0, lastStoreEnd));

    out +=
      html.slice(cursor, headOpen) +
      `<div class="mb-cta">` +
      `<h3>${heading}</h3>` +
      (lead ? `<p>${lead}</p>` : "") +
      (buttons ? `<div class="mb-cta-actions">${buttons}</div>` : "") +
      buildStoreBadges(links.slice(firstStore).join("")) +
      buildSubLine(tail) +
      `</div>`;

    cursor = end;
  }

  return out + html.slice(cursor);
}

/**
 * FAQ accordion: the same unwrapping left the rows as bare text after the FAQ
 * heading — question, a literal "+", then the answer. Both the stylesheet and
 * the `.mb-faq-q` click handler in `WpContent` key off `.mb-faq-*`, so rebuild
 * that hierarchy; the stray "+" becomes the icon span it was always meant to be.
 *
 * Three export shapes occur: the "+" on its own line, the "+" glued to the end
 * of the question, and answers already wrapped in a `<p>`. Anything that does
 * not resolve into clean question/answer pairs is left exactly as it was.
 *
 * Older exports also dropped every HTML comment, so the block is found by an
 * `<!-- FAQ -->` marker when one survived and by the heading text otherwise.
 * The region stops at the tag list, which directly follows the FAQ in exports
 * that have no comments left to delimit the two.
 */
const FAQ_BLOCK =
  /(<!--\s*FAQ\s*-->\s*)?(<h([1-6])\b[^>]*>([^<]*)<\/h\3>)([\s\S]*?)(?=<!--|<hr\b|<\/article\b|<h[1-6]\b|<div\b|<a\b[^>]*href="[^"]*\/tag\/|$)/gi;

/** Heading text that introduces an FAQ block in an export with no comments. */
const FAQ_HEADING = /^\s*(?:FAQs?\b|Frequently Asked Questions|Common Questions)/i;

function parseFaqRows(region: string): Array<{ q: string; a: string }> | null {
  const lines = region.split("\n").map((line) => line.trim()).filter(Boolean);
  const rows: Array<{ q: string; a: string }> = [];
  let question: string | null = null;

  for (const line of lines) {
    if (question === null) {
      // A delimiter with nothing before it means this is not the shape we know.
      if (line === "+") return null;
      question = line.endsWith("+") ? line.slice(0, -1).trim() : line;
      if (!question) return null;
      continue;
    }
    if (line === "+") continue;
    // Answers are a single line in every export; the next line starts a new row.
    rows.push({ q: question, a: line });
    question = null;
  }

  if (question !== null) return null; // dangling question — leave the block alone
  return rows.length ? rows : null;
}

function restoreFaq(html: string): string {
  return html.replace(
    FAQ_BLOCK,
    (
      full,
      marker: string | undefined,
      heading: string,
      _level,
      title: string,
      region: string
    ) => {
      // Every other heading in the article reaches this callback too — only an
      // FAQ marker or an FAQ heading makes the block ours to rewrite.
      if (!marker && !FAQ_HEADING.test(title)) return full;
      // Already structured by a newer export.
      if (/class="[^"]*mb-faq/i.test(region) || /<details\b/i.test(region)) return full;

      const rows = parseFaqRows(region);
      if (!rows) return full;

      const items = rows
        .map(({ q, a }) => {
          // Unwrap a lone <p> so the answer inherits `.mb-faq-a` spacing directly.
          const answer = a.replace(/^<p\b[^>]*>([\s\S]*)<\/p>$/i, "$1").trim();
          return (
            `<div class="mb-faq-item">` +
            `<div class="mb-faq-q">${q}<span class="mb-faq-icon">+</span></div>` +
            `<div class="mb-faq-a">${answer}</div>` +
            `</div>`
          );
        })
        .join("");

      return `${marker ?? ""}${heading}<div class="mb-faq">${items}</div>`;
    }
  );
}

/**
 * Tag pills: the export left the taxonomy links bare, so they render as a run-on
 * row of underlined text under the article. `globals.css` already hides
 * `.mb-tags`; restoring the wrapper is what lets that rule apply.
 *
 * Keyed off a run of consecutive `/tag/` links rather than the `<!-- TAGS -->`
 * marker, which some exports dropped. Two in a row is the taxonomy list; a lone
 * link inside prose is left alone.
 */
function restoreTags(html: string): string {
  return html.replace(
    /(?:<!--\s*TAGS\s*-->\s*)?((?:<a\b[^>]*href="[^"]*\/tag\/[^"]*"[^>]*>[\s\S]*?<\/a>\s*){2,})/gi,
    (full, links: string) =>
      /class="mb-tags"/.test(full) ? full : `<div class="mb-tags">${links.trim()}</div>`
  );
}

/** Author box: the avatar initial lost its circle and reads as a stray letter. */
function restoreAuthor(html: string): string {
  const build = (initial: string | undefined, name: string, bio: string) => {
    const letter = (initial || name.trim().charAt(0) || "M").toUpperCase();
    return (
      `<div class="mb-author">` +
      `<div class="mb-author-avatar">${letter}</div>` +
      `<div class="mb-author-info"><h4>${name}</h4><p>${bio}</p></div>` +
      `</div>`
    );
  };

  return (
    html
      .replace(
        /<hr\s*\/?>\s*([A-Za-z])?\s*<h4>\s*([\s\S]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
        (_full, initial, name, bio) => `<hr>${build(initial, name, bio)}`
      )
      // Most posts separate the author box with an `<hr>`, but a third of them
      // mark it with a comment instead — same collapsed shape, same stray letter.
      .replace(
        /<!--\s*AUTHOR\s*-->\s*([A-Za-z])?\s*<h4>\s*([\s\S]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
        (_full, initial, name, bio) => build(initial, name, bio)
      )
      // A few exports kept neither. There the orphaned avatar letter is the only
      // marker left, and it is enough: a lone letter between a closing tag and an
      // `<h4>` never occurs around the `<h4>` subheadings used inside articles.
      .replace(
        /(?:^|>)\s*([A-Za-z])\s*<h4>\s*([^<]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
        (full, initial, name, bio) =>
          full.charAt(0) === ">" ? `>${build(initial, name, bio)}` : build(initial, name, bio)
      )
  );
}

/** Table of contents: restore the class the scroll-spy and styles rely on. */
function restoreToc(html: string): string {
  // A couple of posts carry a stray `</p>` between the title text and the list,
  // left over from the export — tolerate any orphan closing tag here.
  return html.replace(
    /<nav\b((?![^>]*\bclass=)[^>]*id="mbToc"[^>]*)>\s*([^<]*?)\s*(?:<\/[a-z]+>\s*)*(?=<ul\b)/i,
    (_full, attrs, title) =>
      `<nav${attrs} class="mb-toc">` +
      (title.trim() ? `<div class="mb-toc-title">${title.trim()}</div>` : "")
  );
}

/** Wrap bare comparison tables so borders + horizontal scroll work without inline WP CSS. */
function restoreTables(html: string): string {
  return html.replace(/<table\b[\s\S]*?<\/table>/gi, (table, offset) => {
    const before = html.slice(Math.max(0, offset - 120), offset);
    if (/class="mb-table-wrap"[^>]*>\s*$/i.test(before)) return table;
    return `<div class="mb-table-wrap">${table}</div>`;
  });
}

/** Two-column shell: article beside the sticky contents rail. */
function wrapLayout(html: string): string {
  if (/class="mb-wrap"/.test(html)) return html;
  const start = html.search(/<article\b/i);
  if (start < 0) return html;

  const navEnd = html.lastIndexOf("</nav>");
  const end = navEnd > start ? navEnd + "</nav>".length : html.lastIndexOf("</article>") + 10;
  if (end <= start) return html;

  return (
    html.slice(0, start) +
    `<div class="mb-wrap">` +
    html.slice(start, end) +
    `</div>` +
    html.slice(end)
  );
}

/** Apply every block restoration, innermost first. */
export function restoreWpBlocks(html: string): string {
  if (!html) return html;
  let out = html;
  out = restoreArticle(out);
  out = restoreFactBox(out);
  out = restoreQuote(out);
  out = restoreMethods(out);
  out = restoreCta(out);
  out = restoreFaq(out);
  out = restoreTags(out);
  out = restoreAuthor(out);
  out = restoreToc(out);
  out = restoreTables(out);
  out = wrapLayout(out);
  return out;
}


