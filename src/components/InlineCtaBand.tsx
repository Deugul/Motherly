"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

/**
 * Compact mid-page call to action.
 *
 * The UX review asked for a second CTA partway down Home, About Us, the
 * services hub and every service page, so visitors who have already decided
 * don't have to scroll past the FAQ to find a way to book. Routing all of them
 * through one component keeps the accent colour and button shape identical
 * site-wide, which was the other half of that review (brand consistency).
 */
export default function InlineCtaBand({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  action,
  className = "",
}: {
  heading: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /**
   * Custom action node, used on service pages where the CTA opens the enquiry
   * modal rather than navigating. Takes precedence over primaryLabel/Href.
   */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal className={className}>
      <div
        className="rounded-2xl px-6 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 55%, white)",
          border: "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
        }}
      >
        <div className="flex-1 space-y-2">
          <h3
            className="text-xl md:text-2xl font-bold leading-snug"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            {heading}
          </h3>
          {subheading && (
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              {subheading}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          {action ?? (primaryLabel && primaryHref && (
            <Link href={primaryHref}>
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold w-full sm:w-auto"
                style={{
                  fontFamily: "var(--font-headline)",
                  background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
                  color: "var(--color-on-primary)",
                  boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                }}
              >
                {primaryLabel}
              </motion.span>
            </Link>
          ))}

          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref}>
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold w-full sm:w-auto"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "var(--color-surface-container-lowest)",
                  color: "var(--color-primary)",
                  border: "1px solid color-mix(in srgb, var(--color-primary) 35%, transparent)",
                }}
              >
                {secondaryLabel}
              </motion.span>
            </Link>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
