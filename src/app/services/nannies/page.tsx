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
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-2 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const NANNY_PROVIDES = [
  {
    title: "Newborn care (bathing, cord, skin)",
    desc: "Safe newborn bathing techniques, umbilical cord care, nappy changes, and skin care using gentle, appropriate products. Your nanny handles these with trained confidence so you can observe and learn.",
  },
  {
    title: "Feeding support",
    desc: "Your nanny supports breastfeeding by helping with positioning and timing, and handles bottle feeding or expressed milk feeds so you can sleep. She recognises hunger and satiation cues and maintains your preferred feeding log.",
  },
  {
    title: "Safe sleep support",
    desc: "Your nanny applies safe sleep practices at every nap and night sleep, placing baby correctly, monitoring temperature, and supporting sleep environment safety based on current evidence.",
  },
  {
    title: "Night support",
    desc: "Many families engage their Motherly nanny for overnight or night-shift support, handling settling, feeding, and nappy changes so the mother can sleep in longer unbroken stretches.",
  },
  {
    title: "Light household support",
    desc: "Preparing lactation-supportive meals, sterilising feeding equipment, managing baby laundry, and keeping the nursery organised, your nanny handles the practical load that makes the rest of recovery possible.",
  },
  {
    title: "Sibling support",
    desc: "For families with older children, your nanny helps manage the transition, supervising older siblings during feeds or settling, and ensuring the household continues to function smoothly.",
  },
];

