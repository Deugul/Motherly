const fs = require('fs');
const data = require('../src/data/local-wp-posts.json');

function generateTocFromHeadings(html) {
  if (/<nav\b/i.test(html) || /class="[^"]*mb-toc[^"]*"/i.test(html)) return html;

  const h2Regex = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;
  const headings = [];
  let index = 0;

  const updatedHtml = html.replace(h2Regex, (full, attrs, content) => {
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    if (
      !plainText ||
      /Keep Reading|Stay Updated|Related Reading|Medical Disclaimer/i.test(plainText)
    ) {
      return full;
    }

    let idMatch = attrs.match(/id="([^"]*)"/i);
    let id = idMatch ? idMatch[1] : `toc-${index++}`;

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
    .join('\n');

  const tocHtml = `\n  <nav id="mbToc" class="mb-toc" aria-label="Table of contents">\n    <div class="mb-toc-title">In This Article</div>\n    <ul>\n${listItems}\n    </ul>\n  </nav>`;

  return updatedHtml + tocHtml;
}

function restoreToc(html) {
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
        newContent = newContent.replace(/^\s*([^<]+)\s*(?=<ul\b)/i, '');
        newContent = `<div class="mb-toc-title">In This Article</div>\n` + newContent.trim();
      }

      return `<nav${newAttrs}>\n${newContent}\n</nav>`;
    });
  }

  return generateTocFromHeadings(html);
}

function restoreArticle(html) {
  return html.replace(/<article(?![^>]*\bclass=)([^>]*)>/i, '<article class="mb"$1>');
}

function wrapLayout(html) {
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

function ensureArticleShell(html) {
  if (!html.trim() || /<article\b/i.test(html)) return html;
  return `<div class="mb-wrap"><article class="mb">${html}</article></div>`;
}

let noMbWrapCount = 0;
let noMbTocCount = 0;

data.posts.forEach(p => {
  let html = p.content || '';
  html = restoreArticle(html);
  html = restoreToc(html);
  html = wrapLayout(html);
  html = ensureArticleShell(html);

  if (!html.includes('class="mb-wrap"')) noMbWrapCount++;
  if (!html.includes('class="mb-toc"') && !html.includes("class='mb-toc'")) {
    noMbTocCount++;
    console.log('No TOC for post:', p.slug);
  }
});

console.log('Results across', data.posts.length, 'posts:');
console.log(' - no mb-wrap count:', noMbWrapCount);
console.log(' - no mb-toc count:', noMbTocCount);
