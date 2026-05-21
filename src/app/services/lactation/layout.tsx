import { SERVICE_SEO, buildServiceMetadata } from "@/data/service-seo";

export const metadata = buildServiceMetadata(SERVICE_SEO.lactationConsultants);

export default function LactationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
