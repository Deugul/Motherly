/**
 * Real-time contact channels used by the site-wide chat widget.
 *
 * WHATSAPP_NUMBER is in wa.me format: country code + number, digits only,
 * no plus sign or spaces. Change it here and the widget follows.
 */
export const WHATSAPP_NUMBER = "918698697000";

/** Same line, formatted for the tel: link and for display. */
export const SUPPORT_PHONE = "+918698697000";
export const SUPPORT_PHONE_DISPLAY = "+91 86986 97000";

/** Registered office. Used by the contact page address block and its map. */
export const OFFICE_ADDRESS_LINES = [
  "3rd Floor, Alpha Block, SSPDL Alpha City",
  "301-B3, Rajiv Gandhi Salai, Navalur",
  "Tamil Nadu 600130, India",
];

/** Single-line form for Google Maps embed and directions links. */
export const OFFICE_MAP_QUERY =
  "SSPDL Alpha City, 301-B3, Rajiv Gandhi Salai, Navalur, Chennai, Tamil Nadu 600130";

export const WHATSAPP_GREETING =
  "Hi Motherly, I'd like to know more about your maternal care services.";

/**
 * Quick-intent chips in the chat panel. Picking one prefills the WhatsApp
 * message, so the care team opens an already-qualified conversation instead
 * of a bare "Hi".
 */
export const CHAT_INTENTS: { label: string; message: string }[] = [
  {
    label: "A doula",
    message: "Hi Motherly, I'd like to know about booking a doula in Chennai.",
  },
  {
    label: "Lactation help",
    message: "Hi Motherly, I need help with breastfeeding and would like to speak to a lactation consultant.",
  },
  {
    label: "Postnatal care",
    message: "Hi Motherly, I'd like to know about your postnatal recovery care at home.",
  },
  {
    label: "A nanny",
    message: "Hi Motherly, I'd like to know about booking a verified nanny at home.",
  },
  {
    label: "Something else",
    message: "Hi Motherly, I have a question about your maternal care services.",
  },
];
