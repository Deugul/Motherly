/** Canonical site origin (always www). */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://www.mothrly.com";

/** Normalize absolute mothrly.com URLs to the canonical www origin. */
export function ensureCanonicalOrigin(url: string): string {
  return url.replace(/^https:\/\/mothrly\.com(?=\/|$)/i, SITE_ORIGIN);
}
