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
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Booking:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ backgroundColor: "var(--color-background)" }}>

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
                    Expert Breastfeeding Support
                  </h1>
                  <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Professional, compassionate guidance from certified lactation consultants to ensure
                    you and your baby have the best start possible in your nursing journey.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[0, 1].map((i) => (
                        <img
                          key={i}
                          src="/lactation-hero.jpg"
                          alt="Consultant"
                          className="w-10 h-10 rounded-full border-2 object-cover"
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
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    src="/lactation-hero.jpg"
                    alt="Lactation consultant supporting a mother and newborn"
                    className="relative z-10 w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
                  />
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

            {/* Testimonial */}
            <ScrollReveal>
              <div
                className="p-10 rounded-2xl relative overflow-hidden"
                style={{ backgroundColor: "var(--color-surface-container-high)" }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: "7rem" }}>format_quote</span>
                </div>
                <p
                  className="text-xl italic font-medium leading-relaxed mb-6 relative z-10"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  "The support I received from Motherly's lactation consultant changed everything.
                  I was ready to give up, but her patience and expertise gave me the confidence to
                  continue my breastfeeding journey."
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-pcij5S1oLiy_gsBwN9lBbTkHE7uSFwAg-Bqi-suIDWlUaWsEGQA9On5ABGhDSeGb_hWzLis6TVUPdUHRR3CEHwa0c4v4VF1hgK3Ncj5rGkHMQuLq6UuN3TZr1KsPE82aj56FRqf_60DrnFmgVT5IzFjLRgpUvaYHJzTHLSY7SMjQNMiu_9cRfSHTt18TLMIM9-egf_Wm9aEkS4WLFyhOk6aIv5esmrsg5Z93au_r-EJYSm-LfnoaFpXDfuh9vAANWFpz64ER-xoq"
                    alt="Sarah Jenkins"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>
                      Sarah Jenkins
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      Mother of 4-month-old Leo
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
                Book an Appointment
              </h2>
              <p className="mb-8 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                Schedule your consultation with our experts today.
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
                      Appointment Requested!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      We'll confirm within 24 hours. We can't wait to support you!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold"
                      style={{ fontFamily: "var(--font-headline)", backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
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
                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Select Service</label>
                      <div className="relative">
                        <select {...register("service")} className={inputClass} style={getInputStyle()}>
                          <option value="Lactation Consultant">Lactation Consultant</option>
                          <option value="Postpartum Support">Postpartum Support</option>
                          <option value="Newborn Care">Newborn Care</option>
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
                          Booking...
                        </>
                      ) : "Request Appointment"}
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
      <Footer />
    </>
  );
}
