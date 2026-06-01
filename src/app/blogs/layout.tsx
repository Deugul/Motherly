import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternal Health & Parenting Blog",
  description:
    "Expert articles on pregnancy, newborn care, breastfeeding, postnatal recovery, and maternal wellness. Curated by Motherly's healthcare specialists in Chennai.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Maternal Health & Parenting Blog | Motherly",
    description: "Expert pregnancy, newborn, and postnatal wellness articles curated by Motherly's healthcare team.",
    url: "/blogs",
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
