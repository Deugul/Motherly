"use client";

import { useEffect, useRef } from "react";

export default function WpContent({ html }: { html: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ── FAQ accordion (delegated — survives HTML re-injection) ───────────────
    function handleFaqClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const question = target?.closest<HTMLElement>(".mb-faq-q");
      if (!question || !root?.contains(question)) return;

      const item = question.closest<HTMLElement>(".mb-faq-item");
      if (!item) return;

      const isOpen = item.classList.contains("open");
      root.querySelectorAll<HTMLElement>(".mb-faq-item").forEach((i) => {
        i.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
    }

    root.addEventListener("click", handleFaqClick);

    // ── TOC scroll-spy ─────────────────────────────────────────────────────────
    const tocLinks = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(".mb-toc a[href^='#']")
    );
    const sectionIds = tocLinks.map((a) => a.getAttribute("href")!.slice(1));

    function onScroll() {
      const scrollY = window.scrollY;
      // 120 px offset: ~80 px navbar + 40 px buffer so the section highlights
      // slightly before its heading reaches the very top of the viewport
      const OFFSET = 120;
      let activeId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY - OFFSET <= scrollY) {
          activeId = id;
        }
      }

      tocLinks.forEach((a) => {
        a.classList.toggle("toc-active", a.getAttribute("href")!.slice(1) === activeId);
      });
    }

    if (tocLinks.length > 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // highlight correct item on initial render
    }

    return () => {
      root.removeEventListener("click", handleFaqClick);
      if (tocLinks.length > 0) window.removeEventListener("scroll", onScroll);
    };
  }, [html]);

  return (
    <div
      ref={rootRef}
      className="wp-content mt-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
