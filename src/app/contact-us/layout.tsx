import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Book a Consultation",
  description:
    "Get in touch with Motherly to book a consultation or enquire about our maternal care services in Chennai. Our team responds within 24 hours.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Motherly | Book a Consultation in Chennai",
    description: "Book a consultation with Motherly's maternal care specialists in Chennai. We respond within 24 hours.",
    url: "/contact-us",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
