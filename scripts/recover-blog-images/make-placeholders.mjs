#!/usr/bin/env node
/**
 * Generates per-post cover artwork for blog posts whose original image was not
 * recovered.
 *
 * These deliberately follow the same layout as the real Motherly blog covers —
 * image panel on the left, cream text card on the right carrying the post
 * headline, logo top-right, site URL along the bottom — so an unrecovered post
 * sits beside a recovered one without looking broken or generic. The only thing
 * missing is the photograph, whose place is taken by a branded gradient panel.
 *
 *   node scripts/recover-blog-images/make-placeholders.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { loadConfig } from "./config.mjs";

const W = 1812;
const H = 1074;

/** Palette lifted from src/app/globals.css. */
const PINK = "#ba0e56";
const PINK_SOFT = "#f4447f";
const CARD = "#EFE9E4";
const INK = "#1a1a1a";

/** Segoe UI is the closest geometric sans installed; Plus Jakarta Sans is web-only. */
const FONT = "Segoe UI, Selawik, Tahoma, DejaVu Sans, sans-serif";

/**
 * Background tints, varied per post so a grid of covers is not monotonous.
 * All stay inside the brand blush/rose family — the real covers never stray
 * into unrelated hues, so neither do these.
 */
const TINTS = [
  { a: "#F7E8EE", b: "#EADFE3", panel: ["#F9DCE6", "#E7B4C8"] },
  { a: "#F6EAE6", b: "#E9DCD7", panel: ["#F9DFD5", "#E5B9A9"] },
  { a: "#F4E6EA", b: "#E4D6DB", panel: ["#F6D4DE", "#DDA9BE"] },
  { a: "#F8ECEC", b: "#EBDCDC", panel: ["#FADEDE", "#E8B6B6"] },
  { a: "#F5E7F0", b: "#E6D8E2", panel: ["#F7D8EA", "#DDACC8"] },
];

/** The real brand mark, trimmed and inlined so covers need no network access. */
let LOGO_DATA_URI = null;
async function logoDataUri() {
  if (LOGO_DATA_URI) return LOGO_DATA_URI;
  const src = path.join(process.cwd(), "public", "MOTHERLY - PINK.png");
  const png = await sharp(src).trim({ threshold: 10 }).png().toBuffer();
  LOGO_DATA_URI = `data:image/png;base64,${png.toString("base64")}`;
  return LOGO_DATA_URI;
}

/** White version of the mark, for use over the tinted panel. */
let LOGO_WHITE_URI = null;
async function logoWhiteDataUri() {
  if (LOGO_WHITE_URI) return LOGO_WHITE_URI;
  const src = path.join(process.cwd(), "public", "MOTHERLY - PINK.png");
  const trimmed = await sharp(src).trim({ threshold: 10 }).png().toBuffer();
  // Keep the alpha shape, replace every colour channel with white.
  const { width, height } = await sharp(trimmed).metadata();
  const alpha = await sharp(trimmed).extractChannel("alpha").toBuffer();
  const white = await sharp({
    create: { width, height, channels: 3, background: "#ffffff" },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
  LOGO_WHITE_URI = `data:image/png;base64,${white.toString("base64")}`;
  return LOGO_WHITE_URI;
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c])
  );

/**
 * Approximate rendered width. Segoe UI averages ~0.52em per character at
 * regular weight and ~0.56em bold; capitals and digits run wider, so the
 * per-character weights below keep the estimate on the safe side.
 */
function measure(text, size, bold) {
  const base = bold ? 0.56 : 0.52;
  let units = 0;
  for (const ch of String(text)) {
    if (/[iIljt.,;:'!|]/.test(ch)) units += 0.34;
    else if (/[mMwW@]/.test(ch)) units += 0.88;
    else if (/[A-Z0-9]/.test(ch)) units += 0.66;
    else if (ch === " ") units += 0.28;
    else units += base;
  }
  return units * size;
}

/** Greedy word wrap against a real pixel width. */
function wrap(text, size, bold, maxWidth, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate, size, bold) > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  const consumed = lines.join(" ");
  if (consumed.length < text.replace(/\s+/g, " ").trim().length) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/[,;:.\s]+$/, "") + "…";
  }
  return lines;
}

/** Shrink the type until the headline fits the card in `maxLines` or fewer. */
function fitHeadline(text, maxWidth, maxLines, sizes) {
  for (const size of sizes) {
    const lines = wrap(text, size, true, maxWidth, maxLines);
    if (!lines.some((l) => l.endsWith("…")) && lines.length <= maxLines) {
      return { size, lines };
    }
  }
  const size = sizes[sizes.length - 1];
  return { size, lines: wrap(text, size, true, maxWidth, maxLines) };
}

/**
 * Split a post title into the bold hook and the explanatory line beneath it,
 * mirroring how the real covers are written.
 */
function splitTitle(title) {
  const clean = String(title).replace(/\s+/g, " ").trim();
  const at = clean.search(/[:.?—–]\s/);
  if (at > 12 && at < 90) {
    return {
      headline: clean.slice(0, at + 1).replace(/[:.\s]+$/, ""),
      subtitle: clean.slice(at + 2).trim(),
    };
  }
  const words = clean.split(" ");
  if (words.length > 8) {
    return { headline: words.slice(0, 6).join(" "), subtitle: words.slice(6).join(" ") };
  }
  return { headline: clean, subtitle: "" };
}

