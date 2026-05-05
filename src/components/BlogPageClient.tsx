"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import type { BlogPost } from "@/lib/posts";
import type { FeaturedPost } from "@/lib/posts";

const MotionImage = motion.create(Image);
const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const DEFAULT_FILTERS = ["All Topics", "Prenatal", "Newborn Care", "Wellness", "Postpartum"];
const PAGE_SIZE = 3;

function PostModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const paragraphs = post.content
    ? post.content.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "white" }}
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          {/* Cover image */}
          {post.image && (
            <div className="w-full aspect-video overflow-hidden rounded-t-3xl relative">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-10 space-y-5">
            <span
              className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${post.tagBg} 30%, transparent)`,
                color: post.tagColor,
              }}
            >
              {post.tag}
            </span>

            <h2
              className="text-3xl font-extrabold leading-snug"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
            >
              {post.title}
            </h2>

            <div className="flex gap-4 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <hr style={{ borderColor: "var(--color-outline-variant)", opacity: 0.3 }} />

            {paragraphs.length > 0 ? (
              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <p className="leading-relaxed italic" style={{ color: "var(--color-on-surface-variant)" }}>
                No content available.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function BlogPageClient({
  posts,
  featuredPost,
  categories,
}: {
  posts: BlogPost[];
  featuredPost: FeaturedPost | null;
  categories?: string[];
}) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Topics");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filterList =
    categories && categories.length > 0
      ? ["All Topics", ...categories]
      : DEFAULT_FILTERS;

  const filtered = posts.filter((p) => {
    const matchFilter =
      activeFilter === "All Topics" ||
      p.tag.toLowerCase() === activeFilter.toLowerCase() ||
      p.tag.toLowerCase().includes(activeFilter.toLowerCase());

    // Split query into words (≥2 chars) so "can i eat" matches "can you eat"
    const words = search.trim().toLowerCase().split(/\s+/).filter((w) => w.length >= 2);
    const haystack = `${p.title} ${p.excerpt}`.toLowerCase();
    const matchSearch = words.length === 0 || words.every((w) => haystack.includes(w));

    return matchFilter && matchSearch;
  });

  // Reset to one row whenever the filter or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter, search]);

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

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
          <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
            Nurturing wisdom and expert advice for your journey from pregnancy through parenthood.
            Curated by healthcare specialists.
          </p>
        </header>
      </ScrollReveal>

      {/* Filters + Search */}
      <ScrollReveal delay={0.05}>
        <section className="mb-10 space-y-4">
          {/* Category pills — single scrollable row */}
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {filterList.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeFilter === f
                    ? { backgroundColor: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" }
                    : { backgroundColor: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)" }
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none border-2 border-transparent transition-all"
              style={{
                backgroundColor: "var(--color-surface-container-low)",
                color: "var(--color-on-surface)",
                fontFamily: "var(--font-body)",
              }}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Article — hidden while filtering or searching */}
      {featuredPost !== null && activeFilter === "All Topics" && search === "" ? (
        <ScrollReveal delay={0.1}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="relative mb-10 cursor-pointer group"
            onClick={() => {
              if (featuredPost.slug) router.push(`/blogs/${featuredPost.slug}`);
              else if (featuredPost.link) window.open(featuredPost.link, "_blank", "noopener,noreferrer");
            }}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-12 items-center rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.06)",
              }}
            >
              <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-96 overflow-hidden relative">
                <MotionImage
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.7 }}
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-contain object-top"
                  priority
                />
              </div>
              <div className="lg:col-span-5 p-8 lg:p-12 space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--color-primary)" }}>
                  {featuredPost.tag}
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                  {featuredPost.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "var(--color-primary-container)" }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>{featuredPost.author}</p>
                    <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{featuredPost.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </ScrollReveal>
      ) : null}

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <p className="text-center py-20" style={{ color: "var(--color-on-surface-variant)" }}>
          No articles found. Try a different filter or search term.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visiblePosts.map((post, i) => (
            <motion.article
              key={post.link ?? post.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer rounded-2xl"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                boxShadow: "0 4px 20px rgba(45,52,53,0.08)",
              }}
              onClick={() => {
                if (post.slug) router.push(`/blogs/${post.slug}`);
                else if (post.link) window.open(post.link, "_blank", "noopener,noreferrer");
                else setSelectedPost(post);
              }}
            >
              {/* Image inset so it has its own rounded corners within the card */}
              <div style={{ padding: "8px 8px 0 8px" }}>
                <div style={{ borderRadius: "12px", overflow: "hidden", position: "relative", height: "220px" }}>
                  {post.image ? (
                    <MotionImage
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: "contain", objectPosition: "top" }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-surface-container-high)" }}
                    >
                      <span className="material-symbols-outlined text-5xl" style={{ color: "var(--color-on-surface-variant)", opacity: 0.3 }}>
                        image
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Content */}
              <div className="px-4 pb-5 pt-2 space-y-3">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${post.tagBg} 30%, transparent)`,
                    color: post.tagColor,
                  }}
                >
                  {post.tag}
                </span>
                <h3
                  className="text-lg font-bold leading-snug"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-on-surface-variant)" }}>
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-surface-container-high)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-surface-container-low)"; }}
            onClick={() => setVisibleCount(filtered.length)}
          >
            Load More Articles
          </motion.button>
        </div>
      )}
    </>
  );
}
