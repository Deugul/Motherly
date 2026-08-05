"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButton from "@/components/AppDownloadButton";
import ServiceEnquiryCta from "@/components/ServiceEnquiryCta";


const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const YOGA_INCLUDES = [
  {
    title: "Initial health assessment",
    desc: "Your instructor reviews your pregnancy history, any medical conditions or restrictions, previous yoga experience, and specific goals before your first session. Every practice is personalised from the start.",
  },
  {
    title: "Pranayama (breathwork)",
    desc: "Breath is the foundation of every session. Your instructor teaches labour breathing techniques, calming breath for anxiety management, and energising breath for fatigue, practices with direct utility beyond the yoga mat.",
  },
  {
    title: "Safe trimester-appropriate asana",
    desc: "Carefully selected postures appropriate to your trimester and physical condition. Modifications are offered continuously. No posture is performed without ensuring it is appropriate and comfortable for your specific body.",
  },
  {
    title: "Pelvic floor and core work",
    desc: "Integrated into every session. Pelvic floor awareness, strengthening, and releasing, critical for both birth preparation and postnatal recovery, including the prevention and management of diastasis recti.",
  },
  {
    title: "Yoga nidra and relaxation",
    desc: "Each session ends with guided relaxation, supporting the parasympathetic nervous system, improving sleep quality, and providing the restorative rest that pregnancy and new motherhood demand.",
  },
  {
    title: "Partner yoga (optional)",
    desc: "Sessions can include your partner, teaching supportive contact, massage techniques, and breathing cues they can use during labour. A practical and intimate form of birth preparation.",
  },
];

