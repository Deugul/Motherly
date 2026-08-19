"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const services = [
  {
    icon: "child_friendly",
    title: "Doulas",
    desc: "Dedicated birth companions who provide continuous physical and emotional support throughout your labour and delivery.",
    href: "/services/doulas",
  },
  {
    icon: "favorite",
    title: "Lactation/Obstetrician Consultation",
    desc: "Expert one-on-one breastfeeding guidance, troubleshooting and education to ensure healthy feeding practices.",
    href: "/services/lactation-consultants",
  },
  {
    icon: "stethoscope",
    title: "Gynaecology Consultation",
    desc: "Secure, confidential consultations with experienced gynaecologists for prenatal check-ups and postpartum recovery.",
    href: "/services/gynecologist-consultation",
  },
  {
    icon: "child_care",
    title: "Nanny Care",
    desc: "Trained nannies offering holistic infant care, light household help and warm emotional companionship for mother and baby.",
    href: "/services/nanny-services",
  },
  {
    icon: "spa",
    title: "Postnatal Recovery",
    desc: "Physiotherapy-led programmes for pelvic floor restoration, core strengthening and full postpartum wellness.",
    href: "/services/postnatal-recovery-care",
  },
  {
    icon: "pediatrics",
    title: "Pediatrician Consultation",
    desc: "Comprehensive child health consultations from birth through early childhood, covering vaccinations, developmental checks, and common childhood conditions.",
    href: "/services/pediatrician",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-10 md:py-20" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* 1 — Title */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Our <span style={{ color: "var(--color-primary)" }}>Services</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* 2 — Descriptive headline */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-14">
        <ScrollReveal>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Services
          </p>
          <p
            className="text-3xl md:text-4xl font-bold leading-snug max-w-4xl"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            At Motherly, we provide a comprehensive range of maternal care services tailored to your needs.{" "}
            <span style={{ color: "var(--color-on-surface-variant)", fontWeight: 400 }}>
              Our expert team supports your journey with compassionate, personalised care every step of the way.
            </span>
          </p>
        </ScrollReveal>
      </div>

      {/* 3 — Service cards grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: easeOut }}
            whileHover={{ y: -4 }}
            className="group flex flex-col gap-6 p-7 rounded-2xl border transition-shadow hover:shadow-lg"
            style={{
              borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
              backgroundColor: "white",
            }}
          >
            {/* Icon */}
            <span
              className="material-symbols-outlined text-4xl"
              style={{
                color: "var(--color-primary)",
                fontVariationSettings: "'FILL' 0",
              }}
            >
              {s.icon}
            </span>

            {/* Title + desc */}
            <div className="flex-1 space-y-2">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                {s.desc}
              </p>
            </div>

            {/* Redirect link */}
            <Link
              href={s.href}
              className="inline-flex items-center gap-2 text-sm font-bold group/link"
              style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
            >
              Learn More
              <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </motion.div>
        ))}
        </div>
      </div>

    </section>
  );
}
