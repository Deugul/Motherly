import Link from "next/link";
import type { BlogSeoEntry } from "@/data/blog-seo";
import { normalizeSeoUrl } from "@/data/blog-seo";

type BlogSeoExtrasProps = {
  seo: BlogSeoEntry;
};

type JsonObject = Record<string, unknown>;

function toPlainText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSafeFaqSchema(input: unknown): JsonObject | null {
  if (!input || typeof input !== "object") return null;
  const schema = input as JsonObject;
  const mainEntity = Array.isArray(schema.mainEntity) ? schema.mainEntity : [];
  const seenQuestions = new Set<string>();

  const safeQuestions = mainEntity
    .map((entity) => {
      if (!entity || typeof entity !== "object") return null;
      const question = entity as JsonObject;
      const name = toPlainText(question.name);
      const acceptedAnswer =
        question.acceptedAnswer && typeof question.acceptedAnswer === "object"
          ? (question.acceptedAnswer as JsonObject)
          : null;
      const answerText = toPlainText(acceptedAnswer?.text);

      if (!name || !answerText) return null;
      const dedupeKey = name.toLowerCase();
      if (seenQuestions.has(dedupeKey)) return null;
      seenQuestions.add(dedupeKey);

      return {
        "@type": "Question",
        name,
        acceptedAnswer: {
          "@type": "Answer",
          text: answerText,
        },
      };
    })
    .filter((item): item is JsonObject => Boolean(item));

  if (safeQuestions.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: safeQuestions,
  };
}

export default function BlogSeoExtras({ seo }: BlogSeoExtrasProps) {
  const howTo = seo.howToSchema;
  const faqSchema = buildSafeFaqSchema(seo.faqSchema);

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
          id="blog-howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
        />
      )}
      {faqSchema && (
        <script
          id="blog-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
