"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_GREETING,
  CHAT_INTENTS,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
} from "@/data/contact-channels";

function waHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp glyph — shown on the action button so the hand-off is unmistakable. */
function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

/** Chat bubble with a heart — the resting mark, in Motherly's own voice. */
function ChatHeartMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20.5 11.5c0 4.14-3.81 7.5-8.5 7.5-.86 0-1.69-.11-2.47-.32L4.5 20.5l1.13-3.38C4.3 15.66 3.5 13.68 3.5 11.5 3.5 7.36 7.31 4 12 4s8.5 3.36 8.5 7.5Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M20.5 11.5c0 4.14-3.81 7.5-8.5 7.5-.86 0-1.69-.11-2.47-.32L4.5 20.5l1.13-3.38C4.3 15.66 3.5 13.68 3.5 11.5 3.5 7.36 7.31 4 12 4s8.5 3.36 8.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.6c-1.9-1.32-3.1-2.3-3.1-3.55 0-.94.72-1.6 1.6-1.6.6 0 1.14.3 1.5.79.36-.49.9-.79 1.5-.79.88 0 1.6.66 1.6 1.6 0 1.25-1.2 2.23-3.1 3.55Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  // Escape closes, and focus returns to the launcher.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Clicking anywhere outside the widget closes the panel.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const message = activeIntent
    ? CHAT_INTENTS.find((i) => i.label === activeIntent)?.message ?? WHATSAPP_GREETING
    : WHATSAPP_GREETING;

  return (
    <div
      ref={rootRef}
      className="fixed z-50 flex flex-col items-end gap-3 print:hidden"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* ── Panel ────────────────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="w-[calc(100vw-2rem)] max-w-[22rem] rounded-3xl overflow-hidden outline-none flex flex-col"
          style={{
            maxHeight: "min(78vh, 34rem)",
            backgroundColor: "var(--color-surface-container-lowest)",
            border: "1px solid color-mix(in srgb, var(--color-outline-variant) 22%, transparent)",
            boxShadow: "0 24px 60px -12px rgba(45,52,53,0.32), 0 8px 20px -8px rgba(186,14,86,0.18)",
          }}
        >
          {/* Header */}
          <div
            className="relative px-5 pt-5 pb-6 shrink-0"
            style={{ background: "linear-gradient(135deg, #ba0e56 0%, #d92670 55%, #f4447f 100%)" }}
          >
            {/* soft light bloom for depth */}
            <div
              aria-hidden="true"
              className="absolute -top-14 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)" }}
            />

            {/* z-10 is load-bearing: the header content div below is also a
                positioned element and paints after this button, so without it
                that div's right padding swallows the click. */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close chat"
              className="absolute top-4 right-4 z-10 grid place-items-center w-8 h-8 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.16)", color: "#fff" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="relative flex items-center gap-3 pr-10">
              <span
                className="grid place-items-center w-11 h-11 rounded-full shrink-0 overflow-hidden"
                style={{ backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.14)" }}
              >
                {/* logo-mark.png is the Motherly symbol trimmed out of logo.png,
                    which is mostly white padding and vanishes at this size. */}
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={64}
                  height={64}
                  className="w-8 h-8 object-contain"
                />
              </span>
              <div className="min-w-0">
                <p
                  id={titleId}
                  className="font-bold text-[15px] leading-tight text-white truncate"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Motherly Care Team
                </p>
                <span className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#4ade80" }} />
                  <span className="text-[11px] font-medium text-white/85">
                    Typically replies in a few minutes
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-5 space-y-4 overflow-y-auto">
            {/* Incoming message bubble */}
            <div
              className="rounded-2xl rounded-tl-md px-4 py-3"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 45%, white)" }}
            >
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                Hi! Tell us what you need help with and we&rsquo;ll point you to the right care
                professional in Chennai.
              </p>
            </div>

            {/* Quick intents */}
            <div className="space-y-2">
              <p
                className="text-[10px] font-bold tracking-[0.14em] uppercase"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                I&rsquo;m looking for
              </p>
              <div className="flex flex-wrap gap-2">
                {CHAT_INTENTS.map((intent) => {
                  const selected = activeIntent === intent.label;
                  return (
                    <button
                      key={intent.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveIntent(selected ? null : intent.label)}
                      className="px-3 py-1.5 rounded-full text-[12px] font-bold"
                      style={{
                        fontFamily: "var(--font-headline)",
                        backgroundColor: selected
                          ? "var(--color-primary)"
                          : "var(--color-surface-container-low)",
                        color: selected ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                        border: `1px solid ${
                          selected
                            ? "var(--color-primary)"
                            : "color-mix(in srgb, var(--color-outline-variant) 28%, transparent)"
                        }`,
                      }}
                    >
                      {intent.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary action */}
            <a
              href={waHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full rounded-2xl py-3.5 text-sm font-bold"
              style={{
                fontFamily: "var(--font-headline)",
                backgroundColor: "#1fa855",
                color: "#fff",
                boxShadow: "0 8px 20px -6px rgba(31,168,85,0.55)",
              }}
            >
              <WhatsAppMark className="w-[18px] h-[18px]" />
              Continue on WhatsApp
            </a>

            {/* Secondary action */}
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="flex items-center justify-center gap-2 w-full rounded-2xl py-3 text-[13px] font-bold"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--color-primary)",
                backgroundColor: "var(--color-surface-container-low)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
              </svg>
              Call {SUPPORT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}

      {/* ── Launcher: round icon only ────────────────────────────────── */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer shrink-0"
        style={{
          background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
          color: "var(--color-on-primary)",
          boxShadow: "0 10px 28px -6px rgba(186,14,86,0.5)",
        }}
      >
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <ChatHeartMark className="w-7 h-7 md:w-8 md:h-8" />
        )}
      </button>
    </div>
  );
}
