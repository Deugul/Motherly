#!/usr/bin/env node
/**
 * Blog image recovery pipeline.
 *
 *   npm run recover:blog-images
 *   npm run recover:blog-images -- --dry-run
 *   npm run recover:blog-images -- --sources=wayback,memento --concurrency=2
 *   npm run recover:blog-images -- --only=slug-fragment
 *
 * Flow: inventory -> query every enabled source -> validate + rank by true
 * resolution -> write original + derivatives -> rewrite post content -> report.
 */

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { loadConfig } from "./config.mjs";
import { buildInventory } from "./inventory.mjs";
import { resolveProviders, REGISTRY } from "./providers.mjs";
import { inspect, rank, buildFilename, optimize } from "./image.mjs";
import { rewriteContent } from "./rewrite.mjs";
import { summarise, writeReports } from "./report.mjs";
import { mapLimit, unreachableHosts } from "./http.mjs";

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

function printHelp() {
  console.log(`
${C.bold("recover:blog-images")} — recover WordPress blog images from public archives

  --dry-run                 Report only; write nothing
  --force                   Re-fetch images already present in the manifest
  --only=<substring>        Limit to assets whose URL/slug contains substring
  --sources=a,b,c           Override source order
  --domains=a.com,b.com     Override candidate domains
  --output-dir=public/blogs Where recovered originals land
  --naming=hybrid|slug|original
  --concurrency=4           Parallel assets
  --retries=4               Per-request retry budget
  --timeout-ms=45000
  --formats=webp,avif       Derivative formats
  --no-update-content       Leave post JSON untouched (still writes manifest)
  --enable-retired-caches   Also attempt Google/Bing cache (see note below)
  --stop-on-first           Accept the first usable candidate instead of ranking all
  --help
`);
}

async function loadPreviousManifest(cfg) {
  if (cfg.force || !existsSync(cfg.manifestModulePath)) return new Map();
  try {
    const m = JSON.parse(await fs.readFile(cfg.manifestModulePath, "utf8"));
    return new Map(Object.entries(m.byOriginalUrl || {}));
  } catch {
    return new Map();
  }
}

