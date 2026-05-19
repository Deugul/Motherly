import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenatal & Postnatal Yoga in Chennai",
  description:
    "Book certified prenatal and postnatal yoga sessions in Chennai through Motherly. Safe, expert-guided yoga for Indian mothers during pregnancy and postpartum recovery.",
  keywords: [
    "prenatal yoga India",
    "postnatal yoga India",
    "pregnancy yoga Chennai",
    "yoga for pregnant women",
    "postpartum yoga sessions India",
  ],
  alternates: { canonical: "https://www.mothrly.com/services/yoga" },
  openGraph: {
    title: "Prenatal & Postnatal Yoga in Chennai | Motherly",
    description:
      "Book certified prenatal and postnatal yoga sessions in Chennai through Motherly. Safe, expert-guided yoga for Indian mothers during pregnancy and postpartum recovery.",
    url: "https://www.mothrly.com/services/yoga",
  },
};

export default function YogaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
