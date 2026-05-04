import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Expert Maternal Care in Chennai",
  description:
    "Learn about Motherly's mission to provide compassionate, professional maternal and newborn care. Founded in Chennai with a team of verified healthcare specialists.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Motherly | Expert Maternal Care in Chennai",
    description: "Motherly's mission: compassionate, professional maternal care for every family in Chennai.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
