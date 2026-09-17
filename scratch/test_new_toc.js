const fs = require('fs');
const data = require('../src/data/local-wp-posts.json');

function restoreToc(html) {
  return html.replace(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi, (fullMatch, attrs, content) => {
    let newAttrs = attrs;
    
    const isToc = /id="mbToc"/i.test(attrs) || /class="[^"]*mb-toc[^"]*"/i.test(attrs) || /Table of contents/i.test(attrs) || /#toc-/i.test(content);
    if (!isToc) return fullMatch;

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

let countWithMbToc = 0;
let failedSlugs = [];

data.posts.forEach(p => {
  const html = p.content || '';
  if (html.includes('<nav')) {
    const res = restoreToc(html);
    if (res.includes('class="mb-toc"') && res.includes('id="mbToc"')) {
      countWithMbToc++;
    } else {
      failedSlugs.push(p.slug);
    }
  }
});

console.log('Total posts with <nav:', data.posts.filter(p => (p.content||'').includes('<nav')).length);
console.log('Posts matching updated restoreToc:', countWithMbToc);
console.log('Failed slugs:', failedSlugs);
