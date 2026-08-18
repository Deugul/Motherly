"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { getServiceRelatedReading, type RelatedPost } from "@/data/service-related-reading";
import type { ServiceReviewKey } from "@/data/service-reviews";

/**
 * "Related reading" — contextual links from a service page into the blog.
 *
 * Keeps engaged visitors on site instead of bouncing, and gives each service
 * page internal links into topically-related content.
 */
export default function RelatedReading({
  serviceKey,
  posts,
  heading = "Related reading",
  className = "",
}: {
  serviceKey?: ServiceReviewKey;
  /** Explicit list, used by the services hub. Overrides serviceKey. */
  posts?: RelatedPost[];
  heading?: string;
  className?: string;
}) {
  const items = posts ?? (serviceKey ? getServiceRelatedReading(serviceKey) : []);
  if (items.length === 0) return null;

  return (
    <ScrollReveal className={className}>
      <section className="space-y-5">
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
        >
          {heading}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group flex flex-col gap-3 p-5 rounded-2xl border transition-shadow hover:shadow-md"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              }}
            >
              <span
                className="text-[11px] font-bold tracking-widest uppercase"
                style={{ color: "var(--color-primary)" }}
              >
                Read next
              </span>
              <span
                className="text-sm font-bold leading-snug flex-grow"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                {post.title}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Read article
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
