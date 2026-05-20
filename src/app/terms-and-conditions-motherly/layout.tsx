import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Motherlycare Ethos Private Limited",
  description:
    "Read Motherlycare Ethos Private Limited terms and conditions for use of the Motherly platform and services.",
  alternates: { canonical: "https://www.mothrly.com/terms-and-conditions-motherly" },
  openGraph: {
    title: "Terms and Conditions | Motherlycare Ethos Private Limited",
    description:
      "Clear and transparent terms for using the Motherly platform and services.",
    url: "https://www.mothrly.com/terms-and-conditions-motherly",
  },
};

export default function TermsAndConditionsMotherlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
