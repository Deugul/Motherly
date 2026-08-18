"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER, WHATSAPP_GREETING } from "@/data/contact-channels";

/**
 * Persistent bottom-right chat entry point, present on every page.
 *
 * Before this, the only real-time contact routes were the phone number in the
 * footer and the enquiry modal on service sub-pages — undecided visitors on
 * Home or About Us had no quick way to ask a question. This hands off to
 * WhatsApp rather than loading a third-party chat script, so it costs nothing
 * on the critical path.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              border: "1px solid color-mix(in srgb, var(--color-outline-variant) 25%, transparent)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
            }}
          >
            <div className="px-5 py-4" style={{ backgroundColor: "var(--color-primary)" }}>
              <p
                className="font-bold text-base"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-primary)" }}
              >
                Chat with Motherly
              </p>
              <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--color-on-primary) 85%, transparent)" }}>
                We usually reply within a few minutes
              </p>
            </div>

            <div className="px-5 py-4 space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                Not sure which service you need, or want to check availability? Send us a message and
                our care team will help you find the right match.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-bold"
                style={{
                  fontFamily: "var(--font-headline)",
                  background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
                  color: "var(--color-on-primary)",
                }}
              >
                Chat with us on WhatsApp
              </a>
              <a
                href="tel:+918698697000"
                className="block text-center text-xs font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Or call +91 86986 97000
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="flex items-center gap-2 rounded-full pl-4 pr-5 py-3.5 font-bold text-sm"
        style={{
          fontFamily: "var(--font-headline)",
          background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
          color: "var(--color-on-primary)",
          boxShadow: "0 8px 28px color-mix(in srgb, var(--color-primary) 35%, transparent)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {open ? (
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2zm4-6H7V6h10v2z" />
          )}
        </svg>
        {open ? "Close" : "Chat with us"}
      </motion.button>
    </div>
  );
}
