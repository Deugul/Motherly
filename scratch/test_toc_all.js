const fs = require('fs');
const data = require('../src/data/local-wp-posts.json');

function restoreTocOriginal(html) {
  return html.replace(
    /<nav\b((?![^>]*\bclass=)[^>]*id="mbToc"[^>]*)>\s*([^<]*?)\s*(?:<\/[a-z]+>\s*)*(?=<ul\b)/i,
    (_full, attrs, title) =>
      `<nav${attrs} class="mb-toc">` +
      (title.trim() ? `<div class="mb-toc-title">${title.trim()}</div>` : "")
  );
}

let countBefore = 0;
let countAfter = 0;
let missingPosts = [];

data.posts.forEach(p => {
  const html = p.content || '';
  const hasNav = html.includes('id="mbToc"') || html.includes('id=\'mbToc\'') || html.includes('<nav');
  if (hasNav) {
    if (html.includes('class="mb-toc"')) countBefore++;
    const res = restoreTocOriginal(html);
    if (res.includes('class="mb-toc"')) {
      countAfter++;
    } else {
      missingPosts.push(p.slug);
    }
  }
});

console.log('Total posts with TOC/nav:', data.posts.filter(p => (p.content||'').includes('<nav')).length);
console.log('Posts with class mb-toc BEFORE:', countBefore);
console.log('Posts with class mb-toc AFTER:', countAfter);
console.log('Sample missing posts:', missingPosts.slice(0, 10));
