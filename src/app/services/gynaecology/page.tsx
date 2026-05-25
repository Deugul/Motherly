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
  "w-full h-14 px-4 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const GYNAE_COVERS = [
  {
    title: "Prenatal antenatal check-ups",
    desc: "Routine pregnancy monitoring including blood pressure, weight, uterine size, foetal heart rate, and symptom review. Your gynaecologist reviews test results and addresses your concerns at each visit.",
  },
  {
    title: "First trimester consultation",
    desc: "Confirmation of pregnancy, dating scan referral, screening test guidance, supplement prescriptions, and early pregnancy symptom management. Sets the foundation for a well-monitored pregnancy.",
  },
  {
    title: "High-risk pregnancy monitoring",
    desc: "For pregnancies with gestational diabetes, hypertension, thyroid conditions, or previous complications, our gynaecologists provide more frequent monitoring and specialist referrals where needed.",
  },
  {
    title: "Postnatal six-week check",
    desc: "Assessment of uterine recovery, wound healing, breastfeeding support referral, pelvic floor guidance, emotional wellbeing screening, and contraception counselling.",
  },
  {
    title: "Virtual consultation for concerns",
    desc: "For non-emergency questions, bleeding concerns, symptom review, or test result interpretation, same-day virtual consultations mean you are never waiting days to get an answer.",
  },
  {
    title: "General women's health",
    desc: "PCOS management, menstrual health, cervical screening, and general gynaecological health for women at all stages of their reproductive journey.",
  },
];

const FAQS = [
  {
    q: "Can I get a home visit from a gynaecologist in Chennai?",
    a: "Yes. Motherly offers verified gynaecologist home visits across Chennai for prenatal check-ups, postnatal consultations, and women's health concerns. Book directly through the Motherly app.",
  },
  {
    q: "Is a virtual gynaecology consultation appropriate for pregnancy?",
    a: "Virtual consultations are appropriate for non-emergency reviews, symptom discussions, test result interpretation, and follow-up visits where physical examination is not required. Your gynaecologist will advise if an in-person visit is needed.",
  },
  {
    q: "Can I use Motherly gynaecology alongside my existing hospital doctor?",
    a: "Absolutely. Motherly gynaecology consultations complement your existing hospital care. Many mothers use Motherly for in-between visits, urgent concerns, and postnatal check-ups they prefer to have at home.",
  },
  {
    q: "How much does a gynaecology consultation cost in Chennai?",
    a: "Consultation fees vary by visit type (home visit vs virtual) and the nature of the consultation. Browse transparent, current pricing on each gynaecologist's profile through the Motherly app before booking.",
  },
  {
    q: "Does Motherly offer postnatal mental health support through gynaecology?",
    a: "Yes. Our gynaecologists include postnatal depression and anxiety screening as part of the six-week postnatal check. If specialist mental health support is indicated, appropriate referrals are made.",
  },
];

