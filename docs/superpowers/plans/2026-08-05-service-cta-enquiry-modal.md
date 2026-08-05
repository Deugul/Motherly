# Service CTA + Enquiry Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace service-page hero download buttons with service-specific CTAs that open the enquiry form in a modal, reclaim the sidebar for imagery, move app download to the navbar, and keep Contact Us in the footer.

**Architecture:** A central CTA map drives button labels and default service values. A shared `EnquiryModal` + `ServiceBookingForm` owns form UI/validation/submit. Each service page wires `ServiceEnquiryCta`, removes the sticky form aside, and widens content / adds a secondary image. Navbar swaps Contact Us for `AppDownloadButton`; footer keeps Contact Us as a visible CTA to `/contact-us`.

**Tech Stack:** Next.js App Router, React client components, Tailwind + existing CSS variables, react-hook-form + zod, framer-motion (optional for modal), existing `/api/submit`.

## Global Constraints

- CTA labels must match the approved map in `docs/superpowers/specs/2026-08-05-service-cta-enquiry-modal-design.md`
- Do not change `/api/submit` request shape beyond existing fields (`formType`, `page`, form fields)
- Keep mid-page “Book through the Motherly app” cards with `AppDownloadButton variant="card"`
- Alias re-export pages (`lactation-consultants`, `nanny-services`, etc.) need no duplicate edits if they re-export the canonical page
- Preserve existing form validation rules when extracting the form
- Navbar download label: **Download Motherly Mobile App**
- Contact Us navigates to `/contact-us` (no modal)

---

## File structure

| File | Responsibility |
|------|----------------|
| `src/data/service-enquiry-cta.ts` | Service keys → CTA label + default form service value + page API label |
| `src/components/EnquiryModal.tsx` | Backdrop, panel, close (X / Escape / backdrop), body scroll lock |
| `src/components/ServiceBookingForm.tsx` | Shared enquiry form (fields, validation, submit, success state) |
| `src/components/ServiceEnquiryCta.tsx` | Button + modal open state; composes modal + form |
| `src/components/AppDownloadButton.tsx` | Add `navbar` variant + exact navbar copy |
| `src/components/Navbar.tsx` | Replace Contact Us with app download (desktop + mobile) |
| `src/components/Footer.tsx` | Prominent Contact Us button → `/contact-us` |
| Service `page.tsx` files listed in Task 5–6 | Wire CTA, remove aside form, layout/image reclaim |

---

### Task 1: CTA map data module

**Files:**
- Create: `src/data/service-enquiry-cta.ts`
- Test: `src/data/service-enquiry-cta.test.ts` (if Vitest/Jest exists; otherwise skip automated test and verify via TypeScript compile)

**Interfaces:**
- Produces: `ServiceEnquiryKey`, `SERVICE_ENQUIRY_CTA`, `getServiceEnquiryCta(key)`

- [ ] **Step 1: Create the map**

