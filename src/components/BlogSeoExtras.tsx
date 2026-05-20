import Link from "next/link";
import type { BlogSeoEntry } from "@/data/blog-seo";
import { normalizeSeoUrl } from "@/data/blog-seo";

type BlogSeoExtrasProps = {
  seo: BlogSeoEntry;
};

export default function BlogSeoExtras({ seo }: BlogSeoExtrasProps) {
  const howTo = seo.howToSchema;

  return (
    <>
      {seo.keywordLinks.length > 0 && (
        <section
          className="mt-12 pt-10 border-t"
          style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}
        >
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Useful Resources & Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {seo.keywordLinks.map((link) => (
              <Link
                key={link.label}
                href={normalizeSeoUrl(link.url)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
                style={{
                  backgroundColor: "var(--color-surface-container-low)",
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {howTo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.faqSchema) }}
      />
    </>
  );
}
