"use client";

import { useState, useRef, useLayoutEffect } from "react";
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

const BABY_CARE_PROVIDES = [
  {
    icon: "baby_changing_station",
    title: "Safe Bathing & Hygiene",
    desc: "Gentle newborn bathing, cord stump care, nappy hygiene, and skin care for newborn skin appropriate to Chennai's climate.",
  },
  {
    icon: "nutrition",
    title: "Feeding Support",
    desc: "Breastfeeding positioning, paced bottle feeding, burping techniques, and coordination with a lactation consultant for complex cases.",
  },
  {
    icon: "bedtime",
    title: "Sleep Routine",
    desc: "Age-appropriate sleep routine establishment, safe sleep education (back position, firm flat surface), and settling techniques for newborns.",
  },
  {
    icon: "child_care",
    title: "Baby Massage",
    desc: "Traditional Indian oil massage using sesame or coconut oil, promoting weight gain, digestion, sleep, and the parent-baby bond.",
  },
];

const JOURNEY_STAGES = [
  {
    num: 1,
    title: "First days home from hospital",
    text: "Your Baby Care specialist can be present from day one, ensuring your newborn is bathed, fed, and settled safely while you recover from birth.",
    link: null,
  },
  {
    num: 2,
    title: "Weeks one to four (newborn period)",
    text: "Daily in-home support covering cord care, bathing, feeding assistance, and monitoring for jaundice or early illness signs with escalation to a paediatrician when needed.",
    link: { label: "paediatrician in Chennai", url: "/services/pediatrician" },
  },
  {
    num: 3,
    title: "Weeks four to twelve (early infancy)",
    text: "Sleep routine development, introduction of a daily schedule, continued feeding support, and age-appropriate developmental stimulation.",
    link: { label: "lactation consultants", url: "/services/lactation-consultants" },
  },
  {
    num: 4,
    title: "Three months to one year (ongoing infant care)",
    text: "Milestone tracking guidance, weaning support, developmental stimulation, and continued professional oversight through Motherly's virtual consultation service.",
    link: null,
  },
];

const WHO_IS_IT_FOR = [
  "First-time parents who are unsure about safe bathing, feeding, or sleep practices for a newborn",
  "Parents of twins or multiple infants who need additional trained hands-on support",
  "Managing a premature baby or a baby with special health needs requiring extra monitoring",
  "Experiencing postnatal exhaustion and wanting to ensure your baby is professionally supervised while you recover",
  "Away from extended family in Chennai and without a traditional support system for the early weeks",
  "Concerned about colic, reflux, feeding difficulties, or slow weight gain in your baby",
];

const FAQS = [
  {
    q: "How much does Baby Care cost in Chennai?",
    a: "Baby Care pricing at Motherly depends on whether you choose in-home daily care, overnight newborn support, or virtual consultations, and the duration of engagement. Overnight care is priced separately from daytime visits. Please use the Motherly app or contact us for a customised quote based on your baby's age, your location in Chennai, and your family's specific needs.",
  },
  {
    q: "How is a Motherly Baby Care specialist different from a regular nanny or ayah?",
    a: "A regular nanny or domestic ayah is not trained in newborn physiology, safe sleep practices, feeding science, or medical monitoring. Motherly's Baby Care specialists are certified newborn care professionals who can identify early warning signs of illness or developmental concerns that an untrained caregiver would miss, and they know when to escalate to a paediatrician.",
  },
  {
    q: "Do you offer overnight Baby Care in Chennai?",
    a: "Yes. Overnight Baby Care is one of our most requested services, particularly for exhausted mothers in the first few weeks after delivery. A Motherly Baby Care specialist can manage night feeds, settling, and monitoring so you can rest and recover. Overnight shifts are available across Chennai through the Motherly app.",
  },
  {
    q: "Can Baby Care specialists help with colic and reflux?",
    a: "Yes. Our specialists are trained to identify feeding-related causes of colic and apply soothing techniques that calm a colicky baby. For suspected reflux, your specialist will coordinate with Motherly's paediatric network to ensure your baby receives appropriate medical evaluation.",
  },
  {
    q: "At what age can I use Baby Care services?",
    a: "Motherly's Baby Care services are available from birth through the first year of life. Our specialists are experienced with newborns from day one. For babies older than one year, our service transitions into toddler care guidance, which can be discussed during your initial consultation.",
  },
  {
    q: "Is Baby Care available if I have twins?",
    a: "Motherly can arrange specialist support for twin care. Depending on your needs, we may recommend two specialists for round-the-clock coverage or one experienced newborn specialist trained in managing multiple infants. Please contact us to discuss your specific twin care requirements.",
  },
  {
    q: "Do you provide Baby Care across all areas of Chennai?",
    a: "Motherly provides in-home Baby Care services across Chennai including Mylapore, Adyar, Anna Nagar, T. Nagar, Velachery, Nungambakkam, Porur, Sholinganallur, and surrounding areas. Use the Motherly app to confirm availability in your pincode.",
  },
];

