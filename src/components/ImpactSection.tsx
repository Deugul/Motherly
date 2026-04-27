"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Happy Mothers" },
  { value: 500, suffix: "+", label: "Successful Births" },
  { value: 50,  suffix: "+", label: "Care Providers" },
];

export default function ImpactSection() {
  return (
    <section className="pt-4 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <ScrollReveal className="text-center mb-10 space-y-3">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
        >
          Our <span style={{ color: "var(--color-primary)" }}>Impact</span>
        </h2>
        <p
          className="text-base italic"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Real stories of care, comfort, and confidence from mothers we've supported.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div
          className="rounded-2xl border grid grid-cols-2 md:grid-cols-4"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-primary) 6%, white)",
            borderColor: "color-mix(in srgb, var(--color-primary) 30%, transparent)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{
                borderRight: i < stats.length - 1
                  ? "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)"
                  : "none",
              }}
            >
              <div
                className="text-4xl md:text-5xl font-extrabold mb-2"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-primary)" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
