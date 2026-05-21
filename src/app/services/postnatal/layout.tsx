import { SERVICE_SEO, buildServiceMetadata } from "@/data/service-seo";

export const metadata = buildServiceMetadata(SERVICE_SEO.postnatalRecoveryCare);

export default function PostnatalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
