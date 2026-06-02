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
import SocialLinks from "@/components/SocialLinks";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  service: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
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

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                      className={inputClass}
                      style={getInputStyle(!!errors.phone)}
                    />
                    {errors.phone && (
                      <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>
                    )}
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
                <SocialLinks variant="contact" className="!pt-0" />

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
