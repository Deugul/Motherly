import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Gynaecology Consultation in Chennai",
  description:
    "Book verified gynaecology consultations in Chennai through Motherly — prenatal check-ups, postnatal care, and women's health support for Indian mothers at home or online.",
  keywords: [
    "gynaecology consultation India",
    "book gynaecologist online India",
    "prenatal consultation",
    "women's health India",
    "gynaecologist home visit Chennai",
  ],
  alternates: {
    canonical: "https://www.mothrly.com/our-services/gynecology-consultation",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Book a Gynaecology Consultation in Chennai | Motherly",
    description:
      "Book verified gynaecology consultations in Chennai through Motherly — prenatal check-ups, postnatal care, and women's health support for Indian mothers at home or online.",
    url: "https://www.mothrly.com/our-services/gynecology-consultation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