async function recoverAsset(asset, cfg, providers, providerStats, stopOnFirst) {
  const candidates = [];
  const reasons = [];
  let attempts = 0;

  for (const provider of providers) {
    let found = [];
    try {
      found = await provider.fetchCandidates(asset, cfg);
    } catch (err) {
      reasons.push(`${provider.name}: ${err.message}`);
    }
    attempts += 1;

    const stats = (providerStats[provider.name] ||= { queried: 0, hits: 0, images: 0 });
    stats.queried++;

    if (!found.length) continue;
    stats.hits++;

    for (const c of found) {
      const inspected = await inspect(c, cfg);
      if (inspected.rejected) {
        reasons.push(`${provider.name}: ${inspected.rejected}`);
        continue;
      }
      inspected.isThumbnailOnly = !!provider.isThumbnailSource;
      candidates.push(inspected);
      stats.images++;
    }

    // A full-resolution hit from a non-thumbnail source ends the search early
    // only when explicitly requested; otherwise keep going so ranking is fair.
    if (stopOnFirst && candidates.some((c) => !c.isThumbnailOnly)) break;
  }

  const best = rank(candidates, cfg);
  if (!best) {
    return { asset, recovered: false, attempts, reasons: [...new Set(reasons)] };
  }

  return {
    asset,
    recovered: true,
    attempts,
    reasons: [...new Set(reasons)],
    ...best,
    // A win from a thumbnail source is flagged so the report can call it out.
    isThumbnailOnly: !!best.isThumbnailOnly,
    candidateCount: candidates.length,
  };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) return printHelp();

  const cfg = loadConfig(argv);
  const stopOnFirst = argv.includes("--stop-on-first");
  const onlyFlag = argv.find((a) => a.startsWith("--only"));
  const only = onlyFlag ? (onlyFlag.split("=")[1] || "").toLowerCase() : "";

  if (!existsSync(cfg.postsJsonPath)) {
    console.error(C.red(`Posts file not found: ${cfg.postsJsonPath}`));
    process.exit(1);
  }

  console.log(C.bold("\n  Blog image recovery\n"));
  console.log(`  posts     ${C.dim(cfg.postsJson)}`);
  console.log(`  output    ${C.dim(cfg.outputDir)}  ${C.dim(`(served at ${cfg.publicPrefix})`)}`);
  console.log(`  domains   ${C.dim(cfg.domains.join(", "))}`);

  const providers = resolveProviders(cfg);
  console.log(`  sources   ${C.dim(providers.map((p) => p.name).join(" → "))}`);

  const skipped = cfg.sources.filter((s) => REGISTRY[s]?.retired && !cfg.enableRetiredCaches);
  for (const s of skipped) {
    console.log(C.yellow(`  ! ${s} skipped — ${REGISTRY[s].retiredNote}`));
  }
  if (cfg.dryRun) console.log(C.yellow("  ! dry run — nothing will be written"));

  // ── Inventory ─────────────────────────────────────────────
  const inventory = buildInventory(cfg);
  let assets = inventory.assets;
  if (only) {
    assets = assets.filter(
      (a) => a.key.includes(only) || a.refs.some((r) => r.postSlug?.toLowerCase().includes(only))
    );
  }

  const previous = await loadPreviousManifest(cfg);
  const alreadyDone = assets.filter((a) => a.seenUrls.some((u) => previous.has(u)));
  if (!cfg.force && alreadyDone.length) {
    assets = assets.filter((a) => !a.seenUrls.some((u) => previous.has(u)));
  }

  const refCount = inventory.assets.reduce((n, a) => n + a.refs.length, 0);
  console.log(
    `\n  ${C.bold(String(inventory.posts.length))} posts · ` +
    `${C.bold(String(refCount))} image references · ` +
    `${C.bold(String(inventory.assets.length))} unique images` +
    (alreadyDone.length && !cfg.force ? ` · ${alreadyDone.length} already recovered (use --force to redo)` : "") +
    (only ? ` · filtered to ${assets.length}` : "")
  );

  if (!assets.length) {
    console.log(C.green("\n  Nothing to do.\n"));
    return;
  }

  // ── Recovery ──────────────────────────────────────────────
  console.log(C.dim(`\n  Querying ${providers.length} sources for ${assets.length} images…\n`));

  const providerStats = {};
  let done = 0;
  const started = Date.now();

  const results = await mapLimit(assets, cfg.concurrency, async (asset) => {
    const result = await recoverAsset(asset, cfg, providers, providerStats, stopOnFirst);
    done++;

    const pct = String(Math.round((done / assets.length) * 100)).padStart(3);
    const label = asset.basename.slice(0, 46).padEnd(46);
    if (result.recovered) {
      console.log(
        `  ${C.dim(`[${pct}%]`)} ${C.green("✔")} ${label} ` +
        `${C.cyan(result.provider)} ${C.dim(`${result.width}×${result.height}`)}` +
        (result.isThumbnailOnly ? C.yellow("  (thumbnail only)") : "")
      );
    } else {
      console.log(`  ${C.dim(`[${pct}%]`)} ${C.red("✘")} ${label} ${C.dim("no source had this image")}`);
    }
    return result;
  });

  // ── Write files ───────────────────────────────────────────
  const taken = new Set();
  for (const r of results) {
    if (!r.recovered) continue;
    r.filename = buildFilename(r.asset, r, cfg, taken);
    try {
      const written = await optimize(r.buffer, r.filename, cfg);
      Object.assign(r, written);
    } catch (err) {
      r.recovered = false;
      r.reasons = [...(r.reasons || []), `optimise failed: ${err.message}`];
    } finally {
      delete r.buffer; // release memory before reporting
    }
  }

  // ── Rewrite content + manifest ────────────────────────────
  let rewriteStats = { postsTouched: 0, totalReplacements: 0 };
  if (results.some((r) => r.recovered)) {
    rewriteStats = await rewriteContent(results, inventory, cfg);
  }

  // ── Report ────────────────────────────────────────────────
  const summary = summarise(results, cfg, providerStats);
  summary.rewrite = rewriteStats;
  summary.unreachableHosts = unreachableHosts();
  const paths = cfg.dryRun ? null : await writeReports(summary, cfg);

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(C.bold("\n  Summary"));
  console.log(`  recovered      ${C.green(String(summary.totals.recovered))} / ${summary.totals.assets}  (${summary.totals.recoveryRate}%)`);
  console.log(`  unrecoverable  ${summary.totals.failed ? C.red(String(summary.totals.failed)) : "0"}`);
  console.log(`  files written  ${summary.totals.derivativeFiles}`);
  console.log(`  content        ${rewriteStats.totalReplacements} URL replacements across ${rewriteStats.postsTouched} posts`);
  console.log(`  elapsed        ${elapsed}s`);

  console.log(C.bold("\n  Source results"));
  for (const [name, s] of Object.entries(providerStats)) {
    const hit = summary.bySource[name] || 0;
    console.log(
      `  ${name.padEnd(14)} ${String(s.queried).padStart(4)} queried  ` +
      `${String(s.images).padStart(3)} images  ${hit ? C.green(`${hit} won`) : C.dim("0 won")}`
    );
  }

  if (summary.unreachableHosts.length) {
    console.log(C.yellow(`\n  Unreachable from this network (circuit-broken):`));
    console.log(`  ${C.dim(summary.unreachableHosts.join(", "))}`);
    console.log(C.dim("  Re-run from a different network to give these sources a fair attempt."));
  }

  if (paths) {
    console.log(C.bold("\n  Reports"));
    console.log(`  ${C.dim(paths.htmlPath)}`);
    console.log(`  ${C.dim(paths.jsonPath)}`);
    console.log(`  ${C.dim(paths.csvPath)}`);
  }
  console.log();

  // Non-zero exit when nothing at all could be recovered, so CI can react.
  if (summary.totals.recovered === 0 && summary.totals.assets > 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(C.red(`\nRecovery failed: ${err.stack || err.message}\n`));
  process.exit(1);
});
