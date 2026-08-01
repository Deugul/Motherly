/**
 * Image validation, ranking, naming and optimisation.
 *
 * Ranking contract:
 *   - highest true pixel count wins (never upscale, never prefer a thumbnail)
 *   - ties broken by format preference, then by provider trust order
 *   - corrupt / truncated / placeholder payloads are rejected before ranking
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

/** Format preference when two candidates have identical pixel counts. */
const FORMAT_RANK = { webp: 5, png: 4, avif: 3, tiff: 2, jpeg: 1, jpg: 1, gif: 0 };

/** Decode a candidate and attach real dimensions. Returns null if unusable. */
export async function inspect(candidate, cfg) {
  const buf = candidate.buffer;
  if (!buf || buf.length < cfg.minBytes) {
    return { ...candidate, rejected: `too small (${buf?.length ?? 0} bytes)` };
  }

  try {
    const meta = await sharp(buf, { failOn: "none" }).metadata();
    if (!meta.width || !meta.height) {
      return { ...candidate, rejected: "no decodable dimensions" };
    }

    const pixels = meta.width * meta.height;
    if (pixels < cfg.minPixels) {
      return { ...candidate, rejected: `below minimum resolution (${meta.width}x${meta.height})` };
    }

    // Force a full decode so truncated payloads surface here, not at build time.
    await sharp(buf, { failOn: "none" }).raw().toBuffer();

    return {
      ...candidate,
      width: meta.width,
      height: meta.height,
      pixels,
      format: meta.format,
      bytes: buf.length,
      hash: crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16),
    };
  } catch (err) {
    return { ...candidate, rejected: `corrupt image: ${err.message}` };
  }
}

/** Pick the best candidate. Assumes `inspect` has already run on each. */
export function rank(candidates, cfg) {
  const usable = candidates.filter((c) => !c.rejected && c.pixels);
  if (!usable.length) return null;

  const trust = new Map(cfg.sources.map((s, i) => [s, cfg.sources.length - i]));

  return usable.sort((a, b) => {
    if (b.pixels !== a.pixels) return b.pixels - a.pixels;
    const fr = (FORMAT_RANK[b.format] ?? 0) - (FORMAT_RANK[a.format] ?? 0);
    if (fr !== 0) return fr;
    const tr = (trust.get(b.provider) ?? 0) - (trust.get(a.provider) ?? 0);
    if (tr !== 0) return tr;
    return b.bytes - a.bytes;
  })[0];
}

export function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/**
 * SEO-aware filename.
 *   hybrid   — keep the descriptive original name; fall back to the post slug
 *              when the original is non-descriptive (e.g. "115.png", "IMG_1234").
 *   original — always the original basename, slugified.
 *   slug     — always derived from the post slug + role.
 */
export function buildFilename(asset, best, cfg, taken) {
  const ext = best.format === "jpeg" ? "jpg" : best.format;
  const rawBase = asset.basename.replace(/\.[a-z0-9]+$/i, "");
  const originalSlug = slugify(rawBase);
  const postSlug = slugify(asset.primarySlug || "blog-image");
  const isFeatured = asset.roles.includes("featured");

  // "115", "IMG_2044", "WhatsApp-Image-2026-05-04-at-6.47.52-PM" carry no SEO value.
  const nonDescriptive =
    /^\d+(-\d+)?$/.test(originalSlug) ||
    /^(img|dsc|photo|image|whatsapp|screenshot)[-_]?/i.test(originalSlug) ||
    originalSlug.length < 6;

  let stem;
  if (cfg.naming === "original") stem = originalSlug;
  else if (cfg.naming === "slug") stem = isFeatured ? `${postSlug}-featured` : postSlug;
  else stem = nonDescriptive ? (isFeatured ? `${postSlug}-featured` : postSlug) : originalSlug;

  if (!stem) stem = "blog-image";

  let name = `${stem}.${ext}`;
  let n = 2;
  while (taken.has(name)) name = `${stem}-${n++}.${ext}`;
  taken.add(name);
  return name;
}

/**
 * Write the original plus derivatives. Never upscales: responsive widths larger
 * than the source are skipped so we never fabricate detail that was lost.
 */
export async function optimize(buffer, filename, cfg) {
  const stem = filename.replace(/\.[a-z0-9]+$/i, "");
  const outDir = cfg.outputDirPath;
  await fs.mkdir(outDir, { recursive: true });

  const pipeline = sharp(buffer, { failOn: "none" }).rotate(); // honour EXIF orientation
  const meta = await pipeline.metadata();

  const written = [];

  // 1. Original bytes, untouched — the archival copy.
  const originalPath = path.join(outDir, filename);
  if (!cfg.dryRun) await fs.writeFile(originalPath, buffer);
  written.push({ kind: "original", file: filename, width: meta.width, height: meta.height });

  // 2. Format derivatives at native size.
  for (const format of cfg.formats) {
    if (format === meta.format) continue;
    const name = `${stem}.${format}`;
    if (!cfg.dryRun) {
      await sharp(buffer, { failOn: "none" })
        .rotate()
        .toFormat(format, { quality: cfg.quality[format] ?? 80 })
        .toFile(path.join(outDir, name));
    }
    written.push({ kind: "format", file: name, width: meta.width, height: meta.height, format });
  }

  // 3. Responsive downscales for next/image.
  const responsive = [];
  for (const width of cfg.responsiveWidths) {
    if (width >= meta.width) continue; // never upscale
    const format = cfg.formats[0] || "webp";
    const name = `${stem}-${width}w.${format}`;
    if (!cfg.dryRun) {
      await sharp(buffer, { failOn: "none" })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: cfg.quality[format] ?? 80 })
        .toFile(path.join(outDir, name));
    }
    responsive.push({ file: name, width });
    written.push({ kind: "responsive", file: name, width, format });
  }

  // 4. Blur placeholder for next/image placeholder="blur".
  let blurDataURL = null;
  if (cfg.blurPlaceholder) {
    const tiny = await sharp(buffer, { failOn: "none" })
      .rotate()
      .resize({ width: cfg.blurWidth })
      .webp({ quality: 45 })
      .toBuffer();
    blurDataURL = `data:image/webp;base64,${tiny.toString("base64")}`;
  }

  return {
    width: meta.width,
    height: meta.height,
    format: meta.format,
    bytes: buffer.length,
    files: written,
    responsive,
    blurDataURL,
  };
}
