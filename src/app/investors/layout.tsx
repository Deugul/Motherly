import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invest in Motherly | Maternal Healthcare Platform",
  description:
    "Motherly is transforming maternal healthcare in India. Discover our investment opportunity and join us in empowering every mother with expert, compassionate care.",
  alternates: { canonical: "/investors" },
  openGraph: {
    title: "Invest in Motherly | Maternal Healthcare Platform",
    description: "Motherly is transforming maternal healthcare in India. Join us in empowering every mother.",
    url: "/investors",
  },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
