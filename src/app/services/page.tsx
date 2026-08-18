"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import InlineCtaBand from "@/components/InlineCtaBand";
import ServiceReviews from "@/components/ServiceReviews";
import RelatedReading from "@/components/RelatedReading";
import { HOMEPAGE_REVIEWS } from "@/data/service-reviews";
import type { RelatedPost } from "@/data/service-related-reading";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/** One post per major service, so the hub links across the whole catalogue. */
const HUB_RELATED_READING: RelatedPost[] = [
  { title: "Doula vs Midwife: Who Cares for You and Your Baby", slug: "doula-vs-midwife-who-cares-for-you-and-your-baby" },
  { title: "Why Every New Mother May Need a Lactation Consultant", slug: "why-every-new-mother-may-need-a-lactation-consultant" },
  { title: "Postpartum Care in Chennai: Complete Guide for New Moms", slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
];

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
                  src="/doulas-hero.jpg"
                  alt="A Motherly doula supporting an expectant mother through labour"
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
          <Link href="/services/lactation-consultants" style={{ gridColumn: "span 5" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl flex flex-col justify-between p-8 h-full cursor-pointer"
              style={{ backgroundColor: "var(--color-secondary-container)" }}
            >
              <div className="relative w-full h-40 rounded-xl overflow-hidden">
                <Image
                  src="/lactation-hero.jpg"
                  alt="A lactation consultant guiding a mother through a feed at home"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
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
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",
                  }}
                >
                  Learn More
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Gynaecology */}
          <Link href="/services/gynecologist-consultation" style={{ gridColumn: "span 4" }}>
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
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/gynaecology-hero.jpg"
                    alt="A gynaecologist consultation for prenatal and postpartum care"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
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
          <Link href="/services/nanny-services" style={{ gridColumn: "span 4" }}>
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
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/nannies-hero.jpg"
                    alt="A verified Motherly nanny caring for a newborn at home"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
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
                  color: "var(--color-primary)",
                }}
              >
                Learn More
              </span>
            </motion.div>
          </Link>

          {/* Postnatal Recovery */}
          <Link href="/services/postnatal-recovery-care" style={{ gridColumn: "span 4" }}>
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
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/postnatal-hero.jpg"
                    alt="Postnatal recovery care session with a new mother at home"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
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
              <span
                className="font-bold underline decoration-2 underline-offset-4"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--color-primary)",
                  textDecorationColor: "var(--color-primary)",
                }}
              >
                Learn More
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Second CTA — catches visitors who decide straight off the cards,
            rather than making them scroll to the banner at the very bottom. */}
        <InlineCtaBand
          className="mt-16"
          heading="Not sure which service you need?"
          subheading="Tell us where you are in your journey and our care team will point you to the right professional."
          primaryLabel="Talk to a Care Advisor"
          primaryHref="/contact"
        />

        {/* What mothers say */}
        <ServiceReviews className="mt-20" reviews={HOMEPAGE_REVIEWS} />

        {/* Related reading */}
        <RelatedReading className="mt-16" posts={HUB_RELATED_READING} />

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
                src="/about-journey-caregiver.jpg"
                alt="A Motherly caregiver on a home visit"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
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
