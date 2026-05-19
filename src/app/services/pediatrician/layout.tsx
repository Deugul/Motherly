import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pediatrician Consultation in Chennai",
  description:
    "Find and book verified pediatrician through Motherly for newborn and infant care consultations in Chennai  — home visits and online appointments available.",
  keywords: [
    "paediatrician India",
    "book paediatrician online India",
    "newborn doctor consultation",
    "infant doctor home visit Chennai",
    "baby health check India",
  ],
  alternates: { canonical: "https://www.mothrly.com/services/pediatrician" },
  openGraph: {
    title: "Book a Pediatrician Consultation in Chennai | Motherly",
    description:
      "Find and book verified pediatrician through Motherly for newborn and infant care consultations in Chennai  — home visits and online appointments available.",
    url: "https://www.mothrly.com/services/pediatrician",
  },
};

export default function PediatricianLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
