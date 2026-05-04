import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lactation Consultant & Obstetrician in Chennai",
  description:
    "Professional lactation consultants and obstetricians in Chennai. Expert breastfeeding support, antenatal monitoring, and postnatal health checks from Motherly.",
  keywords: ["lactation consultant Chennai", "breastfeeding support Chennai", "lactation specialist Chennai"],
  alternates: { canonical: "/services/lactation" },
  openGraph: {
    title: "Lactation Consultant & Obstetrician in Chennai | Motherly",
    description: "Expert lactation consultants and obstetricians in Chennai for breastfeeding and antenatal support.",
    url: "/services/lactation",
  },
};

export default function LactationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
