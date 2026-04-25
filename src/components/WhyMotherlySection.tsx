"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const features = [
  {
    icon: "diversity_2",
    title: "Comprehensive Support Network",
    desc: "Access a full spectrum of specialists from doulas to mental health counselors, all in one place.",
  },
  {
    icon: "verified_user",
    title: "Reliable",
    desc: "Fully vetted experts with verified medical credentials and backgrounds you can trust.",
  },
  {
    icon: "touch_app",
    title: "User-Friendly Experience",
    desc: "Book consultations, chat with experts, and manage appointments through our seamless digital interface.",
  },
];

export default function WhyMotherlySection() {
  return (
    <section className="py-24 px-8" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Banner image */}
        <ScrollReveal>
          <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <Image
                src="/why-motherly-banner.jpg"
                alt="Motherly care"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-10 left-10">
              <p
                className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-none"
                style={{ fontFamily: "var(--font-headline)", textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}
              >
                Why Motherly
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Headline row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <ScrollReveal className="flex-1 max-w-xl space-y-4">
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Because every mother's journey is{" "}
              <span style={{ color: "var(--color-primary)" }}>unique</span>{" "}
              and deserves personal support.
            </h2>
          </ScrollReveal>

        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: easeOut }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
              className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl border"
              style={{
                backgroundColor: "white",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              {/* Icon circle */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
                className="w-36 h-36 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  border: "3px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "56px",
                    color: "var(--color-primary)",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  {f.icon}
                </span>
              </motion.div>

              {/* Text */}
              <div className="space-y-2">
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
