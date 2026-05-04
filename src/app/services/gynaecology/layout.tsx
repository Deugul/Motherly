import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gynaecologist & Obstetrician Consultation in Chennai",
  description:
    "Book expert gynaecology and obstetrics consultations in Chennai. Motherly connects you with certified gynaecologists for antenatal care, high-risk pregnancy, and postnatal health.",
  keywords: ["gynaecologist Chennai", "obstetrician Chennai", "antenatal care Chennai", "high risk pregnancy Chennai"],
  alternates: { canonical: "/services/gynaecology" },
  openGraph: {
    title: "Gynaecologist & Obstetrician in Chennai | Motherly",
    description: "Certified gynaecologists and obstetricians in Chennai for antenatal, labour, and postnatal care.",
    url: "/services/gynaecology",
  },
};

export default function GynaecologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
