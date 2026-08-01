#!/usr/bin/env node
/**
 * Extracts SEO keywords from the authored blog .docx briefs and writes a
 * slug -> keywords map for the Next.js app to consume.
 *
 * The briefs use three different labels for the same field, depending on which
 * batch they came from:
 *   Meta Keywords:  (parts 1 and 2)
 *   Focus Keywords: (articles 101-125)
 *   Primary KW:     (part 3)
 * and the URL slug is sometimes written with a leading slash.
 *
 *   node scripts/extract-blog-keywords.mjs "C:/path/to/docx/folder"
 */

import fs from "node:fs";
import path from "node:path";
import { listEntries, readEntry } from "./recover-blog-images/zip.mjs";

const KEYWORD_LABEL = /^(?:meta keywords?|focus keywords?|primary kw|keywords?)\s*:\s*(.+)$/i;
const SLUG_LABEL = /^url slug\s*:\s*(.+)$/i;
const TITLE_LABEL = /^meta title\s*:\s*(.+)$/i;

/** Pull visible paragraph text out of a .docx. */
function docxParagraphs(file) {
  const { buffer, entries } = listEntries(file);
  const doc = entries.find((e) => e.name === "word/document.xml");
  if (!doc) return [];

  const xml = readEntry(buffer, doc).toString("utf8");
  return [...xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)]
    .map((m) =>
      [...m[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)]
        .map((t) => t[1])
        .join("")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean);
}

function normaliseSlug(raw) {
  return raw
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^https?:\/\/[^/]+\//i, "")
    .replace(/^blogs?\//i, "")
    .toLowerCase();
}

function splitKeywords(raw) {
  return raw
    .split(/[,;|]/)
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter((s) => s.length > 1 && s.length < 60);
}

const folder = process.argv[2] || "C:/Users/Vijayakumar R/Downloads/motherly images";
const files = fs.readdirSync(folder).filter((f) => f.toLowerCase().endsWith(".docx"));

/** slug -> { keywords, title, source } */
const bySlug = new Map();
/** normalised meta title -> keywords, for posts whose slug differs. */
const byTitle = new Map();
/** normalised title -> { words, keywords }, for fuzzy matching. */
const byTitleWords = new Map();

for (const file of files) {
  let paras;
  try {
    paras = docxParagraphs(path.join(folder, file));
  } catch (err) {
    console.error(`  ! ${file}: ${err.message}`);
    continue;
  }

  // Walk the document keeping the most recent keywords/title seen, and attach
  // them when the matching URL slug shows up a few lines later.
  let pendingKeywords = null;
  let pendingTitle = null;
  let found = 0;

  for (const line of paras) {
    const kw = line.match(KEYWORD_LABEL);
    if (kw) {
      pendingKeywords = splitKeywords(kw[1]);
      continue;
    }

    const mt = line.match(TITLE_LABEL);
    if (mt) {
      pendingTitle = mt[1].replace(/\s*\|\s*Motherly\s*$/i, "").trim();
      continue;
    }

    const slugMatch = line.match(SLUG_LABEL);
    if (!slugMatch) continue;

    const slug = normaliseSlug(slugMatch[1]);
    if (slug && pendingKeywords?.length) {
      if (!bySlug.has(slug)) {
        bySlug.set(slug, { keywords: pendingKeywords, title: pendingTitle, source: file });
        found++;
      }
      if (pendingTitle) {
        const key = pendingTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (!byTitle.has(key)) byTitle.set(key, pendingKeywords);
        if (!byTitleWords.has(key)) {
          byTitleWords.set(key, {
            words: new Set(
              pendingTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, " ")
                .split(/\s+/)
                .filter((w) => w.length > 3)
            ),
            keywords: pendingKeywords,
          });
        }
      }
    }
    pendingKeywords = null;
    pendingTitle = null;
  }

  console.log(`  ${file.padEnd(56)} ${found} keyword sets`);
}

// ── Match against the live post list ────────────────────────────────────────
const postsPath = path.join(process.cwd(), "src", "data", "local-wp-posts.json");
const raw = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const posts = Array.isArray(raw) ? raw : raw.posts || [];

const out = {};
let matchedBySlug = 0;
let matchedByTitle = 0;
const unmatched = [];

for (const post of posts) {
  const slug = normaliseSlug(post.slug || "");
  const titleKey = String(post.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const hit = bySlug.get(slug);
  if (hit) {
    out[post.slug] = hit.keywords;
    matchedBySlug++;
    continue;
  }

  // Fall back to the meta title, since a number of slugs were renamed after the
  // briefs were written. Compared on word overlap rather than prefix so a
  // reworded title still matches its brief.
  const postWords = new Set(
    String(post.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );

  let best = null;
  let bestScore = 0;
  for (const [key, entry] of byTitleWords) {
    let shared = 0;
    for (const w of entry.words) if (postWords.has(w)) shared++;
    const score = shared / Math.max(1, Math.min(postWords.size, entry.words.size));
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
    if (key === titleKey) {
      best = entry;
      bestScore = 1;
      break;
    }
  }

  // Require a strong overlap — a loose match would attach the wrong keywords.
  if (best && bestScore >= 0.6) {
    out[post.slug] = best.keywords;
    matchedByTitle++;
    continue;
  }

  unmatched.push({ slug: post.slug, title: post.title });
}

const target = path.join(process.cwd(), "src", "data", "blog-keywords.json");
fs.writeFileSync(
  target,
  JSON.stringify(
    { generatedAt: new Date().toISOString(), source: "authored .docx briefs", bySlug: out },
    null,
    2
  )
);

fs.writeFileSync(
  path.join(process.cwd(), "recovery-report", "KEYWORDS-UNMATCHED.json"),
  JSON.stringify(unmatched, null, 2)
);

console.log(`\nkeyword sets in briefs : ${bySlug.size}`);
console.log(`matched by slug        : ${matchedBySlug}`);
console.log(`matched by title       : ${matchedByTitle}`);
console.log(`posts covered          : ${Object.keys(out).length} / ${posts.length}`);
console.log(`unmatched              : ${unmatched.length}`);
console.log(`\nwrote ${path.relative(process.cwd(), target)}`);
