import type { ServiceSeoEntry } from "@/data/service-seo";

type ServiceJsonLdProps = {
  seo: ServiceSeoEntry;
};

/** Renders HowTo + FAQ JSON-LD from centralized service SEO data. */
export default function ServiceJsonLd({ seo }: ServiceJsonLdProps) {
  return (
    <>
      {seo.howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.howToSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.faqSchema) }}
      />
    </>
  );
}
