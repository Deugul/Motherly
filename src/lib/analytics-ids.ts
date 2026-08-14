/**
 * Shared analytics identifiers.
 *
 * Kept in a plain module (no "use client") so both the server-rendered root
 * layout and the client-side DeferredAnalytics component can read the literal
 * value. Exporting these from a "use client" module turns them into client
 * references on the server, which silently breaks server-rendered markup such
 * as the GTM <noscript> iframe.
 */
export const GTM_ID = "GTM-NWKJVWXJ";
export const GA4_MEASUREMENT_ID = "G-MKFG9J3JPM";
export const META_PIXEL_ID = "1626727235196727";
