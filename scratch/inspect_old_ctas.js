const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const oldPosts = posts.filter(p => p && p.id && p.id < 5211);
for (let i = 0; i < 3 && i < oldPosts.length; i++) {
  const p = oldPosts[i];
  console.log(`=== POST ${p.id}: ${p.slug} ===`);
  const ctas = p.content.match(/<div class="mb-cta[\s\S]*?<\/div>\s*<\/div>/gi) || p.content.match(/<div class="mb-cta[\s\S]*?<\/div>/gi);
  if (ctas) {
    ctas.forEach((c, idx) => console.log(`CTA #${idx}:\n`, c.slice(0, 500), '\n---'));
  } else {
    console.log('No CTA found');
  }
}
