const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const p1 = posts.find(p => p.slug === 'benefits-of-prenatal-yoga');
console.log('p1 wrap tags:');
console.log('Starts with:');
console.log(p1.content.slice(p1.content.indexOf('<body'), p1.content.indexOf('<body') + 200));
console.log('Contains mb-wrap:', p1.content.includes('mb-wrap'));
console.log('Nav position relative to article:');
const navIdx = p1.content.indexOf('<nav id="mbToc"');
const artCloseIdx = p1.content.indexOf('</article>');
console.log('navIdx:', navIdx, 'artCloseIdx:', artCloseIdx);
console.log(p1.content.slice(artCloseIdx - 30, artCloseIdx + 300));
