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

import { buildStoreBadgesFromScratch } from "@/lib/blog-app-cta";

/** Give the article the class the stylesheet targets. */
function restoreArticle(html: string): string {
  return html.replace(/<article(?![^>]*\bclass=)([^>]*)>/i, '<article class="mb"$1>');
}

/**
 * A few posts were written outside the article template and arrive with no
 * `<article>` of their own — the only ones in their export belonged to the
 * WordPress "Keep Reading" cards, which are removed as chrome. Without the
 * element none of the `.wp-content .mb` typography applies and the post renders
 * as unstyled text, so give it the shell it is missing.
 *
 * Must run after the chrome is stripped: before that, the first `<article>` in
 * the body is one of those related-post cards.
 */
export function ensureArticleShell(html: string): string {
  if (!html.trim() || /<article\b/i.test(html)) return html;
  return `<div class="mb-wrap"><article class="mb">${html}</article></div>`;
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

  if (badges.length) return `<div class="mb-cta-stores">${badges.join("")}</div>`;

  // One export lost the anchors entirely and left only the badge captions, so
  // there is no href to recover — rebuild both badges against the real app.
  return STORE_LABELS_ONLY.test(tail) ? buildStoreBadgesFromScratch() : "";
}

/** Badge captions with the anchors stripped, as one export left them. */
const STORE_LABELS_ONLY = /Get it on\s*Google Play[\s\S]{0,120}?Download on the\s*App Store/i;

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
  const anchor = /href="[^"]*play\.google\.com|Get it on\s*Google Play/i;
  let out = "";
  let cursor = 0;
  let searchFrom = 0;

  while (true) {
    const hit = html.slice(searchFrom).search(anchor);
    if (hit < 0) break;

    const abs = searchFrom + hit;

    const headOpen = html.lastIndexOf("<h3", abs);
    const headClose = html.indexOf("</h3>", headOpen);
    if (headOpen < cursor || headClose < 0 || headClose > abs) {
      searchFrom = abs + 1;
      continue;
    }

    const preamble = html.slice(headClose + 5, abs);
    const ownsCluster =
      !/<(?:h[1-6]|ul|ol|table|hr|blockquote)\b/i.test(preamble) &&
      (preamble.match(/<p\b/gi)?.length ?? 0) <= 2;
    if (!ownsCluster) {
      searchFrom = abs + 1;
      continue;
    }

    const breaks = [html.indexOf("<hr", abs), html.indexOf("</article>", abs), html.indexOf("<h2", abs)]
      .filter((i) => i >= 0);
    const end = breaks.length ? Math.min(...breaks) : html.length;

    const block = html.slice(headClose + 5, end);
    const heading = html.slice(headOpen, headClose).replace(/^<h3[^>]*>/i, "");

    const links: string[] = block.match(/<a\b[\s\S]*?<\/a>/gi) ?? [];
    const firstStore = links.findIndex((a) => storeKind(a) !== null);
    const captionsOnly = firstStore < 0 && STORE_LABELS_ONLY.test(block);

    if (firstStore < 0 && !captionsOnly) {
      searchFrom = abs + 1;
      continue;
    }

    const lead = block.match(/<p>\s*([\s\S]*?)\s*<\/p>/i)?.[1] ?? "";
    const buttons = links
      .slice(0, captionsOnly ? links.length : firstStore)
      .map((a) => {
        const href = a.match(/href="([^"]*)"/i)?.[1] ?? "#";
        const label = a.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        return label
          ? `<a class="mb-cta-btn" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
          : "";
      })
      .filter(Boolean)
      .join("");

    const lastStoreEnd = block.lastIndexOf("</a>", block.length);
    const tail = block.slice(Math.max(0, lastStoreEnd));

    out +=
      html.slice(cursor, headOpen) +
      `<div class="mb-cta">` +
      `<h3>${heading}</h3>` +
      (lead ? `<p>${lead}</p>` : "") +
      (buttons ? `<div class="mb-cta-actions">${buttons}</div>` : "") +
      buildStoreBadges(captionsOnly ? block : links.slice(firstStore).join("")) +
      buildSubLine(captionsOnly ? block : tail) +
      `</div>`;

    cursor = end;
    searchFrom = end;
  }

  return out + html.slice(cursor);
}

const SPLIT_CTA_MARKED =
  /(<!--[^>]*\bCTA\b[^>]*-->)\s*<h3>([^<]{4,160})<\/h3>\s*(?:<p>([\s\S]{0,700}?)<\/p>\s*)?((?:<a\b[^>]*>[\s\S]{0,220}?<\/a>\s*)+)/gi;

const SPLIT_CTA_BARE =
  /<h3>([^<]{4,160})<\/h3>\s*<p>([^<]{10,700})<\/p>\s*((?:<a\b[^>]*>[^<]{2,120}<\/a>\s*){1,2})(?=<!--|<h[1-6]\b|<hr\b|<\/article\b|<p\b|<ul\b|<div\b|$)/gi;

function buildSplitCta(heading: string, lead: string | undefined, anchors: string): string | null {
  if (storeKind(anchors)) return null;
  if (/class="/i.test(anchors)) return null;

  const buttons = [...anchors.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map(([, attrs, label], index) => {
      const href = attrs.match(/href="([^"]*)"/i)?.[1] ?? "#";
      const text = label.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      const variant = index === 0 ? "primary" : "secondary";
      return text
        ? `<a class="mb-btn-split mb-btn-split-${variant}" href="${href}" ` +
            `target="_blank" rel="noopener noreferrer">${text}</a>`
        : "";
    })
    .filter(Boolean)
    .join("");

  if (!buttons) return null;

  return (
    `<div class="mb-cta-split">` +
    `<div class="mb-cta-split-content">` +
    `<h3>${heading.trim()}</h3>` +
    (lead?.trim() ? `<p>${lead.trim()}</p>` : "") +
    `</div>` +
    `<div class="mb-cta-split-actions">${buttons}</div>` +
    `</div>`
  );
}

function restoreSplitCta(html: string): string {
  const marked = html.replace(
    SPLIT_CTA_MARKED,
    (full, marker: string, heading: string, lead: string | undefined, anchors: string) => {
      const block = buildSplitCta(heading, lead, anchors);
      return block ? `${marker}${block}` : full;
    }
  );

  return marked.replace(
    SPLIT_CTA_BARE,
    (full, heading: string, lead: string, anchors: string) =>
      buildSplitCta(heading, lead, anchors) ?? full
  );
}

const FAQ_BLOCK =
  /(<!--\s*FAQ\s*-->\s*)?(<h([1-6])\b[^>]*>([^<]*)<\/h\3>)([\s\S]*?)(?=<!--|<hr\b|<\/article\b|<h[1-6]\b|<div\b|<a\b[^>]*href="[^"]*\/tag\/|$)/gi;

const FAQ_HEADING = /^\s*(?:FAQs?\b|Frequently Asked Questions|Common Questions)/i;

function parseFaqRows(region: string): Array<{ q: string; a: string }> | null {
  const lines = region.split("\n").map((line) => line.trim()).filter(Boolean);
  const rows: Array<{ q: string; a: string }> = [];
  let question: string | null = null;

  for (const line of lines) {
    if (question === null) {
      if (line === "+") return null;
      question = line.endsWith("+") ? line.slice(0, -1).trim() : line;
      if (!question) return null;
      continue;
    }
    if (line === "+") continue;
    rows.push({ q: question, a: line });
    question = null;
  }

  if (question !== null) return null;
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
      if (!marker && !FAQ_HEADING.test(title)) return full;
      if (/class="[^"]*mb-faq/i.test(region) || /<details\b/i.test(region)) return full;

      const rows = parseFaqRows(region);
      if (!rows) return full;

      const items = rows
        .map(({ q, a }) => {
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

function dropDuplicateFaqAnswers(html: string): string {
  const lastDetails = html.lastIndexOf("</details>");
  if (lastDetails < 0) return html;

  const normalise = (text: string) =>
    text.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  const answers = new Set<string>();
  for (const block of html.matchAll(/<details[\s\S]*?<\/details>/gi)) {
    for (const para of block[0].matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
      const text = normalise(para[1]);
      if (text.length > 25) answers.add(text);
    }
  }
  if (!answers.size) return html;

  const cut = lastDetails + "</details>".length;
  return (
    html.slice(0, cut) +
    html
      .slice(cut)
      .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (full, inner: string) =>
        answers.has(normalise(inner)) ? "" : full
      )
  );
}

function restoreTags(html: string): string {
  return html.replace(
    /(?:<!--\s*TAGS\s*-->\s*)?((?:<a\b[^>]*href="[^"]*\/tag\/[^"]*"[^>]*>[\s\S]*?<\/a>\s*){2,})/gi,
    (full, links: string) =>
      /class="mb-tags"/.test(full) ? full : `<div class="mb-tags">${links.trim()}</div>`
  );
}

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
      .replace(
        /<!--\s*AUTHOR\s*-->\s*([A-Za-z])?\s*<h4>\s*([\s\S]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
        (_full, initial, name, bio) => build(initial, name, bio)
      )
      .replace(
        /(?:^|>)\s*([A-Za-z])\s*<h4>\s*([^<]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
        (full, initial, name, bio) =>
          full.charAt(0) === ">" ? `>${build(initial, name, bio)}` : build(initial, name, bio)
      )
  );
}

function generateTocFromHeadings(html: string): string {
  if (/<nav\b/i.test(html) || /class="[^"]*mb-toc[^"]*"/i.test(html)) return html;

  const h2Regex = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;
  const headings: Array<{ id: string; title: string }> = [];
  let index = 0;

  const updatedHtml = html.replace(h2Regex, (full, attrs, content) => {
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    if (
      !plainText ||
      /Keep Reading|Stay Updated|Related Reading|Medical Disclaimer/i.test(plainText)
    ) {
      return full;
    }

    const idMatch = attrs.match(/id="([^"]*)"/i);
    const id = idMatch ? idMatch[1] : `toc-${index++}`;

    let newAttrs = attrs;
    if (!idMatch) {
      newAttrs += ` id="${id}"`;
    }

    headings.push({ id, title: plainText });
    return `<h2${newAttrs}>${content}</h2>`;
  });

  if (headings.length < 2) return html;

  const listItems = headings
    .map((h) => `      <li><a href="#${h.id}">${h.title}</a></li>`)
    .join("\n");

  const tocHtml = `\n  <nav id="mbToc" class="mb-toc" aria-label="Table of contents">\n    <div class="mb-toc-title">In This Article</div>\n    <ul>\n${listItems}\n    </ul>\n  </nav>`;

  return updatedHtml + tocHtml;
}

/** Table of contents: restore the class the scroll-spy and styles rely on. */
function restoreToc(html: string): string {
  if (/<nav\b/i.test(html)) {
    return html.replace(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi, (fullMatch, attrs, content) => {
      const isToc =
        /id="mbToc"/i.test(attrs) ||
        /class="[^"]*mb-toc[^"]*"/i.test(attrs) ||
        /Table of contents/i.test(attrs) ||
        /#toc-/i.test(content);
      if (!isToc) return fullMatch;

      let newAttrs = attrs;
      if (!/id="mbToc"/i.test(newAttrs)) {
        newAttrs += ' id="mbToc"';
      }
      if (!/class="/i.test(newAttrs)) {
        newAttrs += ' class="mb-toc"';
      } else if (!/class="[^"]*\bmb-toc\b[^"]*"/i.test(newAttrs)) {
        newAttrs = newAttrs.replace(/class="([^"]*)"/i, 'class="$1 mb-toc"');
      }

      let newContent = content;
      if (!/class="mb-toc-title"/i.test(newContent)) {
        newContent = newContent.replace(/^\s*([^<]+)\s*(?=<ul\b)/i, "");
        newContent = `<div class="mb-toc-title">In This Article</div>\n` + newContent.trim();
      }

      return `<nav${newAttrs}>\n${newContent}\n</nav>`;
    });
  }

  return generateTocFromHeadings(html);
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
  out = restoreSplitCta(out);
  out = restoreFaq(out);
  out = dropDuplicateFaqAnswers(out);
  out = restoreTags(out);
  out = restoreAuthor(out);
  out = restoreToc(out);
  out = restoreTables(out);
  out = wrapLayout(out);
  return out;
}
