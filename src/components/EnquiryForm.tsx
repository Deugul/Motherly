"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  dueDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Birth & Postpartum Doulas",
  "Lactation Consultants",
  "Gynecology Consultation",
  "Nannies & Postnatal Care",
  "Postnatal Recovery",
  "Other",
];

function FieldWrapper({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-medium flex items-center gap-1"
            style={{ color: "var(--color-error)" }}
          >
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none border-2 transition-all duration-200 focus:ring-0";

function getInputStyle(hasError: boolean) {
  return {
    fontFamily: "var(--font-body)",
    backgroundColor: "var(--color-surface-container-lowest)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "var(--color-outline-variant)",
  };
}

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Enquiry submitted:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 gap-6"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "var(--color-secondary-container)" }}
        >
          <span className="material-symbols-outlined text-5xl" style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
        >
          We got your message!
        </h3>
        <p className="max-w-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          Our team will reach out within 24 hours. We're excited to support your journey!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 px-7 py-3 rounded-full font-bold text-sm"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
          }}
        >
          Send Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Full Name *" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Jane Smith"
            className={inputClass}
            style={getInputStyle(!!errors.name)}
          />
        </FieldWrapper>
        <FieldWrapper label="Email Address *" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className={inputClass}
            style={getInputStyle(!!errors.email)}
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldWrapper label="Phone Number *" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
            style={getInputStyle(!!errors.phone)}
          />
        </FieldWrapper>
        <FieldWrapper label="Expected Due Date" error={errors.dueDate?.message}>
          <input
            {...register("dueDate")}
            type="date"
            className={inputClass}
            style={getInputStyle(!!errors.dueDate)}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Service Interested In *" error={errors.service?.message}>
        <select
          {...register("service")}
          className={inputClass}
          style={getInputStyle(!!errors.service)}
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FieldWrapper>

      <FieldWrapper label="Tell us about your needs *" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Share a little about your situation and how we can best support you..."
          className={`${inputClass} resize-none`}
          style={getInputStyle(!!errors.message)}
        />
      </FieldWrapper>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl"
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          backgroundColor: isSubmitting ? "var(--color-outline)" : "var(--color-primary)",
          color: "var(--color-on-primary)",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 30%, transparent)",
        }}
      >
        {isSubmitting ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="material-symbols-outlined text-xl"
            >
              progress_activity
            </motion.span>
            Sending...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-xl">send</span>
            Send Enquiry
          </>
        )}
      </motion.button>

      <p className="text-xs text-center" style={{ color: "var(--color-on-surface-variant)" }}>
        We respect your privacy. Your information is safe and will never be shared.
      </p>
    </motion.form>
  );
}
