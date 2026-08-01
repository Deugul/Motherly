/**
 * Recovery source providers.
 *
 * Every provider exposes:  async fetchCandidates(asset, cfg, log) -> Candidate[]
 *   Candidate = { buffer, sourceUrl, provider, snapshot?, note? }
 *
 * Providers never throw — an unreachable source yields an empty array so one
 * dead archive can never abort the run.
 *
 * NOTE ON RETIRED SOURCES
 *   Google removed the `cache:` search operator and every "Cached" link from
 *   search results in September 2024; the webcache.googleusercontent.com
 *   endpoint no longer serves cached documents. Bing removed its cache links
 *   during 2025. Those providers are therefore disabled by default and are
 *   documented rather than silently attempted. Enable with --enable-retired-caches.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fetchWithRetry, fetchText, fetchJson } from "./http.mjs";
import { listEntries, readEntry } from "./zip.mjs";

const IMAGE_MIME = /^image\//i;

function looksLikeImage(res) {
  if (!res.ok || !res.buffer || res.buffer.length < 64) return false;
  if (res.contentType && IMAGE_MIME.test(res.contentType)) return true;
  // Sniff magic bytes — archives sometimes serve images as octet-stream.
  const b = res.buffer;
  return (
    (b[0] === 0xff && b[1] === 0xd8) ||                                     // jpeg
    (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) ||   // png
    (b.slice(0, 4).toString("ascii") === "RIFF" && b.slice(8, 12).toString("ascii") === "WEBP") ||
    b.slice(0, 3).toString("ascii") === "GIF" ||
    b.slice(4, 12).toString("ascii").includes("ftyp")                       // avif/heic
  );
}

async function tryDirect(urls, cfg, provider, extra = {}) {
  const found = [];
  for (const url of urls) {
    const res = await fetchWithRetry(url, cfg, { accept: "image/*,*/*;q=0.8" });
    if (looksLikeImage(res)) {
      found.push({ buffer: res.buffer, sourceUrl: res.finalUrl || url, provider, ...extra });
    }
  }
  return found;
}

/* ────────────────────────────────────────────────────────────
   0. LOCAL ARCHIVE — pre-upload originals still on disk
   Highest quality possible: these are the files that were uploaded to
   WordPress, before any server-side recompression. Scans configured folders
   (recursively) and .zip archives, matching on a normalised filename.
   ──────────────────────────────────────────────────────────── */

const IMAGE_FILE = /\.(jpe?g|png|webp|gif|avif|bmp|tiff?)$/i;

/**
 * Normalise a filename for matching.
 * WordPress rewrites uploads: spaces become hyphens, and a numeric suffix is
 * appended on collision ("NICU.png" -> "NICU-1.png"). Both are undone here.
 */
function normaliseName(name, { stripDedupe = false } = {}) {
  let s = path.basename(name).replace(/\.[a-z0-9]+$/i, "");
  s = s.replace(/-\d{2,5}x\d{2,5}$/i, "");        // WP size variant
  if (stripDedupe) s = s.replace(/-\d{1,2}$/, ""); // WP collision suffix
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

let localIndex = null;

/** Build a one-time index of every image in the configured local sources. */
function buildLocalIndex(cfg, log) {
  if (localIndex) return localIndex;

  const exact = new Map();
  const loose = new Map();
  let files = 0;
  let archives = 0;

  const add = (map, key, entry) => {
    if (!key) return;
    if (!map.has(key)) map.set(key, entry);
  };

  const addFile = (name, read) => {
    files++;
    const entry = { name, read };
    add(exact, normaliseName(name), entry);
    add(loose, normaliseName(name, { stripDedupe: true }), entry);
  };

  const walkDir = (dir, depth = 0) => {
    if (depth > 6) return;
    let items = [];
    try {
      items = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const item of items) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) walkDir(full, depth + 1);
      else if (IMAGE_FILE.test(item.name)) addFile(item.name, () => fs.readFileSync(full));
      else if (/\.zip$/i.test(item.name)) indexZip(full);
    }
  };

  const maxZip = cfg.maxZipBytes ?? 250 * 1024 * 1024;
  const indexZip = (zipPath) => {
    try {
      // A zip is read whole into memory; skip archives too large to be image sets.
      if (fs.statSync(zipPath).size > maxZip) return;
      const { buffer, entries } = listEntries(zipPath);
      archives++;
      for (const e of entries) {
        if (!IMAGE_FILE.test(e.name)) continue;
        addFile(e.name, () => readEntry(buffer, e));
      }
    } catch (err) {
      log?.(`  ! could not read ${path.basename(zipPath)}: ${err.message}`);
    }
  };

  for (const source of cfg.localSources || []) {
    try {
      const stat = fs.statSync(source);
      if (stat.isDirectory()) walkDir(source);
      else if (/\.zip$/i.test(source)) indexZip(source);
      else if (IMAGE_FILE.test(source)) addFile(path.basename(source), () => fs.readFileSync(source));
    } catch {
      log?.(`  ! local source not found: ${source}`);
    }
  }

  localIndex = { exact, loose, files, archives };
  return localIndex;
}

