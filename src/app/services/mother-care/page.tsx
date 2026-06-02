"use client";

import { useState, useRef, useLayoutEffect } from "react";
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
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  date: z.string().min(1, "Date is required").refine(
    (val) => { const t = new Date(); t.setHours(0, 0, 0, 0); return new Date(val) >= t; },
    "Please select today or a future date"
  ),
  time: z.string().min(1, "Time is required").refine(
    (val) => { const [h] = val.split(":").map(Number); return h >= 9 && h < 18; },
    "Please select a time between 9 AM and 6 PM"
  ),
  message: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-2 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const MOTHER_CARE_PROVIDES = [
  {
    icon: "healing",
    title: "Physical Recovery",
    desc: "Wound care, mobility support, postnatal oil massage, herbal baths, and monitoring of your recovery after normal delivery or caesarean section.",
  },
  {
    icon: "restaurant",
    title: "Nutritional Support",
    desc: "Preparation of traditional postnatal foods including laddoos, rasam, methi dishes, and lactation-boosting meals tailored to Chennai households.",
  },
  {
    icon: "breastfeeding",
    title: "Breastfeeding Guidance",
    desc: "Latch support, positioning assistance, and coordination with a lactation consultant for complex feeding challenges.",
  },
  {
    icon: "sentiment_satisfied",
    title: "Emotional Wellbeing",
    desc: "Non-judgmental presence, postpartum mood monitoring, and referral to mental health support when needed.",
  },
];

const JOURNEY_STAGES = [
  {
    num: 1,
    title: "Day of hospital discharge",
    text: "Your Mother Care specialist can be present from the moment you arrive home, helping you settle in, rest, and begin postnatal recovery in a supported environment.",
    link: null,
  },
  {
    num: 2,
    title: "First two weeks (critical recovery window)",
    text: "Daily in-home support covering wound care, bathing assistance, postnatal massage, and newborn care basics so you can rest and heal.",
    link: { label: "postnatal recovery care", url: "/services/postnatal-recovery-care" },
  },
  {
    num: 3,
    title: "Weeks three to six (confinement period)",
    text: "Continued nutritional support, emotional check-ins, and breastfeeding assistance alongside Motherly's lactation network.",
    link: { label: "lactation consultants", url: "/services/lactation-consultants" },
  },
  {
    num: 4,
    title: "Beyond six weeks (extended support)",
    text: "For mothers who need continued guidance, virtual consultations and periodic in-home visits are available through Motherly's flexible booking system.",
    link: null,
  },
];

const WHO_IS_IT_FOR = [
  "A mother who has delivered via caesarean section and needs structured wound care and mobility support",
  "A first-time mother feeling overwhelmed by newborn care and unsure of your recovery timeline",
  "Away from your natal family in Chennai and without traditional extended-family support at home",
  "Experiencing signs of postpartum blues or emotional exhaustion in the weeks after delivery",
  "Looking for a specialist who understands traditional Indian confinement practices alongside modern postnatal care",
  "A working mother returning to professional life and wanting to ensure your recovery is on track before you do",
];

const FAQS = [
  {
    q: "How much does Mother Care cost in Chennai?",
    a: "Mother Care pricing at Motherly depends on whether you choose in-home daily care, overnight support, or virtual consultations, and the duration of engagement. In-home care is priced per visit or as a weekly package. Please visit the Motherly app or contact us for a customised quote based on your location in Chennai and your specific postnatal needs.",
  },
  {
    q: "How is a Mother Care specialist different from a regular maid or helper?",
    a: "A regular domestic helper is not trained in postnatal anatomy, wound care, breastfeeding support, or postpartum emotional health. Motherly's Mother Care specialists are certified professionals who provide clinically informed, structured postnatal care, not just household assistance.",
  },
  {
    q: "Can I book Mother Care for the full 40-day confinement period?",
    a: "Yes. The traditional 40-day postnatal confinement period is something Motherly's specialists understand and respect. You can book continuous in-home Mother Care for this entire period, with flexibility to adjust the schedule as your recovery progresses.",
  },
  {
    q: "Is Mother Care available after caesarean delivery?",
    a: "Absolutely. Post-caesarean recovery requires more structured support, including wound care, limited mobility assistance, and careful posture guidance. Our specialists are specifically trained for caesarean postnatal care.",
  },
  {
    q: "Do you provide Mother Care across all areas of Chennai?",
    a: "Motherly provides in-home Mother Care across Chennai including Anna Nagar, Adyar, Velachery, T. Nagar, Mylapore, Nungambakkam, Porur, Sholinganallur, Perambur, and surrounding neighbourhoods. Use the Motherly app to confirm availability in your pincode.",
  },
];

