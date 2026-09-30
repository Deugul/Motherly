const fs = require('fs');

// We will replicate the exact pipeline functions without importing TS directly
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));
const p = posts.find(p => p.id === 5211);

console.log('Post 5211 content length:', p.content.length);
console.log('Has mb-wrap:', p.content.includes('mb-wrap'));
console.log('Has mb-toc:', p.content.includes('mb-toc'));
console.log('Has mb-cta:', p.content.includes('mb-cta'));
console.log('Has mb-cta-split:', p.content.includes('mb-cta-split'));

// Check all h2 in p.content
const h2s = p.content.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi);
console.log('\nH2 tags in p.content (first 5):');
console.log(h2s ? h2s.slice(0, 5) : 'None');

// Check toc links
const tocAs = p.content.match(/<a\b[^>]*href="#[^"]*"[^>]*>[\s\S]*?<\/a>/gi);
console.log('\nTOC links (first 5):');
console.log(tocAs ? tocAs.slice(0, 5) : 'None');

// Check FAQ
const faq = p.content.match(/Frequently Asked Questions[\s\S]{0,300}/i);
console.log('\nFAQ section snippet:');
console.log(faq ? faq[0] : 'None');
