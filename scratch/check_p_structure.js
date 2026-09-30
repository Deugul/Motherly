const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));
const p = posts.find(p => p.slug === 'benefits-of-prenatal-yoga');

console.log('Structure of benefits-of-prenatal-yoga:');
console.log('Starts with:');
console.log(p.content.slice(0, 400));
console.log('Ends with:');
console.log(p.content.slice(-600));
