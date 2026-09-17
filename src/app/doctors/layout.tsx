import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Be Medical Partners | Verified Doctors & Specialists";
const PAGE_DESCRIPTION =
  "Motherly's network of verified medical partners — gynaecologists, obstetricians, pediatricians, lactation specialists, and healthcare professionals across Chennai.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "/doctors",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Be Medical Partners | Motherly Chennai",
    description: "Verified gynaecologists, obstetricians, pediatricians, and specialists in Motherly's Chennai network.",
    url: "/doctors",
  },
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
