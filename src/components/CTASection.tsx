"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section
      className="py-7 px-8 overflow-visible"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* App image — no phone frame */}
        <ScrollReveal direction="left" className="flex-1 flex justify-center md:justify-end order-2 md:order-1">
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            src="/cta-phone-screen.jpg"
            alt="Motherly App"
            className="w-full max-w-[640px] h-auto object-contain drop-shadow-2xl"
            style={{ borderRadius: "1.5rem" }}
          />
        </ScrollReveal>

        {/* Content */}
        <div className="flex-1 text-center md:text-left order-1 md:order-2 space-y-6">
          <ScrollReveal direction="right">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-primary)" }}
            >
              Ready to start your Journey?
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <p
              className="text-base md:text-lg font-medium leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--color-on-primary) 90%, transparent)" }}
            >
              Contact us now to learn more and take the first step toward your empowered birth!
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-bold text-base shadow-xl transition-all"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "white",
                  color: "var(--color-primary)",
                }}
              >
                Book Consultation
              </motion.button>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div className="space-y-3">
              <p
                className="text-xs font-bold tracking-widest uppercase opacity-80"
                style={{ color: "var(--color-on-primary)" }}
              >
                Available on
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <motion.img
                  whileHover={{ opacity: 0.8 }}
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujht03aWxKLWGRIbf5fGwDB-6LfQPDeFEZY-4yPjgS4FR8gZ45z6JnpeAkRU00z8htzukEtt7ULZQet3yumjenrEBIixkzwI1v37wFoGAkdaugkp8crIIYZ9pqcKA3Udld_6xur8uvXj1YlFLy7Z4j4MG0ueyVXvS6UQA9IWCoZVfCaRkpC6uIKo4DpsxdXE7oSxVX2kz9YImmozgivNElG4IrUXN0VLZvQawAxVV-QoB39eR5W9l_YUcO_0UV7lROtnWj58xpFdXE"
                  alt="Get it on Google Play"
                  className="h-10 w-auto object-contain cursor-pointer"
                />
                <motion.img
                  whileHover={{ opacity: 0.8 }}
                  src="https://lh3.googleusercontent.com/aida/ADBb0uithlhjJhHQAkqafTvy5ynB9H9PLNU81lV8dAfyhpAJ6FmVIPjeIvXOJV-s3TjXPsm--NkX-UqpCJR0eLyF1ta4o_2yk54j8dzEFYE72J_3Vmge_5yr4v2oNRLqRQceWMFQ6O1g8hu6w1OrAy9jQJewEnY3xc8d5BhXzsSDwWfjCWtKM_nP8mKbgNA0H_jby8C7VvxGL8qPT9RkO9Xh99ZPWgDmokWw6YSu1L0ouQZizKWQ0i8riVQ0TLPpg0sXpPrVjdjG_LSfNg"
                  alt="Download on the App Store"
                  className="h-10 w-auto object-contain cursor-pointer"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
