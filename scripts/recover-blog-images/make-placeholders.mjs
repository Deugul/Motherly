#!/usr/bin/env node
/**
 * Generates branded fallback artwork for blog posts whose original image has
 * not been recovered yet.
 *
 * These are deliberately abstract brand graphics, not "broken image" boxes:
 * a post with no recovered image should still look intentional. Variants are
 * assigned deterministically by slug so a blog grid does not repeat one tile.
 *
 *   node scripts/recover-blog-images/make-placeholders.mjs
 */

import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import { loadConfig } from "./config.mjs";

const W = 1812;
const H = 1074;

/** Motherly palette. */
const VARIANTS = [
  { base: "#FAF3F0", blob: "#F4447F", accent: "#BA0E56", edge: "#F0E6DF" },
  { base: "#FDF6F8", blob: "#BA0E56", accent: "#F4447F", edge: "#F3E3E9" },
  { base: "#F7F1EE", blob: "#E8739B", accent: "#BA0E56", edge: "#EFE2DB" },
  { base: "#FBF5F2", blob: "#BA0E56", accent: "#E8739B", edge: "#F1E7E1" },
];

function svg({ base, blob, accent, edge }, seed) {
  // Vary the composition slightly per variant so tiles do not read as identical.
  const cx = 0.30 + (seed % 3) * 0.2;
  const cy = 0.32 + ((seed + 1) % 3) * 0.14;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g1" cx="${cx}" cy="${cy}" r="0.75">
      <stop offset="0%"  stop-color="${blob}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${blob}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${blob}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="${1 - cx}" cy="${1 - cy * 0.7}" r="0.65">
      <stop offset="0%"  stop-color="${accent}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${edge}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${base}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${base}"/>
  <rect width="${W}" height="${H}" fill="url(#edge)"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>

  <!-- Nested arcs: an abstract embrace motif -->
  <g fill="none" stroke="${accent}" stroke-linecap="round" opacity="0.28">
    <path d="M ${W * 0.5 - 300} ${H * 0.72} a 300 300 0 0 1 600 0" stroke-width="3"/>
    <path d="M ${W * 0.5 - 220} ${H * 0.72} a 220 220 0 0 1 440 0" stroke-width="3" opacity="0.8"/>
    <path d="M ${W * 0.5 - 140} ${H * 0.72} a 140 140 0 0 1 280 0" stroke-width="3" opacity="0.6"/>
  </g>
  <circle cx="${W * 0.5}" cy="${H * 0.72}" r="16" fill="${accent}" opacity="0.32"/>

  <text x="${W * 0.5}" y="${H * 0.44}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="86"
        letter-spacing="10" fill="${accent}" opacity="0.5">Motherly</text>
</svg>`;
}

async function main() {
  const cfg = loadConfig(process.argv.slice(2));
  await fs.mkdir(cfg.outputDirPath, { recursive: true });

  const written = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const buf = Buffer.from(svg(VARIANTS[i], i));
    const stem = `placeholder-${i + 1}`;

    const png = await sharp(buf).png().toBuffer();
    await fs.writeFile(path.join(cfg.outputDirPath, `${stem}.png`), png);

    await sharp(png).webp({ quality: 88 }).toFile(path.join(cfg.outputDirPath, `${stem}.webp`));

    for (const width of cfg.responsiveWidths) {
      if (width >= W) continue;
      await sharp(png)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(cfg.outputDirPath, `${stem}-${width}w.webp`));
    }

    const tiny = await sharp(png).resize({ width: 16 }).webp({ quality: 45 }).toBuffer();
    written.push({
      src: `${cfg.publicPrefix}/${stem}.png`,
      width: W,
      height: H,
      blurDataURL: `data:image/webp;base64,${tiny.toString("base64")}`,
      responsive: cfg.responsiveWidths
        .filter((w) => w < W)
        .map((w) => ({ src: `${cfg.publicPrefix}/${stem}-${w}w.webp`, width: w })),
    });
  }

  const out = path.join(path.dirname(cfg.manifestModulePath), "blog-image-placeholders.json");
  await fs.writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), placeholders: written }, null, 2));

  console.log(`Wrote ${VARIANTS.length} branded placeholders to ${cfg.outputDir}`);
  console.log(`Manifest: ${path.relative(process.cwd(), out)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
