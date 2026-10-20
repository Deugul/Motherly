"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_DISMISS_KEY = "motherly_webinar_meta_ad_dismissed_v1";
const AD_IMAGE_SRC = "/webinar/BF_Meta_Ad.webp";

export default function WebinarAdPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pathname = usePathname();
  const seenSectionsRef = useRef<Set<Element>>(new Set());
  const hasTriggeredRef = useRef(false);

  // Close popup handler
  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(POPUP_DISMISS_KEY, "true");
    } catch {
      // Ignore storage errors in incognito/restricted mode
    }
  };

  useEffect(() => {
    // Never show on the webinar page itself
    if (pathname.startsWith("/webinar")) {
      return;
    }

    // Pre-cache the image immediately in browser memory on page mount
    // so it is already 100% loaded before the user even reaches 5 sections
    const preloader = new window.Image();
    preloader.src = AD_IMAGE_SRC;
    preloader.onload = () => setImageLoaded(true);

    // Check if dismissed previously in this session
    try {
      if (sessionStorage.getItem(POPUP_DISMISS_KEY) === "true") {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    seenSectionsRef.current.clear();
    hasTriggeredRef.current = false;

    const triggerPopup = () => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    };

    // 1. IntersectionObserver to detect when 5 sections have been viewed
    const sections = Array.from(
      document.querySelectorAll("main > section, section, main > div[id], [data-section]")
    );

    let observer: IntersectionObserver | null = null;

    if (sections.length > 0 && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              seenSectionsRef.current.add(entry.target);
              // Trigger when user has visited / scrolled through 5 sections
              if (seenSectionsRef.current.size >= 5) {
                triggerPopup();
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      sections.forEach((sec) => observer?.observe(sec));
    }

    // 2. Scroll depth fallback: in case pages have fewer explicit section tags or long scrolling
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // If user scrolled past 1400px or past 40% of document height
      if (scrollY > 1400 || (docHeight > 0 && scrollY / docHeight >= 0.4)) {
        triggerPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (pathname.startsWith("/webinar")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Breastfeeding Made Easy Webinar Special Invitation"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white"
            style={{
              boxShadow: "0 25px 60px -15px rgba(186, 14, 86, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Top Close Button (floating high-contrast circle) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close Webinar Offer"
              className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 active:scale-90 cursor-pointer focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Clickable Card Body leading to Webinar page */}
            <Link
              href="/webinar/Breastfeeding-Made-Easy"
              onClick={handleClose}
              className="group block relative select-none cursor-pointer focus:outline-none"
            >
              {/* Ad Image Container with instant loading & preloaded WebP */}
              <div className="relative w-full aspect-[4/5] bg-pink-50 overflow-hidden">
                <Image
                  src={AD_IMAGE_SRC}
                  alt="Breastfeeding Made Easy Webinar with Dr. Varshika.S"
                  fill
                  sizes="(max-width: 640px) 90vw, 450px"
                  className={`object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-95"
                  }`}
                  priority
                  fetchPriority="high"
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Seamless Action Footer */}
              <div
                className="p-3 sm:p-4 text-white flex items-center justify-between gap-3"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, #e33672 100%)",
                }}
              >
                <div className="text-left space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-200">
                    Live Masterclass &bull; 22nd Nov, 11 AM
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      ₹99 Only
                    </span>
                    <span className="line-through text-pink-200 text-xs">₹1,800</span>
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-bold text-amber-200">
                      95% OFF
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-white text-[var(--color-primary)] shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                  <span>Register Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