function svg(title, seed, logoPink, logoWhite) {
  const t = TINTS[seed % TINTS.length];
  const { headline, subtitle } = splitTitle(title);

  // Card geometry, proportioned like the real covers.
  const cardX = 880;
  const cardW = W - cardX - 72;
  const padX = 62;
  const textW = cardW - padX * 2;

  const { size: headSize, lines: headLines } = fitHeadline(headline, textW, 3, [72, 66, 60, 54, 48, 44]);
  const headLead = Math.round(headSize * 1.18);

  const subSize = 32;
  const subLead = Math.round(subSize * 1.42);
  const subLines = subtitle ? wrap(subtitle, subSize, false, textW, 3) : [];

  // Height the card to its content rather than fixing it, so short titles do
  // not leave a large empty slab under the text.
  const blockH =
    headLines.length * headLead + (subLines.length ? 34 + subLines.length * subLead : 0);
  const cardH = Math.max(430, blockH + 96 + 96);
  const cardY = Math.round((H - cardH) / 2);

  const headTop = cardY + 96 + Math.round(headSize * 0.78);
  const subTop = headTop + (headLines.length - 1) * headLead + 34 + subSize;

  const headTspans = headLines
    .map((l, i) => `<tspan x="${cardX + padX}" dy="${i === 0 ? 0 : headLead}">${esc(l)}</tspan>`)
    .join("");
  const subTspans = subLines
    .map((l, i) => `<tspan x="${cardX + padX}" dy="${i === 0 ? 0 : subLead}">${esc(l)}</tspan>`)
    .join("");

  // Left panel stands in for the photograph.
  const px = 72, py = 56, pw = 736, ph = H - 112;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.a}"/><stop offset="100%" stop-color="${t.b}"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stop-color="${t.panel[0]}"/><stop offset="100%" stop-color="${t.panel[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.3" cy="0.25" r="0.8">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000000" flood-opacity="0.10"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Photo panel stand-in -->
  <g filter="url(#soft)">
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" fill="url(#panel)"/>
  </g>
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="10" fill="url(#glow)"/>

  <!-- Brand mark as a large watermark where the photograph would sit -->
  <image href="${logoWhite}" x="${px + pw / 2 - 210}" y="${py + ph / 2 - 260}"
         width="420" height="520" opacity="0.42" preserveAspectRatio="xMidYMid meet"/>

  <!-- Brand mark, top right -->
  <image href="${logoPink}" x="${W - 236}" y="62" width="150" height="186"
         opacity="0.95" preserveAspectRatio="xMidYMid meet"/>

  <!-- Text card -->
  <g filter="url(#soft)">
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="4" fill="${CARD}"/>
  </g>

  <text font-family="${FONT}" font-size="${headSize}" font-weight="700" fill="${PINK}"
        x="${cardX + 64}" y="${headTop}">${headTspans}</text>

  ${subLines.length ? `<text font-family="${FONT}" font-size="34" font-weight="400" fill="${INK}"
        x="${cardX + 64}" y="${subTop}" opacity="0.86">${subTspans}</text>` : ""}

  <!-- Footer rule -->
  <g transform="translate(${cardX + 64}, ${cardY + cardH - 62})">
    <path d="M 0 -6 l 9 9 l -9 9 l -9 -9 z" fill="${INK}" opacity="0.75"/>
    <line x1="22" y1="3" x2="${cardW - 330}" y2="3" stroke="${INK}" stroke-width="2" opacity="0.5"/>
    <text x="${cardW - 128}" y="13" text-anchor="middle" font-family="${FONT}" font-size="26"
          fill="${INK}" opacity="0.8">www.mothrly.com</text>
  </g>
</svg>`;
}

/** Deterministic index so a post always renders the same tint. */
function seedOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export async function renderCover(title, seed) {
  const [logoPink, logoWhite] = await Promise.all([logoDataUri(), logoWhiteDataUri()]);
  return sharp(Buffer.from(svg(title, seed, logoPink, logoWhite))).png({ quality: 92 }).toBuffer();
}

async function main() {
  const cfg = loadConfig(process.argv.slice(2));
  const postsRaw = JSON.parse(await fs.readFile(cfg.postsJsonPath, "utf8"));
  const posts = Array.isArray(postsRaw) ? postsRaw : postsRaw.posts || [];

  await fs.mkdir(cfg.outputDirPath, { recursive: true });

  // Clear previously generated covers so removed posts do not leave orphans.
  for (const f of await fs.readdir(cfg.outputDirPath)) {
    if (/^placeholder/.test(f)) await fs.unlink(path.join(cfg.outputDirPath, f));
  }

  const manifest = {};
  let made = 0;

  for (const post of posts) {
    // Only posts whose image is still missing need a generated cover.
    if (!String(post.featuredImage || "").includes("wp-content")) continue;

    const name = `placeholder-${post.slug}.png`;
    const png = await renderCover(post.title, seedOf(post.slug));
    await fs.writeFile(path.join(cfg.outputDirPath, name), png);

    const tiny = await sharp(png).resize({ width: 16 }).webp({ quality: 45 }).toBuffer();
    manifest[post.slug] = {
      src: `${cfg.publicPrefix}/${name}`,
      width: W,
      height: H,
      blurDataURL: `data:image/webp;base64,${tiny.toString("base64")}`,
    };
    made++;
  }

  const out = path.join(path.dirname(cfg.manifestModulePath), "blog-image-placeholders.json");
  await fs.writeFile(
    out,
    JSON.stringify({ generatedAt: new Date().toISOString(), bySlug: manifest }, null, 2)
  );

  console.log(`Generated ${made} per-post covers in ${cfg.outputDir}`);
  console.log(`Manifest: ${path.relative(process.cwd(), out)}`);
}

const invokedDirectly =
  process.argv[1] && import.meta.url.endsWith(process.argv[1].split(path.sep).join("/"));

if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
