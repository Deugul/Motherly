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
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  service: z.string().min(1),
  message: z.string().min(5, "Message is required"),
});
type FormData = z.infer<typeof schema>;

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const inputClass =
  "w-full px-5 py-3 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

export default function ContactPage() {
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
      body: JSON.stringify({ formType: "Contact Enquiries", ...data }),
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
        {/* Hero */}
        <ScrollReveal>
          <header className="mb-20 text-center max-w-3xl mx-auto">
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: "var(--color-primary)" }}
            >
              Get In Touch
            </span>
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              We're here to support your{" "}
              <span style={{ color: "var(--color-primary)" }}>motherhood</span> journey.
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Whether you have questions about our home care services or just need a friendly ear,
              our team of specialists is ready to help.
            </p>
          </header>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-7 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
            }}
          >
            {/* Decorative blob */}
            <div
              className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 rounded-full pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 10%, transparent)" }}
            />

            <h2
              className="text-3xl font-bold mb-8"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Send a Message
            </h2>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 gap-4"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
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
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--color-on-surface-variant)" }}>
                    Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-8 py-3 rounded-full font-bold"
                    style={{
                      fontFamily: "var(--font-headline)",
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                    }}
                  >
                    Send Another
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
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Jane Doe"
                        className={inputClass}
                        style={getInputStyle(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="jane@example.com"
                        className={inputClass}
                        style={getInputStyle(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      Service Interest
                    </label>
                    <select {...register("service")} className={inputClass} style={getInputStyle()}>
                      <option value="Postpartum Support">Postpartum Support</option>
                      <option value="Newborn Care">Newborn Care</option>
                      <option value="Lactation Consulting">Lactation Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="How can we help you today?"
                      className={`${inputClass} resize-none`}
                      style={getInputStyle(!!errors.message)}
                    />
                    {errors.message && (
                      <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-lg group"
                    style={{
                      fontFamily: "var(--font-headline)",
                      background: isSubmitting ? "var(--color-outline)" : "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
                      color: "var(--color-on-primary)",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                          send
                        </span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">

            {/* Map & Location */}
            <ScrollReveal delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.06)" }}
              >
                <div className="h-64 relative group overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo1LWRTnwOPeaxJdMNgJU-kc7q9UcjKqdZ1lfaIcmcjF25UsCYExOizAbCYYUZslHdsTdDj4IIPHgD-9_DdN_gPlWdoB8TS7JagsE5RJzOvA7eBKLF2d3qSiI32pDxKXFOvml55TTHzKZaJh0ALpKqWj6TpZoDep3-LMM5G3oeTyADTjp6BeBRa6Sw81LFyftnKDIuvdTYGT6QsM4dpudWO0AoHhWI_JHUdfb_F2DLQxRUNaOeBedmlmag-mFIzUO7YqEW0sH1I8wn"
                    alt="Location map"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 transition-colors group-hover:opacity-0"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
                  />
                </div>
                <div
                  className="p-8"
                  style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
                >
                  <h3
                    className="text-xl font-bold mb-3 flex items-center gap-3"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                      location_on
                    </span>
                    Our Office
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Chennai, Tamil Nadu<br />
                    India
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Call + Email */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.a
                  href="tel:+918698697000"
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary-container) 20%, transparent)",
                    borderColor: "color-mix(in srgb, var(--color-primary-container) 30%, transparent)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-2xl mb-2 block"
                    style={{ color: "var(--color-primary)" }}
                  >
                    call
                  </span>
                  <h4 className="font-bold mb-0.5 text-sm" style={{ color: "var(--color-on-surface)" }}>Call Us</h4>
                  <p className="text-xs font-medium" style={{ color: "var(--color-on-secondary-container)" }}>
                    +91 86986 97000
                  </p>
                </motion.a>

                <motion.a
                  href="mailto:motherlycareethos@gmail.com"
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 20%, transparent)",
                    borderColor: "color-mix(in srgb, var(--color-tertiary-container) 30%, transparent)",
                  }}
                >
                  <span
                    className="material-symbols-outlined text-2xl mb-2 block"
                    style={{ color: "var(--color-tertiary)" }}
                  >
                    mail
                  </span>
                  <h4 className="font-bold mb-0.5 text-sm" style={{ color: "var(--color-on-surface)" }}>Email Us</h4>
                  <p className="text-xs font-medium break-all" style={{ color: "var(--color-on-tertiary-container)" }}>
                    motherlycareethos@gmail.com
                  </p>
                </motion.a>
              </div>
            </ScrollReveal>

            {/* Community + Active staff */}
            <ScrollReveal delay={0.2}>
              <div
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "var(--color-surface-container-high)" }}
              >
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Connect with our community
                </h3>
                <div className="flex gap-3">
                  {/* Facebook */}
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm border transition-colors hover:border-[#1877F2] hover:text-[#1877F2]" style={{ backgroundColor: "var(--color-surface-container-lowest)", color: "var(--color-on-surface-variant)", borderColor: "var(--color-outline-variant)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                  </motion.a>
                  {/* Twitter/X */}
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm border transition-colors hover:border-black hover:text-black" style={{ backgroundColor: "var(--color-surface-container-lowest)", color: "var(--color-on-surface-variant)", borderColor: "var(--color-outline-variant)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </motion.a>
                  {/* Instagram */}
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm border transition-colors hover:border-[#E1306C] hover:text-[#E1306C]" style={{ backgroundColor: "var(--color-surface-container-lowest)", color: "var(--color-on-surface-variant)", borderColor: "var(--color-outline-variant)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </motion.a>
                  {/* YouTube */}
                  <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm border transition-colors hover:border-[#FF0000] hover:text-[#FF0000]" style={{ backgroundColor: "var(--color-surface-container-lowest)", color: "var(--color-on-surface-variant)", borderColor: "var(--color-outline-variant)" }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </motion.a>
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
