"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  service: z.string().min(1),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => {
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      return new Date(val) >= t;
    }, "Please select today or a future date"),
  time: z
    .string()
    .min(1, "Time is required")
    .refine((val) => {
      const [h] = val.split(":").map(Number);
      return h >= 9 && h < 18;
    }, "Please select a time between 9 AM and 6 PM"),
  message: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-2 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

export default function ServiceBookingForm({
  defaultService,
  serviceOptions,
  pageLabel,
}: {
  defaultService: string;
  serviceOptions: string[];
  pageLabel: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const options = serviceOptions.includes(defaultService)
    ? serviceOptions
    : [defaultService, ...serviceOptions];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService },
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "Service Bookings", page: pageLabel, ...data }),
    });
    setSubmitted(true);
    reset({ service: defaultService });
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-8 gap-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-secondary-container)" }}
          >
            <span
              className="material-symbols-outlined text-4xl"
              style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h4
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
          >
            Enquiry Submitted!
          </h4>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            We&apos;ll reach out within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold"
            style={{
              fontFamily: "var(--font-headline)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            Submit Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Select Service
              </label>
              <select {...register("service")} className={inputClass} style={getInputStyle()}>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Patient Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your Full Name"
                className={inputClass}
                style={getInputStyle(!!errors.name)}
              />
              {errors.name && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="email@example.com"
                className={inputClass}
                style={getInputStyle(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                className={inputClass}
                style={getInputStyle(!!errors.phone)}
              />
              {errors.phone && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Location
              </label>
              <input
                {...register("location")}
                type="text"
                placeholder="Area / Neighbourhood"
                className={inputClass}
                style={getInputStyle(!!errors.location)}
              />
              {errors.location && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Pincode
              </label>
              <input
                {...register("pincode")}
                type="text"
                placeholder="6-digit pincode"
                maxLength={6}
                className={inputClass}
                style={getInputStyle(!!errors.pincode)}
              />
              {errors.pincode && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.pincode.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Select Date
              </label>
              <input
                {...register("date")}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className={inputClass}
                style={getInputStyle(!!errors.date)}
              />
              {errors.date && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
                Enter Time
              </label>
              <input
                {...register("time")}
                type="time"
                min="09:00"
                max="18:00"
                className={inputClass}
                style={getInputStyle(!!errors.time)}
              />
              {errors.time && (
                <p className="text-xs ml-1" style={{ color: "var(--color-error)" }}>
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold ml-1" style={{ color: "var(--color-on-surface-variant)" }}>
              Message
            </label>
            <textarea
              {...register("message")}
              rows={2}
              placeholder="Tell us about your expectations..."
              className={`${inputClass} resize-none`}
              style={getInputStyle()}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl text-sm font-bold transition-opacity disabled:opacity-60"
            style={{
              fontFamily: "var(--font-headline)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
