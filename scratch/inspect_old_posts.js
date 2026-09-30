const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

console.log('Total posts:', posts.length);
const oldPost = posts.find(p => p.id && p.id < 5211);
console.log('Sample old post:', oldPost ? oldPost.slug : 'None');

if (oldPost) {
  // Let's check TOC in oldPost
  const tocMatches = oldPost.content.match(/<nav[^>]*>[\s\S]*?<\/nav>/i) || oldPost.content.match(/<div class="mb-toc"[\s\S]*?<\/div>/i);
  console.log('TOC sample in old post:');
  console.log(tocMatches ? tocMatches[0].slice(0, 500) : 'No TOC found');

  // Let's check FAQ in old post
  const faqMatches = oldPost.content.match(/<div class="mb-faq"[\s\S]*?<\/div>\s*<\/div>/i) || oldPost.content.match(/mb-faq[\s\S]{0,600}/i);
  console.log('FAQ sample in old post:');
  console.log(faqMatches ? faqMatches[0].slice(0, 600) : 'No FAQ found');

  // Let's check CTA in old post
  const ctaMatches = oldPost.content.match(/<div class="mb-cta"[\s\S]*?<\/div>/i) || oldPost.content.match(/mb-cta[\s\S]{0,600}/i);
  console.log('CTA sample in old post:');
  console.log(ctaMatches ? ctaMatches[0].slice(0, 600) : 'No CTA found');

  // Check how headings look in old post
  const headings = oldPost.content.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi);
  console.log('Sample headings with IDs:');
  console.log(headings ? headings.slice(0, 5) : 'No h2s found');
}
