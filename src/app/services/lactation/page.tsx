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

const schema = z.object({
  service: z.string().min(1),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  date: z.string().min(1, "Date is required").refine(
    (val) => { const t = new Date(); t.setHours(0, 0, 0, 0); return new Date(val) >= t; },
    "Please select today or a future date"
  ),
  time: z.string().min(1, "Time is required").refine(
    (val) => { const [h] = val.split(":").map(Number); return h >= 9 && h < 18; },
    "Please select a time between 9 AM and 6 PM"
  ),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-5 py-4 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

export default function LactationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formActive, setFormActive] = useState(false);
  const formWrapperRef = useRef<HTMLElement>(null);
  const preActivateTop = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (formActive && preActivateTop.current !== null && formWrapperRef.current) {
      const diff = formWrapperRef.current.getBoundingClientRect().top - preActivateTop.current;
      if (Math.abs(diff) > 1) window.scrollBy({ top: diff, behavior: "instant" });
      preActivateTop.current = null;
    }
  }, [formActive]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "Service Bookings", page: "Lactation Consultants", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-10 md:pb-16" style={{ backgroundColor: "var(--color-background)" }}>

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-2xl min-h-[420px] flex items-center"
              style={{ backgroundColor: "var(--color-surface-container-low)" }}
            >
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
                style={{ backgroundColor: "var(--color-primary-container)" }} />
              <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full blur-2xl opacity-10 pointer-events-none"
                style={{ backgroundColor: "var(--color-secondary-container)" }} />

              <div className="grid md:grid-cols-2 gap-12 relative z-10 p-8 md:p-16 items-center w-full">
                <div>
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">person_heart</span>
                    Care Services
                  </span>
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    Book a{" "}
                    <span style={{ color: "var(--color-primary)" }}>Lactation Consultant</span>
                    <br />in Chennai
                  </h1>
                  <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Expert breastfeeding support from certified lactation consultants — hands-on home visits and virtual sessions from day one through your entire nursing journey.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[0, 1].map((i) => (
                        <Image
                          key={i}
                          src="/lactation-hero.jpg"
                          alt="Consultant"
                          width={40} height={40}
                          className="rounded-full border-2 object-cover"
                          style={{ borderColor: "var(--color-surface-container-lowest)" }}
                        />
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="font-bold" style={{ color: "var(--color-on-surface)" }}>15+</span> Dedicated Consultants
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl -rotate-3 scale-105"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)" }}
                  />
                  <div className="relative z-10 w-full aspect-[4/3] rounded-2xl shadow-xl overflow-hidden">
                    <Image
                      src="/lactation-hero.jpg"
                      alt="Lactation consultant supporting a mother and newborn"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Main Content + Form ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-14">

            {/* Intro */}
            <ScrollReveal direction="left">
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Expert Breastfeeding Support, When You Need It Most
              </h2>
              <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                Motherly connects new mothers in Chennai with certified{" "}
                <a href="https://mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                  lactation consultants
                </a>
                . As the leading breastfeeding support Chennai mothers trust, we provide hands-on lactation care in Chennai at home, from day one through your entire nursing journey.
              </p>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--color-on-surface-variant)" }}>
                See also:{" "}
                <a href="https://mothrly.com/blogs/why-is-my-breast-milk-not-coming-causes-and-easy-solutions" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>breast milk not coming</a>,{" "}
                <a href="https://mothrly.com/blogs/how-to-increase-breast-milk-supply" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>increase breast milk supply</a>,{" "}
                <a href="https://mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>breastfeeding rules</a>, and{" "}
                <a href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal care</a>.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.05} direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "80%", label: "Breastfeeding difficulties can be resolved with early professional support" },
                  { value: "6 Weeks", label: "The most critical window for establishing long-term milk supply" },
                  { value: "1 In 3", label: "New mothers stop breastfeeding earlier than intended due to unsupported challenges" },
                  { value: "In-Home", label: "Services available from day 2 after delivery across Chennai" },
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

            {/* In-Home vs Virtual */}
            <ScrollReveal delay={0.05} direction="right">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  In-Home Lactation Visits and Virtual Breastfeeding Support: Two Ways Motherly Helps
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both in-home lactation consultations and virtual breastfeeding support sessions in Chennai, because every mother's situation and preference is different.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "In-home lactation consultation",
                      desc: "Your consultant visits your home, observes a real feed in your real environment, performs a hands-on latch assessment, checks for tongue-tie and oral anatomy concerns, and provides immediate physical guidance. In-home visits are the gold standard, especially in the first two weeks when a precise, in-person assessment makes the most difference.",
                    },
                    {
                      title: "Virtual breastfeeding support",
                      desc: "For follow-up sessions, supply queries, returning-to-work planning, or mothers in Chennai localities where home visits are not immediately available, virtual consultations provide expert guidance by video call. Your consultant observes a feed live on screen and provides real-time coaching.",
                    },
                  ].map((type, i) => (
                    <motion.div
                      key={type.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="p-6 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--color-surface-container-lowest)",
                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                      }}
                    >
                      <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                        {type.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {type.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Why Breastfeeding Is Harder */}
            <ScrollReveal delay={0.05} direction="left">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Why Breastfeeding Is Harder Than Anyone Tells You
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Breastfeeding is natural, but that does not mean it comes naturally. Whether you are a first-time mother struggling with positioning or dealing with a low supply after a C-section, a{" "}
                  <a href="/our-services/lactation-consultants" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                    lactation consultant
                  </a>{" "}
                  provides the targeted, evidence-based help that no parenting book or family advice can fully replace.
                </p>
                <div
                  className="p-6 rounded-2xl border-l-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>The WHO recommendation</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    The World Health Organisation recommends exclusive breastfeeding for the first 6 months of life, followed by continued breastfeeding alongside complementary foods up to 2 years. Achieving this goal is significantly more likely with access to skilled lactation support.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* What a Motherly Lactation Consultant Does */}
            <ScrollReveal delay={0.05} direction="right">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  What a Motherly Lactation Consultant Does
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      icon: "child_care",
                      title: "Latch assessment and correction",
                      desc: "Your consultant observes a full feeding in real time, assessing latch angle, lip flange, jaw movement, and suck-swallow pattern. Small corrections to positioning often resolve pain and improve milk transfer immediately.",
                    },
                    {
                      icon: "water_drop",
                      title: "Milk supply evaluation",
                      desc: "Your consultant assesses supply through feeding history, weighted feeds, and your baby's growth and output. If supply is low, she identifies the root cause and creates a plan to increase it.",
                    },
                    {
                      icon: "medical_information",
                      title: "Tongue-tie and oral assessment",
                      desc: "Tongue-tie and lip-tie are commonly missed causes of latch difficulty and nipple pain in India. Your consultant screens for these and refers appropriately when intervention is needed.",
                    },
                    {
                      icon: "healing",
                      title: "Engorgement and mastitis management",
                      desc: "Painful engorgement and mastitis can end breastfeeding journeys prematurely. Your consultant provides immediate hands-on relief techniques and guidance to prevent progression to serious infection.",
                    },
                    {
                      icon: "work",
                      title: "Return-to-work planning",
                      desc: "Returning to work does not have to mean the end of breastfeeding. Your consultant creates a personalised pumping and storage schedule so your supply is maintained and your baby continues receiving breast milk.",
                    },
                    {
                      icon: "refresh",
                      title: "Relactation support",
                      desc: "If you stopped breastfeeding and want to restart, relactation is possible with the right support. Your consultant develops a structured protocol and provides ongoing monitoring throughout the process.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="p-6 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--color-surface-container-lowest)",
                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-2xl mb-3 block"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        {item.icon}
                      </span>
                      <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Who Benefits Most */}
            <ScrollReveal delay={0.05} direction="left">
              <section
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Who Benefits Most From Lactation Consultant Support
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Contact a Motherly lactation consultant if you experience:
                </p>
                <ul className="space-y-3">
                  {[
                    { text: "Persistent nipple pain or cracking beyond the first week", link: null },
                    {
                      text: "Baby not regaining birth weight by 2 weeks",
                      link: { label: "signs your baby is getting enough milk", url: "https://www.mothrly.com/blogs/breastfeeding-rules-that-every-new-mother-should-know" },
                    },
                    { text: "Breast engorgement that is not relieved by feeding or pumping", link: null },
                    { text: "Symptoms of mastitis, including fever, redness, and breast hardness", link: null },
                    {
                      text: "Low milk supply not improving with diet and feeding frequency",
                      link: { label: "how to increase breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
                    },
                    { text: "Concerns about breastfeeding after a C-section delivery", link: null },
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="material-symbols-outlined text-base mt-0.5 shrink-0"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {point.text}
                        {point.link && (
                          <>
                            {". See: "}
                            <a href={point.link.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                              {point.link.label}
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal delay={0.05} direction="right">
              <blockquote
                className="p-7 rounded-2xl border-l-4 italic"
                style={{ backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)", borderLeftColor: "#d97706" }}
              >
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                  "My baby was losing weight and I was in so much pain I was ready to stop at day 5. My Motherly lactation consultant came the next morning, watched one feed, spotted the shallow latch immediately, and repositioned us both. Within two days my pain was gone and my baby was gaining. I wish I had called on day one."
                </p>
                <footer className="mt-4">
                  <span className="font-bold not-italic" style={{ color: "var(--color-primary)" }}>— Deepa M.</span>
                  <span className="text-sm ml-2 not-italic" style={{ color: "var(--color-on-surface-variant)" }}>| Mother of one, Anna Nagar, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Book early callout */}
            <ScrollReveal delay={0.05} direction="left">
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--color-surface-container-low)",
                  borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                }}
              >
                <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                  Book early, not late
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  The most effective time to see a lactation consultant is day 2 to 3 after delivery, before the common challenges of engorgement and latch confusion take hold. Book your lactation consultation in advance during your third trimester so your consultant is ready to visit from the moment you arrive home.
                </p>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.05} direction="right">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      q: "How many sessions will I need?",
                      a: "Many breastfeeding problems resolve significantly within one to two sessions. Complex situations such as tongue-tie, relactation, or premature birth may require ongoing support over several weeks. Your consultant will give you a clear expectation after the first visit.",
                      link: null,
                    },
                    {
                      q: "My milk has not come in yet. Can a lactation consultant help?",
                      a: "Yes. Delayed milk arrival is one of the most common reasons mothers contact us. Your consultant will assess the cause, initiate a stimulation plan, and support you through the transition from colostrum to full milk supply.",
                      link: { label: "breast milk not coming", url: "https://www.mothrly.com/blogs/why-is-my-breast-milk-not-coming-causes-and-easy-solutions" },
                    },
                    {
                      q: "Can I get lactation support after a C-section?",
                      a: "Absolutely. C-section delivery is associated with delayed milk arrival and specific positioning challenges. Our consultants have specific expertise in post-caesarean breastfeeding support.",
                      link: { label: "breast milk after C-section", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
                    },
                    {
                      q: "How much does a lactation consultant cost in Chennai?",
                      a: "Consultation fees vary by experience, visit type (in-home vs virtual), and session length. Browse transparent, up-to-date pricing on each consultant's profile directly through the Motherly app before booking.",
                      link: null,
                    },
                    {
                      q: "My baby is three months old and my supply has dropped. Is it too late?",
                      a: "It is not too late. Supply challenges can be addressed at any stage of breastfeeding with the right support. Contact us and your consultant will assess your specific situation.",
                      link: null,
                    },
                  ].map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border overflow-hidden"
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
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left font-bold"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          <span className="pr-4 text-sm md:text-base">
                            <span className="text-xs font-bold mr-2" style={{ color: "var(--color-primary)" }}>Q{idx + 1}</span>
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
                                {faq.link && (
                                  <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                    Read more:{" "}
                                    <a href={faq.link.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                                      {faq.link.label}
                                    </a>
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ScrollReveal>

            {/* App CTA */}
            <ScrollReveal delay={0.05}>
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
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <a href="https://play.google.com/store/apps/details?id=com.mothrly" target="_blank" rel="noopener noreferrer">
                    <Image src="/badge-google-play.png" alt="Download on Google Play" width={135} height={40} className="h-10 w-auto object-contain" />
                  </a>
                  <a href="https://apps.apple.com/in/app/motherly-your-birth-companion/id6746041100" target="_blank" rel="noopener noreferrer">
                    <Image src="/badge-app-store.png" alt="Download on the App Store" width={135} height={40} className="h-10 w-auto object-contain" />
                  </a>
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

          {/* ── Right Column: Booking Form ── */}
          <div ref={formWrapperRef as React.RefObject<HTMLDivElement>} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onFocus={() => {
                if (!formActive && formWrapperRef.current) {
                  preActivateTop.current = formWrapperRef.current.getBoundingClientRect().top;
                }
                setFormActive(true);
              }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFormActive(false); }}
              className="p-8 md:p-10 rounded-2xl border shadow-xl"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Send an Enquiry
              </h2>
              <p className="mb-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                Tell us about your needs and we'll be in touch.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-secondary-container)" }}
                    >
                      <span
                        className="material-symbols-outlined text-4xl"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                    <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                      Enquiry Submitted!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We'll reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold"
                      style={{ fontFamily: "var(--font-headline)", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Select Service</label>
                      <select {...register("service")} className={inputClass} style={getInputStyle()}>
                        <option value="Doulas">Doulas</option>
                        <option value="Lactation Consultants">Lactation Consultants</option>
                        <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                        <option value="Nanny Care">Nanny Care</option>
                        <option value="Postnatal Recovery">Postnatal Recovery</option>
                        <option value="Nutrition Consultation">Nutrition Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Patient Name</label>
                      <input {...register("name")} type="text" placeholder="Your full name" className={inputClass} style={getInputStyle(!!errors.name)} />
                      {errors.name && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Email Address</label>
                      <input {...register("email")} type="email" placeholder="example@motherly.com" className={inputClass} style={getInputStyle(!!errors.email)} />
                      {errors.email && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Phone Number</label>
                      <input {...register("phone")} type="tel" placeholder="10-digit mobile number" maxLength={10} className={inputClass} style={getInputStyle(!!errors.phone)} />
                      {errors.phone && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Select Date</label>
                        <input {...register("date")} type="date" min={new Date().toISOString().split("T")[0]} className={inputClass} style={getInputStyle(!!errors.date)} />
                        {errors.date && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Enter Time</label>
                        <input {...register("time")} type="time" min="09:00" max="18:00" className={inputClass} style={getInputStyle(!!errors.time)} />
                        {errors.time && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Message</label>
                      <textarea {...register("message")} rows={3} placeholder="Tell us about your needs..." className={`${inputClass} resize-none`} style={getInputStyle()} />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "var(--font-headline)",
                        backgroundColor: isSubmitting ? "var(--color-outline)" : "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="material-symbols-outlined text-xl">progress_activity</motion.span>
                          Submitting...
                        </>
                      ) : "Submit Enquiry"}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 text-sm mt-6" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-tertiary)" }}>verified_user</span>
                      Your data is secured and HIPAA compliant.
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
