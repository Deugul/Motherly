# Local WordPress blog fallback

**Date:** 2026-07-31  
**Status:** Approved (chat)

## Goal

Serve Motherly blog posts at the same `/blogs` and `/blogs/[slug]` URLs when the live WordPress API is unreachable, using the Hostinger SQL backup `u101628071_nhwAU`.

## Approach

1. One-time extract of published posts from the dump into committed JSON (`src/data/local-wp-posts.json`).
2. Shared loader that maps local records into the existing `WpPost`-shaped objects.
3. Blog list + detail pages: try WordPress first; if fail/empty, use local data.
4. Keep `blog-seo.ts` for meta; keep image URLs from the dump (Hostinger CDN).
5. Ignore raw `.sql.gz` backups in git (`src/backup/`).

## Success

- `/blogs` lists posts with the same slugs as before.
- `/blogs/<slug>` renders article HTML for all `blog-seo` slugs present in the dump.
