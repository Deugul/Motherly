"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { getServiceReviews, type Review, type ServiceReviewKey } from "@/data/service-reviews";

export function StarRating({ count, size = "text-lg" }: { count: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`material-symbols-outlined ${size}`}
          style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

/**
 * "What mothers say" — two to three review snippets tied to one service.
 *
 * Testimonials used to live in a single generic block on the homepage, with at
 * most one quote per service page and no star rating anywhere on a service
 * page. This puts the relevant quotes next to the service they describe.
 */
export default function ServiceReviews({
  serviceKey,
  reviews,
  heading = "What mothers say",
  className = "",
}: {
  serviceKey?: ServiceReviewKey;
  /** Explicit list, used by the services hub. Overrides serviceKey. */
  reviews?: Review[];
  heading?: string;
  className?: string;
}) {
  const items = reviews ?? (serviceKey ? getServiceReviews(serviceKey) : []);
  if (items.length === 0) return null;

  return (
    <ScrollReveal className={className}>
      <section className="space-y-6">
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
        >
          {heading}
        </h2>

        <div className={`grid gap-5 ${items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((review, i) => (
            <motion.blockquote
              key={`${review.name}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-6 rounded-2xl border flex flex-col gap-4 h-full"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              }}
            >
              <StarRating count={review.rating} />
              <p
                className="text-sm leading-relaxed italic flex-grow"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="not-italic">
                <div
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                >
                  {review.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                  {review.role}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