```ts
// src/data/service-enquiry-cta.ts
export type ServiceEnquiryKey =
  | "doulas"
  | "lactation"
  | "postnatal-recovery"
  | "nannies"
  | "gynaecology"
  | "baby-care"
  | "mother-care"
  | "yoga"
  | "pediatrician"
  | "physiotherapy";

export type ServiceEnquiryCtaConfig = {
  ctaLabel: string;
  /** Must match an <option value> on that page's form */
  defaultService: string;
  /** Sent as `page` in /api/submit body */
  pageLabel: string;
};

export const SERVICE_ENQUIRY_CTA: Record<ServiceEnquiryKey, ServiceEnquiryCtaConfig> = {
  doulas: {
    ctaLabel: "Book Your Doula",
    defaultService: "Doulas",
    pageLabel: "Doulas",
  },
  lactation: {
    ctaLabel: "Book Lactation Consult",
    defaultService: "Lactation Consultants",
    pageLabel: "Lactation",
  },
  "postnatal-recovery": {
    ctaLabel: "Book Recovery Care",
    defaultService: "Postnatal Recovery",
    pageLabel: "Postnatal Recovery Care",
  },
  nannies: {
    ctaLabel: "Book a Nanny",
    defaultService: "Nanny Care",
    pageLabel: "Nanny Care",
  },
  gynaecology: {
    ctaLabel: "Book Gynae Consult",
    defaultService: "Gynaecology Consultation",
    pageLabel: "Gynaecology",
  },
  "baby-care": {
    ctaLabel: "Book Baby Care",
    defaultService: "Baby Care",
    pageLabel: "Baby Care",
  },
  "mother-care": {
    ctaLabel: "Get Postpartum Care",
    defaultService: "Mother Care",
    pageLabel: "Mother Care",
  },
  yoga: {
    ctaLabel: "Join a Class",
    defaultService: "Prenatal Yoga",
    pageLabel: "Yoga",
  },
  pediatrician: {
    ctaLabel: "Book Pediatric Consult",
    defaultService: "Pediatrician Consultation",
    pageLabel: "Pediatrician",
  },
  physiotherapy: {
    ctaLabel: "Book Physiotherapy",
    defaultService: "Physiotherapy",
    pageLabel: "Physiotherapy",
  },
};

export function getServiceEnquiryCta(key: ServiceEnquiryKey): ServiceEnquiryCtaConfig {
  return SERVICE_ENQUIRY_CTA[key];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/service-enquiry-cta.ts
git commit -m "feat: add service enquiry CTA label map"
```

---

### Task 2: EnquiryModal shell

**Files:**
- Create: `src/components/EnquiryModal.tsx`

**Interfaces:**
- Consumes: none from Task 1
- Produces: `EnquiryModal({ open, onClose, title?, children })`

- [ ] **Step 1: Implement modal**

```tsx
// src/components/EnquiryModal.tsx
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
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
            <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/EnquiryModal.tsx
git commit -m "feat: add enquiry modal shell"
```

---

### Task 3: Shared ServiceBookingForm

**Files:**
- Create: `src/components/ServiceBookingForm.tsx`

**Interfaces:**
- Consumes: none required from map (callers pass strings)
- Produces: `ServiceBookingForm({ defaultService, serviceOptions, pageLabel, onSuccess? })`

Use the **doulas** form schema/fields as the shared baseline (service, name, email, phone, location, pincode, date, time, message). `serviceOptions` is `string[]` rendered as `<option>`s. `defaultValues: { service: defaultService }`. Submit body:

```ts
JSON.stringify({ formType: "Service Bookings", page: pageLabel, ...data })
```

Copy input styling helpers (`inputClass`, `getInputStyle`) and success UI from `src/app/services/doulas/page.tsx` (the form block starting near “Send an Enquiry”). Do **not** include the outer card title in the form (modal already shows it).

For pages with **extra** fields later (pediatrician age/mode), keep those fields on the page-specific form inside the modal in Task 6 — do not force them into the shared form in this task.

- [ ] **Step 1: Implement `ServiceBookingForm`** by extracting doulas form JSX + schema into the shared component with the props above.

- [ ] **Step 2: Commit**

```bash
git add src/components/ServiceBookingForm.tsx
git commit -m "feat: extract shared service booking form"
```

---

### Task 4: ServiceEnquiryCta

**Files:**
- Create: `src/components/ServiceEnquiryCta.tsx`

**Interfaces:**
- Consumes: `getServiceEnquiryCta`, `EnquiryModal`, `ServiceBookingForm`
- Produces: `ServiceEnquiryCta({ serviceKey, serviceOptions, className? })`

```tsx
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
}: {
  serviceKey: ServiceEnquiryKey;
  serviceOptions: string[];
  className?: string;
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
        <ServiceBookingForm
          defaultService={config.defaultService}
          serviceOptions={serviceOptions}
          pageLabel={config.pageLabel}
        />
      </EnquiryModal>
    </>
  );
}
```