const FAQS = [
  {
    q: "Is yoga safe in the first trimester?",
    a: "For most women with uncomplicated pregnancies, gentle prenatal yoga is safe from the first trimester. Avoid hot yoga, deep twists, inversions, and intense core work. Your Motherly instructor ensures every session is appropriate to your stage and health status.",
  },
  {
    q: "I have never done yoga before. Can I still do prenatal yoga?",
    a: "Absolutely. No prior yoga experience is required. Our instructors work from complete beginners upwards and create practices that feel accessible and achievable regardless of your fitness background.",
  },
  {
    q: "When can I start postnatal yoga after a C-section?",
    a: "Postnatal yoga is typically safe to begin from 8 to 12 weeks after a C-section with medical clearance. Your instructor will design a gentle, modified programme that avoids stress on the incision site.",
    readMore: { label: "postpartum belly recovery", href: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
  },
  {
    q: "How much does prenatal yoga cost in Chennai?",
    a: "Session fees vary by format (in-home vs virtual), session duration, and whether you book individual sessions or a package. Browse transparent, current pricing on each instructor's profile through the Motherly app.",
  },
  {
    q: "Do you offer virtual prenatal yoga sessions?",
    a: "Yes. All Motherly yoga sessions are available virtually, allowing you to practice in your own space with a certified instructor guiding you in real time. Home sessions and virtual sessions are both bookable through the Motherly app.",
  },
];

export default function YogaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main
        className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="contents lg:block lg:col-span-7 lg:space-y-14">

            {/* H1 */}
            <ScrollReveal className="-order-1 lg:order-none">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Prenatal &amp; <span style={{ color: "var(--color-primary)" }}>Postnatal Yoga</span> in Chennai
              </h1>
            </ScrollReveal>

            {/* H2 + Intro */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Yoga Designed for Your Body, at Every Stage of the Maternal Journey
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects expecting and new mothers in Chennai with certified{" "}
                  <Link href="/services/yoga" style={{ color: "var(--color-primary)" }}>
                    prenatal and postnatal yoga instructors
                  </Link>
                  . As the most trusted pregnancy yoga Chennai mothers choose for safety and
                  personalisation, we offer both in-home prenatal yoga Chennai families love and
                  virtual maternity yoga sessions that fit around the demands of modern motherhood.
                </p>
                <div className="mt-6">
                  <ServiceEnquiryCta
                  serviceKey="yoga"
                  serviceOptions={["Doulas","Lactation Consultants","Gynaecology Consultation","Nanny Care","Postnatal Recovery","Nutrition Consultation","Prenatal Yoga"]}
                />
                </div>
              </section>
            </ScrollReveal>

    
          </div>

          {/* ── Right Column: Service image ── */}
          <aside className="lg:col-span-5 lg:self-start">
            {/* Featured Image */}
            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/yoga-hero.jpg"
                    alt="Certified prenatal yoga instructor guiding a mother through gentle breathwork in Chennai"
                    width={800}
                    height={400}
                    className="w-full h-[360px] lg:min-h-[480px] lg:h-[520px] object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(172,45,94,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    Our Practice
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Movement begins before birth.
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
                {/* Stats row */}
                <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                {[
                  { value: "14\nWeeks", label: "Safe time to begin prenatal yoga for most uncomplicated pregnancies" },
                  { value: "31%\nReduction", label: "In perceived labour pain reported by regular prenatal yoga practitioners" },
                  { value: "6 to 8\nWeeks", label: "Recommended start point for postnatal yoga after vaginal delivery" },
                  { value: "Home\nSessions", label: "Available across Chennai with certified Motherly instructors" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: easeOut }}
                    className="p-5 rounded-2xl border flex flex-col items-center text-center"
                    style={{
                      backgroundColor: "var(--color-surface-container-low)",
                      borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                    }}
                  >
                    <div
                      className="text-xl md:text-2xl font-black text-center w-full whitespace-pre-line leading-tight"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                    >
                      {stat.value}
                    </div>
                    <p className="text-xs mt-2 leading-snug" style={{ color: "var(--color-on-surface-variant)" }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

        <div className="mt-12 lg:mt-14 space-y-14">

            
            {/* Prenatal vs Postnatal */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Prenatal Yoga and Postnatal Yoga: Two Ways Motherly Supports You
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both prenatal yoga for expecting mothers and postnatal yoga for new
                  mothers in Chennai, recognising that the physical and emotional needs of each stage
                  are distinct.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "Prenatal yoga",
                      body: "Designed for expecting mothers from the first trimester through to the end of pregnancy. Focuses on breathing for labour, pelvic floor activation, gentle strength and flexibility, optimal foetal positioning in the third trimester, and mental preparation for birth. Adapted at every trimester and at every session based on how you feel that day.",
                    },
                    {
                      title: "Postnatal yoga",
                      body: "Begins from 6 to 8 weeks after vaginal delivery (8 to 12 weeks after C-section). Focuses on rebuilding pelvic floor and core integrity, addressing diastasis recti, relieving the shoulder and neck tension of nursing, restoring energy, and supporting emotional recovery from birth. Adapted to your specific delivery experience and postpartum challenges.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1, ease: easeOut }}
                      className="p-5 rounded-2xl border"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                        backgroundColor: "var(--color-surface-container-low)",
                      }}
                    >
                      <h3
                        className="text-base font-bold mb-2"
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {card.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Evidence section */}
            <ScrollReveal direction="left">
              <section className="space-y-3">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Why Yoga Is One of the Most Evidence-Backed Supports in Maternal Care
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Studies in obstetrics journals consistently show that regular prenatal yoga reduces
                  pregnancy-related back pain, improves sleep quality, lowers perceived labour pain,
                  reduces anxiety, and is associated with higher birth satisfaction scores. Postnatal
                  yoga accelerates physical recovery and reduces symptoms of postpartum depression. See
                  also:{" "}
                  <Link href="https://www.mothrly.com/blogs/can-stress-cause-miscarriage-in-first-trimester" style={{ color: "var(--color-primary)" }}>
                    can stress cause miscarriage
                  </Link>,{" "}
                  <Link href="https://mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" style={{ color: "var(--color-primary)" }}>
                    walking during pregnancy
                  </Link>,{" "}
                  <Link href="https://mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" style={{ color: "var(--color-primary)" }}>
                    postpartum belly
                  </Link>,{" "}
                  <Link href="https://mothrly.com/blogs/why-is-it-so-hard-to-lose-weight-while-breastfeeding" style={{ color: "var(--color-primary)" }}>
                    lose weight while breastfeeding
                  </Link>, and{" "}
                  <Link href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)" }}>
                    postnatal care
                  </Link>.
                </p>
              </section>
            </ScrollReveal>

            {/* What a session includes */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What a Motherly Yoga Session Includes
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                >
                  {YOGA_INCLUDES.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: easeOut }}
                      className="p-5"
                      style={{ backgroundColor: "var(--color-surface-container-low)" }}
                    >
                      <h3
                        className="text-sm font-bold mb-1.5"
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Who Benefits Most */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Who Benefits Most From Motherly's Yoga Services
                </h2>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly's pregnancy and postnatal yoga is ideal for:
                </p>
                <ul className="space-y-3">
                  {[
                    "First-time mothers wanting a safe, expert-guided introduction to yoga during pregnancy",
                    "Mothers experiencing pregnancy back pain, pelvic girdle pain, or sciatica",
                    "Women managing pregnancy anxiety or birth fear who need breath-based calming tools",
                    "Mothers preparing for a natural, unmedicated birth who want physical and mental conditioning",
                    "Postnatal mothers experiencing core weakness, diastasis recti, or pelvic floor dysfunction",
                    "Mothers managing postpartum mood changes who want a restorative, movement-based support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span
                        className="material-symbols-outlined text-base mt-0.5 flex-shrink-0"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal direction="right">
              <blockquote
                className="rounded-2xl p-6 border-l-4"
                style={{
                  backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)",
                  borderColor: "#d97706",
                }}
              >
                <p className="text-base italic leading-relaxed mb-4" style={{ color: "#92400e" }}>
                  "I started prenatal yoga at 16 weeks with my Motherly instructor and it completely
                  changed my relationship with my pregnancy. The breathing techniques she taught me in
                  class are the reason I got through 18 hours of labour without an epidural. I still
                  use them now when my toddler is testing me."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Ananya S.</strong>
                  <span style={{ color: "#a16207" }}> | Mother of one, Kilpauk, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* FAQ Accordion */}
            <ScrollReveal direction="left">
              <section className="space-y-3">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Frequently Asked Questions
                </h2>
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-lg border overflow-hidden"
                      style={{
                        backgroundColor: isOpen
                          ? "color-mix(in srgb, var(--color-secondary-container) 30%, white)"
                          : "var(--color-surface-container-lowest)",
                        borderColor: isOpen
                          ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                          : "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                        transition: "background-color 0.2s, border-color 0.2s",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        <span className="pr-4 text-sm md:text-base">
                          <span className="text-xs font-bold mr-2" style={{ color: "var(--color-primary)" }}>Q{i + 1}</span>
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="material-symbols-outlined shrink-0"
                          style={{ color: "var(--color-primary)" }}
                        >
                          keyboard_arrow_down
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div
                              className="px-6 pb-5 border-t"
                              style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)" }}
                            >
                              <p className="pt-4 text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                                {faq.a}
                              </p>
                              {faq.readMore && (
                                <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                  Read more:{" "}
                                  <Link href={faq.readMore.href} style={{ color: "var(--color-primary)" }}>
                                    {faq.readMore.label}
                                  </Link>
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </section>
            </ScrollReveal>

            {/* App CTA */}
            <ScrollReveal>
              <div
                className="rounded-2xl p-6 text-center space-y-3"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 30%, white)" }}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Book through the Motherly app
                </h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  Browse verified professionals, view profiles and reviews, and book a home visit in minutes.
                </p>
                <div className="flex justify-center pt-2">
                  <AppDownloadButton variant="card" />
                </div>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  Or visit{" "}
                  <Link href="https://www.mothrly.com" style={{ color: "var(--color-primary)" }}>
                    www.mothrly.com
                  </Link>
                </p>
              </div>
            </ScrollReveal>
        </div>

      </main>
      <Footer />
    </>
  );
}
