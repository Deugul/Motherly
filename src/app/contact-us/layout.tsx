import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Contact Us | Book a Consultation";
const PAGE_DESCRIPTION =
  "Get in touch with Motherly to book a consultation or enquire about our maternal care services in Chennai. Our team responds within 24 hours.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/contact",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Contact Motherly | Book a Consultation in Chennai",
    description: "Book a consultation with Motherly's maternal care specialists in Chennai. We respond within 24 hours.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
