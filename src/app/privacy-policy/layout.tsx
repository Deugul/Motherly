import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Motherly",
  description:
    "Read how Motherly collects, uses, stores, and protects your personal information.",
  alternates: { canonical: "https://www.mothrly.com/privacy-policy" },
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
