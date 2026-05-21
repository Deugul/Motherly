import ServiceJsonLd from "@/components/ServiceJsonLd";
import { SERVICE_SEO, buildServiceMetadata } from "@/data/service-seo";

export const metadata = buildServiceMetadata(SERVICE_SEO.doulas);

export default function DoulasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ServiceJsonLd seo={SERVICE_SEO.doulas} />
    </>
  );
}