const FAQS = [
  {
    q: "When should I book a postnatal nanny?",
    a: "Book during your third trimester, ideally by week 32 to 34. Good postnatal nannies fill quickly, especially for popular due date windows. Booking early allows time for a prenatal introduction meeting.",
    readMore: { label: "postpartum care in Chennai", href: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
  },
  {
    q: "What is the difference between a postnatal nanny and a japa maid?",
    a: "A japa maid provides traditional postpartum care including cooking and massage. A Motherly postnatal nanny specialises in newborn care, infant safety, and feeding support. Many families find using both provides comprehensive coverage.",
  },
  {
    q: "Can a nanny help with twins or multiples?",
    a: "Yes. We have nannies with specific experience caring for twins and triplets. Please mention this when browsing profiles and we will ensure appropriate experience matching.",
  },
  {
    q: "How much does a postnatal nanny services cost in Chennai?",
    a: "Costs vary based on shift type (daytime, overnight, live-in), experience level, and duration of engagement. Browse transparent, current pricing on each nanny's profile directly through the Motherly app.",
  },
  {
    q: "My mother-in-law is staying with us. Will a nanny create conflict?",
    a: "Our nannies are trained to integrate respectfully into multi-generational households. They take direction from parents and work collaboratively with family members rather than in competition with them.",
  },
];

export default function NanniesPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Nanny Care", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-14">

            {/* H1 */}
            <ScrollReveal>
              <section>
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
                />
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Nanny Services <span style={{ color: "var(--color-primary)" }}>in Chennai</span>
                </h1>
              </section>
            </ScrollReveal>

            {/* H2 + Intro */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Trusted Hands for Your Newborn, Expert Support for You
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects Chennai families with verified, trained{" "}
                  <Link href="https://www.mothrly.com/services/nanny-services" style={{ color: "var(--color-primary)" }}>
                    Nanny Services in Chennai
                  </Link>
                  . As the most trusted newborn care Chennai families rely on, we provide both daytime
                  and live-in newborn nanny support Chennai parents need, giving new mothers the space
                  to rest and recover during the most demanding weeks of early parenthood.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="https://mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postpartum care Chennai</a>,{" "}
                  <a href="https://mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>newborn sleep patterns</a>,{" "}
                  <a href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal care</a>,{" "}
                  <a href="https://www.mothrly.com/our-services/lactation-consultants" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>lactation consultants service</a>, and{" "}
                  <a href="https://www.mothrly.com/our-services/doulas" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>doulas</a>.
                </p>
              </section>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "40 Days", label: "Traditional Indian newborn care period requiring dedicated support" },
                  { value: "85%", label: "New mothers report significant sleep deprivation in the first 4 weeks" },
                  { value: "Day 1", label: "Motherly nannies available from your first day home" },
                  { value: "Verified", label: "Every nanny background-checked and trained before joining Motherly" },
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

            {/* Featured Image */}
            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/nannies-hero.jpg"
                    alt="A caring Motherly nanny providing attentive newborn support at home in Chennai"
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
                    Our Care
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Every newborn deserves a gentle pair of hands.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            {/* Daytime vs Overnight */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Daytime Nannies and Live-In Overnight Nanny Support: Two Ways Motherly Helps
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both daytime postnatal nannies and overnight or live-in nanny support in
                  Chennai, because the demands of the newborn period change throughout the day and from
                  family to family.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "Daytime postnatal nanny",
                      body: "Your Motherly daytime nanny provides professional newborn care, feeding support, and light household assistance during the day, allowing the mother to rest, recover, and manage older children while knowing her newborn is in trained, attentive hands.",
                    },
                    {
                      title: "Overnight and live-in nanny support",
                      body: "Many families find that overnight support is where professional help makes the biggest difference. Your nanny handles night feeds, settling, and nappy changes through the night so the recovering mother can sleep in longer, unbroken stretches. Live-in arrangements covering the full 40-day jaapa period are also available.",
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
                        {card.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* What a Nanny Provides */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What a Motherly Postnatal Nanny Provides
                </h2>
                <div className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}>
                  {NANNY_PROVIDES.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
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
                  Who Benefits Most From a Postnatal Nanny
                </h2>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  A Motherly postnatal nanny is particularly valuable if you are:
                </p>
                <ul className="space-y-3">
                  {[
                    "A nuclear family without extended family staying in Chennai after birth",
                    "Recovering from a C-section and unable to safely lift and carry your newborn independently in the early weeks",
                    "Managing twins, triplets, or a new baby alongside a toddler",
                    "A mother returning to work early who needs a trusted, trained nanny for newborn care from a young age",
                    "Experiencing severe postpartum fatigue or postnatal depression and needing reliable daily practical support",
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
                <p
                  className="text-base italic leading-relaxed mb-4"
                  style={{ color: "#92400e" }}
                >
                  "We had twins and no family in Chennai. I genuinely do not know how we would have
                  survived those first six weeks without our Motherly nanny. She handled the nights,
                  kept a detailed feeding log for both babies, and managed our older son's school run
                  without us even asking. She became part of our family."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Meena and Arvind K.</strong>
                  <span style={{ color: "#a16207" }}> | Parents of twins, Velachery, Chennai</span>
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
                          <div className="px-5 py-4 space-y-2" style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 20%, white)" }}>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                              {faq.a}
                            </p>
                            {faq.readMore && (
                              <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
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
                ))}
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
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <Link href="https://play.google.com/store">
                    <Image
                      src="/badge-google-play.png"
                      alt="Download on Google Play"
                      width={140}
                      height={42}
                      className="h-10 w-auto"
                    />
                  </Link>
                  <Link href="https://apps.apple.com">
                    <Image
                      src="/badge-app-store.png"
                      alt="Download on the App Store"
                      width={140}
                      height={42}
                      className="h-10 w-auto"
                    />
                  </Link>
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

          {/* ── Right Column: Booking Form ── */}
          <aside id="booking-form" ref={formWrapperRef} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              onFocus={() => {
                if (!formActive && formWrapperRef.current) {
                  preActivateTop.current = formWrapperRef.current.getBoundingClientRect().top;
                }
                setFormActive(true);
              }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFormActive(false); }}
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
                borderTopWidth: "8px",
                borderTopColor: "var(--color-primary)",
              }}
            >
              <div className="p-4 md:p-5">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Send an Enquiry
                </h3>
                <p className="mb-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
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
                      className="space-y-3"
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
                          Phone Number *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          required
                          className={inputClass}
                          style={getInputStyle(!!errors.phone)}
                        />
                        {errors.phone && (
                          <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Location + Pincode */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Location</label>
                          <input {...register("location")} type="text" placeholder="Area / Neighbourhood" className={inputClass} style={getInputStyle(!!errors.location)} />
                          {errors.location && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.location.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Pincode</label>
                          <input {...register("pincode")} type="text" placeholder="6-digit pincode" maxLength={6} className={inputClass} style={getInputStyle(!!errors.pincode)} />
                          {errors.pincode && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.pincode.message}</p>}
                        </div>
                      </div>

                      {/* Date + Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          rows={2}
                          placeholder="Tell us about your care needs..."
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
                        className="w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 mt-3"
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Enquiry
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                          </>
                        )}
                      </motion.button>

                      <p
                        className="text-center mt-3 leading-relaxed"
                        style={{ fontSize: "10px", color: "var(--color-on-surface-variant)", opacity: 0.6 }}
                      >
                        By submitting, you agree to our privacy policy. Your information is kept confidential
                        and shared only with your assigned caregiver.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
