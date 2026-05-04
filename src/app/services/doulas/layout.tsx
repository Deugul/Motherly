import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Doula Services in Chennai",
  description:
    "Expert birth doulas in Chennai providing emotional support, physical comfort, and birth education. Book your Motherly doula for a personalised, empowered birth experience.",
  keywords: ["doula Chennai", "birth doula Chennai", "labour support Chennai", "birth companion Chennai"],
  alternates: { canonical: "/services/doulas" },
  openGraph: {
    title: "Best Doula Services in Chennai | Motherly",
    description: "Expert birth doulas in Chennai — emotional support, physical comfort, and birth education.",
    url: "/services/doulas",
  },
};

export default function DoulasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
