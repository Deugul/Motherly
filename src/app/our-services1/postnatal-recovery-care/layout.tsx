import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postnatal Recovery Care at Home in Chennai | Motherly",
  description:
    "Book verified postnatal recovery care at home in Chennai with Motherly. Expert support for Indian new mothers — massage, nutrition, breastfeeding help, and emotional care.",
  keywords: [
    "postnatal recovery care India",
    "postpartum care at home",
    "postnatal care service Chennai",
    "postnatal massage India",
    "postpartum home care",
  ],
  alternates: {
    canonical: "https://www.mothrly.com/our-services/postnatal-recovery-care",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Postnatal Recovery Care at Home in Chennai | Motherly",
    description:
      "Book verified postnatal recovery care at home in Chennai with Motherly. Expert support for Indian new mothers — massage, nutrition, breastfeeding help, and emotional care.",
    url: "https://www.mothrly.com/our-services/postnatal-recovery-care",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
