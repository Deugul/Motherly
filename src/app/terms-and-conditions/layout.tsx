import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Terms and conditions - Motherly";
const PAGE_DESCRIPTION =
  "Read the Terms and Conditions for using Motherly services, platform features, and policies.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "https://www.mothrly.com/terms-and-conditions",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Terms and conditions - Motherly",
    description:
      "Official Terms and Conditions for using the Motherly platform and services.",
    url: "https://www.mothrly.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