export function localIndexStats(cfg, log) {
  return buildLocalIndex(cfg, log);
}

export const localarchive = {
  name: "localarchive",
  async fetchCandidates(asset, cfg) {
    const index = buildLocalIndex(cfg);
    if (!index.files) return [];

    // Exact normalised match first, then the collision-suffix-stripped form.
    const keyExact = normaliseName(asset.basename);
    const keyLoose = normaliseName(asset.basename, { stripDedupe: true });

    const hit =
      index.exact.get(keyExact) ||
      index.exact.get(keyLoose) ||
      index.loose.get(keyExact) ||
      index.loose.get(keyLoose);

    if (!hit) return [];

    try {
      return [{ buffer: hit.read(), sourceUrl: `local:${hit.name}`, provider: "localarchive" }];
    } catch {
      return [];
    }
  },
};

/* ────────────────────────────────────────────────────────────
   1. ORIGIN — the live server, every host / scheme / size variant
   ──────────────────────────────────────────────────────────── */
export const origin = {
  name: "origin",
  async fetchCandidates(asset, cfg) {
    const urls = [...asset.candidates, ...asset.candidates.map((u) => u.replace(/^https:/, "http:"))];
    return tryDirect([...new Set(urls)], cfg, "origin");
  },
};

/* ────────────────────────────────────────────────────────────
   2. PHOTON — Jetpack's image CDN keeps copies keyed by origin path
   ──────────────────────────────────────────────────────────── */
export const photon = {
  name: "photon",
  async fetchCandidates(asset, cfg) {
    // Photon keys on host+path, so host variants matter but size variants do not.
    const originals = asset.candidates.filter((u) => !/-\d+x\d+\.[a-z]+$/i.test(u)).slice(0, 3);
    const urls = [];
    for (const mirror of ["i0.wp.com", "i1.wp.com", "i2.wp.com", "i3.wp.com"]) {
      for (const candidate of originals) {
        urls.push(`https://${mirror}/${candidate.replace(/^https?:\/\//, "")}`);
      }
    }
    return tryDirect([...new Set(urls)], cfg, "photon");
  },
};

/* ────────────────────────────────────────────────────────────
   3. WAYBACK MACHINE — CDX index, then raw (id_) snapshot bytes
   ──────────────────────────────────────────────────────────── */
