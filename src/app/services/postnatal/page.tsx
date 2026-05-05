"use client";

import { useState } from "react";
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

export default function PostnatalPage() {
  const [submitted, setSubmitted] = useState(false);

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
        {/* ── Hero Section ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left */}
          <div className="lg:col-span-7">
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
                className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Mothers{" "}
                <span className="italic" style={{ color: "var(--color-primary)" }}>
                  Physiotherapy
                </span>
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Personalized postpartum rehabilitation designed to help you rediscover your strength,
                confidence, and comfort after childbirth.
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
          </div>

          {/* Right: rotated image + review card */}
          <div className="lg:col-span-5 relative">
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
            />
            <ScrollReveal delay={0.1}>
              <div className="relative z-10 rounded-2xl overflow-hidden" style={{ transform: "rotate(1deg)", boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}>
                <MotionImage
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src="/postnatal-hero.jpg"
                  alt="Physiotherapist guiding a postpartum mother through exercises"
                  width={800}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating review card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
                className="absolute -bottom-10 -right-4 p-6 rounded-xl z-20 max-w-[200px]"
                style={{
                  backgroundColor: "var(--color-surface-container-lowest)",
                  boxShadow: "0 12px 32px rgba(45,52,53,0.12)",
                }}
              >
                <div className="flex gap-0.5 mb-2">
                  {Array(5).fill(null).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs font-bold leading-tight" style={{ color: "var(--color-on-surface)" }}>
                  "The most supportive recovery journey I've ever had."
                </p>
                <p className="text-[10px] mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  — Sarah, Mom of two
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Main Content & Form Grid ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Benefits & Why Choose */}
          <div className="lg:col-span-7 space-y-12">

            {/* Comprehensive Recovery Focus */}
            <ScrollReveal>
              <h2
                className="text-3xl font-bold mb-8"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Comprehensive Recovery Focus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "partner_exchange",
                    title: "Pelvic Floor Recovery",
                    desc: "Targeted exercises to strengthen pelvic muscles, helping manage incontinence and pelvic organ prolapse postpartum.",
                    span: false,
                  },
                  {
                    icon: "fitness_center",
                    title: "Core Strengthening",
                    desc: "Safely rebuilding abdominal strength and treating Diastasis Recti through controlled, clinical-led movements.",
                    span: false,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
                    className="p-8 rounded-xl"
                    style={{
                      backgroundColor: "var(--color-surface-container-lowest)",
                      boxShadow: "0 2px 12px rgba(45,52,53,0.06)",
                      borderTop: "4px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
                    >
                      <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                        {card.icon}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {card.desc}
                    </p>
                  </motion.div>
                ))}

                {/* Full-width Posture card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
                  className="md:col-span-2 p-8 rounded-xl"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    boxShadow: "0 2px 12px rgba(45,52,53,0.06)",
                    borderTop: "4px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
                    >
                      <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                        accessibility_new
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        Posture Correction
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        Relieving "mother's back" and neck tension caused by breastfeeding and carrying your baby
                        through ergonomic education and spinal mobility.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Why Choose Motherly */}
            <ScrollReveal delay={0.1}>
              <div
                className="p-10 rounded-xl relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <div className="relative z-10">
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                  >
                    Why Choose Motherly?
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Expert women's health physiotherapists with clinical excellence.",
                      "Flexible scheduling to fit around your baby's needs.",
                      "Holistic approach combining physical and emotional wellness.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-lg mt-0.5"
                          style={{ color: "var(--color-primary)" }}
                        >
                          check_circle
                        </span>
                        <span className="font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "10rem" }}>spa</span>
                </div>
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
                        <select {...register("service")} className={inputClass} style={getInputStyle()}>
                          <option value="Doulas">Doulas</option>
                          <option value="Lactation Consultants">Lactation Consultants</option>
                          <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                          <option value="Nanny Care">Nanny Care</option>
                          <option value="Postnatal Recovery">Postnatal Recovery</option>
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
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
