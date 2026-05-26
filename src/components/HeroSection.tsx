"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      {/* ── MOBILE layout: stacked image then content ── */}
      <section className="md:hidden flex flex-col overflow-hidden rounded-b-[2rem] min-h-screen">
        {/* Image block — 60vh */}
        <div className="relative h-[60vh] w-full flex-shrink-0">
          <Image
            src="/hero-bg.jpg"
            alt="Mother and baby"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[85%_10%]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 0%, white 100%)" }}
          />
        </div>

        {/* Content panel — fills remaining 40% */}
        <div className="relative z-10 flex-1 px-5 pt-4 pb-7 flex flex-col gap-4 bg-white">
          {/* Badge */}
          <div className="animate-hero-fade hero-delay-100">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-widest uppercase"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 80%, transparent)",
                borderColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h1.5l2.25-4.5L11.25 18l3-10.5 2.25 4.5h3" />
              </svg>
              Expert Care for Every Step
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-[2rem] font-extrabold tracking-tighter leading-[1.08] animate-hero-fade hero-delay-200"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
          >
            <span style={{ color: "var(--color-primary)" }}>Motherly</span>{" "}
            Your Birth Companion
          </h1>

          <div
            className="w-12 h-1 rounded-full animate-hero-fade hero-delay-300"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)" }}
          />

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-1 animate-hero-fade hero-delay-400">
            <Link href="/services/doulas" className="block w-full">
              <button
                className="w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-transform active:scale-96 cursor-pointer"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  boxShadow: "0 8px 28px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                }}
              >
                Find a Doula
              </button>
            </Link>
            <Link href="/contact-us" className="block w-full">
              <button
                className="w-full px-6 py-3.5 rounded-xl font-bold text-sm border-2 transition-transform active:scale-96 cursor-pointer"
                style={{
                  fontFamily: "var(--font-headline)",
                  backgroundColor: "white",
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESKTOP layout: background overlay ── */}
      <section className="hidden md:flex relative min-h-[90vh] flex-col overflow-hidden rounded-b-[2.5rem]">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Mother and baby"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_35%]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.35) 50%, transparent 100%)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 max-w-7xl mx-auto w-full pt-40 flex-1">
          <div className="max-w-lg space-y-5">
            {/* Badge */}
            <div className="animate-hero-fade hero-delay-100">
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 80%, transparent)",
                  borderColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                  color: "var(--color-on-secondary-container)",
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="var(--color-primary)" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h1.5l2.25-4.5L11.25 18l3-10.5 2.25 4.5h3" />
                </svg>
                Expert Care for Every Step
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.08] animate-hero-fade hero-delay-200"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
            >
              <span style={{ color: "var(--color-primary)" }}>Motherly</span>{" "}
              Your Birth Companion
            </h1>

            <div
              className="w-16 h-1 rounded-full animate-hero-fade hero-delay-300"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)" }}
            />

            {/* Buttons */}
            <div className="flex flex-row gap-3 pt-1 animate-hero-fade hero-delay-400">
              <Link href="/services/doulas">
                <button
                  className="px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-104 hover:-translate-y-0.5 active:scale-96 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-headline)",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    boxShadow: "0 8px 28px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                  }}
                >
                  Find a Doula
                </button>
              </Link>
              <Link href="/contact-us">
                <button
                  className="px-8 py-3 rounded-xl font-bold text-base border-2 transition-all duration-300 hover:scale-104 hover:-translate-y-0.5 active:scale-96 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-headline)",
                    backgroundColor: "white",
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                  }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