export const wayback = {
  name: "wayback",
  async fetchCandidates(asset, cfg, log) {
    const found = [];
    const seen = new Set();

    for (const candidate of dedupeByPath(asset.candidates)) {
      const cdx =
        "https://web.archive.org/cdx/search/cdx?" +
        new URLSearchParams({
          url: candidate.replace(/^https?:\/\//, ""),
          output: "json",
          limit: "40",
          filter: "statuscode:200",
          collapse: "digest",
        });

      const rows = await fetchJson(cdx, cfg);
      if (!Array.isArray(rows) || rows.length < 2) continue;

      // rows[0] is the header; newest snapshots last -> try latest first.
      const snaps = rows.slice(1)
        .map((r) => ({ timestamp: r[1], original: r[2], length: Number(r[6]) || 0 }))
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

      for (const snap of snaps.slice(0, 5)) {
        // `id_` returns the untouched original bytes with no archive toolbar.
        const raw = `https://web.archive.org/web/${snap.timestamp}id_/${snap.original}`;
        if (seen.has(raw)) continue;
        seen.add(raw);

        const res = await fetchWithRetry(raw, cfg, { accept: "image/*,*/*;q=0.8" });
        if (looksLikeImage(res)) {
          found.push({
            buffer: res.buffer,
            sourceUrl: raw,
            provider: "wayback",
            snapshot: snap.timestamp,
          });
          break; // latest good snapshot for this URL is enough
        }
      }
    }

    if (!found.length) log?.debug?.(`wayback: no captures for ${asset.basename}`);
    return found;
  },
};

/* ────────────────────────────────────────────────────────────
   4. MEMENTO / TIMETRAVEL — aggregates 20+ public web archives
      (Bibliotheca Alexandrina, Icelandic, Stanford, Archive-It,
       UK Web Archive, Portuguese Web Archive, Bayerische, …)
   ──────────────────────────────────────────────────────────── */
export const memento = {
  name: "memento",
  async fetchCandidates(asset, cfg) {
    const found = [];

    for (const candidate of dedupeByPath(asset.candidates).slice(0, 3)) {
      const timemap = `http://timetravel.mementoweb.org/timemap/link/${candidate}`;
      const text = await fetchText(timemap, cfg, { retries: 1 });
      if (!text) continue;

      // Link-format TimeMap: <uri>; rel="memento"; datetime="..."
      const mementos = [...text.matchAll(/<([^>]+)>\s*;\s*rel="[^"]*memento[^"]*"[^,]*datetime="([^"]+)"/g)]
        .map((m) => ({ uri: m[1], datetime: new Date(m[2]).getTime() || 0 }))
        .filter((m) => !m.uri.includes("web.archive.org")) // already covered
        .sort((a, b) => b.datetime - a.datetime);

      for (const m of mementos.slice(0, 4)) {
        const res = await fetchWithRetry(m.uri, cfg, { accept: "image/*,*/*;q=0.8", retries: 1 });
        if (looksLikeImage(res)) {
          found.push({
            buffer: res.buffer,
            sourceUrl: m.uri,
            provider: "memento",
            snapshot: new Date(m.datetime).toISOString(),
          });
          break;
        }
      }
    }
    return found;
  },
};

/* ────────────────────────────────────────────────────────────
   5. ARCHIVE.TODAY — mirrors rotate; try each domain
   ──────────────────────────────────────────────────────────── */
export const archivetoday = {
  name: "archivetoday",
  async fetchCandidates(asset, cfg) {
    const mirrors = ["archive.ph", "archive.is", "archive.li", "archive.vn", "archive.md"];
    const found = [];

    for (const candidate of dedupeByPath(asset.candidates).slice(0, 2)) {
      for (const mirror of mirrors) {
        const text = await fetchText(`https://${mirror}/timemap/${candidate}`, cfg, { retries: 1 });
        if (!text) continue;

        const uris = [...text.matchAll(/<(https?:\/\/[^>]+)>\s*;\s*rel="[^"]*memento/g)].map((m) => m[1]);
        for (const uri of uris.slice(-3).reverse()) {
          const res = await fetchWithRetry(uri, cfg, { accept: "image/*,*/*;q=0.8", retries: 1 });
          if (looksLikeImage(res)) {
            found.push({ buffer: res.buffer, sourceUrl: uri, provider: "archivetoday" });
            return found;
          }
        }
        break; // mirror answered; no need to try the rest
      }
    }
    return found;
  },
};

/* ────────────────────────────────────────────────────────────
   6. COMMON CRAWL — index API -> WARC byte range -> payload
   ──────────────────────────────────────────────────────────── */
let ccIndexCache = null;

async function commonCrawlIndexes(cfg) {
  if (ccIndexCache) return ccIndexCache;
  const list = await fetchJson("https://index.commoncrawl.org/collinfo.json", cfg, { retries: 1 });
  const depth = cfg.commonCrawlIndexes ?? 4;
  ccIndexCache = Array.isArray(list) ? list.slice(0, depth).map((c) => c.id) : [];
  return ccIndexCache;
}