export default function BabyCarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main
        className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          <div className="contents lg:block lg:col-span-12 lg:space-y-14">

            <ScrollReveal className="-order-1 lg:order-none">
              <section className="relative">
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
                />
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Book a{" "}
                  <span style={{ color: "var(--color-primary)" }}>Baby Care Specialist</span>
                  {" "}in Chennai
                </h1>
                <p
                  className="text-base md:text-lg mt-4 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Expert newborn care from verified Baby Care specialists — in-home bathing, feeding support, sleep routines, and traditional baby massage from day one through your baby's first year.
                </p>
                <div className="mt-6">
                  <ServiceEnquiryCta
                  serviceKey="baby-care"
                  serviceOptions={["Baby Care","In-Home Newborn Care","Virtual Baby Care","Overnight Baby Care"]}
                />
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "98%", label: "Parents felt more confident with their newborn" },
                  { value: "40+", label: "Verified Baby Care specialists across Chennai" },
                  { value: "24/7", label: "Overnight Baby Care available on request" },
                  { value: "0–12", label: "Months Baby age supported by our specialists" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
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

            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/baby-care.png"
                    alt="A Motherly Baby Care specialist providing gentle newborn care at home in Chennai"
                    width={800}
                    height={400}
                    className="w-full h-[360px] object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(172,45,94,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    Expert Newborn Care
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Care from day one.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Expert Baby Care That Goes Beyond Babysitting
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects new parents in Chennai with trained, verified newborn care specialists and Baby Care professionals. As the trusted newborn care Chennai families rely on, we provide continuous Baby Care Chennai parents need, from the first hours home through the critical first year of your baby's life.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="/services/pediatrician" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>paediatrician in Chennai</a>,{" "}
                  <a href="/services/lactation-consultants" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>lactation consultant</a>, and Mother Care services.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  In-Home Newborn Care and Virtual Consultations: Two Ways Motherly Supports Your Baby
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "In-Home Newborn Care",
                      desc: "An in-home Baby Care specialist provides continuous, hands-on support from the day you bring your baby home. She attends to bathing, feeding assistance, sleep routine establishment, and daily monitoring, staying with your baby while you rest and recover.",
                    },
                    {
                      title: "Virtual Baby Care Consultations",
                      desc: "A virtual Baby Care specialist supports you remotely through scheduled video sessions covering feeding questions, sleep guidance, developmental milestone tracking, and concerns about colic or reflux.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
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
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Is Baby Care and Why Chennai Parents Are Choosing It
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Baby Care refers to the specialised professional support provided to a newborn or infant to ensure their physical health, hygiene, comfort, and early development. In Chennai, where first-time parents increasingly face newborn care without nearby family guidance, having a trained Baby Care specialist at home is becoming an essential choice among informed families.
                </p>

                <div
                  className="p-6 rounded-2xl border-l-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>What the research says</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    Research consistently shows that professional newborn care support improves breastfeeding success rates, reduces the risk of preventable infant health complications, and significantly lowers parental anxiety in the early postnatal weeks. A Baby Care specialist is not a replacement for your paediatrician or nursing team. She works alongside your medical professionals to ensure your baby thrives between clinical check-ups.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Our Baby Care Specialists Provide
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                >
                  {BABY_CARE_PROVIDES.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="p-5 flex flex-col gap-3"
                      style={{ backgroundColor: "var(--color-surface-container-low)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--color-primary-container) 50%, white)",
                          color: "var(--color-primary)",
                        }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <div>
                        <h3
                          className="text-sm font-bold mb-1.5"
                          style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Baby Care Through Your Baby's First Year
                </h2>
                <div className="space-y-0">
                  {JOURNEY_STAGES.map((stage, i) => (
                    <motion.div
                      key={stage.num}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="flex gap-5 border-b py-6"
                      style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-black text-base"
                        style={{ backgroundColor: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {stage.num}
                      </div>
                      <div className="space-y-2">
                        <h4
                          className="font-bold text-base"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          {stage.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {stage.text}
                        </p>
                        {stage.link && (
                          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                            See also:{" "}
                            <a href={stage.link.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>{stage.link.label}</a>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Who Is Baby Care Right For?
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Baby Care from Motherly is particularly valuable if you are:
                </p>
                <ul className="space-y-3">
                  {WHO_IS_IT_FOR.map((item) => (
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

            <ScrollReveal direction="right">
              <blockquote
                className="rounded-2xl p-6 border-l-4"
                style={{
                  backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)",
                  borderColor: "#d97706",
                }}
              >
                <p
                  className="text-base italic leading-relaxed mb-4"
                  style={{ color: "#92400e" }}
                >
                  "My daughter had colic for the first six weeks and I had no idea what to do. The Motherly Baby Care specialist helped us establish a feeding and settling routine that changed everything overnight. She also spotted that my baby had a mild latch issue and connected us with a lactation consultant the same week. I cannot imagine those early weeks without Motherly."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Priya M.</strong>
                  <span style={{ color: "#a16207" }}> | First-time mother, Mylapore, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-3">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Frequently Asked Questions
                </h2>
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border"
                    style={{
                      backgroundColor: openFaq === i
                        ? "color-mix(in srgb, var(--color-secondary-container) 30%, white)"
                        : "var(--color-surface-container-lowest)",
                      borderColor: openFaq === i
                        ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                        : "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                      transition: "background-color 0.2s, border-color 0.2s",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      <span className="pr-4 text-sm md:text-base">
                        <span className="text-xs font-bold mr-2" style={{ color: "var(--color-primary)" }}>Q{i + 1}</span>
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="material-symbols-outlined shrink-0"
                        style={{ color: "var(--color-primary)" }}
                      >
                        keyboard_arrow_down
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
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
                ))}
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="rounded-2xl p-8 text-center space-y-4"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 40%, white)" }}
              >
                <h3
                  className="text-xl md:text-2xl font-bold"
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
                  <a href="https://www.mothrly.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                    www.mothrly.com
                  </a>
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
