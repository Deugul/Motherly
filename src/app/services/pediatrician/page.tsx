"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButton from "@/components/AppDownloadButton";
import ServiceEnquiryCta from "@/components/ServiceEnquiryCta";


const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PAED_INCLUDES = [
  {
    title: "Newborn examination",
    desc: "Full physical assessment including weight, reflexes, fontanelle, hip stability, heart sounds, abdominal examination, and skin colour. Jaundice assessment is a critical part of the early newborn visit.",
  },
  {
    title: "Feeding assessment",
    desc: "Your paediatrician assesses breastfeeding adequacy through weight gain patterns and feeding frequency. Feeding referrals to our lactation consultants are coordinated where needed.",
  },
  {
    title: "Developmental screening",
    desc: "At each milestone visit, your paediatrician screens for age-appropriate developmental progress including vision, hearing, motor skills, and social responsiveness.",
  },
  {
    title: "Immunisation guidance",
    desc: "Your paediatrician provides a clear, written immunisation schedule, explains each vaccine, and administers vaccinations during home visits, removing the need to visit a clinic for routine immunisations.",
  },
  {
    title: "Illness consultation",
    desc: "When your baby is unwell, a virtual or home consultation with a Motherly paediatrician provides rapid expert assessment, reducing unnecessary emergency department visits.",
  },
  {
    title: "Parent guidance and Q&A",
    desc: "First-time parents have hundreds of questions. Your paediatrician provides unhurried, evidence-based answers on sleep, feeding, skin care, colic, and developmental expectations at every visit.",
  },
];

const FAQS = [
  {
    q: "When should my newborn first see a paediatrician?",
    a: "Ideally within 3 to 5 days of discharge from hospital, before day 7. This visit is critical for jaundice screening, feeding adequacy assessment, and establishing a baseline weight after the normal newborn weight loss in the first days.",
  },
  {
    q: "Why use a home visit paediatrician rather than a clinic?",
    a: "Newborns in the first 4 weeks are highly vulnerable to respiratory infections common in busy clinic waiting rooms. A home visit eliminates this exposure entirely while providing the same quality of examination.",
  },
  {
    q: "Can a Motherly paediatrician administer vaccinations at home?",
    a: "Yes. Routine childhood immunisations can be administered during home visits with all required monitoring for adverse reaction done on-site.",
  },
  {
    q: "How much does a paediatric home visit cost in Chennai?",
    a: "Fees vary by visit type, timing, and the paediatrician's experience. Browse transparent, current pricing on each paediatrician's profile through the Motherly app before booking.",
  },
  {
    q: "Can I get a same-day virtual consultation if my baby seems unwell?",
    a: "Yes. Motherly offers same-day virtual paediatric consultations for illness reviews, fever assessment, feeding refusal, and other urgent parental concerns that do not require immediate emergency care.",
  },
];

export default function PediatricianPage() {
  const [mode, setMode] = useState<"In-Clinic" | "Virtual">("In-Clinic");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleModeToggle = (selected: "In-Clinic" | "Virtual") => {
    setMode(selected);
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="contents lg:block lg:col-span-12 lg:space-y-14">

            {/* H1 */}
            <ScrollReveal className="-order-1 lg:order-none">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Pediatrician <span style={{ color: "var(--color-primary)" }}>Consultation</span>{" "}
                in Chennai
              </h1>
            </ScrollReveal>

            {/* H2 + Intro */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Expert Baby Care From a Verified Paediatrician, at Home in Chennai
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects Chennai families with verified{" "}
                  <Link href="/services/pediatrician" style={{ color: "var(--color-primary)" }}>
                    paediatricians
                  </Link>
                  . As the most trusted newborn doctor Chennai parents choose for home visits, we offer
                  both paediatric home visits and virtual child health consultations Chennai families
                  can access without queuing in busy clinics during the vulnerable early weeks.
                </p>
                <div className="mt-6">
                  <ServiceEnquiryCta
                    serviceKey="pediatrician"
                    serviceOptions={[
                      "Pediatrician Consultation",
                      "Doulas",
                      "Lactation Consultants",
                      "Gynaecology Consultation",
                      "Nanny Care",
                      "Postnatal Recovery",
                    ]}
                  />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="https://mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>newborn sleep patterns</a>,{" "}
                  <a href="https://mothrly.com/blogs/5-signs-baby-getting-enough-breast-milk" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>signs baby getting enough breast milk</a>,{" "}
                  <a href="https://mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>breastfeeding rules</a>,{" "}
                  <a href="https://www.mothrly.com/our-services/lactation-consultants" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>lactation consultants service</a>, and{" "}
                  <a href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal care</a>.
                </p>
              </section>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "3 to 5\nDay", label: "First critical paediatric check after hospital discharge" },
                  { value: "12\nStandard", label: "Immunisation-linked paediatric visits in the first year" },
                  { value: "Home\nVisits", label: "Available across Chennai, avoiding clinic exposure for newborns" },
                  { value: "Same\nDay", label: "Virtual consultations for urgent concerns and illness reviews" },
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

            {/* Featured Image */}
            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <MotionImage
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src="/Pediatrician-hero.jpg"
                  alt="A verified paediatrician conducting a newborn home visit in Chennai"
                  width={800}
                  height={400}
                  className="w-full h-[360px] object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(172,45,94,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    Expert Newborn Care
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Care that comes to you.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            {/* Home visit vs Virtual */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Paediatric Home Visits and Virtual Consultations: Two Ways Motherly Helps
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both paediatric home visits and virtual consultations in Chennai,
                  giving parents access to expert child health care in whichever format best suits
                  their situation.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "Paediatric home visit",
                      body: "Your paediatrician visits your home for newborn check-ups, well-baby examinations, and vaccination administration. Home visits are ideal for the first 4 weeks of life when clinic exposure carries real infection risk and when the quality of examination is enhanced by observing the baby in their natural environment.",
                    },
                    {
                      title: "Virtual paediatric consultation",
                      body: "When your baby is unwell, or when you have a developmental concern, feeding question, or general query that does not require a physical examination, same-day virtual consultations provide rapid expert assessment and reduce unnecessary emergency department visits.",
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

            {/* What visits include */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Motherly's Paediatrician Visits Include
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                >
                  {PAED_INCLUDES.map((item, i) => (
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
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Who Benefits Most From Paediatric Home Visits
                </h2>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  Paediatric home visits are particularly valuable for:
                </p>
                <ul className="space-y-3">
                  {[
                    "Families with newborns in the first 4 weeks, when clinic exposure carries real infection risk",
                    "Mothers recovering from a C-section for whom hospital travel in the early days is physically challenging",
                    "Parents of premature or low-birth-weight babies who require more frequent weight monitoring",
                    "Families managing twins or multiple newborns simultaneously",
                    "First-time parents who want unhurried, detailed guidance that a busy outpatient clinic cannot provide",
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
                  "Our daughter had jaundice and I was terrified every time we had to take her to the
                  clinic. Having our Motherly paediatrician visit at home changed everything. She was
                  calm, thorough, and explained every reading to us. By week three we felt completely
                  confident about our baby's health for the first time."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Sunitha and Ravi N.</strong>
                  <span style={{ color: "#a16207" }}> | Parents of one, Besant Nagar, Chennai</span>
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

          

        </div>
      </main>
      <Footer />
    </>
  );
}
