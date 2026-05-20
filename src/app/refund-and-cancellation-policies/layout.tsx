import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policies - Motherly",
  description:
    "Read Motherly refund and cancellation policies, including provider cancellations, no-shows, and refund timelines.",
  alternates: { canonical: "https://www.mothrly.com/refund-and-cancellation-policies" },
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
