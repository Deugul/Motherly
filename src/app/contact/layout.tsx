import type { Metadata } from "next";
import ContactLayout, { metadata as contactMetadata } from "@/app/contact-us/layout";

export const metadata: Metadata = {
  ...contactMetadata,
  alternates: { canonical: "https://www.mothrly.com/contact" },
  openGraph: {
    ...contactMetadata.openGraph,
    url: "https://www.mothrly.com/contact",
  },
};

export default ContactLayout;
