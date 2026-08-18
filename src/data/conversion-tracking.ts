/**
 * Stable conversion-tracking hooks for the enquiry forms.
 *
 * These identifiers are handed to the SEO / analytics team and wired into GTM.
 * Treat them as a public contract: renaming any of them silently breaks their
 * goals and conversion reporting. If one must change, tell them first.
 *
 *   #motherly-thank-you        element id on the success card
 *   .motherly-thank-you-card   class on the same element
 *   data-form-status="success" set once the submission is confirmed
 *   data-service               which service was enquired about
 *   data-page-label            which page the enquiry came from
 *
 * The dataLayer event is the more reliable trigger of the two — it fires only
 * after the API returns 2xx, so it counts real leads rather than attempts. The
 * id/class exist for element-visibility triggers and for styling.
 */

export const THANKYOU_CARD_ID = "motherly-thank-you";
export const THANKYOU_CARD_CLASS = "motherly-thank-you-card";
export const THANKYOU_DATALAYER_EVENT = "motherly_enquiry_success";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/** Push a conversion event onto the GTM dataLayer, creating it if needed. */
export function pushConversionEvent(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}
