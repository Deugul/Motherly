"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function OurStorySection() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Image with floating quote */}
        <ScrollReveal direction="left" className="w-full md:w-[420px] flex-shrink-0 relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src="/our-story.jpg"
                alt="Two smiling healthcare professionals from Motherly"
                fill
                sizes="420px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
          {/* Floating quote card */}
          <div
            className="absolute -bottom-6 -right-4 p-5 rounded-2xl shadow-xl max-w-[260px] border"
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
            }}
          >
            <p className="font-bold italic text-base leading-snug" style={{ color: "var(--color-primary)" }}>
              "We believe every mother deserves a support system that feels like family."
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <ScrollReveal direction="right" delay={0.1}>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Our Story
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Expert-led care for every step of your journey. From pregnancy to parenthood, we provide
              the scientific expertise and emotional support you cherish.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.3}>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              We realised then that every family in India deserves a trusted, dedicated support, but
              finding it shouldn't be a challenge. We created Motherly to provide holistic support by
              blending clinical expertise with the warmth of family. We ensure that every parent feels
              supported, informed, and empowered from the very first heartbeat to the first steps and beyond.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.4}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-bold group"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
            >
              Learn more about our mission
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
