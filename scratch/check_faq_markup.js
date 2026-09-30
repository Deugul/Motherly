const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const post = posts.find(p => p.slug === 'is-it-safe-to-travel-by-two-wheeler-during-pregnancy');
const m = post.content.match(/<div class="mb-faq[\s\S]*?<\/div>\s*<\/div>/i);
if (m) {
  console.log(m[0].slice(0, 800));
} else {
  console.log('No match for mb-faq div');
  const m2 = post.content.match(/mb-faq-item[\s\S]{0,500}/);
  console.log(m2 ? m2[0] : 'None');
}
