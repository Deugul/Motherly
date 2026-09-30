const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('src/data/local-wp-posts.json', 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

const newPosts = posts.filter(p => p.id >= 5211);
for (const p of newPosts) {
  console.log('='.repeat(50));
  console.log(`ID: ${p.id} | Slug: ${p.slug}`);
  console.log('Title:', typeof p.title === 'string' ? p.title : p.title?.rendered);
  
  // Find all h2s
  const h2s = p.content.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  console.log(`Found ${h2s.length} h2s:`);
  h2s.forEach((h, i) => console.log(`  ${i}: ${h.replace(/<[^>]*>/g, '').trim()}`));

  // Check CTAs
  const ctas = p.content.match(/<div class="mb-cta[\s\S]*?<\/div>/gi) || [];
  console.log(`Found ${ctas.length} mb-cta`);

  // Check FAQs
  const hasFaqH2 = /Frequently Asked Questions/i.test(p.content);
  const faqH3s = p.content.match(/<h3>\d+\.[\s\S]*?<\/h3>/gi) || [];
  console.log(`Has FAQ h2: ${hasFaqH2} | Found ${faqH3s.length} faq questions`);
}
