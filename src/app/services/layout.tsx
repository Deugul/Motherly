import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Our Services | Comprehensive Maternal Care Chennai";
const PAGE_DESCRIPTION =
  "Explore Motherly's full range of maternal care services in Chennai — doulas, lactation consultants, gynaecologists, nannies, postnatal physiotherapy, yoga, and pediatricians.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/services",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Our Services | Motherly Maternal Care Chennai",
    description: "Expert doulas, lactation, gynaecology, nannies, postnatal care, yoga & pediatricians in Chennai.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
