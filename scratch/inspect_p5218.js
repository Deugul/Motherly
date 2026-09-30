const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const p = posts.find(p => p.id === 5218);
console.log('Post 5218 slug:', p.slug);
console.log('Post 5218 content length:', p.content.length);

// Find all headings
const headings = p.content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi);
console.log('\nHeadings:');
console.log(headings);

// Find all CTAs
const ctas = p.content.match(/<div class="mb-cta[\s\S]*?<\/div>\s*<\/div>/gi) || p.content.match(/<div class="mb-cta[\s\S]*?<\/div>/gi);
console.log('\nCTAs:');
console.log(ctas);

// Find TOC
const toc = p.content.match(/<nav[\s\S]*?<\/nav>/gi);
console.log('\nTOC:');
console.log(toc ? toc[0].slice(0, 500) : 'No TOC');
