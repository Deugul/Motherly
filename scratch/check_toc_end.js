const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const oldPosts = posts.filter(p => p.id < 5211);
for (let i = 0; i < 3; i++) {
  const p = oldPosts[i];
  console.log(`\n=== TOC for ${p.slug} ===`);
  const m = p.content.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
  if (m) {
    const lis = m[0].match(/<li[\s\S]*?<\/li>/gi);
    console.log(lis ? lis.slice(-4) : 'No lis');
  }
}
