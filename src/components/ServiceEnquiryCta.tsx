"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m as motion } from "framer-motion";
import { getServiceEnquiryCta, type ServiceEnquiryKey } from "@/data/service-enquiry-cta";
import EnquiryModal from "@/components/EnquiryModal";

// The booking form only renders inside the modal, and it carries zod +
// react-hook-form (~70 KiB gzipped). Splitting it out keeps that parse/compile
// work off every service page's initial load — and off the homepage, which
// prefetches service routes from its hero links. `preloadBookingForm` warms the
// chunk once the page is idle and again on intent, so the modal still opens
// with the form already in place.
const loadBookingForm = () => import("@/components/ServiceBookingForm");
const ServiceBookingForm = dynamic(loadBookingForm);

let bookingFormPreload: ReturnType<typeof loadBookingForm> | null = null;
function preloadBookingForm() {
  bookingFormPreload ??= loadBookingForm();
}

export default function ServiceEnquiryCta({
  serviceKey,
  serviceOptions,
  className = "",
  label,
  children,
}: {
  serviceKey: ServiceEnquiryKey;
  serviceOptions?: string[];
  className?: string;
  /**
   * Overrides the configured button text. Used by the mid-page CTAs, which
   * repeat the ask in shorter words than the hero button ("Check Availability"
   * rather than "Book Your Doula Here").
   */
  label?: string;
  /** Custom form body (e.g. pediatrician). Defaults to ServiceBookingForm. */
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const config = getServiceEnquiryCta(serviceKey);

  useEffect(() => {
    if (children) return;
    const idle = () => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(preloadBookingForm, { timeout: 4000 });
        return () => window.cancelIdleCallback(id);
      }
      const id = window.setTimeout(preloadBookingForm, 2000);
      return () => window.clearTimeout(id);
    };
    if (document.readyState === "complete") return idle();
    let cancel: (() => void) | undefined;
    const onLoad = () => {
      cancel = idle();
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cancel?.();
    };
  }, [children]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={children ? undefined : preloadBookingForm}
        onFocus={children ? undefined : preloadBookingForm}
        onTouchStart={children ? undefined : preloadBookingForm}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-bold transition-all w-full sm:w-auto ${className}`}
        style={{
          fontFamily: "var(--font-headline)",
          background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
          color: "var(--color-on-primary)",
          boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
        }}
      >
        {label ?? config.ctaLabel}
      </motion.button>

      <EnquiryModal open={open} onClose={() => setOpen(false)}>
        {children ?? (
          <ServiceBookingForm
            defaultService={config.defaultService}
            serviceOptions={serviceOptions ?? [config.defaultService]}
            pageLabel={config.pageLabel}
          />
        )}
      </EnquiryModal>
    </>
  );
}
