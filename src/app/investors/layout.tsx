import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Invest in Motherly | Maternal Healthcare Platform";
const PAGE_DESCRIPTION =
  "Motherly is transforming maternal healthcare in India. Discover our investment opportunity and join us in empowering every mother with expert, compassionate care.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/investors",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Invest in Motherly | Maternal Healthcare Platform",
    description: "Motherly is transforming maternal healthcare in India. Join us in empowering every mother.",
    url: "/investors",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