export const commoncrawl = {
  name: "commoncrawl",
  async fetchCandidates(asset, cfg) {
    const indexes = await commonCrawlIndexes(cfg);
    if (!indexes.length) return [];

    for (const candidate of dedupeByPath(asset.candidates).slice(0, 2)) {
      const target = candidate.replace(/^https?:\/\//, "");

      for (const index of indexes) {
        const url = `https://index.commoncrawl.org/${index}-index?` +
          new URLSearchParams({ url: target, output: "json", limit: "5" });

        const text = await fetchText(url, cfg, { retries: 1 });
        if (!text.trim() || text.includes("No Captures")) continue;

        for (const line of text.trim().split("\n")) {
          let rec;
          try {
            rec = JSON.parse(line);
          } catch {
            continue;
          }
          if (rec.status !== "200" || !rec.filename) continue;

          const start = Number(rec.offset);
          const end = start + Number(rec.length) - 1;
          const res = await fetchWithRetry(
            `https://data.commoncrawl.org/${rec.filename}`,
            cfg,
            { range: `${start}-${end}`, accept: "*/*", retries: 1 }
          );
          if (!res.ok || !res.buffer) continue;

          const payload = extractWarcPayload(res.buffer);
          if (payload && looksLikeImage({ ok: true, buffer: payload, contentType: "" })) {
            return [{
              buffer: payload,
              sourceUrl: `commoncrawl:${index}:${rec.filename}`,
              provider: "commoncrawl",
              snapshot: rec.timestamp,
            }];
          }
        }
      }
    }
    return [];
  },
};

/** A CC index range is a gzip member holding one WARC record. */
function extractWarcPayload(gz) {
  let raw;
  try {
    raw = zlib.gunzipSync(gz);
  } catch {
    try {
      raw = zlib.inflateSync(gz);
    } catch {
      return null;
    }
  }
  // Skip the WARC header block, then the HTTP header block.
  const marker = Buffer.from("\r\n\r\n");
  const first = raw.indexOf(marker);
  if (first < 0) return null;
  const second = raw.indexOf(marker, first + 4);
  if (second < 0) return null;
  return raw.subarray(second + 4);
}

/* ────────────────────────────────────────────────────────────
   7-9. IMAGE SEARCH THUMBNAILS
   Search engines keep serving indexed thumbnails after an origin dies.
   These are lower resolution by definition, so they rank last and are
   only kept when nothing better was recovered.
   ──────────────────────────────────────────────────────────── */
function makeImageSearchProvider(name, buildSearchUrl, extractThumbs) {
  return {
    name,
    isThumbnailSource: true,
    async fetchCandidates(asset, cfg) {
      const query = asset.basename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
      if (!query) return [];

      const html = await fetchText(buildSearchUrl(query, asset, cfg), cfg, { retries: 1 });
      if (!html) return [];

      const thumbs = extractThumbs(html).slice(0, 3);
      const found = [];
      for (const t of thumbs) {
        const res = await fetchWithRetry(t, cfg, { accept: "image/*", retries: 1 });
        if (looksLikeImage(res)) {
          found.push({
            buffer: res.buffer,
            sourceUrl: t,
            provider: name,
            note: "search-engine thumbnail (reduced resolution)",
          });
        }
      }
      return found;
    },
  };
}

export const googleimages = makeImageSearchProvider(
  "googleimages",
  (q, asset, cfg) =>
    `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`site:${cfg.domains[0]} ${q}`)}`,
  (html) => [...html.matchAll(/https:\/\/encrypted-tbn\d\.gstatic\.com\/images\?[^"'\\ ]+/g)].map((m) => m[0])
);

export const bingimages = makeImageSearchProvider(
  "bingimages",
  (q) => `https://www.bing.com/images/search?q=${encodeURIComponent(q)}`,
  (html) => [...html.matchAll(/https:\/\/tse\d\.mm\.bing\.net\/th\?[^"'&]+(?:&amp;[^"']+)?/g)]
    .map((m) => m[0].replace(/&amp;/g, "&"))
);

export const yandeximages = makeImageSearchProvider(
  "yandeximages",
  (q) => `https://yandex.com/images/search?text=${encodeURIComponent(q)}`,
  (html) => [...html.matchAll(/https:\/\/avatars\.mds\.yandex\.net\/get-images[^"'\\ ]+/g)].map((m) => m[0])
);

/* ────────────────────────────────────────────────────────────
   RETIRED — documented, disabled by default
   ──────────────────────────────────────────────────────────── */
export const googlecache = {
  name: "googlecache",
  retired: true,
  retiredNote:
    "Google removed the cache: operator and all Cached links in September 2024; " +
    "webcache.googleusercontent.com no longer serves documents.",
  async fetchCandidates(asset, cfg) {
    const found = [];
    for (const candidate of dedupeByPath(asset.candidates).slice(0, 2)) {
      const url = `https://webcache.googleusercontent.com/search?q=cache:${encodeURIComponent(candidate)}`;
      const res = await fetchWithRetry(url, cfg, { retries: 0, accept: "image/*,text/html" });
      if (looksLikeImage(res)) {
        found.push({ buffer: res.buffer, sourceUrl: url, provider: "googlecache" });
      }
    }
    return found;
  },
};

export const bingcache = {
  name: "bingcache",
  retired: true,
  retiredNote: "Bing retired its public cache links during 2025.",
  async fetchCandidates(asset, cfg) {
    const found = [];
    for (const candidate of dedupeByPath(asset.candidates).slice(0, 2)) {
      const url = `https://cc.bingj.com/cache.aspx?q=${encodeURIComponent(candidate)}&d=&w=`;
      const res = await fetchWithRetry(url, cfg, { retries: 0, accept: "image/*,text/html" });
      if (looksLikeImage(res)) {
        found.push({ buffer: res.buffer, sourceUrl: url, provider: "bingcache" });
      }
    }
    return found;
  },
};

/** Collapse candidates that differ only by host, keeping one per distinct path. */
function dedupeByPath(urls) {
  const byPath = new Map();
  for (const u of urls) {
    try {
      const key = new URL(u).pathname;
      if (!byPath.has(key)) byPath.set(key, u);
    } catch { /* ignore */ }
  }
  return [...byPath.values()];
}

export const REGISTRY = {
  localarchive, origin, photon, wayback, memento, archivetoday, commoncrawl,
  googleimages, bingimages, yandeximages, googlecache, bingcache,
};

export function resolveProviders(cfg) {
  return cfg.sources
    .map((name) => REGISTRY[name])
    .filter((p) => {
      if (!p) return false;
      if (p.retired && !cfg.enableRetiredCaches) return false;
      return true;
    });
}
