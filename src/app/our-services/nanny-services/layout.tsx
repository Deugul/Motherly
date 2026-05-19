import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire a Verified Postnatal Nanny Services in Chennai",
  description:
    "Find and hire verified postnatal nannies and baby care professionals in Chennai through Motherly. Expert newborn care and mother support — home visits available.",
  keywords: [
    "postnatal nanny India",
    "newborn nanny Chennai",
    "baby care nanny India",
    "hire nanny after delivery",
    "postnatal baby nurse India",
  ],
  alternates: {
    canonical: "https://www.mothrly.com/our-services/nanny-services",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Hire a Verified Postnatal Nanny Services in Chennai | Motherly",
    description:
      "Find and hire verified postnatal nannies and baby care professionals in Chennai through Motherly. Expert newborn care and mother support — home visits available.",
    url: "https://www.mothrly.com/our-services/nanny-services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
