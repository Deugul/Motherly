"use client";

import { useEffect } from "react";

export default function WpContent({ html }: { html: string }) {
  useEffect(() => {
    // ── Hide Elementor duplicate title section ─────────────────────────────────
    // The WP content renders its own h1 via Elementor; our page already shows a
    // custom title above WpContent, so we hide whichever Elementor block owns
    // the first h1 (works regardless of Elementor version / class naming).
    const wpH1 = document.querySelector<HTMLElement>(".wp-content h1");
    if (wpH1) {
      const section =
        wpH1.closest<HTMLElement>(".e-parent") ??
        wpH1.closest<HTMLElement>(".elementor-section") ??
        wpH1.closest<HTMLElement>("section");
      if (section) {
        section.style.display = "none";
      } else {
        wpH1.style.display = "none";
      }
    }

    // ── FAQ accordion ──────────────────────────────────────────────────────────
    const faqItems = document.querySelectorAll<HTMLElement>(".mb-faq-item");
    const faqButtons = document.querySelectorAll<HTMLElement>(".mb-faq-q");

    function handleFaqClick(this: HTMLElement) {
      const item = this.closest<HTMLElement>(".mb-faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    }

    faqButtons.forEach((btn) => btn.addEventListener("click", handleFaqClick));

    // ── TOC scroll-spy ─────────────────────────────────────────────────────────
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".mb-toc a[href^='#']")
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
      faqButtons.forEach((btn) => btn.removeEventListener("click", handleFaqClick));
      if (tocLinks.length > 0) window.removeEventListener("scroll", onScroll);
    };
  }, [html]);

  return (
    <div
      className="wp-content mt-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
