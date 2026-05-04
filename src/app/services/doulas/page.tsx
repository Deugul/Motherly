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

export default function DoulaPage() {
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
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Best{" "}
                  <span style={{ color: "var(--color-primary)" }}>Doula Services</span>
                  <br />in Chennai
                </h1>
                <p
                  className="text-lg max-w-2xl mt-6 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Empowering your pregnancy journey with personalised, compassionate care that
                  honors your unique birth preferences and emotional needs.
                </p>
              </section>
            </ScrollReveal>

            {/* Featured Image */}
            <ScrollReveal delay={0.1}>
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
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-sm text-xs font-bold"
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

            {/* Comprehensive Support */}
            <ScrollReveal delay={0.15}>
              <section
                className="rounded-2xl p-10 space-y-8 relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "9rem" }}>pregnancy</span>
                </div>
                <h2
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Our Doulas Provide Comprehensive Support
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: "favorite",
                      title: "Emotional Support",
                      desc: "Unwavering encouragement and expert guidance to help you navigate the emotional waves of pregnancy and labor with confidence and peace.",
                      bg: "var(--color-primary-container)",
                      color: "var(--color-on-primary-container)",
                    },
                    {
                      icon: "spa",
                      title: "Physical Comfort",
                      desc: "Hands-on techniques including therapeutic massage, optimal positioning, and specialized relaxation methods to ease your journey.",
                      bg: "var(--color-tertiary-container)",
                      color: "var(--color-on-tertiary-container)",
                    },
                    {
                      icon: "menu_book",
                      title: "Birth Education",
                      desc: "Evidence-based information about all stages of birth, so you can make empowered decisions throughout your experience.",
                      bg: "var(--color-secondary-container)",
                      color: "var(--color-on-secondary-container)",
                    },
                    {
                      icon: "groups",
                      title: "Partner Support",
                      desc: "Coaching your partner on how to best support you — so you feel held by everyone in the room.",
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
                      className="space-y-4"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <h4
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>

          {/* ── Right Column: Booking Form ── */}
          <aside className="lg:col-span-5 sticky top-28">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
      <CTASection />
      <Footer />
    </>
  );
}
