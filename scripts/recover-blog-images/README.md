# Blog Image Recovery

Recovers WordPress blog images from public archives after the origin server is
gone, stores them locally, optimises them for `next/image`, and rewrites the
blog content to point at the local copies.

```bash
npm run recover:blog-images              # full recovery
npm run recover:blog-images -- --dry-run # report only, write nothing
npm run recover:blog-images -- --help
```

---

## Recovery flow

```
src/data/local-wp-posts.json
        │
        ├─ extract every image reference
        │    <img src|data-src|data-lazy-src|data-original|srcset>
        │    <source srcset>, <a href=…/wp-content/uploads/…>
        │    og:image, twitter:image, JSON-LD image, CSS background-image,
        │    featuredImage field
        │
        ├─ collapse into unique assets
        │    strip WordPress -1024x768 size suffixes
        │    merge the same path seen on different hosts
        │    build candidate URL set (hosts × schemes × size variants)
        │
        ├─ query EVERY enabled source for EVERY asset
        │    localarchive → origin → photon → wayback → memento
        │    → archive.today → commoncrawl → google/bing/yandex thumbnails
        │
        ├─ validate + rank all candidates
        │    decode with sharp (rejects truncated/corrupt payloads)
        │    rank by true pixel count, then format, then source trust
        │    → the original always beats a thumbnail
        │
        ├─ write original bytes + derivatives
        │    public/blogs/<name>.<ext>          archival original
        │    public/blogs/<name>.webp           format derivative
        │    public/blogs/<name>-{640…1920}w.webp   responsive (never upscaled)
        │    blurDataURL                        base64 placeholder
        │
        ├─ rewrite content
        │    post HTML + featuredImage → local paths
        │    srcset rebuilt from the derivatives actually produced
        │    backup written next to the posts JSON first
        │
        └─ reports
             recovery-report/recovery-report.html   visual, with previews
             recovery-report/recovery-report.json   machine readable
             recovery-report/failed-images.csv      triage list
```

---

## Sources

| Source | What it is | Notes |
|---|---|---|
| `localarchive` | Pre-upload originals in local folders and `.zip` archives | **Highest quality available** — these predate WordPress recompression. Matches on a normalised filename, undoing WP's space→hyphen rewrite and its `-1` collision suffix |
| `origin` | The live server, all host/scheme/size permutations | Free win if any host still serves |
| `photon` | Jetpack image CDN (`i0-i3.wp.com`) | Often outlives the origin |
| `wayback` | Internet Archive CDX + `id_` raw snapshot | Uses the **latest successful** snapshot, falls back through the 5 most recent |
| `memento` | TimeTravel aggregator | Fans out to 20+ national/institutional web archives |
| `archivetoday` | `archive.ph/.is/.li/.vn/.md` | Mirrors rotate; each is tried |
| `commoncrawl` | CC index → WARC byte range → payload | Searches the 4 most recent crawls |
| `googleimages` / `bingimages` / `yandeximages` | Indexed search thumbnails | **Reduced resolution.** Ranked last and flagged in the report |

### Retired sources

`googlecache` and `bingcache` are **disabled by default and will not work**:

- Google removed the `cache:` operator and every "Cached" link in **September 2024**. `webcache.googleusercontent.com` no longer serves documents.
- Bing retired its public cache links during **2025**.

They remain in the registry, documented, and can be attempted with
`--enable-retired-caches` — but expect nothing.

---

## Configuration

CLI flags override `recovery.config.json` (repo root), which overrides defaults.

| Option | Default | Meaning |
|---|---|---|
| `localSources` | see `recovery.config.json` | Folders (walked to depth 6) and `.zip` archives searched for pre-upload originals |
| `maxZipBytes` | `250 MB` | Zips larger than this are skipped (read whole into memory) |
| `domains` | `mothrly.com, blog.mothrly.com, www.mothrly.com` | Candidate hosts |
| `postsJson` | `src/data/local-wp-posts.json` | Content source of truth |
| `outputDir` | `public/blogs` | Where originals land |
| `manifestModule` | `src/data/blog-image-manifest.json` | Emitted mapping |
| `reportDir` | `recovery-report` | Reports |
| `sources` | see table above | Order = tie-break trust, not early exit |
| `formats` | `["webp"]` | Extra derivatives |
| `responsiveWidths` | `640…1920` | Downscales only |
| `naming` | `hybrid` | `hybrid` \| `slug` \| `original` |
| `concurrency` | `4` | Parallel assets |
| `retries` | `4` | Per request |
| `timeoutMs` | `45000` | Per request |
| `hostDelayMs` | `1200` for archive.org | Per-host rate limit |
| `minBytes` / `minPixels` | `512` / `10000` | Reject placeholders |
| `commonCrawlIndexes` | `4` | Crawls to search |

Useful flags: `--dry-run`, `--force`, `--only=<substring>`, `--stop-on-first`,
`--no-update-content`.

---

## Naming and SEO

`naming: "hybrid"` (default) preserves the SEO value of descriptive filenames
while fixing useless ones:

- `Pregnant-Woman-Doing-Prenatal-Yoga.png` → kept as-is
- `161.png`, `IMG_2044.jpg`, `WhatsApp-Image-2026-05-04-….jpeg` → replaced with
  the post slug (`…-featured.png`)

Alt text is carried through from the original markup into the manifest, and the
manifest records `roles`, `posts`, and the exact recovery provenance
(provider, source URL, snapshot timestamp) for every image.

---

## Edge cases handled

Redirects (followed), 404/403 (next source), rate limits (per-host throttle plus
`Retry-After`-aware exponential backoff), timeouts (abort + retry), corrupt or
truncated payloads (full decode before acceptance), placeholder-sized images
(`minPixels`), duplicates (SHA-256 content hash, reported), multiple snapshots
(latest successful, with fallback), missing captures (never fatal), a dead
source (isolated — cannot abort the run), and resumability (already-recovered
images are skipped unless `--force`).

---

## Using the results in Next.js

```tsx
import Image from "next/image";
import { getBlogImageProps, localiseImageUrls } from "@/lib/blog-image-manifest";

const img = getBlogImageProps(post.featuredImage, title, { width: 1200, height: 500 });

{img && <Image {...img} priority sizes="(max-width: 1280px) 100vw, 1152px" />}
```

`getBlogImageProps` returns true intrinsic dimensions plus `placeholder="blur"`
when the image was recovered, and falls back to the original URL when it was
not — so pages keep rendering either way.

`localiseImageUrls(html)` rewrites any remaining archived URLs inside post HTML
at render time.
