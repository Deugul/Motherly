import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Lactation Consultant in Chennai",
  description:
    "Find and book certified lactation consultants in Chennai through Motherly. Get expert breastfeeding help at home — latch issues, low supply, and more solved.",
  keywords: [
    "lactation consultant India",
    "book lactation consultant",
    "breastfeeding consultant India",
    "IBCLC India",
    "lactation support home visit",
  ],
  alternates: {
    canonical: "https://www.mothrly.com/our-services/lactation-consultants",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Book a Lactation Consultant in Chennai | Motherly",
    description:
      "Find and book certified lactation consultants in Chennai through Motherly. Get expert breastfeeding help at home — latch issues, low supply, and more solved.",
    url: "https://www.mothrly.com/our-services/lactation-consultants",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
