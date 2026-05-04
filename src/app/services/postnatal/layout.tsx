import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postnatal Recovery & Physiotherapy in Chennai",
  description:
    "Expert postnatal physiotherapy and recovery programmes in Chennai. Certified specialists help mothers restore strength, heal pelvic floor, and thrive after childbirth.",
  keywords: ["postnatal care Chennai", "postnatal physiotherapy Chennai", "postpartum recovery Chennai", "pelvic floor Chennai"],
  alternates: { canonical: "/services/postnatal" },
  openGraph: {
    title: "Postnatal Recovery & Physiotherapy in Chennai | Motherly",
    description: "Certified postnatal physiotherapists in Chennai for pelvic floor recovery and postpartum healing.",
    url: "/services/postnatal",
  },
};

export default function PostnatalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
