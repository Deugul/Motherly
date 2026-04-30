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

const pillars = [
  {
    icon: "pregnant_woman",
    title: "Prenatal Yoga",
    desc: "Gentle flows designed to ease common pregnancy discomforts — back pain, swelling, and fatigue — while building the strength and breath awareness you'll need during labour.",
  },
  {
    icon: "spa",
    title: "Postnatal Yoga",
    desc: "Slow, restorative sessions to help your body heal after birth. Focus on pelvic floor reactivation, core rebuilding, and releasing the tension that comes with new-parent life.",
  },
  {
    icon: "air",
    title: "Breathwork & Relaxation",
    desc: "Evidence-based pranayama techniques to manage anxiety, prepare for labour, and create moments of stillness in an overwhelming season.",
  },
];

export default function YogaPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Yoga", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
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
                Yoga for Every{" "}
                <span className="italic" style={{ color: "var(--color-primary)" }}>
                  Stage of Motherhood
                </span>
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Gentle, expert-led yoga sessions designed to support your body and mind — from your
                first trimester through postnatal recovery.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "verified_user", label: "Certified Prenatal Yoga Instructors" },
                  { icon: "place", label: "In-Studio & Online Sessions" },
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

          <div className="lg:col-span-5 relative">
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)" }}
            />
            <ScrollReveal delay={0.1}>
              <div
                className="relative z-10 rounded-2xl overflow-hidden"
                style={{ transform: "rotate(1deg)", boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                  src="/yoga-hero.jpg"
                  alt="Mother practising yoga"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
                className="absolute -bottom-10 -right-4 p-6 rounded-xl z-20 max-w-[220px]"
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
                  "The best thing I did for myself during pregnancy."
                </p>
                <p className="text-[10px] mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  — Priya, first-time mum
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Philosophy Banner */}
        <ScrollReveal>
          <div
            className="mb-20 px-10 py-8 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-secondary-container) 40%, transparent))",
              border: "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
            }}
          >
            <p
              className="text-2xl md:text-3xl font-extrabold italic"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
            >
              "Movement is medicine — especially when it's made for you."
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content & Form Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-7 space-y-12">

            {/* Yoga That Moves With You */}
            <ScrollReveal>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Yoga That Moves With You
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Every pregnancy and postpartum journey is different. Our certified instructors meet you
                exactly where you are — offering safe, adaptive yoga practices that nurture both physical
                strength and emotional calm through every chapter of motherhood.
              </p>

              {/* Four Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
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
                        {pillar.icon}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
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
                      "Certified prenatal and postnatal yoga instructors with clinical training.",
                      "Flexible in-studio and online sessions to fit around your schedule.",
                      "Holistic classes that honour both physical recovery and emotional wellbeing.",
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
                  <span className="material-symbols-outlined" style={{ fontSize: "10rem" }}>self_improvement</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Booking Form */}
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
                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-bold uppercase tracking-wider ml-1"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          Full Name
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          placeholder="Your name"
                          className={inputClass}
                          style={getInputStyle(!!errors.name)}
                        />
                        {errors.name && (
                          <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-bold uppercase tracking-wider ml-1"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
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
                          <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-bold uppercase tracking-wider ml-1"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          Service Selection
                        </label>
                        <select
                          {...register("service")}
                          className={inputClass}
                          style={getInputStyle()}
                        >
                          <option value="Yoga">Yoga</option>
                          <option value="Doulas">Doulas</option>
                          <option value="Nanny Care">Nanny Care</option>
                          <option value="Postnatal Recovery">Postnatal Recovery</option>
                          <option value="Lactation Consultation">Lactation Consultants</option>
                          <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                          <option value="Nutrition Consultation">Nutrition Consultation</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-bold uppercase tracking-wider ml-1"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          Preferred Date
                        </label>
                        <input
                          {...register("date")}
                          type="date"
                          className={inputClass}
                          style={getInputStyle(!!errors.date)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          className="text-xs font-bold uppercase tracking-wider ml-1"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          Message (Optional)
                        </label>
                        <textarea
                          {...register("message")}
                          rows={3}
                          placeholder="Tell us about your stage of pregnancy or postpartum journey..."
                          className={`${inputClass} resize-none`}
                          style={getInputStyle()}
                        />
                      </div>

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
      <Footer />
    </>
  );
}
