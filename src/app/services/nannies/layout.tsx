import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Nanny Care in Chennai",
  description:
    "Vetted, trained nannies and childcare professionals in Chennai. Motherly provides trusted nanny care tailored to your family's unique needs and schedule.",
  keywords: ["nanny Chennai", "nanny care Chennai", "childcare Chennai", "baby care Chennai"],
  alternates: { canonical: "/services/nannies" },
  openGraph: {
    title: "Professional Nanny Care in Chennai | Motherly",
    description: "Vetted and trained nannies in Chennai — trusted childcare tailored to your family.",
    url: "/services/nannies",
  },
};

export default function NanniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
