"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getServiceEnquiryCta, type ServiceEnquiryKey } from "@/data/service-enquiry-cta";
import EnquiryModal from "@/components/EnquiryModal";
import ServiceBookingForm from "@/components/ServiceBookingForm";

export default function ServiceEnquiryCta({
  serviceKey,
  serviceOptions,
  className = "",
  children,
}: {
  serviceKey: ServiceEnquiryKey;
  serviceOptions?: string[];
  className?: string;
  /** Custom form body (e.g. pediatrician). Defaults to ServiceBookingForm. */
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const config = getServiceEnquiryCta(serviceKey);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
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
        {config.ctaLabel}
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
