import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Motherlycare Ethos Private Limited",
  description:
    "Read the official privacy policy of Motherlycare Ethos Private Limited, including data collection, usage, cookies, retention, and contact details.",
  alternates: { canonical: "https://www.mothrly.com/privacy-policy-motherly" },
  openGraph: {
    title: "Privacy Policy | Motherlycare Ethos Private Limited",
    description:
      "Official privacy policy for Motherlycare Ethos Private Limited and Motherly services.",
    url: "https://www.mothrly.com/privacy-policy-motherly",
  },
};

export default function PrivacyPolicyMotherlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
