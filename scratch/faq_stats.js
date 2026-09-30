const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

let detailsCount = 0;
let itemQCount = 0;
let rawCount = 0;

for (const p of posts) {
  if (p.id >= 5211) continue;
  if (p.content.includes('<details')) detailsCount++;
  else if (p.content.includes('mb-faq-q') || p.content.includes('mb-faq-item')) itemQCount++;
  else if (p.content.includes('Frequently Asked Questions') || p.content.includes('mb-faq')) rawCount++;
}

console.log('Old posts stats:');
console.log('Using <details>: ', detailsCount);
console.log('Using mb-faq-q / mb-faq-item: ', itemQCount);
console.log('Other/raw: ', rawCount);