export default function GynaecologyPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Gynaecology Consultation", ...data }),
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
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Gynaecology <span style={{ color: "var(--color-primary)" }}>Consultation</span>{" "}
                  <span style={{ color: "var(--color-on-background)" }}>in Chennai</span>
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
                  Womens Health Care That Comes to You, on Your Schedule
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly provides access to verified{" "}
                  <Link href="/services/gynecologist-consultation" style={{ color: "var(--color-primary)" }}>
                    gynaecology consultations
                  </Link>{" "}
                  in Chennai. As the preferred obstetric consultation Chennai mothers choose for convenience
                  and continuity, we offer both prenatal home visits and virtual gynaecology consultations
                  Chennai families can access without the clinic wait.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="https://mothrly.com/blogs/pregnancy-diet-plan" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>pregnancy diet plan</a>,{" "}
                  <a href="https://mothrly.com/blogs/first-trimester-pregnancy-diet-plan" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>first trimester diet plan</a>,{" "}
                  <a href="https://mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postpartum belly</a>,{" "}
                  <a href="https://www.mothrly.com/our-services/doulas" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>doulas</a>, and{" "}
                  <a href="https://www.mothrly.com/our-services/postnatal-Recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal care</a>.
                </p>
              </section>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "8 Weeks", label: "Optimal time to begin prenatal gynaecological care" },
                  { value: "6 Weeks", label: "Postnatal check timeline every new mother needs" },
                  { value: "Virtual", label: "Consultations available same-day for non-emergency concerns" },
                  { value: "Verified", label: "Every gynaecologist is credentialled and reviewed" },
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
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/gynaecology-hero.jpg"
                    alt="A compassionate gynaecologist providing dedicated care for expectant mothers in Chennai"
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
                    Our Specialists
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Expert care at every stage of your journey.
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
                  Home Visit Consultations and Virtual Appointments: Two Ways Motherly Helps
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both in-home gynaecology visits and virtual antenatal and postnatal
                  consultations in Chennai, because access to expert women's health care should never
                  require a full day off work or a stressful clinic trip.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "Home visit gynaecology consultation",
                      body: "Your gynaecologist visits your home at the booked time. Routine antenatal checks, postnatal examinations, blood pressure monitoring, and non-urgent clinical assessments are all conducted in the privacy and comfort of your own space. Ideal for the third trimester when clinic travel is physically demanding.",
                    },
                    {
                      title: "Virtual gynaecology consultation",
                      body: "For symptom review, test result interpretation, medication queries, follow-up visits, and non-emergency concerns, same-day virtual appointments mean you are never waiting days for an answer that matters. Prescription and referral letters are issued digitally.",
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

            {/* What consultations cover */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Motherly's Gynaecology Consultations Cover
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                >
                  {GYNAE_COVERS.map((item, i) => (
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
                  Who Benefits Most From Motherly's Gynaecology Services
                </h2>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  Our gynaecology consultations are particularly valued by:
                </p>
                <ul className="space-y-3">
                  {[
                    "Mothers in their third trimester for whom clinic travel is physically exhausting",
                    "Women who want continuity with a single verified gynaecologist throughout their pregnancy",
                    "Mothers who need quick access to expert opinion between scheduled hospital appointments",
                    "Women managing high-risk pregnancies who benefit from more frequent monitoring",
                    "Postnatal mothers who want their six-week check in the comfort of their home",
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
                  "My hospital appointments were always rushed and I left with more questions than I
                  arrived with. My Motherly gynaecologist visited at home every four weeks and actually
                  sat with me. She explained my scan results, answered every question I had, and made
                  me feel like my pregnancy mattered. That made all the difference."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Nithya P.</strong>
                  <span style={{ color: "#a16207" }}> | Second-time mother, Nungambakkam, Chennai</span>
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
                          <div className="px-5 py-4" style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 20%, white)" }}>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
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
          <div ref={formWrapperRef as React.RefObject<HTMLDivElement>} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
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
              className="p-8 lg:p-10 rounded-2xl border shadow-xl"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
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
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-secondary-container)" }}>
                      <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>Enquiry Submitted!</h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>We'll reach out within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold" style={{ fontFamily: "var(--font-headline)", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}>Submit Another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Service */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Select Service</label>
                      <div className="relative">
                        <select {...register("service")} className={inputClass} style={getInputStyle()}>
                          <option value="Doulas">Doulas</option>
                          <option value="Lactation Consultants">Lactation Consultants</option>
                          <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                          <option value="Nanny Care">Nanny Care</option>
                          <option value="Postnatal Recovery">Postnatal Recovery</option>
                          <option value="Nutrition Consultation">Nutrition Consultation</option>
                        </select>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Patient Name</label>
                      <input {...register("name")} type="text" placeholder="Your full name" className={inputClass} style={getInputStyle(!!errors.name)} />
                      {errors.name && <p className="text-xs mt-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Email Address</label>
                      <input {...register("email")} type="email" placeholder="example@email.com" className={inputClass} style={getInputStyle(!!errors.email)} />
                      {errors.email && <p className="text-xs mt-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Phone Number</label>
                      <input {...register("phone")} type="tel" placeholder="10-digit mobile number" maxLength={10} className={inputClass} style={getInputStyle(!!errors.phone)} />
                      {errors.phone && <p className="text-xs mt-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>}
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
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Select Date</label>
                        <input {...register("date")} type="date" min={new Date().toISOString().split("T")[0]} className={inputClass} style={getInputStyle(!!errors.date)} />
                        {errors.date && <p className="text-xs mt-1" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Enter Time</label>
                        <input {...register("time")} type="time" min="09:00" max="18:00" className={inputClass} style={getInputStyle(!!errors.time)} />
                        {errors.time && <p className="text-xs mt-1" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Message</label>
                      <textarea {...register("message")} rows={3} placeholder="Share any specific concerns or details..." className="w-full p-4 rounded-md text-sm font-medium outline-none border-2 resize-none transition-all" style={getInputStyle()} />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "var(--font-headline)",
                        backgroundColor: isSubmitting ? "var(--color-outline)" : "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                      }}
                    >
                      {isSubmitting ? (
                        <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="material-symbols-outlined text-xl">progress_activity</motion.span>Submitting...</>
                      ) : "Submit Enquiry"}
                    </motion.button>

                    <p className="text-xs text-center leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      By booking, you agree to our{" "}
                      <a className="underline font-bold" style={{ color: "var(--color-primary)" }} href="#">Terms</a>{" "}
                      and understand how we handle your{" "}
                      <a className="underline font-bold" style={{ color: "var(--color-primary)" }} href="#">Health Data</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
