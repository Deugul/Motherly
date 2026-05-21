import GynaecologyLayout, { metadata as gynaecologyMetadata } from "@/app/services/gynaecology/layout";
import { SERVICE_SEO } from "@/data/service-seo";

export const metadata = {
  ...gynaecologyMetadata,
  alternates: { canonical: SERVICE_SEO.gynecologistConsultation.canonical },
  openGraph: {
    ...gynaecologyMetadata.openGraph,
    url: SERVICE_SEO.gynecologistConsultation.canonical,
  },
};

export default GynaecologyLayout;
