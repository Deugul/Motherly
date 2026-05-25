"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
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
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3.5 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];


const KEYWORD_LINKS = [
  {
    label: "postpartum belly",
    title: "Does Postpartum Belly Go Away?",
    url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms",
    icon: "fitness_center",
  },
  {
    label: "postpartum care Chennai",
    title: "Postpartum Care in Chennai Guide",
    url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers",
    icon: "map",
  },
  {
    label: "lactation consultant",
    title: "Why Every New Mother Needs a Lactation Consultant",
    url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant",
    icon: "assignment_ind",
  },
  {
    label: "increase breast milk supply",
    title: "How to Increase Breast Milk Supply",
    url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply",
    icon: "water_drop",
  },
  {
    label: "doulas",
    title: "Doula Services in Chennai",
    url: "https://www.mothrly.com/our-services/doulas",
    icon: "pregnant_woman",
  },
  {
    label: "yoga",
    title: "Prenatal & Postnatal Yoga",
    url: "https://www.mothrly.com/services/yoga",
    icon: "self_improvement",
  },
] as const;

export default function PostnatalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      body: JSON.stringify({ formType: "Service Bookings", page: "Postnatal Recovery", ...data }),
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
        {/* ── Main Content & Form Grid ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-14">

            {/* Hero */}
            <ScrollReveal>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide"
                style={{
                  backgroundColor: "var(--color-secondary-container)",
                  color: "var(--color-on-secondary-container)",
                }}
              >
                WOMEN'S WELLNESS
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Postnatal Recovery{" "}
                <span style={{ color: "var(--color-primary)" }}>Care at Home in Chennai</span>
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Book verified postnatal recovery care at home in Chennai with Motherly. Expert support
                for Indian new mothers — massage, nutrition, breastfeeding help, and emotional care.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "verified_user", label: "Certified Specialists" },
                  { icon: "home_health", label: "In-Clinic & Virtual" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                      {badge.icon}
                    </span>
                    <span className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Intro */}
            <ScrollReveal>
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Real Recovery for Real Mothers, Starting From Day One After Birth
              </h2>
              <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                Motherly brings certified{" "}
                <a href="/our-services/postnatal-recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                  postnatal recovery care
                </a>{" "}
                professionals to your home in Chennai. As the trusted postnatal care Chennai mothers depend on, we offer traditional jaapa support and modern recovery guidance, providing the{" "}
                <span>fourth trimester</span>{" "}
                support Chennai families increasingly choose for a safe, nourished recovery.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.05}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "6 Weeks", label: "minimum recovery window for the postpartum body" },
                  { value: "40 Days", label: "traditional jaapa confinement supported by modern evidence" },
                  { value: "3 In 4", label: "new mothers experience postnatal physical or emotional challenges" },
                  { value: "Day 1", label: "Motherly professionals available from your first day home" },
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
                  src="/postnatal-hero.jpg"
                  alt="Postnatal recovery care specialist supporting a mother at home in Chennai"
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
                    Trusted Postnatal Care
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic">Recovery that starts at home.</h3>
                </div>
              </div>
            </ScrollReveal>

            {/* Traditional Jaapa vs Modern Recovery */}
            <ScrollReveal delay={0.05}>
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Traditional Jaapa Care and Modern Recovery Support: Two Ways Motherly Helps
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both traditional jaapa-based postnatal care and evidence-based modern postnatal recovery support in Chennai, because every mother's needs and preferences are different.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Traditional jaapa care",
                      desc: "Rooted in South Indian postpartum tradition, jaapa care includes oil massage (abhyanga), abdominal binding (patt bandhi), special galactagogue cooking, herbal baths, and structured rest protocols. Our japa professionals are trained in authentic practices and respectful of the cultural rituals important to your family.",
                    },
                    {
                      title: "Modern postnatal recovery care",
                      desc: "Evidence-based postpartum support covering physical recovery assessment, pelvic floor guidance, C-section wound monitoring, breastfeeding support, postnatal depression screening, and newborn care guidance. Ideal for mothers who want professional, clinically informed care alongside or instead of traditional practices.",
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

            {/* What Is Postnatal Recovery Care */}
            <ScrollReveal delay={0.05}>
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  What Is Postnatal Recovery Care and Why It Matters in India
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  The first six weeks after delivery, what medical professionals call the <strong>fourth trimester</strong>, is when your body heals, your hormones recalibrate, and your baby establishes feeding patterns. Professional postnatal care during this window is not a luxury. It is evidence-backed support that reduces the risk of postpartum complications, improves breastfeeding outcomes, and supports maternal mental health.
                </p>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  In Chennai, where nuclear families are increasingly common and traditional multi-generational support is not always available, Motherly's postnatal care bridges a genuine gap in the fourth trimester support Chennai mothers need.
                </p>
                {/* Callout */}
                <div
                  className="p-6 rounded-2xl border-l-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>The jaapa tradition, reimagined</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    Traditional South Indian jaapa confinement practices are rooted in genuine physiological wisdom. Motherly's postnatal care integrates these time-tested practices with modern evidence-based recovery support, giving Chennai mothers the best of both.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* What Motherly's Postnatal Care Includes */}
            <ScrollReveal delay={0.05}>
              <section className="space-y-6">
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                  >
                    What Motherly's Postnatal Care Includes
                  </h2>
                  <p className="mt-2 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Our postnatal recovery care in Chennai covers every dimension of your fourth trimester:
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      icon: "self_improvement",
                      title: "Postnatal oil massage",
                      desc: "Traditional full-body oil massage helps reduce muscle soreness, improve circulation, relieve joint pain, and promote nervous system recovery. Our trained professionals use appropriate oils for your body type and season.",
                    },
                    {
                      icon: "accessibility_new",
                      title: "Abdominal binding (patt bandhi)",
                      desc: "Structured abdominal wrapping supports uterine recovery, reduces diastasis recti risk, and helps new mothers feel more physically stable as they move around in the early weeks.",
                    },
                    {
                      icon: "restaurant",
                      title: "Postnatal diet and nutrition guidance",
                      desc: "Our professionals advise on warm, easily digestible, lactation-supportive meals using Indian kitchen staples, from ragi kanji and methi ladoos to iron-rich dals suited to the healing body.",
                    },
                    {
                      icon: "favorite",
                      title: "Breastfeeding support",
                      desc: "Early postnatal days are when breastfeeding challenges first appear. Our care professionals work alongside our lactation consultants to support latch, positioning, and milk establishment from day one.",
                    },
                    {
                      icon: "psychology",
                      title: "Emotional wellbeing check-ins",
                      desc: "Postnatal mood changes and postpartum depression are real and underdiagnosed in Indian women. Our professionals are trained to recognise warning signs and provide empathetic support.",
                    },
                    {
                      icon: "child_care",
                      title: "Newborn care guidance",
                      desc: "Bathing, cord care, safe sleep positioning, and reading your baby's hunger cues — your care professional helps you navigate the steep learning curve of the first days with calm, practical guidance.",
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
            <ScrollReveal delay={0.05}>
              <section
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Who Benefits Most From Postnatal Recovery Care
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Every new mother benefits from professional postnatal support. It is particularly valuable if you are:
                </p>
                <ul className="space-y-3">
                  {[
                    "Recovering from a C-section and need additional physical and practical support",
                    "Away from your natal family in Chennai and navigating early motherhood without close family support",
                    "Experiencing breastfeeding difficulties, low milk supply, or latch challenges",
                    "A first-time mother overwhelmed by the volume of newborn care decisions",
                    "Experiencing mood changes, tearfulness, or anxiety that may signal postnatal depression",
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
            <ScrollReveal delay={0.05}>
              <blockquote
                className="p-7 rounded-2xl border-l-4 italic"
                style={{ backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)", borderLeftColor: "#d97706" }}
              >
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                  "I had a C-section and my mother couldn't travel from Coimbatore in time. My Motherly postnatal care professional arrived the day I came home and just took over. The massage, the food, the guidance on how to hold my baby without straining my wound. I genuinely don't know how I would have managed those first two weeks without her."
                </p>
                <footer className="mt-4">
                  <span className="font-bold not-italic" style={{ color: "var(--color-primary)" }}>— Kavitha R.</span>
                  <span className="text-sm ml-2 not-italic" style={{ color: "var(--color-on-surface-variant)" }}>| New mother, Adyar, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Note on postnatal depression */}
            <ScrollReveal delay={0.05}>
              <div
                className="p-6 rounded-2xl border-l-4"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                  borderLeftColor: "var(--color-primary)",
                }}
              >
                <h4 className="font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                  A note on postnatal depression
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                  Up to 1 in 5 Indian mothers experiences postnatal depression, yet very few receive timely support. Motherly's postnatal care professionals are trained to recognise early warning signs and connect you with specialist resources. You do not have to manage this alone.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* Right: Booking Form */}
          <aside className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              className="rounded-xl border sticky top-28"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
              }}
            >
              <div className="p-8 lg:p-10">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Send an Enquiry
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
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
                        <select
                          {...register("service")}
                          defaultValue="Postnatal Recovery"
                          className={inputClass}
                          style={getInputStyle()}
                        >
                          <option value="Postnatal Recovery">Postnatal Recovery</option>
                          <option value="Doulas">Doulas</option>
                          <option value="Lactation Consultants">Lactation Consultants</option>
                          <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                          <option value="Nanny Care">Nanny Care</option>
                          <option value="Nutrition Consultation">Nutrition Consultation</option>
                          <option value="Prenatal Yoga">Prenatal Yoga</option>
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
                        {errors.name && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>}
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
                        {errors.email && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
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
                        {errors.phone && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>}
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
                          {errors.date && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>}
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
                          {errors.time && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>}
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
                          placeholder="Tell us about your concerns..."
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
                        className="w-full py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 mt-4"
                        style={{
                          fontFamily: "var(--font-headline)",
                          background: isSubmitting
                            ? "var(--color-outline)"
                            : "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
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
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </>
                        )}
                      </motion.button>

                      <p
                        className="text-center mt-4 px-4 leading-relaxed"
                        style={{ fontSize: "10px", color: "var(--color-on-surface-variant)" }}
                      >
                        By submitting, you agree to our privacy policy and will be contacted via email
                        for confirmation.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </aside>
        </section>

        {/* ── FAQ ── */}
        <ScrollReveal delay={0.1}>
          <section className="mt-20 space-y-5">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "When can postnatal massage begin after delivery?",
                  a: "Postnatal massage typically begins from day 3 to 5 after a normal vaginal delivery. After a C-section, massage is usually introduced after 4 to 6 weeks with doctor clearance. Our professionals always follow your doctor's guidance.",
                  link: { label: "postpartum care guide", url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
                },
                {
                  q: "How long does postnatal care last?",
                  a: "Traditional jaapa lasts 40 days. Many mothers continue with professional support beyond this. Motherly's care is entirely flexible, from a single session to three months of daily visits.",
                  link: null,
                },
                {
                  q: "Is postnatal care different after a C-section?",
                  a: "Yes. C-section recovery involves an abdominal incision that affects the timing and type of massage and binding that can be applied. Our professionals are trained in post-operative recovery and adapt all techniques to your specific situation.",
                  link: null,
                },
                {
                  q: "How much does postnatal recovery care cost in Chennai?",
                  a: "Costs vary based on the duration of care, visit frequency, and whether you choose traditional jaapa, modern recovery support, or a combined package. Browse transparent, per-visit pricing from verified professionals directly on the Motherly app.",
                  link: null,
                },
                {
                  q: "Can postnatal care help with breastfeeding?",
                  a: "Yes. Our care professionals support breastfeeding through positioning guidance, dietary recommendations, and direct coordination with Motherly's lactation consultants when specialist support is needed.",
                  links: [
                    { label: "lactation consultant", url: "/our-services/lactation-consultants" },
                    { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
                  ],
                },
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: easeOut }}
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
                            {"link" in faq && faq.link && (
                              <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                Read more:{" "}
                                <a href={faq.link.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                                  {faq.link.label}
                                </a>
                              </p>
                            )}
                            {"links" in faq && faq.links && (
                              <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                Read more:{" "}
                                {faq.links.map((l, li) => (
                                  <span key={l.label}>
                                    <a href={l.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>{l.label}</a>
                                    {li < faq.links!.length - 1 && <span className="mx-2">|</span>}
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Book through App CTA ── */}
        <ScrollReveal delay={0.1}>
          <div
            className="mt-12 rounded-2xl p-8 text-center space-y-4"
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

        {/* ── Keyword interlinks ── */}
        <ScrollReveal delay={0.15}>
          <section className="mt-16 space-y-6 mb-4">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
            >
              Useful Resources & Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {KEYWORD_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: easeOut }}
                >
                  <Link
                    href={link.url}
                    className="block p-5 rounded-2xl border h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "var(--color-surface-container-lowest)",
                      borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined mb-3 block"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {link.icon}
                    </span>
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {link.title}
                    </p>
                    <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                      {link.label} →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

      </main>
      <CTASection />
      <Footer />
    </>
  );
}