export default function MotherCarePage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formActive, setFormActive] = useState(false);
  const formWrapperRef = useRef<HTMLElement>(null);
  const preActivateTop = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (formActive && preActivateTop.current !== null && formWrapperRef.current) {
      const diff = formWrapperRef.current.getBoundingClientRect().top - preActivateTop.current;
      if (Math.abs(diff) > 1) window.scrollBy({ top: diff, behavior: "instant" });
      preActivateTop.current = null;
    }
  }, [formActive]);

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
      body: JSON.stringify({ formType: "Service Bookings", page: "Mother Care", ...data }),
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-7 space-y-14">

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
                  Book a{" "}
                  <span style={{ color: "var(--color-primary)" }}>Mother Care Specialist</span>
                  {" "}in Chennai
                </h1>
                <p
                  className="text-base md:text-lg mt-4 leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Comprehensive postnatal care from verified Mother Care specialists — in-home recovery support, traditional oil massage, nutritional guidance, and emotional wellbeing from day one after delivery.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "96%", label: "Mothers felt more supported during postnatal recovery" },
                  { value: "40%", label: "Reduction in postnatal complications with dedicated care" },
                  { value: "30+", label: "Verified Mother Care specialists across Chennai" },
                  { value: "40", label: "Days Postnatal support available, in-home or virtual" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="p-5 rounded-2xl border flex flex-col items-center text-center"
                    style={{
                      backgroundColor: "var(--color-surface-container-low)",
                      borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                    }}
                  >
                    <div className="text-center w-full leading-tight" style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}>
                      {stat.value.includes('\n') ? (
                        <>
                          <div className="text-xl md:text-2xl font-black">{stat.value.split('\n')[0]}</div>
                          <div className="text-sm font-semibold mt-0.5">{stat.value.split('\n')[1]}</div>
                        </>
                      ) : (
                        <div className="text-xl md:text-2xl font-black">{stat.value}</div>
                      )}
                    </div>
                    <p className="text-xs mt-2 leading-snug" style={{ color: "var(--color-on-surface-variant)" }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/mother-care.png"
                    alt="A Motherly Mother Care specialist providing postnatal recovery support at home in Chennai"
                    width={800}
                    height={400}
                    className="w-full h-[360px] object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(172,45,94,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    Expert Postnatal Care
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Recovery that starts at home.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Postnatal Support That Holds You, From the First Day Home
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects new mothers in Chennai with trained, verified postnatal care specialists and Mother Care professionals. As the trusted postnatal recovery care platform Chennai families rely on, we provide continuous Mother Care Chennai mothers need, from day one after delivery through the full 40-day confinement period and beyond.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  See also:{" "}
                  <a href="/services/lactation-consultants" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>lactation consultant</a>,{" "}
                  <a href="/services/postnatal-recovery-care" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>postnatal recovery care</a>, and postpartum care Chennai.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  In-Home Mother Care and Virtual Support: Two Ways Motherly Cares for You
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "In-Home Mother Care",
                      desc: "An in-home Mother Care specialist provides continuous, hands-on support from the day you return from the hospital. She visits daily or stays around the clock, assisting with your physical recovery, preparing postnatal meals, performing traditional oil massage, and ensuring you rest while your baby is cared for.",
                    },
                    {
                      title: "Virtual Mother Care Consultations",
                      desc: "A virtual Mother Care specialist supports you remotely after birth through scheduled video sessions covering postnatal recovery monitoring, breastfeeding guidance, dietary planning, and emotional health check-ins.",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="p-5 rounded-2xl border"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
                        backgroundColor: "var(--color-surface-container-low)",
                      }}
                    >
                      <h3
                        className="text-base font-bold mb-2"
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-5">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Is Mother Care and Why Chennai Mothers Are Choosing It
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Mother Care refers to the comprehensive professional support provided to a mother during the postnatal period, covering physical recovery, emotional health, nutritional guidance, and practical daily assistance. In Chennai, where nuclear families are increasingly common and traditional extended-family support systems are not always available, dedicated Mother Care has become an essential choice among informed families.
                </p>

                <div
                  className="p-6 rounded-2xl border-l-4"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)",
                    borderLeftColor: "var(--color-primary)",
                  }}
                >
                  <h4 className="font-bold mb-2" style={{ color: "var(--color-primary)" }}>What the research says</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    Research consistently shows that structured postnatal support reduces rates of postpartum depression, improves breastfeeding outcomes, and accelerates physical recovery after both vaginal and caesarean births. A Mother Care specialist is not a replacement for your gynaecologist or nursing team. She works alongside your medical professionals to bridge the gap between clinical discharge and full recovery at home.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Our Mother Care Specialists Provide
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)" }}
                >
                  {MOTHER_CARE_PROVIDES.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="p-5 flex flex-col gap-3"
                      style={{ backgroundColor: "var(--color-surface-container-low)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--color-primary-container) 50%, white)",
                          color: "var(--color-primary)",
                        }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <div>
                        <h3
                          className="text-sm font-bold mb-1.5"
                          style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Mother Care Through Your Postnatal Recovery
                </h2>
                <div className="space-y-0">
                  {JOURNEY_STAGES.map((stage, i) => (
                    <motion.div
                      key={stage.num}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.07 }}
                      className="flex gap-5 border-b py-6"
                      style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-black text-base"
                        style={{ backgroundColor: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {stage.num}
                      </div>
                      <div className="space-y-2">
                        <h4
                          className="font-bold text-base"
                          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                        >
                          {stage.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {stage.text}
                        </p>
                        {stage.link && (
                          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                            See also:{" "}
                            <a href={stage.link.url} style={{ color: "var(--color-primary)", textDecoration: "underline" }}>{stage.link.label}</a>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section
                className="rounded-2xl p-8 space-y-5"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Who Is Mother Care Right For?
                </h2>
                <p className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Mother Care from Motherly is particularly valuable if you are:
                </p>
                <ul className="space-y-3">
                  {WHO_IS_IT_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span
                        className="material-symbols-outlined text-base mt-0.5 flex-shrink-0"
                        style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <blockquote
                className="rounded-2xl p-6 border-l-4"
                style={{
                  backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)",
                  borderColor: "#d97706",
                }}
              >
                <p
                  className="text-base italic leading-relaxed mb-4"
                  style={{ color: "#92400e" }}
                >
                  "I had no family nearby and was completely unprepared for how difficult the first two weeks would be after my C-section. My Motherly Mother Care specialist came every morning, took care of everything from my dressing to my meals, and even showed me how to properly hold and feed my baby. By week three I actually felt like myself again."
                </p>
                <footer className="text-sm" style={{ color: "#b45309" }}>
                  <strong>— Revathi S.</strong>
                  <span style={{ color: "#a16207" }}> | First-time mother, Adyar, Chennai</span>
                </footer>
              </blockquote>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <section className="space-y-3">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Frequently Asked Questions
                </h2>
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border"
                    style={{
                      backgroundColor: openFaq === i
                        ? "color-mix(in srgb, var(--color-secondary-container) 30%, white)"
                        : "var(--color-surface-container-lowest)",
                      borderColor: openFaq === i
                        ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                        : "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                      transition: "background-color 0.2s, border-color 0.2s",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-bold"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                    >
                      <span className="pr-4 text-sm md:text-base">
                        <span className="text-xs font-bold mr-2" style={{ color: "var(--color-primary)" }}>Q{i + 1}</span>
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="material-symbols-outlined shrink-0"
                        style={{ color: "var(--color-primary)" }}
                      >
                        keyboard_arrow_down
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            className="px-6 pb-5 border-t"
                            style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)" }}
                          >
                            <p className="pt-4 text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="rounded-2xl p-8 text-center space-y-4"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 40%, white)" }}
              >
                <h3
                  className="text-xl md:text-2xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Book through the Motherly app
                </h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  Browse verified professionals, view profiles and reviews, and book a home visit in minutes.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <a href="https://play.google.com/store/apps/details?id=com.mothrly" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/badge-google-play.png"
                      alt="Download on Google Play"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                  <a href="https://apps.apple.com/in/app/motherly-your-birth-companion/id6746041100" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/badge-app-store.png"
                      alt="Download on the App Store"
                      width={135}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                </div>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  Or visit{" "}
                  <a href="https://www.mothrly.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
                    www.mothrly.com
                  </a>
                </p>
              </div>
            </ScrollReveal>

          </div>

          <aside ref={formWrapperRef} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              onFocus={() => {
                if (!formActive && formWrapperRef.current) {
                  preActivateTop.current = formWrapperRef.current.getBoundingClientRect().top;
                }
                setFormActive(true);
              }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFormActive(false); }}
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
                borderTopWidth: "8px",
                borderTopColor: "var(--color-primary)",
              }}
            >
              <div className="p-4 md:p-5">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Send an Enquiry
                </h3>
                <p className="mb-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
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
                      className="space-y-3"
                    >
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                          Select Service
                        </label>
                        <select {...register("service")} defaultValue="Mother Care" className={inputClass} style={getInputStyle()}>
                          <option value="Mother Care">Mother Care</option>
                          <option value="In-Home Mother Care">In-Home Mother Care</option>
                          <option value="Virtual Mother Care">Virtual Mother Care</option>
                          <option value="Full Confinement Care">Full Confinement Care</option>
                        </select>
                      </div>

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

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Location</label>
                          <input {...register("location")} type="text" placeholder="Area / Neighbourhood" className={inputClass} style={getInputStyle(!!errors.location)} />
                          {errors.location && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.location.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>Pincode</label>
                          <input {...register("pincode")} type="text" placeholder="6-digit pincode" maxLength={6} className={inputClass} style={getInputStyle(!!errors.pincode)} />
                          {errors.pincode && <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.pincode.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                            Select Date
                          </label>
                          <input
                            {...register("date")}
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className={inputClass}
                            style={getInputStyle(!!errors.date)}
                          />
                          {errors.date && (
                            <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                            Enter Time
                          </label>
                          <input
                            {...register("time")}
                            type="time"
                            min="09:00"
                            max="18:00"
                            className={inputClass}
                            style={getInputStyle(!!errors.time)}
                          />
                          {errors.time && (
                            <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                          Message
                        </label>
                        <textarea
                          {...register("message")}
                          rows={2}
                          placeholder="Tell us about your care needs..."
                          className={`${inputClass} resize-none`}
                          style={getInputStyle()}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 mt-3"
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
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Enquiry
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                          </>
                        )}
                      </motion.button>

                      <p
                        className="text-center mt-3 leading-relaxed"
                        style={{ fontSize: "10px", color: "var(--color-on-surface-variant)", opacity: 0.6 }}
                      >
                        By submitting, you agree to our privacy policy. Your information is kept confidential
                        and shared only with your assigned caregiver.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </aside>

        </div>
      </main>
      <Footer />
    </>
  );
}
