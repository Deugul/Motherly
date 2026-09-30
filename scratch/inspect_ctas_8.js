const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const newPosts = posts.filter(p => p.id >= 5211);
for (const p of newPosts) {
  console.log(`=== Post ${p.id} (${p.slug}) ===`);
  const ctas = p.content.match(/<div class="mb-cta[\s\S]*?<\/div>/gi) || [];
  ctas.forEach(c => console.log(c, '\n---'));
}