Ensure `serviceOptions` always includes `config.defaultService`.

- [ ] **Step 1: Implement and commit**

```bash
git add src/components/ServiceEnquiryCta.tsx
git commit -m "feat: add service enquiry CTA that opens modal"
```

---

### Task 5: Refactor standard service pages (shared form)

**Files (modify each):**
- `src/app/services/doulas/page.tsx`
- `src/app/services/lactation/page.tsx`
- `src/app/services/nannies/page.tsx`
- `src/app/services/gynaecology/page.tsx`
- `src/app/services/yoga/page.tsx`
- `src/app/our-services/postnatal-recovery-care/page.tsx`
- Also update `src/app/services/physiotherapy/page.tsx` if its form options are Physiotherapy-only (use shared form with those options)
- Also update `src/app/services/mother-care/page.tsx` and `src/app/services/baby-care/page.tsx` with their existing option lists via `serviceOptions`

**Per-page steps (repeat for each file):**

- [ ] **Step 1:** Replace hero `AppDownloadButton variant="hero"` with:

```tsx
<ServiceEnquiryCta
  serviceKey="doulas" // correct key per page
  serviceOptions={[
    "Doulas",
    "Lactation Consultants",
    "Gynaecology Consultation",
    "Nanny Care",
    "Postnatal Recovery",
    "Nutrition Consultation",
  ]} // use that page's existing options; yoga includes "Prenatal Yoga", etc.
/>
```

- [ ] **Step 2:** Remove sticky form aside (`lg:col-span-5` booking form), remove unused form state (`submitted`, `formActive`, `formWrapperRef`, `useForm`, schema, `inputClass`, `getInputStyle`) if no longer referenced.

- [ ] **Step 3:** Change main grid from `lg:grid-cols-12` with `lg:col-span-7` + `lg:col-span-5` to a full-width column (`lg:col-span-12` or drop the 12-col split). Reclaim space by either:
  - Making the featured image taller/full-width, **or**
  - Adding a second image beside the featured image in a `md:grid-cols-2` media row using an existing public asset already used on that page (e.g. duplicate hero with different `object-position` only if no second asset exists — prefer a real second image from `/public` when present).

- [ ] **Step 4:** Keep `AppDownloadButton variant="card"` in the lower app CTA section.

- [ ] **Step 5:** Smoke-check in browser: CTA label correct, modal opens, service preselected, submit works, Escape closes.

- [ ] **Step 6: Commit** after each page or in a small batch:

```bash
git add src/app/services/doulas/page.tsx
git commit -m "feat(doulas): service CTA opens enquiry modal"
```

Canonical key mapping for this task:
- doulas → `doulas`
- lactation → `lactation`
- nannies → `nannies`
- gynaecology → `gynaecology`
- yoga → `yoga` (options must include `Prenatal Yoga`)
- postnatal-recovery-care → `postnatal-recovery`
- mother-care → `mother-care` (options: Mother Care variants from that page)
- baby-care → `baby-care` (options: Baby Care variants)
- physiotherapy → `physiotherapy` (options from that page)

---

### Task 6: Pediatrician (+ any form with extra fields)

**Files:**
- Modify: `src/app/services/pediatrician/page.tsx`
- Modify if needed: `src/app/our-services/postnatal-recovery-care/physiotherapy/page.tsx`

Pediatrician form includes extra fields (`mode`, age range). Prefer:

1. Add optional props to `ServiceBookingForm` **only if** cheap (`extraFields` render prop), **or**
2. Keep pediatrician form markup inside `EnquiryModal` on that page, opened by a thin local CTA button that reuses the same visual styles as `ServiceEnquiryCta` (or extend `ServiceEnquiryCta` with optional `children` instead of `ServiceBookingForm`).

Recommended extension:

