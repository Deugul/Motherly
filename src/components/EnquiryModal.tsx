"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function EnquiryModal({
  open,
  onClose,
  title = "Send an Enquiry",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close enquiry form"
        onClick={onClose}
      />
      <div
        className="relative z-[101] w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border p-5 shadow-xl"
        style={{
          backgroundColor: "var(--color-surface-container-lowest)",
          borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
            >
              {title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
              Tell us about your needs and we&apos;ll be in touch.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2"
            aria-label="Close"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
