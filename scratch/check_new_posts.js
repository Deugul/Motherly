const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const newPosts = posts.filter(p => p.id >= 5211);
console.log('Found new posts:', newPosts.length);
newPosts.forEach(p => {
  const title = typeof p.title === 'string' ? p.title : (p.title?.rendered || 'No Title');
  console.log(`ID: ${p.id} | Slug: ${p.slug} | Title: ${title.slice(0, 50)}...`);
});
