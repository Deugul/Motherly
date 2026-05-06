"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);
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
          <Image
            src="/cta-phone-screen.jpg"
            alt="Motherly App"
            width={640}
            height={480}
            sizes="(max-width: 768px) 100vw, 640px"
            className="w-full max-w-[640px] h-auto object-contain"
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
            <Link href="/contact-us">
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
                <a href="https://play.google.com/store/apps/details?id=com.mothrly" target="_blank" rel="noopener noreferrer">
                  <MotionImage
                    whileHover={{ opacity: 0.8 }}
                    src="/badge-google-play.png"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className="h-10 w-auto object-contain cursor-pointer"
                  />
                </a>
                <a href="https://apps.apple.com/in/app/motherly-your-birth-companion/id6746041100" target="_blank" rel="noopener noreferrer">
                  <MotionImage
                    whileHover={{ opacity: 0.8 }}
                    src="/badge-app-store.png"
                    alt="Download on the App Store"
                    width={135}
                    height={40}
                    className="h-10 w-auto object-contain cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
