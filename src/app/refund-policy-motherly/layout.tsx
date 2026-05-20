import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Motherlycare Ethos Private Limited",
  description:
    "Read Motherlycare Ethos Private Limited refund and cancellation policy for appointments booked on the Motherly platform.",
  alternates: { canonical: "https://www.mothrly.com/refund-policy-motherly" },
  openGraph: {
    title: "Refund and Cancellation Policy | Motherlycare Ethos Private Limited",
    description:
      "Clear and transparent guidelines for cancellations, no-shows, and refunds on the Motherly platform.",
    url: "https://www.mothrly.com/refund-policy-motherly",
  },
};

export default function RefundPolicyMotherlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
