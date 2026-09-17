import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Maternal Health & Parenting Blog";
const PAGE_DESCRIPTION =
  "Expert articles on pregnancy, newborn care, breastfeeding, postnatal recovery, and maternal wellness. Curated by Motherly's healthcare specialists in Chennai.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/blogs",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Maternal Health & Parenting Blog | Motherly",
    description: "Expert pregnancy, newborn, and postnatal wellness articles curated by Motherly's healthcare team.",
    url: "/blogs",
  },
};
export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
