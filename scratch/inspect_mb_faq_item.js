const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const post = posts.find(p => p.id < 5211 && p.content.includes('mb-faq-item'));
if (post) {
  console.log('Post slug:', post.slug);
  const m = post.content.match(/<div class="mb-faq"[\s\S]*?<\/div>\s*<\/div>/);
  console.log(m ? m[0] : 'None');
}
