/** WordPress post shape fields used for body HTML resolution. */
export type WpPostContentSource = {
  content?: { rendered?: string };
  motherly_content_html?: string | null;
};

/**
 * Prefer REST `content.rendered`; fall back to Elementor HTML from Motherly plugin
 * when post_content is empty (common for unsaved Elementor drafts).
 */
export function getWordPressPostBodyHtml(post: WpPostContentSource): string {
  const rendered = post.content?.rendered?.trim() ?? "";
  if (rendered.length > 0) {
    return rendered;
  }
  return post.motherly_content_html?.trim() ?? "";
}
