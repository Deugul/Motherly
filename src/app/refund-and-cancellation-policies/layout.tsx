import type { Metadata } from "next";
import { brandedTitle, buildHeadSeo } from "@/lib/head-seo";

const PAGE_TITLE = "Refund and Cancellation Policies - Motherly";
const PAGE_DESCRIPTION =
  "Read Motherly refund and cancellation policies, including provider cancellations, no-shows, and refund timelines.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  ...buildHeadSeo({
    title: brandedTitle(PAGE_TITLE),
    description: PAGE_DESCRIPTION,
    canonical: "https://www.mothrly.com/refund-and-cancellation-policies",
    dcType: "Text.Webpage",
  }),
  openGraph: {
    title: "Refund and Cancellation Policies - Motherly",
    description:
      "Official refund and cancellation policies for appointments booked through Motherly.",
    url: "https://www.mothrly.com/refund-and-cancellation-policies",
  },
};

export default function RefundAndCancellationPoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
