const fs = require('fs');

// Test how restoreWpBlocks transforms benefits-of-prenatal-yoga
const { restoreWpBlocks } = require('../src/lib/restore-wp-blocks');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));
const p = posts.find(p => p.slug === 'benefits-of-prenatal-yoga');

const output = restoreWpBlocks(p.content);
console.log('Output has mb-wrap:', output.includes('class="mb-wrap"'));
console.log('Output has mb-toc:', output.includes('class="mb-toc"'));
console.log('Output has h2 with id toc-1:', /<h2[^>]*id="toc-1"[^>]*>/i.test(output));
console.log('Sample output around TOC nav:');
const navMatch = output.match(/<nav[\s\S]*?<\/nav>/);
console.log(navMatch ? navMatch[0].slice(0, 300) : 'No nav found');
