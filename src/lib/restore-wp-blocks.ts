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

const STORE_TEXT: Record<string, { modifier: string; label: string; name: string }> = {
  "get it on google play": { modifier: "google", label: "Get it on", name: "Google Play" },
  "download on the app store": { modifier: "apple", label: "Download on the", name: "App Store" },
};

/** Re-emit the store links as the two-line badges the design uses. */
function buildStoreBadges(tail: string): string {
  const badges: string[] = [];

  for (const m of tail.matchAll(/<a\b([^>]*aria-label="([^"]+)"[^>]*)>([\s\S]*?)<\/a>/gi)) {
    const [, attrs, label, inner] = m;
    const text = STORE_TEXT[label.trim().toLowerCase()];
    if (!text) continue;

    const href = attrs.match(/href="([^"]*)"/i)?.[1] ?? "#";
    const svg = inner.match(/<svg[\s\S]*?<\/svg>/i)?.[0] ?? "";

    badges.push(
      `<a class="mb-store-badge mb-store-badge--${text.modifier}" href="${href}" ` +
        `target="_blank" rel="noopener noreferrer" aria-label="${label}">` +
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
  const anchor = /aria-label="Get it on Google Play"/i;
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
    const isStore = (a: string) =>
      /aria-label="(?:Get it on Google Play|Download on the App Store)"/i.test(a);
    const firstStore = links.findIndex(isStore);

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

/** Author box: the avatar initial lost its circle and reads as a stray letter. */
function restoreAuthor(html: string): string {
  return html.replace(
    /<hr\s*\/?>\s*([A-Za-z])?\s*<h4>\s*([\s\S]*?)\s*<\/h4>\s*<p>\s*([\s\S]*?)\s*<\/p>/gi,
    (_full, initial, name, bio) => {
      const letter = (initial || name.trim().charAt(0) || "M").toUpperCase();
      return (
        `<hr>` +
        `<div class="mb-author">` +
        `<div class="mb-author-avatar">${letter}</div>` +
        `<div class="mb-author-info"><h4>${name}</h4><p>${bio}</p></div>` +
        `</div>`
      );
    }
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
  out = restoreCta(out);
  out = restoreAuthor(out);
  out = restoreToc(out);
  out = wrapLayout(out);
  return out;
}
