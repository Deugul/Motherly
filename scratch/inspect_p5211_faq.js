const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));
const p = posts.find(p => p.id === 5211);
console.log('Post 5211 FAQ:');
const m = p.content.match(/Frequently Asked Questions[\s\S]{0,800}/);
console.log(m ? m[0] : 'No FAQ match');
