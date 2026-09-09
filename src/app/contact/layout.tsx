import type { Metadata } from "next";
import ContactLayout, { metadata as contactMetadata } from "@/app/contact-us/layout";

export const metadata: Metadata = {
  ...contactMetadata,
  // Spread the inherited alternates so the en-in hreflang survives this
  // canonical override — metadata merges shallowly, so a bare `alternates`
  // object here would drop it.
  alternates: {
    ...contactMetadata.alternates,
    canonical: "https://www.mothrly.com/contact",
  },
  openGraph: {
    ...contactMetadata.openGraph,
    url: "https://www.mothrly.com/contact",
  },
};

export default ContactLayout;
