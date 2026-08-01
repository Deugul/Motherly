#!/usr/bin/env node
/**
 * Applies visually-verified image → post matches.
 *
 * Cover images supplied by the team are named by an internal sequence
 * (`57.png`) that does not correspond to the WordPress upload filename the post
 * actually references (`ayurvedic-pregnancy-care.png`). Agents read the title
 * printed on each cover and matched it to a post; this stages each image under
 * the filename that post expects, so the normal recovery pass picks it up.
 *
 *   node scripts/recover-blog-images/apply-visual-matches.mjs [--min-confidence=medium]
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "recovery-report");
const STAGE_DIR = path.join(REPORT_DIR, "visual-matched");
const SOURCE_DIR = "C:/Users/Vijayakumar R/Downloads/motherly images";

const RANK = { high: 3, medium: 2, low: 1, none: 0 };
const minFlag = process.argv.find((a) => a.startsWith("--min-confidence="));
const MIN = RANK[minFlag ? minFlag.split("=")[1] : "medium"] ?? 2;

const batches = fs
  .readdirSync(REPORT_DIR)
  .filter((f) => /^MATCH-BATCH-\d+\.json$/.test(f))
  .sort();

if (!batches.length) {
  console.error("No MATCH-BATCH-*.json files found — agents have not reported yet.");
  process.exit(1);
}

const all = [];
for (const file of batches) {
  try {
    const rows = JSON.parse(fs.readFileSync(path.join(REPORT_DIR, file), "utf8"));
    if (Array.isArray(rows)) all.push(...rows.map((r) => ({ ...r, batch: file })));
  } catch (err) {
    console.error(`  ! ${file} is not valid JSON: ${err.message}`);
  }
}

const accepted = [];
const rejected = [];
const claimed = new Map(); // wpFile -> winning row, so no post gets two images

for (const row of all) {
  const conf = RANK[row.confidence] ?? 0;
  if (!row.matchedWpFile || conf < MIN) {
    rejected.push({ ...row, reason: row.matchedWpFile ? `confidence ${row.confidence}` : "no match" });
    continue;
  }
  const prev = claimed.get(row.matchedWpFile);
  if (prev) {
    // Two images claim the same post — keep the more confident one.
    const loser = (RANK[prev.confidence] ?? 0) >= conf ? row : prev;
    const winner = loser === row ? prev : row;
    claimed.set(row.matchedWpFile, winner);
    rejected.push({ ...loser, reason: `duplicate claim on ${row.matchedWpFile}` });
    continue;
  }
  claimed.set(row.matchedWpFile, row);
}

fs.rmSync(STAGE_DIR, { recursive: true, force: true });
fs.mkdirSync(STAGE_DIR, { recursive: true });

for (const [wpFile, row] of claimed) {
  const src = path.join(SOURCE_DIR, row.image);
  if (!fs.existsSync(src)) {
    rejected.push({ ...row, reason: "source image missing" });
    continue;
  }
  // Stage under the exact filename the post's URL references.
  fs.copyFileSync(src, path.join(STAGE_DIR, wpFile));
  accepted.push({ image: row.image, wpFile, slug: row.matchedSlug, confidence: row.confidence });
}

// Make sure the staging folder is searched first on the next recovery run.
const cfgPath = path.join(ROOT, "recovery.config.json");
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const stageRel = STAGE_DIR.split(path.sep).join("/");
if (!cfg.localSources.includes(stageRel)) {
  cfg.localSources.unshift(stageRel);
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
}

fs.writeFileSync(
  path.join(REPORT_DIR, "VISUAL-MATCH-SUMMARY.json"),
  JSON.stringify({ accepted, rejected, minConfidence: minFlag ?? "medium" }, null, 2)
);

console.log(`batches read : ${batches.length}`);
console.log(`rows         : ${all.length}`);
console.log(`staged       : ${accepted.length}`);
console.log(`rejected     : ${rejected.length}`);
for (const r of rejected) console.log(`  - ${r.image}: ${r.reason}`);
console.log(`\nStaged into ${path.relative(ROOT, STAGE_DIR)} — now run:`);
console.log(`  npm run recover:blog-images -- --sources=localarchive`);
