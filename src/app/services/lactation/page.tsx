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
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-5 py-4 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const features = [
  {
    icon: "baby_changing_station",
    title: "Latching Techniques",
    desc: "Our consultants provide hands-on guidance to help you achieve a comfortable, effective latch, preventing pain and ensuring your baby gets the nutrition they need.",
    bg: "var(--color-secondary-container)",
    color: "var(--color-on-secondary-container)",
    span: false,
  },
  {
    icon: "nutrition",
    title: "Nutritional Guidance",
    desc: "Personalized dietary advice for nursing mothers to support milk supply and maintain your own energy levels throughout the day.",
    bg: "var(--color-tertiary-container)",
    color: "var(--color-on-tertiary-container)",
    span: false,
  },
  {
    icon: "volunteer_activism",
    title: "Emotional Support",
    desc: "Breastfeeding is a journey that can be both beautiful and challenging. We offer a safe space to discuss your feelings, providing empathy and encouragement every step of the way.",
    bg: "color-mix(in srgb, var(--color-primary-container) 15%, transparent)",
    color: "var(--color-on-primary-container)",
    span: true,
  },
];

export default function LactationPage() {
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
      body: JSON.stringify({ formType: "Service Bookings", page: "Lactation Consultants", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16" style={{ backgroundColor: "var(--color-background)" }}>

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-2xl min-h-[440px] flex items-center"
              style={{ backgroundColor: "var(--color-surface-container-low)" }}
            >
              {/* bg blobs */}
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
                style={{ backgroundColor: "var(--color-primary-container)" }} />
              <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full blur-2xl opacity-10 pointer-events-none"
                style={{ backgroundColor: "var(--color-secondary-container)" }} />

              <div className="grid md:grid-cols-2 gap-12 relative z-10 p-8 md:p-16 items-center w-full">
                {/* Text */}
                <div>
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">person_heart</span>
                    Care Services
                  </span>
                  <h1
                    className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    Lactation &{" "}
                    <span style={{ color: "var(--color-primary)" }}>Obstetrician</span>{" "}
                    Consultation
                  </h1>
                  <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Expert breastfeeding support from certified lactation consultants, paired with
                    specialist obstetric care to guide you through pregnancy, delivery, and recovery.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[0, 1].map((i) => (
                        <Image
                          key={i}
                          src="/lactation-hero.jpg"
                          alt="Consultant"
                          width={40} height={40}
                          className="rounded-full border-2 object-cover"
                          style={{ borderColor: "var(--color-surface-container-lowest)" }}
                        />
                      ))}
                    </div>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="font-bold" style={{ color: "var(--color-on-surface)" }}>15+</span> Dedicated Consultants
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-2xl -rotate-3 scale-105"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)" }}
                  />
                  <div className="relative z-10 w-full aspect-[4/3] rounded-2xl shadow-xl overflow-hidden">
                    <Image
                      src="/lactation-hero.jpg"
                      alt="Lactation consultant supporting a mother and newborn"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Main Content ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <ScrollReveal>
                <h2
                  className="text-3xl font-bold mb-8"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Nurturing Every Step of the Way
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`p-8 rounded-2xl shadow-sm border ${f.span ? "md:col-span-2 flex flex-col md:flex-row gap-8 items-center" : ""}`}
                    style={{
                      backgroundColor: f.span ? f.bg : "var(--color-surface-container-lowest)",
                      borderColor: f.span
                        ? "color-mix(in srgb, var(--color-primary-container) 20%, transparent)"
                        : "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mb-6 md:mb-0"
                      style={{ backgroundColor: f.bg, color: f.color }}
                    >
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        {f.title}
                      </h3>
                      <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Obstetrician Section ── */}
            <div>
              <ScrollReveal>
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Obstetrician Care
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Our obstetric specialists work alongside your lactation team to provide end-to-end
                  maternal care — from your first trimester through full postnatal recovery.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "pregnant_woman",
                    title: "Antenatal Monitoring",
                    desc: "Routine and high-risk pregnancy check-ups, foetal growth tracking, and detailed ultrasound review to keep both mother and baby safe.",
                    bg: "var(--color-primary-container)",
                    color: "var(--color-on-primary-container)",
                  },
                  {
                    icon: "emergency",
                    title: "High-Risk Pregnancy Care",
                    desc: "Specialist management for conditions such as gestational diabetes, preeclampsia, and multiple pregnancies with dedicated monitoring protocols.",
                    bg: "var(--color-tertiary-container)",
                    color: "var(--color-on-tertiary-container)",
                  },
                  {
                    icon: "local_hospital",
                    title: "Labour & Delivery Guidance",
                    desc: "Birth planning support, pain management counselling, and evidence-based guidance on normal and assisted delivery options.",
                    bg: "var(--color-secondary-container)",
                    color: "var(--color-on-secondary-container)",
                  },
                  {
                    icon: "healing",
                    title: "Postnatal Health Checks",
                    desc: "Comprehensive follow-up consultations to assess physical recovery, wound healing, hormonal balance, and emotional well-being after delivery.",
                    bg: "var(--color-primary-container)",
                    color: "var(--color-on-primary-container)",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="p-8 rounded-2xl shadow-sm border"
                    style={{
                      backgroundColor: "var(--color-surface-container-lowest)",
                      borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: item.bg, color: item.color }}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right Column: Booking Form ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="sticky top-28 p-8 md:p-10 rounded-2xl border shadow-xl"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                Send an Enquiry
              </h2>
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
                    <h4 className="text-xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                      Enquiry Submitted!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We'll reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold"
                      style={{ fontFamily: "var(--font-headline)", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
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
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Select Service</label>
                      <div className="relative">
                        <select {...register("service")} className={inputClass} style={getInputStyle()}>
                          <option value="Doulas">Doulas</option>
                          <option value="Lactation Consultants">Lactation Consultants</option>
                          <option value="Gynaecology Consultation">Gynaecology Consultation</option>
                          <option value="Nanny Care">Nanny Care</option>
                          <option value="Postnatal Recovery">Postnatal Recovery</option>
                          <option value="Nutrition Consultation">Nutrition Consultation</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-4 pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }}>expand_more</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Patient Name</label>
                      <input {...register("name")} type="text" placeholder="Your full name" className={inputClass} style={getInputStyle(!!errors.name)} />
                      {errors.name && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Email Address</label>
                      <input {...register("email")} type="email" placeholder="example@motherly.com" className={inputClass} style={getInputStyle(!!errors.email)} />
                      {errors.email && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Select Date</label>
                        <input {...register("date")} type="date" className={inputClass} style={getInputStyle(!!errors.date)} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Enter Time</label>
                        <input {...register("time")} type="time" className={inputClass} style={getInputStyle(!!errors.time)} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Message</label>
                      <textarea {...register("message")} rows={3} placeholder="Tell us about your needs..." className={`${inputClass} resize-none`} style={getInputStyle()} />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "var(--font-headline)",
                        backgroundColor: isSubmitting ? "var(--color-outline)" : "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary) 25%, transparent)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="material-symbols-outlined text-xl">progress_activity</motion.span>
                          Submitting...
                        </>
                      ) : "Submit Enquiry"}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 text-sm mt-6" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-tertiary)" }}>verified_user</span>
                      Your data is secured and HIPAA compliant.
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
