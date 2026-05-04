"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const spring = { type: "spring" as const, stiffness: 50, damping: 16, mass: 0.9 };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: spring },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-start pt-28 md:pt-36 overflow-hidden rounded-b-[2.5rem]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Mother and baby"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.35) 50%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-lg space-y-5"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 80%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-primary)" }}>ecg_heart</span>
              Expert Care for Every Step
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-[1.05]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
          >
            <span style={{ color: "var(--color-primary)" }}>Motherly</span>
            <br />Your Birth
            <br />Companion
          </motion.h1>

          <motion.div
            variants={item}
            className="w-16 h-1 rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)" }}
          />

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link href="/services/doulas">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-base"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  boxShadow: "0 8px 28px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                }}
              >
                Find a Doula
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-base border-2"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "white",
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
