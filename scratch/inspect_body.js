const data = require('../src/data/local-wp-posts.json');
const post = data.posts.find(p => p.slug === 'benefits-of-prenatal-yoga');
const html = post.content;

console.log('HTML length:', html.length);
console.log('Starts with:', html.slice(0, 200));
console.log('Ends with:', html.slice(-300));
