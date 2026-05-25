"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);
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
  childAge: z.string().min(1, "Please select your child's age"),
  date: z.string().min(1, "Date is required").refine(
    (val) => { const t = new Date(); t.setHours(0, 0, 0, 0); return new Date(val) >= t; },
    "Please select today or a future date"
  ),
  mode: z.enum(["In-Clinic", "Virtual"]),
  message: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
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
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"In-Clinic" | "Virtual">("In-Clinic");
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
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { mode: "In-Clinic" },
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "Service Bookings", page: "Pediatrician Consultation", ...data }),
    });
    setSubmitted(true);
    reset();
    setMode("In-Clinic");
  };

  const handleModeToggle = (selected: "In-Clinic" | "Virtual") => {
    setMode(selected);
    setValue("mode", selected);
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
          <aside ref={formWrapperRef} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
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
                Tell us about your child's needs and we'll be in touch.
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
                        <option value="Pediatrician Consultation">Pediatrician Consultation</option>
                        <option value="Doulas">Doulas</option>
                        <option value="Lactation Consultants">Lactation Consultants</option>
                        <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                        <option value="Nanny Care">Nanny Care</option>
                        <option value="Postnatal Recovery">Postnatal Recovery</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Parent / Guardian Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Your full name"
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

                    {/* Child Age */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Child's Age
                      </label>
                      <select {...register("childAge")} className={inputClass} style={getInputStyle(!!errors.childAge)}>
                        <option value="">Select age range</option>
                        <option value="Newborn (0–28 days)">Newborn (0–28 days)</option>
                        <option value="Infant (1–12 months)">Infant (1–12 months)</option>
                        <option value="Toddler (1–3 years)">Toddler (1–3 years)</option>
                        <option value="Preschool (3–5 years)">Preschool (3–5 years)</option>
                        <option value="School age (5+ years)">School age (5+ years)</option>
                      </select>
                      {errors.childAge && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.childAge.message}</p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Preferred Date
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

                    {/* In-Clinic / Virtual toggle */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Session Mode
                      </label>
                      <div
                        className="flex rounded-md overflow-hidden border-2 p-0.5 gap-0.5"
                        style={{ borderColor: "transparent", backgroundColor: "var(--color-surface-container-low)" }}
                      >
                        {(["In-Clinic", "Virtual"] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => handleModeToggle(m)}
                            className="flex-1 py-2.5 text-sm font-bold rounded-sm transition-all duration-200"
                            style={{
                              backgroundColor: mode === m ? "var(--color-primary)" : "transparent",
                              color: mode === m ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" {...register("mode")} value={mode} />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Message / Health notes{" "}
                        <span style={{ fontWeight: 400 }}>(optional)</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="Any health concerns or symptoms we should know about..."
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

                    <div className="flex items-center justify-center gap-2 text-sm mt-4" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-tertiary)" }}>lock</span>
                      Your health information is kept strictly confidential.
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
