/**
 * Configuration for the blog image recovery pipeline.
 *
 * Resolution order (later wins):
 *   defaults  ->  recovery.config.json (repo root)  ->  CLI flags
 */

import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(process.cwd());

export const DEFAULTS = {
  /** Domains the blog images were originally served from, highest trust first. */
  domains: ["mothrly.com", "blog.mothrly.com", "www.mothrly.com"],

  /** Source of truth for post content. */
  postsJson: "src/data/local-wp-posts.json",

  /** Where recovered originals land (relative to repo root). */
  outputDir: "public/blogs",

  /** Emitted mapping module consumed by the Next.js app. */
  manifestModule: "src/data/blog-image-manifest.json",

  /** Reports directory. */
  reportDir: "recovery-report",

  /**
   * Provider priority. Every enabled provider is queried for every asset so the
   * highest-resolution candidate wins; priority only breaks ties at equal pixels.
   */
  /**
   * Local folders / .zip archives holding pre-upload originals.
   * Searched first: these predate any server-side recompression, so they are
   * the highest-quality source available.
   */
  localSources: [],

  sources: [
    "localarchive",  // pre-upload originals on disk (folders + zips)
    "origin",        // live origin + host/scheme/size variants
    "photon",        // Jetpack CDN mirror (i0-i3.wp.com)
    "wayback",       // Internet Archive CDX + raw snapshot
    "memento",       // TimeTravel aggregator: 20+ public web archives
    "archivetoday",  // archive.ph / .is / .li / .vn / .md
    "commoncrawl",   // Common Crawl index -> WARC byte range
    "googleimages",  // Google Images thumbnail (gstatic)
    "bingimages",    // Bing Images thumbnail
    "yandeximages",  // Yandex Images thumbnail
  ],

  /**
   * Retired endpoints. Google removed the `cache:` operator and all "Cached"
   * links in September 2024; Bing retired its cache links in 2025. They are kept
   * here so the pipeline is explicit about them rather than silently skipping.
   * Set to true to attempt anyway.
   */
  enableRetiredCaches: false,

  /** How many recent Common Crawl indexes to search per asset. */
  commonCrawlIndexes: 4,

  /** Output image handling. */
  formats: ["webp"],            // extra derivatives; original bytes are always kept
  responsiveWidths: [640, 750, 828, 1080, 1200, 1920],
  quality: { webp: 82, avif: 55, jpeg: 85 },
  blurPlaceholder: true,
  blurWidth: 16,

  /** Filenames: "hybrid" keeps the SEO-bearing original name, disambiguated by slug. */
  naming: "hybrid",             // "hybrid" | "slug" | "original"

  /** Network behaviour. */
  concurrency: 4,
  retries: 4,
  timeoutMs: 45000,
  /** Per-host minimum gap in ms. archive.org 429s aggressively below ~1s. */
  hostDelayMs: { "web.archive.org": 1200, "archive.org": 1200, default: 250 },

  /** Reject obviously-broken or placeholder payloads. */
  minBytes: 512,
  minPixels: 100 * 100,

  /** Never write anything; just report what would happen. */
  dryRun: false,
  /** Re-fetch assets already present in the manifest. */
  force: false,
  /** Rewrite post content + featured images to local paths. */
  updateContent: true,
};

const NUMERIC = new Set(["concurrency", "retries", "timeoutMs", "minBytes", "minPixels", "blurWidth"]);
const BOOLEAN = new Set([
  "dryRun", "force", "updateContent", "blurPlaceholder", "enableRetiredCaches",
]);
const LIST = new Set(["domains", "sources", "formats", "responsiveWidths", "localSources"]);

function parseFlags(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;

    let [key, value] = arg.slice(2).split("=");
    // --no-update-content style negation
    let negated = false;
    if (key.startsWith("no-")) {
      negated = true;
      key = key.slice(3);
    }
    key = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    if (value === undefined) {
      const next = argv[i + 1];
      if (!negated && next && !next.startsWith("--") && !BOOLEAN.has(key)) {
        value = next;
        i++;
      } else {
        value = negated ? "false" : "true";
      }
    }

    if (BOOLEAN.has(key)) out[key] = value !== "false";
    else if (NUMERIC.has(key)) out[key] = Number(value);
    else if (LIST.has(key)) {
      out[key] = value.split(",").map((s) => s.trim()).filter(Boolean)
        .map((s) => (key === "responsiveWidths" ? Number(s) : s));
    } else out[key] = value;
  }
  return out;
}

export function loadConfig(argv = process.argv.slice(2)) {
  let fileConfig = {};
  const configPath = path.join(ROOT, "recovery.config.json");
  if (fs.existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (err) {
      throw new Error(`recovery.config.json is not valid JSON: ${err.message}`);
    }
  }

  const cfg = { ...DEFAULTS, ...fileConfig, ...parseFlags(argv) };

  cfg.quality = { ...DEFAULTS.quality, ...(fileConfig.quality || {}) };
  cfg.hostDelayMs = { ...DEFAULTS.hostDelayMs, ...(fileConfig.hostDelayMs || {}) };

  // Absolute paths so the script is runnable from any cwd.
  cfg.postsJsonPath = path.isAbsolute(cfg.postsJson) ? cfg.postsJson : path.join(ROOT, cfg.postsJson);
  cfg.outputDirPath = path.isAbsolute(cfg.outputDir) ? cfg.outputDir : path.join(ROOT, cfg.outputDir);
  cfg.reportDirPath = path.isAbsolute(cfg.reportDir) ? cfg.reportDir : path.join(ROOT, cfg.reportDir);
  cfg.manifestModulePath = path.isAbsolute(cfg.manifestModule)
    ? cfg.manifestModule
    : path.join(ROOT, cfg.manifestModule);

  /** Public URL prefix for the output dir, e.g. /blogs */
  cfg.publicPrefix =
    "/" + path.relative(path.join(ROOT, "public"), cfg.outputDirPath).split(path.sep).join("/");

  if (cfg.enableRetiredCaches) cfg.sources = [...cfg.sources, "googlecache", "bingcache"];

  return cfg;
}
