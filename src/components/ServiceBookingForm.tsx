"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  THANKYOU_CARD_ID,
  THANKYOU_CARD_CLASS,
  THANKYOU_DATALAYER_EVENT,
  pushConversionEvent,
} from "@/data/conversion-tracking";

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
  time: z.string().min(1, "Time is required"),
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

const WIDGET_CODE = "51664A32E369";

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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedService, setSubmittedService] = useState(defaultService);
  const [showIframeWidget, setShowIframeWidget] = useState(false);

  // Both faces are stacked absolutely so the card can flip
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const [boxHeight, setBoxHeight] = useState<number>(0);

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

  useLayoutEffect(() => {
    const measure = () => {
      const el = submitted ? backRef.current : frontRef.current;
      if (el) setBoxHeight(el.offsetHeight);
    };
    measure();

    const observer = new ResizeObserver(measure);
    if (frontRef.current) observer.observe(frontRef.current);
    if (backRef.current) observer.observe(backRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [submitted, showIframeWidget]);

  // Handle message events from Lead101 iframe if used
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const origin = event.origin || "";
        const data = event.data;
        const isLead101Origin =
          origin.includes("thelead101.com") || origin.includes("api.thelead101.com");
        const isSubmissionEvent =
          data?.type === "lead101_submission_success" ||
          data?.type === "form_submit_success" ||
          data?.type === "FORM_SUBMITTED" ||
          data?.event === "motherly_enquiry_success" ||
          data?.status === "success";

        if (isLead101Origin && isSubmissionEvent) {
          triggerSuccess(defaultService);
        }
      } catch (err) {
        console.error("Message parsing error:", err);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [defaultService]);

  // Dynamically load Lead101 iframe widget if user toggles to it
  useEffect(() => {
    if (!showIframeWidget) return;
    const container = widgetContainerRef.current;
    if (!container) return;

    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.__formWidgetInitialized) {
        win.__formWidgetInitialized[WIDGET_CODE] = false;
      }
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const hostDiv = document.createElement("div");
    hostDiv.className = "form-widget-host";
    hostDiv.style.width = "100%";
    hostDiv.style.minHeight = "600px";

    const script = document.createElement("script");
    script.src = `https://api.thelead101.com/api/v1/public/form-widget.js?code=${WIDGET_CODE}`;
    script.setAttribute("data-widget-code", WIDGET_CODE);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-height", "600px");
    script.setAttribute("data-primary-color", "#ba0e56");
    script.setAttribute("data-secondary-color", "#ba0e56");
    script.setAttribute("data-border-radius", "8px");
    script.setAttribute("data-shadow", "0 4px 6px -1px rgba(0, 0, 0, 0.1)");
    script.async = true;

    hostDiv.appendChild(script);
    container.appendChild(hostDiv);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [showIframeWidget]);

  const triggerSuccess = (serviceName: string) => {
    setSubmittedService(serviceName);
    setSubmitted(true);

    // GTM Form Submission trigger hook: dispatch submit on space-y-3 form
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }

    // GTM Custom Event
    pushConversionEvent({
      event: THANKYOU_DATALAYER_EVENT,
      form_type: "Service Bookings",
      service: serviceName,
      page_label: pageLabel,
    });
  };

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      // Submits to both Lead101 CRM API and Google Sheet via /api/submit
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Service Bookings", page: pageLabel, ...data }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      setSubmittedService(data.service);
      setSubmitted(true);

      // Conversion signal for GTM / GA4 dataLayer
      pushConversionEvent({
        event: THANKYOU_DATALAYER_EVENT,
        form_type: "Service Bookings",
        service: data.service,
        page_label: pageLabel,
      });

      reset({ service: defaultService });
    } catch {
      setSubmitError("Something went wrong. Please try again, or call us on +91 86986 97000.");
    }
  };

  return (
    <div
      className={`motherly-flip${submitted ? " is-flipped" : ""}`}
      style={{ height: boxHeight || undefined }}
    >
      <div className="motherly-flip__inner">
        {/* ── Front: Booking Form ────────────────────────────────────────── */}
        <div
          ref={frontRef}
          className="motherly-flip__face motherly-flip__face--front"
          aria-hidden={submitted}
          inert={submitted || undefined}
        >
          {showIframeWidget ? (
            <div>
              <div ref={widgetContainerRef} className="w-full min-h-[600px]" />
              <div className="mt-3 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setShowIframeWidget(false)}
                  className="font-semibold underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  ← Back to standard form
                </button>
                <button
                  type="button"
                  onClick={() => triggerSuccess(defaultService)}
                  className="font-semibold underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  Confirm Submission
                </button>
              </div>
            </div>
          ) : (
            /* CRITICAL FOR GTM: class "space-y-3" is listened to by the GTM trigger
               (Trigger Type: Form Submission, Form Classes contains space-y-3) */
            <form
              ref={formRef}
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
                    Patient Name *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Full Name"
                    className={inputClass}
                    aria-invalid={!!errors.name}
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
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email@example.com"
                    className={inputClass}
                    aria-invalid={!!errors.email}
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
                    aria-invalid={!!errors.phone}
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
                    aria-invalid={!!errors.location}
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
                    aria-invalid={!!errors.pincode}
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
                    Select Date *
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass}
                    aria-invalid={!!errors.date}
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
                    Enter Time *
                  </label>
                  <input
                    {...register("time")}
                    type="time"
                    className={inputClass}
                    aria-invalid={!!errors.time}
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

              {submitError && (
                <p role="alert" className="text-xs ml-1 font-semibold" style={{ color: "var(--color-error)" }}>
                  {submitError}
                </p>
              )}

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
            </form>
          )}
        </div>

        {/* ── Back: Thank-You Card ─────────────────────────────────────────
            The id / class / data-* below are the tracking hooks handed to the
            SEO team. See src/data/conversion-tracking.ts before renaming. */}
        <div
          ref={backRef}
          className="motherly-flip__face motherly-flip__face--back"
          aria-hidden={!submitted}
          inert={!submitted || undefined}
        >
          <div
            id={THANKYOU_CARD_ID}
            className={`${THANKYOU_CARD_CLASS} rounded-2xl px-6 py-9 text-center flex flex-col items-center gap-4`}
            data-form-status={submitted ? "success" : "idle"}
            data-service={submittedService}
            data-page-label={pageLabel}
            role="status"
            aria-live="polite"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in srgb, var(--color-secondary-container) 55%, white) 0%, var(--color-surface-container-lowest) 100%)",
              border: "1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)",
            }}
          >
            <span
              className="grid place-items-center w-16 h-16 rounded-full shrink-0"
              style={{
                background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
                boxShadow: "0 10px 24px -8px rgba(186,14,86,0.6)",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12.5l5.5 5.5L20 7" />
              </svg>
            </span>

            <div className="space-y-2">
              <h4
                className="text-2xl font-extrabold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
              >
                Thank you!
              </h4>
              <p
                className="text-sm leading-relaxed max-w-xs mx-auto"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                Your <strong style={{ color: "var(--color-primary)" }}>{submittedService}</strong>{" "}
                enquiry has reached our care team. We&apos;ll call you back within 24 hours to
                confirm your slot.
              </p>
            </div>

            <div
              className="w-full max-w-xs rounded-xl px-4 py-3 text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-container-low)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              Need us sooner? Call{" "}
              <a href="tel:+918698697000" style={{ color: "var(--color-primary)" }}>
                +91 86986 97000
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSubmitError(null);
              }}
              className="mt-1 px-6 py-2.5 rounded-full text-sm font-bold"
              style={{
                fontFamily: "var(--font-headline)",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
