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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").includes("linkedin.com", { message: "Must be a LinkedIn URL" }),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const principles = [
  "We are building a platform that directly touches the lives of mothers and families — impact is our north star, returns follow.",
  "We will not compromise our culture or values for capital. Investors who align with our mission come first.",
  "We are not looking for quick exits. This is a long-term relationship built on trust and shared vision.",
  "We believe in radical transparency — our investors receive quarterly updates on metrics, milestones, and challenges.",
  "We do not give equity to mentors or brand ambassadors. Every share represents a meaningful commitment.",
  "Decisions are made by the founding team. We value counsel, but ownership of direction is ours.",
  "We respect your time and capital. We will only raise what we need and deploy it with discipline.",
  "We are open to ideas and introductions — but we ask that all suggestions respect our operational boundaries.",
  "We will build a sustainable, profitable business. Motherly is a 5-year vision, not a 12-month story.",
  "We expect mutual respect, patience, and belief in the mission above all else.",
];

const stats = [
  { value: "500+", label: "Mothers Supported" },
  { value: "1", label: "Year of Operations" },
  { value: "3x", label: "YoY Growth" },
];

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const inputClass =
  "w-full h-14 px-5 rounded-[6px] text-sm font-medium outline-none border-2 transition-all duration-200 focus:ring-0";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "var(--color-outline-variant)",
    fontFamily: "var(--font-body)",
  };
}

export default function InvestorsPage() {
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
      body: JSON.stringify({ formType: "Investor Applications", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden" style={{ backgroundColor: "var(--color-background)" }}>

        {/* ── Hero ── */}
        <section
          className="relative min-h-[88vh] flex items-center pt-32 pb-20 px-6 md:px-10 overflow-hidden"
          style={{ backgroundColor: "var(--color-on-surface)" }}
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <div
            className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: "var(--color-tertiary)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                >
                  Motherly
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Investors
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
                style={{ fontFamily: "var(--font-headline)", color: "white" }}
              >
                Invest in the
                <br />
                <span style={{ color: "var(--color-primary)" }}>Future of</span>
                <br />
                Maternal Care
              </h1>

              <p className="text-lg md:text-xl leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
                We are on a mission to transform how mothers in India experience birth, recovery, and early parenthood.
                We are open to investments from people who believe in this vision and can travel with us for the long term.
              </p>

              <motion.a
                href="#apply"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  boxShadow: "0 8px 32px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                }}
              >
                <span className="material-symbols-outlined text-xl">trending_up</span>
                Apply for Investment
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: easeOut }}
                  className="p-7 rounded-2xl border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p
                    className="text-3xl md:text-4xl font-extrabold mb-2"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why Invest ── */}
        <section
          className="py-24 px-6 md:px-10"
          style={{ backgroundColor: "var(--color-on-surface)" }}
        >
          <div className="max-w-4xl mx-auto space-y-12">
            <ScrollReveal>
              <div className="text-center space-y-4">
                <h2
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "white" }}
                >
                  Motherly is a{" "}
                  <span style={{ color: "var(--color-primary)" }}>high-conviction</span>
                  <br />long-term investment
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                  We do not take money from individuals looking for quick returns. We partner with founders,
                  operators, and investors who have lived through the entrepreneurial journey and understand
                  that building something meaningful takes time.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="rounded-2xl p-10 border text-center text-2xl md:text-3xl font-bold italic leading-snug"
                style={{
                  borderColor: "rgba(186,14,86,0.25)",
                  backgroundColor: "rgba(186,14,86,0.06)",
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-headline)",
                }}
              >
                "We partner only with people who can align with our vision
                and hold for the long term."
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Ten Principles ── */}
        <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "var(--color-surface-container-low)" }}>
          <div className="max-w-3xl mx-auto space-y-12">
            <ScrollReveal>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-center"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Ten Principles of{" "}
                <span style={{ color: "var(--color-primary)" }}>Motherly</span>
                {" "}For Investors
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: easeOut }}
                  className="flex gap-5 p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                  }}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-headline)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {p}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Together ── */}
        <section
          className="py-24 px-6 md:px-10 text-center"
          style={{ backgroundColor: "var(--color-on-surface)" }}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollReveal>
              <h2
                className="text-4xl md:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-headline)", color: "white" }}
              >
                Together we will create
                <br />
                <span style={{ color: "var(--color-primary)" }}>a lasting impact</span>
              </h2>
              <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
                Every mother who gets the support she deserves is a win for all of us.
                Join us in building the infrastructure for maternal wellness in India.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section
          id="apply"
          className="py-24 px-6 md:px-10"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 space-y-3">
                <h2
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Apply for <span style={{ color: "var(--color-primary)" }}>Investment</span>
                </h2>
                <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                  Fill out the form below and our founding team will reach out within 48 hours.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                className="p-8 md:p-12 rounded-2xl border shadow-xl"
                style={{
                  backgroundColor: "var(--color-surface-container-lowest)",
                  borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-16 gap-6"
                    >
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: "var(--color-secondary-container)" }}
                      >
                        <span
                          className="material-symbols-outlined text-5xl"
                          style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        We received your application!
                      </h3>
                      <p style={{ color: "var(--color-on-surface-variant)" }}>
                        Our founding team will review your profile and reach out within 48 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 px-7 py-3 rounded-full font-bold text-sm"
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
                      className="space-y-6"
                    >
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Your full name"
                          className={inputClass}
                          style={getInputStyle(!!errors.name)}
                        />
                        {errors.name && (
                          <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-error)" }}>
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="you@example.com"
                          className={inputClass}
                          style={getInputStyle(!!errors.email)}
                        />
                        {errors.email && (
                          <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-error)" }}>
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* LinkedIn */}
                      <div className="space-y-1.5">
                        <label
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          LinkedIn Profile *
                        </label>
                        <div className="relative">
                          <span
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium"
                            style={{ color: "var(--color-on-surface-variant)" }}
                          >
                            🔗
                          </span>
                          <input
                            {...register("linkedin")}
                            type="url"
                            placeholder="https://linkedin.com/in/yourname"
                            className={inputClass}
                            style={{ ...getInputStyle(!!errors.linkedin), paddingLeft: "2.5rem" }}
                          />
                        </div>
                        {errors.linkedin && (
                          <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-error)" }}>
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.linkedin.message}
                          </p>
                        )}
                      </div>

                      {/* Optional message */}
                      <div className="space-y-1.5">
                        <label
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          Why do you want to invest in Motherly?{" "}
                          <span style={{ color: "var(--color-on-surface-variant)", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <textarea
                          {...register("message")}
                          rows={4}
                          placeholder="Share your perspective on maternal care and what excites you about Motherly..."
                          className="w-full px-5 py-4 rounded-[6px] text-sm font-medium outline-none border-2 resize-none transition-all duration-200"
                          style={getInputStyle()}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2"
                        style={{
                          fontFamily: "var(--font-headline)",
                          backgroundColor: isSubmitting ? "var(--color-outline)" : "var(--color-primary)",
                          color: "var(--color-on-primary)",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 30%, transparent)",
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
                            <span className="material-symbols-outlined text-xl">send</span>
                            Apply for Investment
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-center" style={{ color: "var(--color-on-surface-variant)" }}>
                        We respect your privacy. Your information is confidential and will only be used to evaluate your application.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
