# Install Motherly Dev REST Preview on WordPress

## If you see "Plugin file does not exist"

WordPress listed the plugin but the PHP file is missing on the server (bad upload). Fix:

### A) Clean up, then re-upload zip

1. **Plugins** → **Installed Plugins** → **Motherly Dev REST Preview** → **Delete** (check "delete files").
2. Hostinger **File Manager** → `public_html/wp-content/plugins/` → delete folder `motherly-dev-rest-preview` if it still exists.
3. **Plugins** → **Add New** → **Upload Plugin** → upload `motherly-dev-rest-preview.zip` again.
4. **Install Now** → **Activate**.
5. In File Manager, confirm this file exists:
   `wp-content/plugins/motherly-dev-rest-preview/motherly-dev-rest-preview.php`

### B) Easier fix — must-use plugin (no Activate button)

1. **Plugins** → delete broken **Motherly Dev REST Preview** if listed.
2. Hostinger **File Manager** → `public_html/wp-content/mu-plugins/` (create `mu-plugins` if missing).
3. Upload `motherly-dev-rest-preview-standalone.php` from this folder.
4. **Rename on server to:** `motherly-dev-rest-preview.php`
5. Done — no activation. Restart `npm run dev` and open `/blogs`.

## Plugin name

**Motherly Dev REST Preview**

## Secret key

Must match in both places:

- WordPress PHP: `define('MOTHERLY_PREVIEW_KEY', '...');`
- Next.js `Motherly/.env.local`: `WORDPRESS_PREVIEW_KEY=...`

Default: `motherly-dev-preview-change-this-to-a-long-random-string`

## Rank Math SEO in Next.js

After installing/updating the plugin, re-upload `motherly-dev-rest-preview-standalone.php` (or the zip plugin) so WordPress exposes `rank_math_seo` on `/wp-json/wp/v2/posts`. Next.js reads Rank Math title, description, and keywords automatically.

Until the plugin is updated, SEO for this post is also defined in `src/data/blog-seo.ts` as a fallback.

## Elementor post shows only image (no article text)

Elementor often keeps HTML in `_elementor_data` while `post_content` stays empty until you click **Update** in WordPress. The plugin field `motherly_content_html` sends that HTML to Next.js. Re-upload the latest `motherly-dev-rest-preview-standalone.php`, then click **Update** on the post in WP admin.
