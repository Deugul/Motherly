"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const filters = ["All Topics", "Prenatal", "Newborn Care", "Wellness", "Postpartum"];

const posts = [
  {
    tag: "NEWBORN CARE",
    tagBg: "var(--color-tertiary-container)",
    tagColor: "var(--color-on-tertiary-container)",
    title: "Safe Sleep Habits: A Comprehensive Guide for New Parents",
    excerpt: "Navigating the complexities of sleep schedules and safety standards to ensure both you and your baby rest easy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNTtPSRu7xI-HyHEPfj57Q3Tmk33Aez_4LudaMcey1vuCI19sXdI2_LkFw5MzhxGPMrKVpiUUca86DcyVt6S36uKCiC1G1h1hSZhAyCG9y4Z0IvRMw4Dg3QcrX6yCVj5AU4KMlLxy0fdhuUVEJEvHs_8R7Ns-i6r7TwEsAMXCzTXfzcsMmtHMcnngxCwMX-d8MTu7Nu4OESIlempuOIGMJ-xuAF2iA7wq2UHVUFGAi-QWRf-i9n16oiwYOfTw344ahxQ0mnSMwV6aP",
    date: "June 12, 2024",
    readTime: "6 min read",
  },
  {
    tag: "PRENATAL",
    tagBg: "var(--color-secondary-container)",
    tagColor: "var(--color-on-secondary-container)",
    title: "Optimal Nutrition: Fueling Your Body and Your Baby",
    excerpt: "Essential vitamins and nutrients you need during each trimester, backed by nutritional science and maternal health experts.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClZaALx_6qlclgPo3w8Q0GjnhndDIxY3vWRgHKgIL3v4CBtriPX0rT5QI9JKjK5jVFoHgbwqP6c4Djb-hCa6FR0qycHrN8HxXvyALxV4QxNBfsHhtwxuXOOfKEExFpix8zkBL4QRSZCyYLtg1Z-Mp80oXZsbU-lKCiQleKagUQgJTNTr1aj1q8FUlljrEW7RqCEfshpxQlfJeiJRidUaakutpZX7ljePEvSXIjhJkrhTdxLjG2-wY2Lg2qasPeVkVPnuNlGfd_2FcJ",
    date: "May 28, 2024",
    readTime: "8 min read",
  },
  {
    tag: "POSTPARTUM",
    tagBg: "var(--color-primary-container)",
    tagColor: "var(--color-on-primary-container)",
    title: "The Fourth Trimester: What to Honestly Expect",
    excerpt: "A candid look at the physical and emotional changes during the postpartum period and how to seek support.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwVVOhuccbOlVly0xr5VT5RlJcZsaLZa81RCGsguOtupUFaQwB-glxXPfOl176YKo8OiCLOglqC-owL9mSlyK_5Fqt2IOzU9kl1ClVXf0FLRLaH9g-c7FEVRE0RTXm-eUdXiRIYHBY-BnO_l8EZW3M2fBU7Xvrcyiqas2hb0aysn2ARuwuQzh0UOTeUVFx2nJPDQYyb_z0KgsYI5CpLFTlX4T9SSwEn-rXsQYuXBQYOfg33eypHBzXPhmZGsjMTNpwWSiHKjEGO",
    date: "May 15, 2024",
    readTime: "10 min read",
  },
];

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState("All Topics");

  return (
    <>
      <Navbar />
      <main
        className="pt-24 pb-20 max-w-7xl mx-auto px-6"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        {/* Hero */}
        <ScrollReveal>
          <header className="py-12 md:py-20 text-center space-y-6">
            <h1
              className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              Insights for{" "}
              <span className="italic" style={{ color: "var(--color-primary)" }}>Every Stage</span>
            </h1>
            <p
              className="max-w-2xl mx-auto text-lg"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Nurturing wisdom and expert advice for your journey from pregnancy through parenthood.
              Curated by healthcare specialists.
            </p>
          </header>
        </ScrollReveal>

        {/* Filters + Search */}
        <ScrollReveal delay={0.05}>
          <section className="mb-16">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Filter chips */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={
                      activeFilter === f
                        ? {
                            backgroundColor: "var(--color-secondary-container)",
                            color: "var(--color-on-secondary-container)",
                          }
                        : {
                            backgroundColor: "var(--color-surface-container-high)",
                            color: "var(--color-on-surface-variant)",
                          }
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-base"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none border-2 border-transparent transition-all"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    color: "var(--color-on-surface)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Featured Article */}
        <ScrollReveal delay={0.1}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="relative mb-20 cursor-pointer group"
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-12 items-center rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
              }}
            >
              {/* Image */}
              <div className="lg:col-span-7 aspect-video lg:aspect-auto h-full overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRiWYdtWqwxS5N9OOT3pSNaKA0rIfD9nI0jZOx_VeXfj2ysiUJbF5WLYWHK5YsP6xk3wkthekovqt7_WenoYqDhwsxyRU4iLv9GX14uwu80ZXiee55EzDP3bLHx5Y2Xr2bNxqO06INlikfWjm_d07SK0K6rAoxmkagmBtPMvb68WwsOoo0lOLmXUj1i2FUvOXWuxXCVXNp18HU-70x5njcmjgL8YpFLW800MAajWobk0LeaV6FQtYqsoJgCYdfMm2jRX3p0GYWXqRh"
                  alt="Mindful Motherhood"
                  className="w-full h-full object-cover"
                  style={{ minHeight: "320px" }}
                />
              </div>
              {/* Content */}
              <div className="lg:col-span-5 p-8 lg:p-12 space-y-4">
                <span
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Featured Wellness
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  The Art of Mindful Motherhood: Finding Calm in the Chaos
                </h2>
                <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                  Practical grounding techniques for busy mothers to maintain emotional balance during
                  the first year of parenthood.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ backgroundColor: "var(--color-primary-container)" }}
                  />
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      Dr. Sarah Mitchell
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      Clinical Psychologist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: easeOut }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
              }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <span
                  className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${post.tagBg} 30%, transparent)`,
                    color: post.tagColor,
                  }}
                >
                  {post.tag}
                </span>
                <h3
                  className="text-xl font-bold leading-snug transition-colors duration-200 group-hover:text-primary"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--color-on-surface)",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {post.excerpt}
                </p>
                <div
                  className="pt-2 flex justify-between items-center text-xs"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-xl font-bold transition-colors"
            style={{
              backgroundColor: "var(--color-surface-container-low)",
              color: "var(--color-on-surface-variant)",
              fontFamily: "var(--font-headline)",
              boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--color-surface-container-high)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--color-surface-container-low)";
            }}
          >
            Load More Articles
          </motion.button>
        </div>
      </main>
      <Footer />
    </>
  );
}
