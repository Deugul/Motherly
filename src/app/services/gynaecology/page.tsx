"use client";

import { useState } from "react";
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
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
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

const wellnessItems = [
  "Cervical Cancer Screenings (Pap Smears)",
  "Contraceptive Counseling & Management",
  "Menopause Care & Management",
];

export default function GynaecologyPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Gynaecology Consultation", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20" style={{ backgroundColor: "var(--color-background)" }}>

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text */}
            <ScrollReveal className="lg:col-span-7 z-10">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" }}
              >
                Medical Speciality
              </span>
              <h1
                className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Gynaecology <br />
                <span style={{ color: "var(--color-primary)" }}>Consultation</span>
              </h1>
              <p className="text-xl max-w-xl leading-relaxed font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                Specialized Reproductive Health Care designed with empathy, precision, and a
                commitment to your long-term wellness.
              </p>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal direction="right" className="lg:col-span-5 relative">
              <div
                className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: "var(--color-primary-container)" }}
              />
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[480px]"
                style={{ transform: "rotate(2deg)" }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/gynaecology-hero.jpg"
                  alt="Gynaecology Consultation"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
              >
                <Image
                  src="/logo.png"
                  alt="Motherly"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Main Content & Form ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <ScrollReveal>
                <h2
                  className="text-3xl font-bold mb-8"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Comprehensive Care for Women
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prenatal */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-8 rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-all"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-3xl mb-4"
                    style={{ color: "var(--color-primary)", display: "block" }}
                  >
                    pregnancy
                  </span>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                    Prenatal Check-ups
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Early detection and expert guidance throughout your pregnancy journey to ensure
                    the health of both mother and child.
                  </p>
                </motion.div>

                {/* Postnatal */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-8 rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-all"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    borderLeftColor: "var(--color-tertiary)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-3xl mb-4"
                    style={{ color: "var(--color-tertiary)", display: "block" }}
                  >
                    healing
                  </span>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                    Postnatal Recovery
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Dedicated support following delivery, focusing on physical healing, emotional
                    health, and lactation advice.
                  </p>
                </motion.div>

                {/* General Wellness — full width */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="md:col-span-2 p-8 rounded-2xl shadow-sm border-l-4 hover:shadow-md transition-all"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    borderLeftColor: "var(--color-secondary-container)",
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="p-4 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: "var(--color-secondary-container)" }}
                    >
                      <span className="material-symbols-outlined text-3xl" style={{ color: "var(--color-on-secondary-container)" }}>
                        female
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                        General Wellness Consultations
                      </h3>
                      <p className="leading-relaxed mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
                        Routine screenings, reproductive health education, and preventative care
                        tailored to every stage of a woman's life.
                      </p>
                      <ul className="space-y-2">
                        {wellnessItems.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Why Choose Motherly — pink CTA block */}
            <ScrollReveal>
              <div
                className="relative rounded-2xl overflow-hidden p-12"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-20 -mt-20 blur-2xl opacity-10 bg-white pointer-events-none" />
                <div className="relative z-10">
                  <h4
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-primary)" }}
                  >
                    Why choose Motherly Care?
                  </h4>
                  <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "color-mix(in srgb, var(--color-on-primary) 90%, transparent)" }}>
                    We combine clinical expertise with a deeply personal approach to women's
                    healthcare, creating a sanctuary for wellness.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Booking Form ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sticky top-28 p-8 lg:p-10 rounded-2xl border shadow-xl"
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
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-outline)" }}>expand_more</span>
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

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Select Date</label>
                        <input {...register("date")} type="date" className={inputClass} style={getInputStyle(!!errors.date)} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>Enter Time</label>
                        <input {...register("time")} type="time" className={inputClass} style={getInputStyle(!!errors.time)} />
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
        </section>

      </main>
      <Footer />
    </>
  );
}
