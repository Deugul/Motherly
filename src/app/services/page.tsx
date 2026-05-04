"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main
        className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Hero Header */}
        <ScrollReveal>
          <header className="mb-16 max-w-3xl">
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Comprehensive Care for{" "}
              <span className="italic" style={{ color: "var(--color-primary)" }}>
                Every Chapter.
              </span>
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              From prenatal guidance to postnatal support, we provide expert care tailored to your
              unique journey into motherhood.
            </p>
          </header>
        </ScrollReveal>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(2, 400px)",
            gap: "1.5rem",
          }}
          className="bento-grid"
        >
          {/* Doulas — large feature card */}
          <Link href="/services/doulas" style={{ gridColumn: "span 7" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
              whileHover={{ scale: 1.01 }}
              className="group relative rounded-2xl overflow-hidden h-full cursor-pointer"
              style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_2GAVFqtNyO8HgBKHdlPW1GVXrZfRNlUnVilRwYYy8MR0eHpSjmD49001Zo1-qswu9RhxLUCqJiyo3OLqKWXIIKBiAmv0vNuDXsmbGs2mEGyyd3MTvNoBPPUPapEkCkPT0sIYITFgWgywvZRjqvoCCD0hmQihjP9wmlzTBeBQ2-cnlWuVZbwMeZH3kv6SnRiG8fvvHwq8e-L90qQR7soQijOylolwN2XtOwVDpX6rl2CBc1GkdhIaN37vJc9kyoW8Smei2Gd1ZKOo"
                  alt="Supportive doula holding a mother's hand"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 p-8 z-10 text-white w-full">
                <span
                  className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)" }}
                >
                  Support
                </span>
                <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-headline)" }}>
                  Birth &amp; Postpartum Doulas
                </h2>
                <p className="max-w-md mb-6 text-white/80">
                  Emotional, physical, and informational support throughout your pregnancy, labor, and
                  the early weeks of parenthood.
                </p>
                <span className="flex items-center gap-2 font-bold text-sm text-white group-hover:underline" style={{ fontFamily: "var(--font-headline)" }}>
                  Learn More
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Lactation Consultants */}
          <Link href="/services/lactation" style={{ gridColumn: "span 5" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl flex flex-col justify-between p-8 h-full cursor-pointer"
              style={{ backgroundColor: "var(--color-secondary-container)" }}
            >
              <div className="flex justify-between items-start">
                <div
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                  style={{ color: "var(--color-secondary)" }}
                >
                  <span className="material-symbols-outlined text-3xl">child_care</span>
                </div>
                <span
                  className="material-symbols-outlined text-6xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ color: "var(--color-secondary)" }}
                >
                  medical_services
                </span>
              </div>
              <div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-secondary-container)" }}
                >
                  Lactation Consultants
                </h2>
                <p className="mb-6" style={{ color: "color-mix(in srgb, var(--color-on-secondary-container) 70%, transparent)" }}>
                  Expert guidance to help you navigate breastfeeding challenges with confidence and ease.
                </p>
                <span
                  className="inline-block px-6 py-2.5 rounded-full font-bold text-sm"
                  style={{
                    fontFamily: "var(--font-headline)",
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-on-secondary)",
                  }}
                >
                  Learn More
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Gynaecology */}
          <Link href="/services/gynaecology" style={{ gridColumn: "span 4" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.0, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-8 flex flex-col justify-between h-full cursor-pointer border-t border-transparent transition-all"
              style={{ backgroundColor: "var(--color-surface-container-high)" }}
            >
              <div>
                <div className="mb-6" style={{ color: "var(--color-primary)" }}>
                  <span className="material-symbols-outlined text-4xl">female</span>
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Gynaecology
                </h2>
                <p className="mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
                  Specialized medical consultations focusing on reproductive health and wellness at every stage.
                </p>
              </div>
              <span
                className="flex items-center gap-2 font-bold group/btn"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
              >
                Learn More
                <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </motion.div>
          </Link>

          {/* Nannies */}
          <Link href="/services/nannies" style={{ gridColumn: "span 4" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl p-8 flex flex-col justify-between h-full cursor-pointer"
              style={{ backgroundColor: "var(--color-primary-container)" }}
            >
              <div>
                <div className="mb-6" style={{ color: "var(--color-on-primary-container)" }}>
                  <span className="material-symbols-outlined text-4xl">family_restroom</span>
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-primary-container)" }}
                >
                  Elite Nanny Placement
                </h2>
                <p className="mb-6" style={{ color: "color-mix(in srgb, var(--color-on-primary-container) 70%, transparent)" }}>
                  Vetted, compassionate caregivers who integrate seamlessly into your family's routine.
                </p>
              </div>
              <span
                className="inline-block px-6 py-2.5 rounded-full font-bold text-sm w-fit transition-colors"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "white",
                  color: "var(--color-on-primary-container)",
                }}
              >
                Learn More
              </span>
            </motion.div>
          </Link>

          {/* Postnatal Recovery */}
          <Link href="/services/postnatal" style={{ gridColumn: "span 4" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-8 flex flex-col justify-between shadow-sm border h-full cursor-pointer"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
              }}
            >
              <div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Postnatal Recovery
                </h2>
                <p className="mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
                  Physiotherapy, nutritional guidance, and mental health support for your "fourth
                  trimester" healing.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-bold underline decoration-2 underline-offset-4"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--color-on-surface)",
                    textDecorationColor: "var(--color-primary)",
                  }}
                >
                  Learn More
                </span>
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMKNC3N1JOHv0F7ao9Eh40kpee4P9I-sOtgczWDuybaVA3OCxGuj_OYzHs4yeSE6FJT90idRHklvQx-x6WuJfUno_eRTPN3xBornNLk66hqBpby5XQ0rSK9vqdEztfPVaIZCUpMNqg8c_kdBLKxbd6Gf0lcdKNU2NgImjgSZQg1gqF-l67202h385seBoEtFwncTf1QsMGbchJPUbR-U4cdFcbbfRXfit8x1PuZkBPQ4Kfdlwzkmka_Sw6N_OytuQE-4qelps3V0-U"
                    alt="Nurse"
                    width={32} height={32}
                    className="rounded-full border-2 border-white object-cover"
                  />
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuwt7aFNwMFxnryK7E33-6Cb8e4kMSfw52eNGCzeIJQraTOkZAxHqoaxQXnXSC1YyvuG9yYJMwFrSN6FdyDR3oNGfSJMzvDpo1U6QoQifGbtzidPGqBPoZKt7zXZqZGzo-K1fdee33WgW2zHstDiQpaUKrqa8WKeOLE7ZGt5u9gY1q4B9ptg_8sG_3xaRmk1OvyVSFem1jY6ys8oxo3-T4nLP7BYAnGnj5qxXnYvjz4ePgU_nVP2tvI2_ggwmbgBj_6O8cKacJgppX"
                    alt="Care worker"
                    width={32} height={32}
                    className="rounded-full border-2 border-white object-cover"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: "var(--color-surface-container-high)", color: "var(--color-on-surface)" }}
                  >
                    +12
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Trust Section */}
        <ScrollReveal>
          <section
            className="mt-24 rounded-2xl p-12 flex flex-col md:flex-row items-center gap-12"
            style={{ backgroundColor: "var(--color-surface-container-low)" }}
          >
            <div className="flex-1">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Personalized care, delivered with love.
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                We understand that every mother's journey is different. Our concierge service helps you
                build a custom care plan that fits your lifestyle, values, and medical needs.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "verified_user", label: "Fully Licensed Professionals" },
                  { icon: "schedule", label: "24/7 Support Available" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: "white", color: "var(--color-on-surface)" }}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ color: "var(--color-primary)" }}>
                      {badge.icon}
                    </span>
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-80 h-80 rounded-xl overflow-hidden relative">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTTFrlwe1svAp7sS2mr6Q3aEFGih-4-mCDxdj-M5lf9K-VCWsdSxMr1BG6eURHUAXdWkjYdkpghFNJsBo0BKIokBpIuigqAOj-pDhzRo_Iw2_ms_D2tR6Xu0u9gAs3vxiklzjZEQzjA-fhV9IsgXl7JVtNPKS4kiiemxHuZnxOtijPcG_s8_ZkNQIMNvEOtM-MLUbjAbjlf-jvkNZK1S-4SZVMurDftjHHmSmnHUJeH0CjOEFu5KD-8_yCcb8Rr7VFro6SnPc9ELCZ"
                alt="Modern minimalist clinic room"
                fill
                className="object-cover"
              />
            </div>
          </section>
        </ScrollReveal>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          .bento-grid {
            display: flex !important;
            flex-direction: column !important;
            grid-template-rows: unset !important;
          }
          .bento-grid > a {
            grid-column: unset !important;
            min-height: 360px;
          }
          .bento-grid > a > div {
            height: 100%;
          }
        }
      `}</style>

      <CTASection />
      <Footer />
    </>
  );
}