```tsx
// ServiceEnquiryCta optional override
children?: React.ReactNode; // if provided, render instead of ServiceBookingForm
```

- [ ] **Step 1:** Extend `ServiceEnquiryCta` to accept optional `children` for custom form bodies.
- [ ] **Step 2:** Pediatrician: hero CTA `Book Pediatric Consult`; modal contains existing pediatrician form with `defaultValues.service = "Pediatrician Consultation"`; remove sidebar form; reclaim image space.
- [ ] **Step 3:** Physiotherapy under `our-services/.../physiotherapy` same pattern with key `physiotherapy`.
- [ ] **Step 4: Commit**

```bash
git commit -m "feat: modal enquiry for pediatrician and physiotherapy pages"
```

---

### Task 7: Navbar — Download Motherly Mobile App

**Files:**
- Modify: `src/components/AppDownloadButton.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1:** Extend `AppDownloadButton`:

```tsx
type Variant = "hero" | "card" | "navbar";

const label =
  variant === "navbar" ? "Download Motherly Mobile App" : "Download the Motherly App";

const sizing =
  variant === "hero"
    ? "w-full sm:w-auto px-8 py-3.5 text-base"
    : variant === "navbar"
      ? "px-5 py-2.5 text-sm rounded-full"
      : "px-7 py-3 text-sm";
```

Render `{label}` instead of hard-coded string.

- [ ] **Step 2:** In `Navbar.tsx`, replace desktop Contact Us `Link`/`button` block with:

```tsx
<div className="hidden md:block">
  <AppDownloadButton variant="navbar" />
</div>
```

- [ ] **Step 3:** Replace mobile Contact Us link with the same download button (close menu on navigate is N/A for external link; still call `setMobileOpen(false)` on click if desired).

- [ ] **Step 4: Commit**

```bash
git add src/components/AppDownloadButton.tsx src/components/Navbar.tsx
git commit -m "feat(nav): replace Contact Us with app download CTA"
```

---

### Task 8: Footer Contact Us button

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1:** In the brand column (after the short description), add:

```tsx
<Link
  href="/contact-us"
  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold"
  style={{
    fontFamily: "var(--font-plus-jakarta)",
    backgroundColor: "var(--color-primary)",
    color: "var(--color-on-primary)",
  }}
>
  Contact Us
</Link>
```

Keep existing quick-links “Contact Us” entry as well (redundant is fine) or leave only the button — prefer **both** for discoverability.

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): add Contact Us button"
```

---

### Task 9: Verification

- [ ] **Step 1:** Run `npm run build` in `Motherly/`. Expected: success, no type errors.
- [ ] **Step 2:** Manually spot-check:
  - `/services/doulas` — CTA “Book Your Doula”, modal, preselect Doulas, no sidebar form
  - `/services/pediatrician` — “Book Pediatric Consult”, extra fields still present
  - Navbar — “Download Motherly Mobile App” (desktop + mobile)
  - Footer — Contact Us → `/contact-us`
  - Mid-page app download cards still present
- [ ] **Step 3:** Fix any regressions; commit if needed.

```bash
git commit -m "fix: service CTA modal polish after verification"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Dynamic service CTA labels | 1, 4, 5, 6 |
| Remove hero download on service pages | 5, 6 |
| Form as popup modal | 2, 3, 4 |
| Pre-fill Select Service | 3, 4 |
| Close control | 2 |
| Reclaim right side with image/layout | 5, 6 |
| Navbar download | 7 |
| Footer Contact Us | 8 |
| Keep mid-page app cards | 5 (explicit keep) |
| Validation/submit unchanged | 3 |

## Placeholder / consistency notes

- `ServiceEnquiryKey` and CTA strings are fixed in Task 1; later tasks must not invent alternate labels.
- Form `defaultService` values must match existing `<option value>` strings already on each page.
- Alias pages that `export { default } from "..."` inherit changes automatically.
