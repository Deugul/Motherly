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

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function NanniesPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Nanny Care", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-x-hidden"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">

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
                  Nannies &amp;{" "}
                  <span style={{ color: "var(--color-primary)" }}>Postnatal Care</span>
                  <br />in Chennai
                </h1>
                <p
                  className="text-lg max-w-2xl mt-6 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Compassionate, expert caregivers who support your family through the transformative
                  fourth trimester — from newborn care to your own recovery.
                </p>
              </section>
            </ScrollReveal>

            {/* Featured Image */}
            <ScrollReveal delay={0.1}>
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <div className="h-[300px] md:h-[400px] relative">
                  <Image
                    src="/nannies-hero.jpg"
                    alt="Mother with newborn receiving postnatal care"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
                />
                {/* Glassmorphism quote */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <p className="text-white text-sm italic leading-relaxed">
                    "The fourth trimester is as important as the first three. Our caregivers ensure
                    you and your baby thrive together."
                  </p>
                  <span
                    className="mt-2 block text-xs font-bold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    — Motherly Care Philosophy
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Personalized Care Section */}
            <ScrollReveal delay={0.15}>
              <section
                className="rounded-2xl p-6 md:p-10 space-y-8 relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "9rem" }}>child_care</span>
                </div>
                <h2
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Personalized Care for the Fourth Trimester
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Infant Care Mastery */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="space-y-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-primary-container)", color: "var(--color-on-primary-container)" }}
                    >
                      <span className="material-symbols-outlined">child_friendly</span>
                    </div>
                    <h4
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                    >
                      Infant Care Mastery
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Safe sleep practices & environment setup",
                        "Feeding schedules & breastfeeding support",
                        "Newborn bathing & hygiene routines",
                        "Developmental milestone tracking",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                          <span className="material-symbols-outlined text-base mt-0.5" style={{ color: "var(--color-primary)" }}>check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Emotional Companionship */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
                    className="space-y-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-tertiary-container)", color: "var(--color-on-tertiary-container)" }}
                    >
                      <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <h4
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                    >
                      Emotional Companionship
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Non-judgmental listening and presence",
                        "Postpartum mood monitoring & support",
                        "Encouragement through the adjustment period",
                        "Connecting families to professional resources",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                          <span className="material-symbols-outlined text-base mt-0.5" style={{ color: "var(--color-primary)" }}>check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Household Harmony — full width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
                  className="p-6 rounded-xl border-l-4"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: "var(--color-surface-container)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" }}
                    >
                      <span className="material-symbols-outlined">home</span>
                    </div>
                    <div>
                      <h4
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                      >
                        Household Harmony
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        Our nannies go beyond childcare — helping maintain a calm, organized home environment
                        so you can focus entirely on bonding with your newborn and recovering with peace of mind.
                        Light housekeeping, meal preparation support, and sibling management included.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>
            </ScrollReveal>

            {/* Pink CTA Block */}
            <ScrollReveal delay={0.2}>
              <section
                className="rounded-2xl p-6 md:p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)" }}
              >
                {/* Watermark M */}
                <div
                  className="absolute -right-8 -bottom-8 font-extrabold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "14rem",
                    color: "rgba(255,255,255,0.06)",
                    fontFamily: "var(--font-headline)",
                  }}
                >
                  M
                </div>
                <h3
                  className="text-3xl font-bold text-white mb-3 relative z-10"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Ready to start your journey?
                </h3>
                <p className="text-white/80 mb-6 relative z-10">
                  Connect with one of our expert advisors today and find the perfect caregiver for your family.
                </p>
                <motion.a
                  href="#booking-form"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm relative z-10"
                  style={{
                    backgroundColor: "white",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-headline)",
                  }}
                >
                  Contact an Advisor
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </motion.a>
              </section>
            </ScrollReveal>
          </div>

          {/* ── Right Column: Booking Form ── */}
          <aside id="booking-form" className="lg:col-span-5 sticky top-28">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
                borderTopWidth: "8px",
                borderTopColor: "var(--color-primary)",
              }}
            >
              <div className="p-6 md:p-8">
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
                          rows={3}
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            Request Appointment
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
      <CTASection />
      <Footer />
    </>
  );
}
