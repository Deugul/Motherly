# Local WP Blog Fallback Implementation Plan

> **For agentic workers:** Extract posts from `src/backup/u101628071_nhwAU*.sql.gz`, write `src/data/local-wp-posts.json`, add `src/lib/local-wp-posts.ts`, wire blog pages to fall back when WordPress fails.

**Goal:** Same `/blogs/[slug]` URLs work offline from the Hostinger dump.

## Tasks

1. Script extract → `src/data/local-wp-posts.json` (published posts only).
2. `src/lib/local-wp-posts.ts` — list/get by slug in WpPost shape.
3. Update `blogs/page.tsx` + `blogs/[slug]/page.tsx` (+ related posts).
4. `.gitignore` `src/backup/`.
5. Verify slug count vs `blog-seo.ts` and spot-check one page.
