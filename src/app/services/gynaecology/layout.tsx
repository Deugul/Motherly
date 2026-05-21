import { SERVICE_SEO, buildServiceMetadata } from "@/data/service-seo";

export const metadata = buildServiceMetadata(SERVICE_SEO.gynecologistConsultation);

export default function GynaecologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
