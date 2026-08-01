#!/usr/bin/env node
/**
 * Merges researched keywords into the authored keyword map.
 *
 * `extract-blog-keywords.mjs` covers the posts that appear in the .docx briefs;
 * the remainder were researched separately (see recovery-report/KW-RESULT-*.json)
 * and are folded in here. Brief-sourced keywords always win — researched entries
 * only fill genuine gaps.
 *
 *   node scripts/merge-researched-keywords.mjs
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORT = path.join(ROOT, "recovery-report");
const TARGET = path.join(ROOT, "src", "data", "blog-keywords.json");

const manifest = JSON.parse(fs.readFileSync(TARGET, "utf8"));
const bySlug = manifest.bySlug ?? {};
const before = Object.keys(bySlug).length;

const validSlugs = new Set(
  (() => {
    const raw = JSON.parse(
      fs.readFileSync(path.join(ROOT, "src", "data", "local-wp-posts.json"), "utf8")
    );
    return (Array.isArray(raw) ? raw : raw.posts || []).map((p) => p.slug);
  })()
);

let added = 0;
let skippedExisting = 0;
let skippedUnknown = 0;
const files = fs.readdirSync(REPORT).filter((f) => /^KW-RESULT-\d+\.json$/.test(f)).sort();

for (const file of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(REPORT, file), "utf8"));
  } catch (err) {
    console.error(`  ! ${file}: ${err.message}`);
    continue;
  }

  let fileAdded = 0;
  for (const [slug, keywords] of Object.entries(data)) {
    if (!Array.isArray(keywords) || !keywords.length) continue;

    // Never invent a slug that is not a real post.
    if (!validSlugs.has(slug)) {
      skippedUnknown++;
      continue;
    }
    if (bySlug[slug]?.length) {
      skippedExisting++;
      continue;
    }

    const cleaned = [
      ...new Set(
        keywords
          .map((k) => String(k).trim().toLowerCase())
          .filter((k) => k.length > 1 && k.length < 60)
      ),
    ].slice(0, 8);

    if (cleaned.length) {
      bySlug[slug] = cleaned;
      added++;
      fileAdded++;
    }
  }
  console.log(`  ${file.padEnd(22)} +${fileAdded}`);
}

manifest.bySlug = bySlug;
manifest.generatedAt = new Date().toISOString();
manifest.source = "authored .docx briefs + keyword research";
fs.writeFileSync(TARGET, JSON.stringify(manifest, null, 2));

const missing = [...validSlugs].filter((s) => !bySlug[s]?.length);

console.log(`\nfrom briefs        : ${before}`);
console.log(`added by research  : ${added}`);
console.log(`already covered    : ${skippedExisting}`);
console.log(`unknown slugs      : ${skippedUnknown}`);
console.log(`total covered      : ${Object.keys(bySlug).length} / ${validSlugs.size}`);
console.log(`still missing      : ${missing.length}`);
if (missing.length) console.log("  " + missing.slice(0, 10).join("\n  "));
