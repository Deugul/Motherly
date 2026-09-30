const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const oldWithFaq = posts.filter(p => p.id < 5211 && (p.content.includes('<details') || p.content.includes('mb-faq')));
console.log('Found old posts with FAQ:', oldWithFaq.length);

for (let i = 0; i < 5; i++) {
  const p = oldWithFaq[i];
  console.log(`\n=== Post: ${p.slug} ===`);
  const m = p.content.match(/<div class="mb-faq"[\s\S]*?<\/div>/);
  if (m) {
    console.log(m[0].slice(0, 400));
  } else {
    const d = p.content.match(/<details[\s\S]*?<\/details>/);
    console.log(d ? d[0].slice(0, 300) : 'None');
  }
}
