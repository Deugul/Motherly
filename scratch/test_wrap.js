const data = require('../src/data/local-wp-posts.json');
const { restoreWpBlocks } = require('../src/lib/restore-wp-blocks');

const post = data.posts.find(p => p.slug === 'benefits-of-prenatal-yoga');
const restored = restoreWpBlocks(post.content);

console.log('Includes <div class="mb-wrap">: ', restored.includes('<div class="mb-wrap">'));
const wrapIdx = restored.indexOf('<div class="mb-wrap">');
const wrapEndIdx = restored.lastIndexOf('</div>');

console.log('Restored total length:', restored.length);
console.log('wrapIdx:', wrapIdx);
console.log('wrapEndIdx:', wrapEndIdx);
console.log('Trailing length outside mb-wrap:', restored.length - wrapEndIdx);
console.log('Trailing sample:', restored.slice(wrapEndIdx - 100));
