import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pediatrician Consultation in Chennai",
  description:
    "Expert pediatric consultations in Chennai for newborns and young children. Qualified pediatricians for vaccinations, developmental assessments, and childhood illness care.",
  keywords: ["pediatrician Chennai", "child doctor Chennai", "baby doctor Chennai", "newborn care Chennai"],
  alternates: { canonical: "/services/nutrition" },
  openGraph: {
    title: "Pediatrician Consultation in Chennai | Motherly",
    description: "Qualified pediatricians in Chennai for vaccinations, developmental checks, and newborn care.",
    url: "/services/nutrition",
  },
};

export default function NutritionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
