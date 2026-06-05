"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";
import Lead101FormWidget from "@/components/Lead101FormWidget";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-7 rounded-2xl p-6 md:p-8 pb-4 relative overflow-visible self-start"
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 rounded-full pointer-events-none"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary-container) 10%, transparent)" }}
            />

            <h2
              className="text-3xl font-bold mb-4 relative z-10"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Send a Message
            </h2>

            <div className="relative z-10">
              <Lead101FormWidget />
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-6">
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
                    Chennai, Tamil Nadu
                    <br />
                    India
                  </p>
                </div>
              </div>
            </ScrollReveal>

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
                  <h4 className="font-bold mb-0.5 text-sm" style={{ color: "var(--color-on-surface)" }}>
                    Call Us
                  </h4>
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
                  <h4 className="font-bold mb-0.5 text-sm" style={{ color: "var(--color-on-surface)" }}>
                    Email Us
                  </h4>
                  <p className="text-xs font-medium break-all" style={{ color: "var(--color-on-tertiary-container)" }}>
                    motherlycareethos@gmail.com
                  </p>
                </motion.a>
              </div>
            </ScrollReveal>

            {/* <ScrollReveal delay={0.2}>
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
            </ScrollReveal> */}
          </div>
        </div>
      </main>
      <CTASection />
      <Footer />
    </>
  );
}
