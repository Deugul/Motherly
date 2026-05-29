/**
 * Removes WordPress/plugin FAQ structured data from post HTML so Next.js can emit
 * a single FAQPage JSON-LD block without "Duplicate field FAQPage" errors.
 * Visible FAQ accordion content is kept.
 */
export function stripWpFaqSchemaFromHtml(html: string): string {
  return html
    .replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?FAQPage[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(/\sitemtype=["']https?:\/\/schema\.org\/FAQPage["']/gi, "");
}
