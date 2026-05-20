import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions - Motherly",
  description:
    "Read the Terms and Conditions for using Motherly services, platform features, and policies.",
  alternates: { canonical: "https://www.mothrly.com/terms-and-conditions/" },
  openGraph: {
    title: "Terms and conditions - Motherly",
    description:
      "Official Terms and Conditions for using the Motherly platform and services.",
    url: "https://www.mothrly.com/terms-and-conditions/",
  },
};

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
