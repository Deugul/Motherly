"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "The transition home was so much smoother with our Motherly nurse. She didn't just care for the baby; she cared for me.",
    name: "Sree Lakshmi",
    role: "Mother of Two",
    initials: "SL",
    rating: 5,
  },
  {
    quote: "Their lactation consultant was a godsend. Patient, knowledgeable, and incredibly supportive during a stressful time.",
    name: "Priya Menon",
    role: "First-time Mother",
    initials: "PM",
    rating: 5,
  },
  {
    quote: "Motherly is more than a service; it's a lifeline. The app makes scheduling help so easy when you're exhausted.",
    name: "Ananya Iyer",
    role: "Mother of Three",
    initials: "AI",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-xl"
          style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="py-12 md:py-24 px-4 md:px-10"
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
          >
            What our Mothers say
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5 }}
              className="p-9 rounded-2xl border flex flex-col gap-6"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <StarRating count={t.rating} />
              <p
                className="text-lg italic leading-relaxed flex-grow"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: "var(--color-secondary-container)",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="font-bold"
                    style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
