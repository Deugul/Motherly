/**
 * Recovery reporting: machine-readable JSON, a CSV of failures for triage,
 * and a self-contained HTML report.
 */

import fs from "node:fs/promises";
import path from "node:path";

function csvCell(value) {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function summarise(results, cfg, providerStats) {
  const recovered = results.filter((r) => r.recovered);
  const failed = results.filter((r) => !r.recovered);

  const bySource = {};
  for (const r of recovered) bySource[r.provider] = (bySource[r.provider] || 0) + 1;

  // Same bytes recovered under more than one asset key.
  const byHash = new Map();
  for (const r of recovered) {
    if (!r.hash) continue;
    byHash.set(r.hash, [...(byHash.get(r.hash) || []), r.filename]);
  }
  const duplicates = [...byHash.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({ hash, files }));

  const thumbnailOnly = recovered.filter((r) => r.isThumbnailOnly);

  return {
    generatedAt: new Date().toISOString(),
    config: {
      domains: cfg.domains,
      sources: cfg.sources,
      outputDir: cfg.outputDir,
      naming: cfg.naming,
      dryRun: cfg.dryRun,
    },
    totals: {
      assets: results.length,
      recovered: recovered.length,
      failed: failed.length,
      recoveryRate: results.length ? +((recovered.length / results.length) * 100).toFixed(1) : 0,
      duplicates: duplicates.length,
      thumbnailOnly: thumbnailOnly.length,
      derivativeFiles: recovered.reduce((n, r) => n + (r.files?.length || 0), 0),
    },
    bySource,
    providerStats,
    duplicates,
    recovered: recovered.map((r) => ({
      filename: r.filename,
      localPath: `${cfg.publicPrefix}/${r.filename}`,
      originalUrl: r.asset.originalUrl,
      provider: r.provider,
      sourceUrl: r.sourceUrl,
      snapshot: r.snapshot || null,
      width: r.width,
      height: r.height,
      bytes: r.bytes,
      format: r.format,
      roles: r.asset.roles,
      alt: r.asset.alt,
      posts: [...new Set(r.asset.refs.map((x) => x.postSlug))],
      isThumbnailOnly: !!r.isThumbnailOnly,
    })),
    failed: failed.map((r) => ({
      originalUrl: r.asset.originalUrl,
      basename: r.asset.basename,
      roles: r.asset.roles,
      posts: [...new Set(r.asset.refs.map((x) => x.postSlug))],
      attempts: r.attempts,
      reasons: r.reasons,
    })),
  };
}

export async function writeReports(summary, cfg) {
  await fs.mkdir(cfg.reportDirPath, { recursive: true });

  const jsonPath = path.join(cfg.reportDirPath, "recovery-report.json");
  await fs.writeFile(jsonPath, JSON.stringify(summary, null, 2), "utf8");

  const csvPath = path.join(cfg.reportDirPath, "failed-images.csv");
  const csvRows = [
    ["original_url", "basename", "roles", "posts", "attempts", "reasons"].join(","),
    ...summary.failed.map((f) =>
      [f.originalUrl, f.basename, f.roles.join("|"), f.posts.join("|"), f.attempts, (f.reasons || []).join(" | ")]
        .map(csvCell).join(",")
    ),
  ];
  await fs.writeFile(csvPath, csvRows.join("\n"), "utf8");

  const htmlPath = path.join(cfg.reportDirPath, "recovery-report.html");
  await fs.writeFile(htmlPath, renderHtml(summary, cfg), "utf8");

  return { jsonPath, csvPath, htmlPath };
}

function renderHtml(s, cfg) {
  const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const sourceRows = Object.entries(s.bySource)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`)
    .join("");

  const recoveredRows = s.recovered.map((r) => `<tr>
      <td><img loading="lazy" src="..${esc(r.localPath)}" alt=""></td>
      <td><code>${esc(r.filename)}</code><br><small>${esc(r.originalUrl)}</small></td>
      <td>${esc(r.provider)}${r.snapshot ? `<br><small>${esc(r.snapshot)}</small>` : ""}</td>
      <td class="num">${r.width}×${r.height}</td>
      <td class="num">${(r.bytes / 1024).toFixed(0)} KB</td>
      <td>${esc(r.roles.join(", "))}</td>
    </tr>`).join("");

  const failedRows = s.failed.map((f) => `<tr>
      <td><code>${esc(f.basename)}</code><br><small>${esc(f.originalUrl)}</small></td>
      <td>${esc(f.roles.join(", "))}</td>
      <td><small>${esc(f.posts.slice(0, 3).join(", "))}${f.posts.length > 3 ? ` +${f.posts.length - 3}` : ""}</small></td>
      <td class="num">${f.attempts}</td>
    </tr>`).join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Blog Image Recovery Report</title>
<style>
  :root { color-scheme: light dark; --bg:#fff; --fg:#16181d; --muted:#6b7280; --line:#e5e7eb; --accent:#ba0e56; --ok:#0f7b47; --bad:#b42318; }
  @media (prefers-color-scheme: dark){ :root{ --bg:#0e1014; --fg:#e8eaed; --muted:#9aa1ac; --line:#252a33; } }
  body { margin:0; padding:32px 20px; font:15px/1.6 ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif; background:var(--bg); color:var(--fg); }
  .wrap { max-width:1100px; margin:0 auto; }
  h1 { font-size:1.6rem; margin:0 0 4px; } h2 { font-size:1.15rem; margin:36px 0 12px; }
  .meta { color:var(--muted); font-size:.875rem; margin-bottom:24px; }
  .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; }
  .card { border:1px solid var(--line); border-radius:10px; padding:14px 16px; }
  .card b { display:block; font-size:1.7rem; line-height:1.2; }
  .card span { color:var(--muted); font-size:.8rem; text-transform:uppercase; letter-spacing:.04em; }
  .ok b { color:var(--ok); } .bad b { color:var(--bad); }
  .scroll { overflow-x:auto; border:1px solid var(--line); border-radius:10px; }
  table { border-collapse:collapse; width:100%; font-size:.875rem; }
  th,td { text-align:left; padding:9px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { background:color-mix(in srgb, var(--fg) 5%, transparent); font-weight:600; position:sticky; top:0; }
  td.num { text-align:right; white-space:nowrap; font-variant-numeric:tabular-nums; }
  td img { width:64px; height:44px; object-fit:cover; border-radius:5px; background:var(--line); }
  code { font-size:.82em; } small { color:var(--muted); word-break:break-all; }
  .empty { padding:20px; color:var(--muted); border:1px dashed var(--line); border-radius:10px; }
</style></head><body><div class="wrap">
<h1>Blog Image Recovery Report</h1>
<div class="meta">Generated ${esc(s.generatedAt)} · domains: ${esc(cfg.domains.join(", "))} · sources: ${esc(cfg.sources.join(" → "))}${s.config.dryRun ? " · <strong>DRY RUN</strong>" : ""}</div>

<div class="cards">
  <div class="card"><b>${s.totals.assets}</b><span>Unique images</span></div>
  <div class="card ok"><b>${s.totals.recovered}</b><span>Recovered</span></div>
  <div class="card bad"><b>${s.totals.failed}</b><span>Unrecoverable</span></div>
  <div class="card"><b>${s.totals.recoveryRate}%</b><span>Recovery rate</span></div>
  <div class="card"><b>${s.totals.duplicates}</b><span>Duplicates</span></div>
  <div class="card"><b>${s.totals.derivativeFiles}</b><span>Files written</span></div>
</div>

<h2>Recovery source</h2>
${sourceRows ? `<div class="scroll"><table><thead><tr><th>Source</th><th class="num">Images</th></tr></thead><tbody>${sourceRows}</tbody></table></div>`
  : `<div class="empty">No images were recovered from any source.</div>`}

<h2>Recovered images (${s.totals.recovered})</h2>
${recoveredRows ? `<div class="scroll"><table><thead><tr><th>Preview</th><th>File</th><th>Source</th><th class="num">Size</th><th class="num">Bytes</th><th>Roles</th></tr></thead><tbody>${recoveredRows}</tbody></table></div>`
  : `<div class="empty">Nothing recovered.</div>`}

<h2>Unrecoverable images (${s.totals.failed})</h2>
${failedRows ? `<div class="scroll"><table><thead><tr><th>Image</th><th>Roles</th><th>Posts</th><th class="num">Attempts</th></tr></thead><tbody>${failedRows}</tbody></table></div>`
  : `<div class="empty">None — every image was recovered.</div>`}
</div></body></html>`;
}
