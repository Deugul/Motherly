import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire a Verified Doula in Chennai",
  description:
    "Find and book verified birth doulas in Chennai through Motherly. Expert emotional and physical birth support for expecting Indian mothers — home visits available.",
  keywords: [
    "hire doula India",
    "birth doula India",
    "doula service Chennai",
    "book doula India",
    "birth support doula",
  ],
  alternates: { canonical: "/our-services/doulas" },
  openGraph: {
    title: "Hire a Verified Doula in Chennai | Motherly",
    description:
      "Find and book verified birth doulas in Chennai through Motherly. Expert emotional and physical birth support for expecting Indian mothers — home visits available.",
    url: "/our-services/doulas",
  },
};

export default function DoulasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
