const fs = require('fs');

const FILE_PATH = 'src/data/local-wp-posts.json';
const BACKUP_PATH = `src/data/local-wp-posts.json.backup-${Date.now()}.json`;

// 1. Read file
const raw = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
const posts = Array.isArray(raw) ? raw : (raw.posts || Object.values(raw));

// 2. Create backup
fs.writeFileSync(BACKUP_PATH, JSON.stringify(raw, null, 2), 'utf8');
console.log(`Backup created at: ${BACKUP_PATH}`);

function fixPostContent(post) {
  let content = post.content;
  const postTitle = typeof post.title === 'string' ? post.title : (post.title?.rendered || '');

  // 1. Remove any old <nav ... mbToc ...> or <nav ... mb-toc ...> so we generate a fresh, clean one
  content = content.replace(/<nav\b[^>]*(?:id="mbToc"|class="[^"]*mb-toc[^"]*")[^>]*>[\s\S]*?<\/nav>/gi, '');

  // 2. Convert <div class="mb-cta"> to <div class="mb-cta-split">
  content = content.replace(
    /<div\s+class="mb-cta"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, inner) => {
      // Extract heading (h2 or h3)
      const hMatch = inner.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
      const heading = hMatch ? hMatch[1].trim() : 'Consult Motherly Specialists';

      // Extract paragraph
      const pMatch = inner.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const pText = pMatch ? pMatch[1].trim() : '';

      // Extract anchor
      const aMatch = inner.match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i);
      let href = '/services';
      let btnText = 'Explore Services &rarr;';
      if (aMatch) {
        const hrefMatch = aMatch[1].match(/href="([^"]*)"/i);
        if (hrefMatch) {
          href = hrefMatch[1];
          if (href.startsWith('/')) {
            href = 'https://www.mothrly.com' + href;
          }
        }
        btnText = aMatch[2].replace(/&rarr;/g, '').trim() + ' &rarr;';
      }

      return (
        `<div class="mb-cta-split">\n` +
        `  <div class="mb-cta-split-content">\n` +
        `    <h3>${heading}</h3>\n` +
        `    ${pText ? `<p>${pText}</p>\n` : ''}` +
        `  </div>\n` +
        `  <div class="mb-cta-split-actions">\n` +
        `    <a href="${href}" class="mb-btn-split mb-btn-split-primary" target="_blank" rel="noopener noreferrer">\n` +
        `      ${btnText}\n` +
        `    </a>\n` +
        `  </div>\n` +
        `</div>`
      );
    }
  );

  // 3. Convert FAQ section to <div class="mb-faq"><details><summary>...</summary><p>...</p></details></div>
  const faqHeadingRegex = /<h2\b[^>]*>(\s*Frequently Asked Questions\s*)<\/h2>/i;
  const faqMatch = content.match(faqHeadingRegex);
  if (faqMatch) {
    const faqStartIndex = faqMatch.index;
    const beforeFaq = content.slice(0, faqStartIndex);
    const fromFaq = content.slice(faqStartIndex);

    const afterFaqH2Match = fromFaq.slice(faqMatch[0].length).match(/<h2\b|<div class="mb-author"|<\/article>/i);
    const faqEndOffset = afterFaqH2Match
      ? faqMatch[0].length + afterFaqH2Match.index
      : fromFaq.length;

    const faqContent = fromFaq.slice(faqMatch[0].length, faqEndOffset);
    const remainder = fromFaq.slice(faqEndOffset);

    const faqItems = [];
    const qRegex = /<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    let qMatch;
    while ((qMatch = qRegex.exec(faqContent)) !== null) {
      const qText = qMatch[1].replace(/<[^>]*>/g, '').trim();
      const aText = qMatch[2].trim();
      faqItems.push({ q: qText, a: aText });
    }

    if (faqItems.length > 0) {
      const faqHtml =
        `<h2>Frequently Asked Questions</h2>\n` +
        `<div class="mb-faq">\n` +
        faqItems
          .map(
            item =>
              `  <details>\n` +
              `    <summary>${item.q}</summary>\n` +
              `    <p>${item.a}</p>\n` +
              `  </details>`
          )
          .join('\n') +
        `\n</div>\n`;

      content = beforeFaq + faqHtml + remainder;
    }
  }

  // 4. Ensure an anchor for toc-0 exists at the top of article
  content = content.replace(/<span\s+id="toc-0"[^>]*><\/span>/gi, '');
  content = content.replace(/<h1\b[^>]*id="toc-0"[^>]*>[\s\S]*?<\/h1>/gi, '');

  if (/<article\b[^>]*>/i.test(content)) {
    content = content.replace(/<article\b([^>]*)>/i, `<article$1>\n  <h1 id="toc-0">${postTitle}</h1>`);
  } else {
    content = `<h1 id="toc-0">${postTitle}</h1>\n` + content;
  }

  const tocItems = [{ id: 'toc-0', title: 'Overview' }];
  let tocIndex = 1;

  // Replace each <h2> that is a real content section
  content = content.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, innerText) => {
    const plain = innerText.replace(/<[^>]*>/g, '').trim();
    if (/Related Reads/i.test(plain)) {
      return `<h2 id="toc-${tocIndex++}">${innerText}</h2>`;
    }

    const currentId = `toc-${tocIndex++}`;
    const cleanAttrs = attrs.replace(/\bid="[^"]*"/gi, '').trim();
    
    let tocTitle = plain;
    if (/Frequently Asked Questions/i.test(plain)) {
      tocTitle = 'Frequently Asked Questions';
    }

    tocItems.push({ id: currentId, title: tocTitle });
    return `<h2 id="${currentId}"${cleanAttrs ? ' ' + cleanAttrs : ''}>${innerText}</h2>`;
  });

  // 5. Build clean TOC
  const tocList = tocItems
    .map(item => `      <li><a href="#${item.id}">${item.title}</a></li>`)
    .join('\n');

  const tocNavHtml =
    `\n    <nav id="mbToc" class="mb-toc" aria-label="Table of contents">\n` +
    `    <div class="mb-toc-title">In This Article</div>\n` +
    `    <ul>\n` +
    `${tocList}\n` +
    `    </ul>\n` +
    `  </nav>\n`;

  // 6. Ensure layout wrapper structure
  if (content.includes('</article>')) {
    content = content.replace('</article>', '</article>' + tocNavHtml);
  } else {
    content = content + tocNavHtml;
  }

  return content;
}

// Apply fix to all posts with id >= 5211
let updatedCount = 0;
for (const p of posts) {
  if (p.id >= 5211) {
    p.content = fixPostContent(p);
    updatedCount++;
    console.log(`Updated post ID ${p.id} (${p.slug})`);
  }
}

console.log(`Total posts updated: ${updatedCount}`);

// Save back to local-wp-posts.json
const updatedData = Array.isArray(raw) ? posts : { ...raw, posts };
fs.writeFileSync(FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
console.log('Successfully saved to local-wp-posts.json!');
