import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenatal & Postnatal Yoga in Chennai",
  description:
    "Expert-led prenatal and postnatal yoga sessions in Chennai. Certified instructors guide you through safe, nurturing practices for every stage of motherhood.",
  keywords: ["prenatal yoga Chennai", "postnatal yoga Chennai", "pregnancy yoga Chennai", "maternity yoga Chennai"],
  alternates: { canonical: "/services/yoga" },
  openGraph: {
    title: "Prenatal & Postnatal Yoga in Chennai | Motherly",
    description: "Certified prenatal and postnatal yoga instructors in Chennai for every stage of motherhood.",
    url: "/services/yoga",
  },
};

export default function YogaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
