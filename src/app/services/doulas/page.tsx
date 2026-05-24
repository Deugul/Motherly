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

const MotionImage = motion.create(Image);

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
  "w-full px-4 py-3 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

export default function DoulaPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Doulas", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-14">

            {/* Hero */}
            <ScrollReveal>
              <section className="relative">
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
                />
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Best{" "}
                  <span style={{ color: "var(--color-primary)" }}>Doula Services</span>
                  <br />{" "}in Chennai
                </h1>
                <h2
                  className="text-xl md:text-2xl font-bold mt-5 leading-snug"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Birth Support That Stays With You, From the First Contraction to Your First Feed
                </h2>
                <p
                  className="text-base md:text-lg mt-4 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Motherly connects expecting mothers in{" "}
                  <strong style={{ color: "var(--color-on-surface)" }}>Chennai</strong>{" "}
                  with trained, verified{" "}
                  <a href="/our-services/doulas" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                    birth doulas and postpartum doulas
                  </a>
                  . As the trusted birth companion Chennai mothers rely on, we provide continuous labour support Chennai families need, before, during, and after delivery.
                </p>
              </section>
            </ScrollReveal>

            {/* Stats Row */}
            <ScrollReveal delay={0.1} direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "98%", label: "Mothers felt more confident during labour" },
                  { value: "40%", label: "Reduction in caesarean rates with continuous doula support" },
                  { value: "60%", label: "Shorter labour duration on average" },
                  { value: "50+", label: "Verified doulas across Chennai on Motherly" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="p-5 rounded-2xl border text-center"
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
                  src="/doulas-hero.jpg"
                  alt="A professional doula providing comfort and support to an expectant mother"
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
                    Our Philosophy
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Support beyond the clinical.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            {/* Birth Doula vs Postpartum Doula */}
            <ScrollReveal delay={0.1} direction="left">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Birth Doulas and Postpartum Doulas: Two Ways Motherly Supports You
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both birth doulas and postpartum doulas in Chennai, two distinct but complementary forms of support across the full perinatal journey.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Birth doula",
                      desc: "A birth doula provides continuous support from early labour through delivery. She attends your prenatal meetings, is on-call from 38 weeks, stays with you throughout active labour and delivery, and supports the golden hour immediately after birth. Her focus is on your physical comfort, emotional steadiness, and informed decision-making during one of the most intense experiences of your life.",
                    },
                    {
                      title: "Postpartum doula",
                      desc: "A postpartum doula supports you after birth, typically for the first 4 to 12 weeks. She helps with newborn care, breastfeeding establishment, household adjustment, and maternal emotional recovery. Where a birth doula is focused on the event of birth, a postpartum doula is focused on the transition into motherhood that follows.",
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
                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                      >
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

            {/* What Is a Doula */}
            <ScrollReveal delay={0.1} direction="right">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  What Is a Doula and Why Chennai Mothers Are Choosing One
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  A doula is a trained birth companion who offers non-medical support throughout your pregnancy, labour, and the early{" "}
                  <a href="/our-services/postnatal-recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postpartum period</a>
                  . In Chennai, where most hospital births move at a fast clinical pace, having dedicated labour support Chennai mothers can count on is becoming an increasingly valued choice among informed families.
                </p>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly's doulas are background-verified, trained in evidence-based birth support, and deeply familiar with the Indian birth context, including navigating hospital protocols in Chennai's top maternity facilities.
                </p>
                <p className="leading-relaxed text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="https://mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>lactation consultant</a>,{" "}
                  <a href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal care</a>,{" "}
                  <a href="https://mothrly.com/blogs/pregnancy-diet-plan" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>pregnancy diet plan</a>, and{" "}
                  <a href="https://mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postpartum care Chennai</a>.
                </p>

                {/* Research callout */}
                <div
                  className="p-6 rounded-2xl border-l-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>What the research says</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    Research published in the <strong>Cochrane Database of Systematic Reviews</strong> found that women who received continuous support during labour were more likely to have spontaneous vaginal births, less likely to need pain medication, and reported greater satisfaction with their birth experience, regardless of the setting or type of support person.
                  </p>
                </div>

                {/* Note box */}
                <div
                  className="p-5 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    A doula is <strong>not</strong> a replacement for your obstetrician or nursing team. She works <strong>alongside</strong> your medical professionals. To understand the full difference, read our guide on{" "}
                    <a href="https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>doula vs midwife</a>.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* What Motherly's Doulas Provide */}
            <ScrollReveal delay={0.1} direction="left">
              <section
                className="rounded-2xl p-8 md:p-10 space-y-8 relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "9rem" }}>pregnancy</span>
                </div>
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                  >
                    What Motherly's Doulas Provide
                  </h2>
                  <p className="mt-2 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Our doula services in Chennai cover four essential pillars of birth support:
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "favorite",
                      title: "Emotional support",
                      desc: "Labour is unpredictable and intense. Your Motherly doula provides unwavering calm, validating your fears, keeping your focus, and offering steady encouragement through every stage of birth. She knows what to say when words help, and what to do when silence is kinder.",
                      bg: "var(--color-secondary-container)",
                      color: "var(--color-on-secondary-container)",
                    },
                    {
                      icon: "spa",
                      title: "Physical comfort",
                      desc: "From therapeutic massage and counter-pressure on your lower back to guiding you into positions that ease contractions, our doulas bring hands-on techniques that genuinely reduce pain and help labour progress. All without medication, when that is your choice.",
                      bg: "var(--color-tertiary-container)",
                      color: "var(--color-on-tertiary-container)",
                    },
                    {
                      icon: "menu_book",
                      title: "Birth education",
                      desc: "Your doula meets you during pregnancy to help you understand what to expect at each stage of labour, how to read your body's signals, and how to create a birth plan that reflects your values. When the time comes, you walk in prepared, not afraid.",
                      bg: "var(--color-primary-container)",
                      color: "var(--color-on-primary-container)",
                    },
                    {
                      icon: "groups",
                      title: "Partner support",
                      desc: "Many birth partners want to help but don't know how. Your doula coaches your partner, showing them how to support you through contractions, how to communicate with the hospital team, and how to be fully present when you need them most.",
                      bg: "var(--color-surface-container-high)",
                      color: "var(--color-on-surface)",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex flex-col gap-4"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <div>
                        <h4
                          className="text-lg font-bold mb-2"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* When Does Doula Support Begin and End */}
            <ScrollReveal delay={0.1} direction="right">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  When Does Doula Support Begin and End?
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly's doula services in Chennai are not limited to the delivery room. Our doulas walk with you through the entire journey:
                </p>
                <div className="space-y-0">
                  {[
                    {
                      num: 1,
                      title: "Prenatal meetings (2nd and 3rd trimester)",
                      text: "Your doula meets you at home 2 to 3 times before your due date. Together you create your birth plan, discuss your fears and hopes, understand the stages of labour, and prepare your birth partner. This is where trust is built.",
                      links: [
                        { label: "second trimester guide", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-guide-for-expecting-mothers" },
                        { label: "third trimester guide", url: "https://www.mothrly.com/blogs/third-trimester-pregnancy-guide-for-expecting-mothers-in-india" },
                      ],
                    },
                    {
                      num: 2,
                      title: "On-call from 38 weeks",
                      text: "From 38 weeks, your doula is on-call 24/7. The moment labour begins, she is available by phone, arriving at your home or hospital as soon as you need her.",
                      links: [],
                    },
                    {
                      num: 3,
                      title: "Continuous labour support",
                      text: "Your doula stays with you throughout active labour and delivery, through early contractions at home, transition in the hospital, and until your baby is safely born. She does not leave for shift changes.",
                      links: [],
                    },
                    {
                      num: 4,
                      title: "Immediate postpartum (golden hour)",
                      text: "In the first hour after birth, your doula supports skin-to-skin bonding and the very first breastfeed, a critical window that sets the foundation for a strong breastfeeding journey.",
                      links: [
                        { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-that-every-new-mother-should-know" },
                        { label: "lactation consultants", url: "/our-services/lactation-consultants" },
                      ],
                    },
                    {
                      num: 5,
                      title: "Postnatal home visit",
                      text: "1 to 3 days after delivery, your doula visits you at home to check in on your recovery and answer your questions. For extended postpartum doula support, this can continue for weeks.",
                      links: [
                        { label: "postnatal recovery care", url: "/our-services/postnatal-recovery-care" },
                      ],
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={step.num}
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
                        {step.num}
                      </div>
                      <div className="space-y-2">
                        <h4
                          className="font-bold text-base"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          {step.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {step.text}
                        </p>
                        {step.links.length > 0 && (
                          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                            See also:{" "}
                            {step.links.map((l, li) => (
                              <span key={l.label}>
                                <a href={l.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>{l.label}</a>
                                {li < step.links.length - 1 && <span className="mx-2">|</span>}
                              </span>
                            ))}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Who Is a Doula Right For */}
            <ScrollReveal delay={0.1} direction="left">
              <section
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Who Is a Doula Right For?
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Doula support is beneficial for every expecting mother, but particularly valuable if you are:
                </p>
                <ul className="space-y-3">
                  {[
                    "A first-time mother navigating birth for the first time, without a clear picture of what to expect",
                    "Planning a natural or unmedicated birth and wanting skilled support to stay on that path",
                    <>Managing anxiety about birth, medical procedures, or a previous difficult experience. Our article on <a href="https://www.mothrly.com/blogs/stress-during-early-pregnancy" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>stress during early pregnancy</a> covers this in detail</>,
                    "Away from your natal family in Chennai and without close support nearby",
                    "A mother who had a previous C-section and is aiming for a VBAC (vaginal birth after caesarean)",
                    "Planning a hospital birth but wanting someone who advocates for your birth preferences",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="material-symbols-outlined text-base mt-0.5 shrink-0"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {/* Testimonial */}
            <ScrollReveal delay={0.1} direction="right">
              <blockquote
                className="p-7 rounded-2xl border-l-4 italic"
                style={{
                  backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)",
                  borderLeftColor: "#d97706",
                }}
              >
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                  "I had no family in Chennai and was terrified of going into labour alone with just my husband. My Motherly doula arrived two hours into my contractions and I immediately felt calmer. She coached my husband too, which was something I didn't even know I needed. I honestly don't think my birth would have gone the way it did without her."
                </p>
                <footer className="mt-4">
                  <span className="font-bold not-italic" style={{ color: "var(--color-primary)" }}>— Priya S.</span>
                  <span className="text-sm ml-2 not-italic" style={{ color: "var(--color-on-surface-variant)" }}>| First-time mother, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* A note for Chennai mothers */}
            <ScrollReveal delay={0.1}>
              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 50%, white)" }}
              >
                <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                  A note for Chennai mothers
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                  Many families here rely on the mother's mother (paati) or mother-in-law as the primary birth support figure. A Motherly doula works alongside family, not instead of them. If your paati is in the room, your doula is there to ensure the whole support system works together, smoothly and calmly.
                </p>
              </div>
            </ScrollReveal>

            {/* How Motherly's Doula Network Is Different */}
            <ScrollReveal delay={0.1} direction="left">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  How Motherly's Doula Network Is Different
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Verified and trained",
                      desc: "Every doula on Motherly is background-checked and has completed recognised doula training. You see their credentials, experience, and reviews before booking.",
                      icon: "verified_user",
                      color: "var(--color-tertiary)",
                    },
                    {
                      title: "Chennai-local",
                      desc: "Our doulas know the hospital systems, culture, and language of Chennai, from KMCH to Apollo to Cloudnine. See our Chennai postpartum guide for more.",
                      icon: "location_on",
                      color: "var(--color-primary)",
                    },
                    {
                      title: "Easy to book",
                      desc: "Browse profiles, read reviews, and book your doula through the Motherly app in minutes. No referral chains, no cold calls, just clear, transparent access.",
                      icon: "touch_app",
                      color: "var(--color-primary)",
                    },
                    {
                      title: "Tamil and English support",
                      desc: "Our Chennai doulas are fluent in Tamil and English, ensuring clear communication with you, your family, and your medical team.",
                      icon: "interpreter_mode",
                      color: "var(--color-tertiary)",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="p-6 rounded-2xl border flex gap-4"
                      style={{
                        backgroundColor: "var(--color-surface-container-lowest)",
                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-2xl shrink-0 mt-0.5"
                        style={{ color: feature.color, fontVariationSettings: "'FILL' 1" }}
                      >
                        {feature.icon}
                      </span>
                      <div>
                        <h4 className="font-bold mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                          {feature.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.1} direction="right">
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
                      q: "What is the difference between a doula and a midwife?",
                      a: "A midwife is a trained medical professional who provides clinical care. A doula has no clinical role and provides continuous emotional, physical, and informational support.",
                      link: { label: "doula vs midwife", url: "https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby" },
                    },
                    {
                      q: "What is the difference between a birth doula and a postpartum doula?",
                      a: "A birth doula focuses on the labour and delivery experience, providing continuous support from early labour through the golden hour after birth. A postpartum doula supports you after birth, helping with newborn care, breastfeeding establishment, and maternal recovery over the first weeks at home. Motherly offers both in Chennai.",
                      link: null,
                    },
                    {
                      q: "When should I hire a doula in Chennai?",
                      a: "Ideally connect with your doula in the second trimester (weeks 14 to 27). This gives enough time to build trust, attend prenatal preparation meetings, and finalise your birth plan. Popular doulas book quickly, so we recommend browsing Motherly profiles from week 16 onwards.",
                      link: null,
                    },
                    {
                      q: "Do hospitals in Chennai allow doulas?",
                      a: "Most private maternity hospitals in Chennai allow a birth companion in addition to your birth partner. Motherly's Chennai doulas are familiar with local hospital policies and will advise you on what to communicate to your hospital before admission.",
                      link: null,
                    },
                    {
                      q: "How much does a doula cost in Chennai?",
                      a: "Doula costs vary based on experience, the type of support (birth doula vs postpartum doula), and the duration of engagement. Rather than a fixed rate, Motherly shows you transparent pricing on each doula's profile so you can find the right match for your budget. Download the Motherly app to browse current pricing from verified Chennai doulas.",
                      link: null,
                    },
                    {
                      q: "Can a doula help if I'm planning a C-section?",
                      a: "Absolutely. Doula support is highly valuable for planned and emergency C-sections, from emotional preparation beforehand to supporting skin-to-skin bonding and postnatal recovery in the days that follow.",
                      link: { label: "postnatal recovery care", url: "/our-services/postnatal-recovery-care" },
                    },
                    {
                      q: "What other services does Motherly offer alongside doulas?",
                      a: "Motherly offers a full range of maternal care in Chennai, including lactation consultants, postnatal recovery care, postnatal nannies, gynaecology consultations, prenatal yoga, and nutrition support. All bookable through the Motherly app.",
                      link: { label: "lactation consultants", url: "/our-services/lactation-consultants" },
                    },
                  ].map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
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

            {/* Book through App CTA */}
            <ScrollReveal delay={0.1}>
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
                    <Image
                      src="/badge-google-play.png"
                      alt="Download on Google Play"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                  <a href="https://apps.apple.com/in/app/motherly-your-birth-companion/id6746041100" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/badge-app-store.png"
                      alt="Download on the App Store"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
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
          <aside ref={formWrapperRef} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
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
              className="p-8 rounded-2xl border"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Send an Enquiry
              </h3>
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
                    <h4
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      Enquiry Submitted!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We'll reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-headline)",
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                      }}
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
                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Select Service
                      </label>
                      <select {...register("service")} className={inputClass} style={getInputStyle()}>
                        <option value="Doulas">Doulas</option>
                        <option value="Lactation Consultants">Lactation Consultants</option>
                        <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                        <option value="Nanny Care">Nanny Care</option>
                        <option value="Postnatal Recovery">Postnatal Recovery</option>
                        <option value="Nutrition Consultation">Nutrition Consultation</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Patient Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Your Full Name"
                        className={inputClass}
                        style={getInputStyle(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="email@example.com"
                        className={inputClass}
                        style={getInputStyle(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Phone Number
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={inputClass}
                        style={getInputStyle(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                          Select Date
                        </label>
                        <input
                          {...register("date")}
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          className={inputClass}
                          style={getInputStyle(!!errors.date)}
                        />
                        {errors.date && (
                          <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                          Enter Time
                        </label>
                        <input
                          {...register("time")}
                          type="time"
                          min="09:00"
                          max="18:00"
                          className={inputClass}
                          style={getInputStyle(!!errors.time)}
                        />
                        {errors.time && (
                          <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="Tell us about your expectations..."
                        className={`${inputClass} resize-none`}
                        style={getInputStyle()}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4"
                      style={{
                        fontFamily: "var(--font-headline)",
                        background: isSubmitting ? "var(--color-outline)" : "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
                        color: "var(--color-on-primary)",
                        boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="material-symbols-outlined text-xl"
                          >
                            progress_activity
                          </motion.span>
                          Booking...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </motion.button>

                    <div className="mt-6 flex items-center justify-center opacity-40">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-on-surface-variant)" }}>
                        Trusted by Leading Hospitals
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
