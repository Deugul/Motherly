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
  stage: z.string().min(1, "Please select your stage"),
  dietary: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  mode: z.enum(["In-Clinic", "Virtual"]),
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

const pillars = [
  {
    icon: "pregnant_woman",
    title: "Prenatal Nutrition",
    desc: "Tailored meal planning to meet the increased demands of pregnancy — iron, folate, calcium, DHA, and beyond. We work around food aversions, nausea, gestational diabetes, and cultural dietary preferences.",
    bg: "var(--color-primary-container)",
    color: "var(--color-on-primary-container)",
  },
  {
    icon: "healing",
    title: "Postnatal Recovery Nutrition",
    desc: "Your body has just done something extraordinary. We help you rebuild with targeted nutrition that accelerates healing, balances hormones, and restores your energy levels during the fourth trimester.",
    bg: "var(--color-secondary-container)",
    color: "var(--color-on-secondary-container)",
  },
  {
    icon: "baby_changing_station",
    title: "Breastfeeding Support Nutrition",
    desc: "Evidence-based guidance on what to eat to support milk supply, manage colic-related dietary factors, and keep both you and your baby well-nourished through your nursing journey.",
    bg: "var(--color-tertiary-container)",
    color: "var(--color-on-tertiary-container)",
  },
  {
    icon: "monitor_weight",
    title: "Weight & Wellness Management",
    desc: "Compassionate, non-judgmental support for healthy weight management during and after pregnancy — focused on sustainable habits, not restriction.",
    bg: "var(--color-surface-container-high)",
    color: "var(--color-on-surface)",
  },
];

export default function NutritionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<"In-Clinic" | "Virtual">("In-Clinic");

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
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Nutrition booking:", data);
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
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)",
                    color: "var(--color-primary)",
                  }}
                >
                  <span className="material-symbols-outlined text-sm">nutrition</span>
                  Expert Nutrition Care
                </div>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Nourish Your Journey,{" "}
                  <span style={{ color: "var(--color-primary)" }}>Nourish Your Baby</span>
                </h1>
                <p
                  className="text-lg max-w-2xl mt-6 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Personalised nutrition guidance from certified dietitians — supporting you from
                  conception through breastfeeding and beyond.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {["Certified Maternal Dietitians", "In-Clinic & Virtual Consultations"].map((badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full text-xs font-bold border"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                        color: "var(--color-primary)",
                        backgroundColor: "color-mix(in srgb, var(--color-primary-container) 15%, transparent)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Philosophy Banner */}
            <ScrollReveal delay={0.1}>
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <div
                  className="w-full h-[280px] flex items-end p-8"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }}
                  />
                  <div className="relative z-10">
                    <span
                      className="px-4 py-1 rounded-sm text-xs font-bold"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white" }}
                    >
                      Our Philosophy
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-bold mt-3 italic text-white leading-snug"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      "The right nourishment changes everything —<br />especially when it's made for you."
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section headline */}
            <ScrollReveal delay={0.12}>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Food as Care.{" "}
                <span style={{ color: "var(--color-primary)" }}>Science as Foundation.</span>
              </h2>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                Our maternal nutrition consultants work with you one-on-one to build an eating plan
                that fits your body, your culture, and your stage of pregnancy or postpartum recovery.
                No generic advice. No one-size-fits-all charts. Just real, practical guidance — rooted
                in clinical evidence and adapted to your life.
              </p>
            </ScrollReveal>

            {/* Four pillars */}
            <ScrollReveal delay={0.15}>
              <section
                className="rounded-2xl p-10 space-y-8 relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "9rem" }}>nutrition</span>
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Our Nutrition Focus Areas
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {pillars.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="space-y-4"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: p.bg, color: p.color }}
                      >
                        <span className="material-symbols-outlined">{p.icon}</span>
                      </div>
                      <h4
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                      >
                        {p.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {p.desc}
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
                Book a Consultation
              </h3>
              <p className="mb-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                Start your personalised nutrition journey today.
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
                      Consultation Requested!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We'll confirm your booking within 24 hours.
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
                      Book Another
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
                        <option value="Prenatal Nutrition">Prenatal Nutrition</option>
                        <option value="Postnatal Recovery Nutrition">Postnatal Recovery Nutrition</option>
                        <option value="Breastfeeding Support">Breastfeeding Support</option>
                        <option value="Weight & Wellness">Weight &amp; Wellness</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Full Name
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

                    {/* Stage */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Trimester / Stage
                      </label>
                      <select {...register("stage")} className={inputClass} style={getInputStyle(!!errors.stage)}>
                        <option value="">Select your stage</option>
                        <option value="Pre-conception">Pre-conception</option>
                        <option value="1st Trimester">1st Trimester</option>
                        <option value="2nd Trimester">2nd Trimester</option>
                        <option value="3rd Trimester">3rd Trimester</option>
                        <option value="Postnatal">Postnatal</option>
                      </select>
                      {errors.stage && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.stage.message}</p>
                      )}
                    </div>

                    {/* Dietary */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Dietary preferences or restrictions{" "}
                        <span style={{ fontWeight: 400, color: "var(--color-on-surface-variant)" }}>(optional)</span>
                      </label>
                      <input
                        {...register("dietary")}
                        type="text"
                        placeholder="e.g. vegetarian, lactose intolerant..."
                        className={inputClass}
                        style={getInputStyle()}
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Preferred Date
                      </label>
                      <input
                        {...register("date")}
                        type="date"
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
                        placeholder="Any health conditions or goals we should know about..."
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
                        "Book My Consultation"
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
