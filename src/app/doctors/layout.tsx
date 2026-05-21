import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be Medical Partners | Verified Doctors & Specialists",
  description:
    "Motherly's network of verified medical partners — gynaecologists, obstetricians, pediatricians, lactation specialists, and healthcare professionals across Chennai.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    title: "Be Medical Partners | Motherly Chennai",
    description: "Verified gynaecologists, obstetricians, pediatricians, and specialists in Motherly's Chennai network.",
    url: "/doctors",
  },
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
