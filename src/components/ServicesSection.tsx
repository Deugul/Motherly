"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const photos = [
  { src: "/strip-lactation.jpg",    caption: "Expert guidance for your feeding journey" },
  { src: "/strip-gynaecology.jpg",  caption: "Trusted women's health consultations" },
  { src: "/strip-nannies.jpg",      caption: "Compassionate postnatal support" },
  { src: "/strip-team.jpg",         caption: "Care that feels like family" },
  { src: "/strip-birth.jpg",        caption: "Your birth, your way" },
  { src: "/strip-support.jpg",      caption: "Every step of motherhood, supported" },
];

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
    href: "/services/lactation",
  },
  {
    icon: "stethoscope",
    title: "Gynecology Consultation",
    desc: "Secure, confidential consultations with experienced gynecologists for prenatal check-ups and postpartum recovery.",
    href: "/services/gynaecology",
  },
  {
    icon: "child_care",
    title: "Nanny Care",
    desc: "Trained nannies offering holistic infant care, light household help and warm emotional companionship for mother and baby.",
    href: "/services/nannies",
  },
  {
    icon: "spa",
    title: "Postnatal Recovery",
    desc: "Physiotherapy-led programmes for pelvic floor restoration, core strengthening and full postpartum wellness.",
    href: "/services/postnatal",
  },
  {
    icon: "pediatrics",
    title: "Pediatrician Consultation",
    desc: "Comprehensive child health consultations from birth through early childhood, covering vaccinations, developmental checks, and common childhood conditions.",
    href: "/services/nutrition",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* 1 — Title */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Our <span style={{ color: "var(--color-primary)" }}>Services</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* 2 — Horizontally scrolling 1:1 photo strip */}
      <div
        className="flex gap-4 overflow-x-auto pb-2 px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
            className="relative flex-shrink-0 snap-start rounded-2xl overflow-hidden"
            style={{ width: "280px", aspectRatio: "1/1" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }}
            />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white leading-snug">
              {p.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 3 — Descriptive headline */}
      <div className="max-w-7xl mx-auto px-8 mt-16 mb-14">
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

      {/* 4 — Service cards grid */}
      <div className="max-w-7xl mx-auto px-8">
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
