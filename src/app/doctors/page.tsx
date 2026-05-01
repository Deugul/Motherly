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
  fullName: z.string().min(2, "Full name is required"),
  registrationNumber: z.string().min(2, "Registration number is required"),
  specialisation: z.string().min(1, "Please select a specialisation"),
  clinicName: z.string().min(2, "Clinic / Hospital name is required"),
  clinicAddress: z.string().min(5, "Clinic address is required"),
  pinCode: z.string().min(6, "Valid pin code required").max(6),
  consultationType: z.string().min(1, "Please select consultation type"),
  weeklyAvailability: z.string().min(1, "Please enter availability"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  bio: z.string().max(600, "Please keep bio under 100 words").optional(),
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

const benefits = [
  {
    icon: "person_search",
    title: "New Patient Pipeline",
    desc: "Get discovered by expecting and new mothers actively searching for trusted specialists. Our platform surfaces your profile at the exact moment a mother needs your expertise.",
  },
  {
    icon: "calendar_month",
    title: "Appointment Coordination",
    desc: "Mothers book through Motherly, we route confirmed appointments directly to your clinic or preferred scheduling system. Zero admin overhead on your end.",
  },
  {
    icon: "payments",
    title: "Referral Fee Structure",
    desc: "Earn structured referral fees on every confirmed appointment driven through the Motherly platform. Transparent, monthly settlements with full booking reports.",
  },
  {
    icon: "group",
    title: "Cross-Service Collaboration",
    desc: "Work alongside our doulas, lactation consultants, physiotherapists, and yoga instructors — creating integrated care journeys for shared patients.",
  },
];

const specialists = [
  { type: "Obstetrician / Gynaecologist", offer: "Prenatal check-ups, high-risk pregnancy consultations, postnatal recovery" },
  { type: "Pediatrician", offer: "Newborn consultations, vaccination scheduling, developmental assessments" },
  { type: "Maternal Mental Health Specialist", offer: "Postpartum depression support, anxiety counselling, birth trauma therapy" },
  { type: "Maternal Nutritionist / Dietitian", offer: "Gestational diabetes, weight management, breastfeeding nutrition" },
  { type: "Physiotherapist", offer: "Pelvic floor recovery, postpartum rehabilitation, pain management" },
  { type: "Lactation Specialist", offer: "Breastfeeding guidance, tongue-tie assessment, latch support" },
];

const steps = [
  { n: "01", title: "Apply & Verify", desc: "Submit your credentials and practice details. Our team reviews and verifies qualifications within 48 hours." },
  { n: "02", title: "Build Your Profile", desc: "Get a dedicated doctor profile on the Motherly platform — specialisation, experience, clinic location, consultation types, and availability." },
  { n: "03", title: "Get Discovered", desc: "Mothers browsing Motherly's services are matched to relevant specialists based on their stage of pregnancy or postnatal need." },
  { n: "04", title: "Receive Appointments", desc: "Confirmed bookings land directly in your scheduling system. Motherly handles the patient communication and reminder flow." },
  { n: "05", title: "Earn & Grow", desc: "Receive monthly referral settlements, performance reports, and access to co-marketing opportunities through Motherly's channels." },
];

const trustPoints = [
  "All partner doctors verified against MCI / NMC registration",
  "Patient data handled in full compliance with India's Digital Personal Data Protection Act (DPDPA)",
  "Motherly never shares patient data beyond the directly assigned care provider",
  "All referral settlements documented and GST-compliant",
];

export default function DoctorsPage() {
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
      body: JSON.stringify({
        formType: "Doctor Partnership Application",
        page: "Doctors & Medical Partners",
        ...data,
      }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden" style={{ backgroundColor: "var(--color-surface)" }}>

        {/* ── Hero ── */}
        <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: hero content */}
            <div className="lg:col-span-7 space-y-12">
              <ScrollReveal>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5 tracking-wide"
                  style={{
                    backgroundColor: "var(--color-secondary-container)",
                    color: "var(--color-on-secondary-container)",
                  }}
                >
                  FOR MEDICAL PROFESSIONALS
                </span>
                <h1
                  className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-7"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Join the Most Trusted{" "}
                  <span className="italic" style={{ color: "var(--color-primary)" }}>
                    Maternal Care Network
                  </span>
                </h1>
                <p
                  className="text-xl leading-relaxed max-w-2xl mb-10"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  We connect certified OBGYNs, pediatricians, and maternal health specialists directly
                  with mothers who need you — through a seamless referral and appointment system built
                  for modern medical practice.
                </p>

                {/* Sub-banner */}
                <div
                  className="px-8 py-7 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 8%, transparent), color-mix(in srgb, var(--color-secondary-container) 40%, transparent))",
                    border: "1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)",
                  }}
                >
                  <p
                    className="text-xl md:text-2xl font-extrabold italic"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                  >
                    "We don't replace your practice. We fill your calendar."
                  </p>
                </div>
              </ScrollReveal>

              {/* Landscape image */}
              <ScrollReveal delay={0.06}>
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{
                    height: "320px",
                    boxShadow: "0 16px 40px rgba(45,52,53,0.12)",
                  }}
                >
                  <motion.img
                    src="/doctors-partner.jpg"
                    alt="Doctors and medical team"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>

              {/* Why Partner */}
              <ScrollReveal delay={0.08}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
                  Partnership Benefits
                </p>
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Why Partner With Motherly?
                </h2>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{ color: "var(--color-on-surface-variant)", maxWidth: "90%" }}
                >
                  <strong style={{ color: "var(--color-on-surface)" }}>For Doctors. Built Around Your Practice.</strong>{" "}
                  Motherly operates as your referral and discovery partner — not a competitor. We handle
                  the patient acquisition, scheduling support, and follow-up coordination, so you focus
                  entirely on clinical care.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((b, i) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
                      className="p-8 rounded-2xl"
                      style={{
                        backgroundColor: "var(--color-surface-container-lowest)",
                        boxShadow: "0 2px 16px rgba(45,52,53,0.07)",
                        borderTop: "4px solid color-mix(in srgb, var(--color-primary) 25%, transparent)",
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                        style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ color: "var(--color-primary)" }}>
                          {b.icon}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-sm leading-loose" style={{ color: "var(--color-on-surface-variant)" }}>
                        {b.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

            </div>

            {/* Right: Hero image + Onboarding Form */}
            <aside className="lg:col-span-5 flex flex-col gap-6">
              {/* Hero image */}
              <ScrollReveal delay={0.1}>
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{
                    height: "480px",
                    boxShadow: "0 12px 32px rgba(45,52,53,0.12)",
                  }}
                >
                  <motion.img
                    src="/doctors-hero.jpg"
                    alt="Medical professionals in a clinic"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay badge */}
                  <div
                    className="absolute bottom-4 left-4 px-4 py-2 rounded-xl flex items-center gap-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--color-on-surface)", fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      Verified Medical Partners
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
                className="rounded-2xl border sticky top-28"
                style={{
                  backgroundColor: "var(--color-surface-container-lowest)",
                  borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                  boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
                }}
              >
                <div className="p-8 lg:p-10">
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                  >
                    Doctor Onboarding
                  </h2>
                  <p className="text-sm mb-7" style={{ color: "var(--color-on-surface-variant)" }}>
                    Submit your application — our partnership team will contact you within 48 hours.
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
                          Application Submitted!
                        </h4>
                        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                          Our partnership team will reach out within 48 hours.
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
                        className="space-y-4"
                      >
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Full Name
                          </label>
                          <input
                            {...register("fullName")}
                            type="text"
                            placeholder="Dr. Your Name"
                            className={inputClass}
                            style={getInputStyle(!!errors.fullName)}
                          />
                          {errors.fullName && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.fullName.message}</p>}
                        </div>

                        {/* Registration Number */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Medical Registration Number (MCI / NMC / State Council)
                          </label>
                          <input
                            {...register("registrationNumber")}
                            type="text"
                            placeholder="e.g. TN-12345"
                            className={inputClass}
                            style={getInputStyle(!!errors.registrationNumber)}
                          />
                          {errors.registrationNumber && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.registrationNumber.message}</p>}
                        </div>

                        {/* Specialisation */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Specialisation
                          </label>
                          <select
                            {...register("specialisation")}
                            className={inputClass}
                            style={getInputStyle(!!errors.specialisation)}
                          >
                            <option value="">Select your specialisation</option>
                            <option value="OBGYN">Obstetrician / Gynaecologist (OBGYN)</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Mental Health">Maternal Mental Health Specialist</option>
                            <option value="Neonatologist">Neonatologist</option>
                            <option value="Nutritionist">Maternal Nutritionist / Dietitian</option>
                            <option value="Physiotherapist">Physiotherapist</option>
                            <option value="Lactation Specialist">Lactation Specialist</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.specialisation && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.specialisation.message}</p>}
                        </div>

                        {/* Clinic Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Clinic / Hospital Name
                          </label>
                          <input
                            {...register("clinicName")}
                            type="text"
                            placeholder="Your clinic or hospital"
                            className={inputClass}
                            style={getInputStyle(!!errors.clinicName)}
                          />
                          {errors.clinicName && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.clinicName.message}</p>}
                        </div>

                        {/* Clinic Address */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Clinic Address — Chennai
                          </label>
                          <input
                            {...register("clinicAddress")}
                            type="text"
                            placeholder="Street, area, Chennai"
                            className={inputClass}
                            style={getInputStyle(!!errors.clinicAddress)}
                          />
                          {errors.clinicAddress && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.clinicAddress.message}</p>}
                        </div>

                        {/* Pin Code */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Pin Code
                          </label>
                          <input
                            {...register("pinCode")}
                            type="text"
                            placeholder="6-digit pin code"
                            maxLength={6}
                            className={inputClass}
                            style={getInputStyle(!!errors.pinCode)}
                          />
                          {errors.pinCode && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.pinCode.message}</p>}
                        </div>

                        {/* Consultation Type */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Consultation Type
                          </label>
                          <select
                            {...register("consultationType")}
                            className={inputClass}
                            style={getInputStyle(!!errors.consultationType)}
                          >
                            <option value="">Select consultation type</option>
                            <option value="In-person">In-person</option>
                            <option value="Virtual">Virtual</option>
                            <option value="Both">Both</option>
                          </select>
                          {errors.consultationType && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.consultationType.message}</p>}
                        </div>

                        {/* Weekly Availability */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Average Appointment Availability per Week
                          </label>
                          <input
                            {...register("weeklyAvailability")}
                            type="text"
                            placeholder="e.g. 10 slots per week"
                            className={inputClass}
                            style={getInputStyle(!!errors.weeklyAvailability)}
                          />
                          {errors.weeklyAvailability && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.weeklyAvailability.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Email Address
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="doctor@example.com"
                            className={inputClass}
                            style={getInputStyle(!!errors.email)}
                          />
                          {errors.email && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Phone Number
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={inputClass}
                            style={getInputStyle(!!errors.phone)}
                          />
                          {errors.phone && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>}
                        </div>

                        {/* Bio */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-on-surface-variant)" }}>
                            Brief Bio{" "}
                            <span className="normal-case font-normal">(100 words max)</span>
                          </label>
                          <textarea
                            {...register("bio")}
                            rows={3}
                            placeholder="Share your experience, qualifications, and approach to maternal care..."
                            className={`${inputClass} resize-none`}
                            style={getInputStyle(!!errors.bio)}
                          />
                          {errors.bio && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.bio.message}</p>}
                        </div>

                        {/* Credentials note */}
                        <div
                          className="flex items-start gap-3 px-4 py-3 rounded-lg text-xs"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, transparent)",
                            color: "var(--color-on-surface-variant)",
                          }}
                        >
                          <span className="material-symbols-outlined text-base flex-shrink-0" style={{ color: "var(--color-primary)" }}>
                            info
                          </span>
                          Credential documents (degree certificates, MCI/NMC registration) will be requested by our team via email during the 48-hour verification process.
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 mt-2"
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
                              Submit My Application
                              <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                          )}
                        </motion.button>

                        <p
                          className="text-center px-4 leading-relaxed"
                          style={{ fontSize: "10px", color: "var(--color-on-surface-variant)" }}
                        >
                          Our partnership team will contact you within 48 hours of submission.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </aside>
          </div>

          {/* ── Who Should Join — full width ── */}
          <ScrollReveal delay={0.1}>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Table */}
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
                  Eligible Specialists
                </p>
                <h2
                  className="text-4xl font-bold mb-8"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Who Should Join?
                </h2>
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}>
                  <div
                    className="grid grid-cols-2 px-7 py-4 text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    <span>Specialist Type</span>
                    <span>What You Offer Through Motherly</span>
                  </div>
                  {specialists.map((s, i) => (
                    <div
                      key={s.type}
                      className="grid grid-cols-2 px-7 py-5 gap-6"
                      style={{
                        backgroundColor: i % 2 === 0 ? "var(--color-surface-container-lowest)" : "var(--color-surface-container-low)",
                        borderTop: "1px solid color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                      }}
                    >
                      <span className="text-sm font-semibold leading-snug" style={{ color: "var(--color-on-surface)" }}>{s.type}</span>
                      <span className="text-sm leading-snug" style={{ color: "var(--color-on-surface-variant)" }}>{s.offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo image panel */}
              <div className="lg:col-span-5 flex items-center justify-center pt-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOut }}
                  className="w-full rounded-2xl flex flex-col items-center justify-center gap-8 py-14 px-10"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    boxShadow: "0 8px 32px rgba(45,52,53,0.08)",
                    border: "1px solid color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Motherly logo"
                    className="w-40 object-contain"
                  />
                  <div className="text-center">
                    <p
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      Trusted by Mothers Across Chennai
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      Join a growing network of verified specialists committed to raising the standard of maternal care.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── How the Partnership Works — full width ── */}
          <ScrollReveal delay={0.1}>
            <div className="mt-24 text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
                Partnership Process
              </p>
              <h2
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                How the Partnership Works
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: easeOut }}
                  className="flex flex-col items-center text-center p-7 rounded-2xl"
                  style={{
                    backgroundColor: "var(--color-surface-container-lowest)",
                    boxShadow: "0 2px 12px rgba(45,52,53,0.06)",
                    borderTop: "4px solid color-mix(in srgb, var(--color-primary) 30%, transparent)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
                  >
                    <span
                      className="text-base font-extrabold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <h4
                    className="text-base font-bold mb-3"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── Trust & Compliance — full width ── */}
          <ScrollReveal delay={0.1}>
            <div
              className="mt-16 p-12 rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: "var(--color-surface-container-low)" }}
            >
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none">
                <span className="material-symbols-outlined" style={{ fontSize: "9rem" }}>verified_user</span>
              </div>
              <div className="relative z-10 text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
                  Data & Verification
                </p>
                <h3
                  className="text-4xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Trust & Compliance
                </h3>
              </div>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {trustPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 px-6 py-5 rounded-xl"
                    style={{ backgroundColor: "var(--color-surface-container-lowest)" }}
                  >
                    <span
                      className="material-symbols-outlined text-xl mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-sm leading-relaxed font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </section>
      </main>
      <Footer />
    </>
  );
}
