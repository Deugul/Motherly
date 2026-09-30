const fs = require('fs');
const path = require('path');
const data = require('../src/data/local-wp-posts.json');

const post = data.posts.find(p => p.slug === 'crucial-prenatal-and-postpartum-milestones-every-expectant-mother-should-know');

console.log('--- POST CONTENT (sample): ---');
console.log(post.content.slice(0, 1500));

// Find all CTA occurrences
console.log('\n--- ALL CTA BLOCKS IN POST ---');
const ctaRegex = /<div\b[^>]*class="[^"]*mb-cta[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
let m;
while ((m = ctaRegex.exec(post.content)) !== null) {
  console.log('CTA BLOCK:\n', m[0]);
}

// Find all headings
console.log('\n--- HEADINGS WITH IDS ---');
const hRegex = /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi;
while ((m = hRegex.exec(post.content)) !== null) {
  console.log(`${m[1]} ${m[2]} -> ${m[3]}`);
}

// Find TOC items
console.log('\n--- TOC ITEMS ---');
const tocRegex = /<nav\b[^>]*class="[^"]*mb-toc[^"]*"[\s\S]*?<\/nav>/gi;
const toc = post.content.match(tocRegex);
if (toc) {
  console.log(toc[0]);
}
