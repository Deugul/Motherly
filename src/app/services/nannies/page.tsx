"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const schema = z.object({
  service: z.string().min(1),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
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
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Booking:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-24 pb-20 px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-12">

            {/* Hero */}
            <ScrollReveal>
              <section className="relative">
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
                />
                {/* Avatar stack */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-3">
                    {[
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7DuFnqKO8FRwrVOefJxTn8tNJ40Y9e6E9WjFX1bfxQ9kRWsqiXBF2HxTvECGEWnEBOPJRVxr8BsrYMomNkqXQe_3JFnOaFxCJJa-8aVMhj7L0LsXVgVnLbFqtg9yvM4CtKFV6y0YnkqV8h_oJ1MuZ5mFCj1lJWH_I2cT65d3ow_Av10IpHRXzOILZZDKLDIGJeYPXkNjQK9Voh5mf42Jl-eoKgYCjvnY2k7p6DqNFLXExo3gJaGKfpNFBj3r6L3cY0_W-5DuE",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2EKfXSUiGkwF8N4RCb19RbUiXJ3Hk9j1TYl56N56E3u0bYnV8VyVT8OL-1xXI-pBe2blw7Bk3oUlVCGiqIz7jPxd3RLZsVAkVRdaxVNhEqVb09yl4QPLF0CmRFGr1_zzHnFhDxLsS4AVbPuHkjyG7R6Gfvr7BaxMFdj8dLaSA88bnLnb5R49MHl2XVHKzHp16_Dc_TqP7ZjVlHRFvnZ8JyAHqxcBgBvvNlOFlxcUYL4b_mzx3Y3XeVJJMBtqkmSa2PJj3K0sIk",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKWrL6fk1YXPG40-eMKhIbBlXgCGwWPEFhVmYVK-B43h8G9K6hFdI2Cw1s5KZb4c34A2-1HuV5NJMV_RkUfZVeNWrPHHCq7JOKnxV1-B2viBQ-1CY3f-VvBnzD6d0ERvj5V4VL74M-9-X9q-VBFoxGiurDrUJe6gJ-HHPOChOBBRz_VVsLwqfmhDI3y9v5INAYXxf3jbz71s8T_1R0Cqx8B8T9Hf7JVKiGBH4K2J-sUrIxBOEWZ18YcCLrQ1P_tAU3cEp4W0ms",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Caregiver"
                        className="w-10 h-10 rounded-full object-cover border-2"
                        style={{ borderColor: "var(--color-surface)" }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>
                    +150 Expert Caregivers Ready
                  </span>
                </div>

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
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_wVi1dFMYTXoajPQj2oBXe2Fj1Y1cnFJzm5oKjN3UNMkpk0TZfYFKlmJsTx7r3N9LRFJjYHDMiSSzd-Z1yiwBFLMXvTDi1xZdAAlJHe4e1v8P4-2p8G5EbO7L02xSDvA7W4XFTNREKqBGMKT3DjuvmE1TsJKdlsMjYhMWrJzexUCfxPBFX9K8S4Y-A4MNVJFhLjVdg4k6zDnEBiHlR_UGQ5WRm8z2JQq8lBjPUYJ_i-yMjXHZdLMbHzEBXFkW_f3NRJvv0fEXs"
                  alt="Mother with newborn receiving postnatal care"
                  className="w-full h-[400px] object-cover"
                />
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
                className="rounded-2xl p-10 space-y-8 relative overflow-hidden"
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
                className="rounded-2xl p-10 relative overflow-hidden"
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
              <div className="p-8">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Request Appointment
                </h3>
                <p className="mb-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  Our team will match you with the ideal caregiver within 24 hours.
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
                        Request Received!
                      </h4>
                      <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                        We'll match you with the perfect caregiver and reach out within 24 hours.
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
                          <option value="Nannies & Postnatal Care">Nannies &amp; Postnatal Care</option>
                          <option value="Night Nursing">Night Nursing</option>
                          <option value="Lactation Consulting">Lactation Consulting</option>
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

                      {/* Date + Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                            Select Date
                          </label>
                          <input
                            {...register("date")}
                            type="date"
                            className={inputClass}
                            style={getInputStyle(!!errors.date)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                            Enter Time
                          </label>
                          <input
                            {...register("time")}
                            type="time"
                            className={inputClass}
                            style={getInputStyle(!!errors.time)}
                          />
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
      <Footer />
    </>
  );
}
