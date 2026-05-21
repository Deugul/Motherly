import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physiotherapy in Chennai | Motherly",
  description:
    "Book certified postnatal physiotherapy in Chennai. Pelvic floor recovery, diastasis recti, C-section rehab and mother back pain. In-clinic and virtual sessions",
  keywords: [
    "physiotherapy in Chennai",
    "postnatal physiotherapy Chennai",
    "pelvic floor physiotherapy Chennai",
    "diastasis recti treatment Chennai",
    "postpartum rehabilitation Chennai",
  ],
  alternates: {
    canonical: "https://www.mothrly.com/our-services/postnatal-recovery-care/physiotherapy",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Physiotherapy in Chennai | Motherly",
    description:
      "Book certified postnatal physiotherapy in Chennai. Pelvic floor recovery, diastasis recti, C-section rehab and mother back pain. In-clinic and virtual sessions",
    url: "https://www.mothrly.com/our-services/postnatal-recovery-care/physiotherapy",
  },
};

export default function PhysiotherapyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
