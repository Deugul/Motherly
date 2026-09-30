const fs = require('fs');

// We simulate stripDuplicateBlogChrome from src/lib/wordpress-content.ts
function titlesLookSame(pageTitle, headingHtml) {
  const normalizeTitle = (text) => text.replace(/<[^>]*>/g, " ").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const page = normalizeTitle(pageTitle);
  const heading = normalizeTitle(headingHtml);
  if (!page || !heading) return false;
  if (page === heading) return true;
  if (page.includes(heading) || heading.includes(page)) return true;
  return false;
}

function stripRepeatedTitleInsideMb(html, pageTitle) {
  const mbStart = html.search(/<article\b[^>]*\bclass="[^"]*\bmb\b[^"]*"[^>]*>/i);
  if (mbStart < 0) return html;

  const openTagMatch = html.slice(mbStart).match(/^<article\b[^>]*>/i);
  if (!openTagMatch) return html;

  const contentStart = mbStart + openTagMatch[0].length;
  const before = html.slice(0, contentStart);
  const after = html.slice(contentStart);

  const headingMatch = after.match(
    /^\s*(?:<!--[\s\S]*?-->\s*)*<h([12])(\b[^>]*)>([\s\S]*?)<\/h\1>/i
  );
  if (!headingMatch) return html;

  const attrs = headingMatch[2] ?? "";
  const headingInner = headingMatch[3] ?? "";
  const tocId = attrs.match(/\bid\s*=\s*["'](toc-0|toc-0)["']/i)?.[1];
  const isTocTitle = Boolean(tocId);
  const matchesPage = !pageTitle || titlesLookSame(pageTitle, headingInner);

  if (!isTocTitle && !matchesPage) return html;

  const idAnchor = tocId ? `<span id="${tocId}" hidden></span>` : "";
  return before + idAnchor + after.slice(headingMatch[0].length);
}

const { fixPostContent } = require('./test_all_8_fix_fn.js');
