const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const post = posts.find(p => p.slug === 'is-it-safe-to-travel-by-two-wheeler-during-pregnancy');
const body = post.content.split('<body>')[1] || post.content;
const m = body.match(/Frequently Asked Questions[\s\S]{0,1000}/i);
console.log(m ? m[0] : 'None');
