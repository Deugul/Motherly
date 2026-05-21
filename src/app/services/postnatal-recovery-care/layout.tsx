import ServiceJsonLd from "@/components/ServiceJsonLd";
import { SERVICE_SEO, buildServiceMetadata } from "@/data/service-seo";

export const metadata = buildServiceMetadata(SERVICE_SEO.postnatalRecoveryCare);

export default function PostnatalRecoveryCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ServiceJsonLd seo={SERVICE_SEO.postnatalRecoveryCare} />
    </>
  );
}
