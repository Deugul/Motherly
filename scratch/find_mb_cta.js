const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));
const oldPosts = posts.filter(p => p && p.id && p.id < 5211);

for (const p of oldPosts) {
  if (p.content.includes('class="mb-cta"')) {
    console.log('Post with mb-cta:', p.slug);
    const m = p.content.match(/<div class="mb-cta[\s\S]*?<\/div>/);
    console.log(m ? m[0].slice(0, 300) : '');
    break;
  }
}
