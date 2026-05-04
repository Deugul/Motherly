import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Comprehensive Maternal Care Chennai",
  description:
    "Explore Motherly's full range of maternal care services in Chennai — doulas, lactation consultants, gynaecologists, nannies, postnatal physiotherapy, yoga, and pediatricians.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Motherly Maternal Care Chennai",
    description: "Expert doulas, lactation, gynaecology, nannies, postnatal care, yoga & pediatricians in Chennai.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
