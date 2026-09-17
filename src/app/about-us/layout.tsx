import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "About Us | Expert Maternal Care in Chennai";
const PAGE_DESCRIPTION =
  "Learn about Motherly's mission to provide compassionate, professional maternal and newborn care. Founded in Chennai with a team of verified healthcare specialists.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/about-us",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "About Motherly | Expert Maternal Care in Chennai",
    description: "Motherly's mission: compassionate, professional maternal care for every family in Chennai.",
    url: "/about-us",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
