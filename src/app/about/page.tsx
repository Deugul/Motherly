"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

const MotionImage = motion.create(Image);
const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];


export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 overflow-x-hidden" style={{ backgroundColor: "var(--color-background)" }}>

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left */}
            <div className="lg:w-1/2 space-y-8">
              <ScrollReveal>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--color-secondary-container)",
                    color: "var(--color-on-secondary-container)",
                  }}
                >
                  <span className="material-symbols-outlined text-sm">favorite</span>
                  Our Philosophy
                </div>
                <h1
                  className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mt-6"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Caring for the{" "}
                  <span className="italic" style={{ color: "var(--color-primary)" }}>heart</span>{" "}
                  of the home.
                </h1>
                <p
                  className="text-xl leading-relaxed max-w-xl mt-6"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Motherly was born from a simple truth: every mother deserves a village. We are
                  redefining home care through a lens of empathy, editorial excellence, and clinical precision.
                </p>
              </ScrollReveal>

              {/* Mission / Vision + Image */}
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                      >
                        Our Mission
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        To provide dignified, compassionate support that empowers families and preserves the joy of home life.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-secondary)" }}
                      >
                        Our Vision
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        Becoming the gold standard for personalised care, where luxury meets genuine human connection.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-lg h-48 md:h-full relative">
                    <MotionImage
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src="/about-mission.jpg"
                      alt="Our Mission and Vision"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: hero image */}
            <div className="lg:w-1/2 relative">
              <ScrollReveal direction="right">
                <div className="w-full h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                  <MotionImage
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7 }}
                    src="/about-hero.jpg"
                    alt="Motherly Team"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div
                  className="absolute -bottom-8 -left-8 w-48 h-48 rounded-3xl -z-10 opacity-30"
                  style={{ backgroundColor: "var(--color-tertiary-container)" }}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Our Journey Bento ── */}
        <section style={{ backgroundColor: "var(--color-surface-container-low)" }} className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <ScrollReveal className="text-center mb-16 space-y-4">
              <h2
                className="text-4xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Our Journey
              </h2>
              <p className="max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
                From a small community initiative to a leading healthcare partner, our story is written by the lives we touch.
              </p>
            </ScrollReveal>

            {/* Bento Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(2, 300px)",
                gap: "1.5rem",
              }}
              className="journey-bento"
            >
              {/* Large image — 2×2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="rounded-[2rem] overflow-hidden relative group"
                style={{ gridColumn: "span 2", gridRow: "span 2" }}
              >
                <Image
                  src="/about-journey-spark.jpg"
                  alt="Our Care Journey"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                  <span
                    className="font-bold mb-2 text-sm"
                    style={{ color: "var(--color-tertiary-container)", fontFamily: "var(--font-headline)" }}
                  >
                    2024
                  </span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-headline)" }}>
                    The Spark
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    Founded by a group of nurses who saw a gap in post-operative home recovery.
                  </p>
                </div>
              </motion.div>

              {/* 1000+ Families — col-span-2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
                className="rounded-[2rem] p-8 flex flex-col justify-center border"
                style={{
                  gridColumn: "span 2",
                  backgroundColor: "var(--color-surface-container-lowest)",
                  borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)" }}
                  >
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    Growing Families
                  </h3>
                </div>
                <p style={{ color: "var(--color-on-surface-variant)" }}>
                  We expanded our reach across Tamil Nadu, bringing specialised maternal care directly into the homes of families who needed it most — with a team that grew alongside every mother we served.
                </p>
              </motion.div>

              {/* Secondary image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
                className="rounded-[2rem] overflow-hidden relative"
              >
                <Image
                  src="/about-journey-caregiver.jpg"
                  alt="Caregiver Support"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* 98% satisfaction */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
                className="rounded-[2rem] p-8 flex flex-col justify-between"
                style={{ backgroundColor: "var(--color-tertiary)", color: "var(--color-on-tertiary)" }}
              >
                <span className="material-symbols-outlined text-4xl">verified_user</span>
                <div>
                  <div
                    className="text-4xl font-extrabold"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    98%
                  </div>
                  <p className="text-sm mt-1 opacity-90">Satisfaction rate from our mother community.</p>
                </div>
              </motion.div>
            </div>

            {/* Responsive override */}
            <style>{`
              @media (max-width: 1024px) {
                .journey-bento { grid-template-columns: repeat(2, 1fr) !important; grid-template-rows: auto !important; }
                .journey-bento > div { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 260px; }
              }
              @media (max-width: 640px) {
                .journey-bento { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <ScrollReveal>
            <div
              className="rounded-[3rem] p-16 relative overflow-hidden flex flex-col items-center text-center"
              style={{ backgroundColor: "var(--color-secondary-container)" }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 -mr-32 -mt-32"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 -ml-32 -mb-32"
                style={{ backgroundColor: "var(--color-tertiary)" }}
              />
              <h2
                className="text-4xl font-extrabold mb-6 max-w-2xl relative z-10"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-secondary-container)" }}
              >
                Ready to bring the Motherly touch to your home?
              </h2>
              <p
                className="text-lg mb-10 max-w-xl relative z-10"
                style={{ color: "color-mix(in srgb, var(--color-on-secondary-container) 80%, transparent)" }}
              >
                Schedule a complimentary discovery call with our care coordination team today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-full font-bold"
                    style={{
                      fontFamily: "var(--font-headline)",
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                    }}
                  >
                    Book a Free Consultation
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-full font-bold border"
                    style={{
                      fontFamily: "var(--font-headline)",
                      backgroundColor: "var(--color-surface-container-lowest)",
                      color: "var(--color-primary)",
                      borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                    }}
                  >
                    View Our Services
                  </motion.button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
