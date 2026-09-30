const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const post = posts.find(p => p.slug === 'is-it-safe-to-travel-by-two-wheeler-during-pregnancy');
const idx = post.content.indexOf('mb-faq');
console.log(post.content.slice(idx - 50, idx + 800));
