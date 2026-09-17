const fs = require('fs');
const data = require('../src/data/local-wp-posts.json');
const post = data.posts.find(p => p.slug === 'healthy-newborn-sleep-routine');
const html = post.content;

console.log('Original nav tag in HTML:');
const navIdx = html.indexOf('<nav');
console.log(html.slice(navIdx, navIdx + 200));

function restoreToc(html) {
  // Check if it already has class="mb-toc"
  if (/<nav\b[^>]*class="[^"]*mb-toc[^"]*"/i.test(html)) {
    return html;
  }
  // Otherwise ensure class="mb-toc" and id="mbToc"
  return html.replace(
    /<nav\b([^>]*)>/i,
    (match, attrs) => {
      let newAttrs = attrs;
      if (!/id="mbToc"/i.test(newAttrs)) {
        newAttrs += ' id="mbToc"';
      }
      if (!/class="/i.test(newAttrs)) {
        newAttrs += ' class="mb-toc"';
      } else {
        newAttrs = newAttrs.replace(/class="([^"]*)"/i, 'class="$1 mb-toc"');
      }
      return `<nav${newAttrs}>`;
    }
  );
}

const result = restoreToc(html);
console.log('\nRestored nav tag:');
const newNavIdx = result.indexOf('<nav');
console.log(result.slice(newNavIdx, newNavIdx + 200));
