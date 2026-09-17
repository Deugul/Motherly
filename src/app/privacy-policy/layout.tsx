import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Privacy Policy - Motherly";
const PAGE_DESCRIPTION =
  "Read how Motherly collects, uses, stores, and protects your personal information.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "https://www.mothrly.com/privacy-policy",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Privacy Policy - Motherly",
    description:
      "Official privacy policy for Motherly services and platform users.",
    url: "https://www.mothrly.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
