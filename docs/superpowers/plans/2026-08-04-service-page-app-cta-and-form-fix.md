# Service Page App CTA and Enquiry Form Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one device-aware app-download CTA to every service page, and make the "Send an Enquiry" submit button reachable without scrolling at every breakpoint.

**Architecture:** A single shared client component owns both store URLs and the only copy of the iOS-detection logic. It renders a plain anchor defaulting to the Play Store, so server and client markup are identical and there is no hydration mismatch; iOS is handled by cancelling the click and opening the App Store instead. The enquiry form keeps all its fields but pairs four of them into two-column rows on desktop and, on every breakpoint, becomes a height-capped flex column whose fields scroll while the submit button stays pinned in a non-scrolling footer.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4, framer-motion 12, react-hook-form + zod.

**Spec:** `docs/superpowers/specs/2026-08-04-service-page-app-cta-and-form-fix-design.md`

---

## Testing note — read before starting

This repository has **no test framework**. `package.json` defines no `test` script
and neither Jest nor Vitest nor Playwright is installed. Adding one is out of scope
for this plan.

Every task therefore verifies with the checks the project actually has:

```bash
npx tsc --noEmit      # type check
npm run lint          # eslint
npm run build         # full production build
```

plus explicit manual browser checks where behaviour is visual. Do not skip the
manual checks — they are the only thing verifying the actual defect is fixed.

Run all commands from `c:/Projects/motherly_website/Motherly`.

---

## File structure

**Create**

- `src/components/AppDownloadButton.tsx` — the only place the store URLs and the
  iOS detection exist. Two visual variants, no other responsibility.

**Modify — 11 canonical pages** (each gets a hero CTA; 10 also get a badge-card
conversion; all get the form layout fix)

| # | File | Badge card | Form wrapper notes |
| --- | --- | --- | --- |
| 1 | `src/app/services/baby-care/page.tsx` | line ~582 | `aside ref={formWrapperRef}` ~618 |
| 2 | `src/app/services/doulas/page.tsx` | line ~741 | `aside ref={formWrapperRef}` ~778 |
| 3 | `src/app/services/gynaecology/page.tsx` | line ~474 | no `formWrapperRef` — inspect wrapper |
| 4 | `src/app/services/lactation/page.tsx` | line ~571 | no `formWrapperRef` — inspect wrapper |
| 5 | `src/app/services/mother-care/page.tsx` | line ~578 | `aside ref={formWrapperRef}` ~614 |
| 6 | `src/app/services/nannies/page.tsx` | line ~484 | `aside id="booking-form"` ~521 |
| 7 | `src/app/services/pediatrician/page.tsx` | line ~484 | `aside ref={formWrapperRef}` ~521 |
| 8 | `src/app/services/physiotherapy/page.tsx` | line ~639 | `aside ref={formWrapperRef}` ~664 |
| 9 | `src/app/services/yoga/page.tsx` | line ~508 | `aside ref={formWrapperRef}` ~545 |
| 10 | `src/app/our-services/postnatal-recovery-care/page.tsx` | line ~867 | plain `aside className="lg:col-span-5"` ~485 |
| 11 | `src/app/our-services/postnatal-recovery-care/physiotherapy/page.tsx` | **none** | plain `aside className="lg:col-span-5"` ~141 |

Line numbers are from exploration on 2026-08-04 and **will drift as you edit**.
Always locate by the anchor string, never by line number alone.

**Modify — stale link corrections**

- `src/components/CTASection.tsx` line ~87
- `src/app/blogs/[slug]/page.tsx` line ~228

---

## Task 1: Create the shared AppDownloadButton component

**Files:**
- Create: `src/components/AppDownloadButton.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AppDownloadButton.tsx` with exactly this content:

```tsx
"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kreosoft.monthly&pcampaignid=web_share";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/motherly-birth-companion/id6746041100";

/**
 * iPadOS 13+ reports platform "MacIntel" and drops "iPad" from the user agent,
 * so the second clause is required or iPad visitors get sent to the Play Store
 * for an app they cannot install. maxTouchPoints separates iPad from a real Mac.
 */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

type Variant = "hero" | "card";

export default function AppDownloadButton({
  variant = "hero",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  // The href is always the Play Store so server and client markup match exactly.
  // Only iOS needs a branch; Android and desktop fall through to the href.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isIOS()) return;
    event.preventDefault();
    window.open(APP_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const sizing =
    variant === "hero"
      ? "w-full sm:w-auto px-8 py-3.5 text-base"
      : "px-7 py-3 text-sm";

  return (
    <motion.a
      href={PLAY_STORE_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all ${sizing} ${className}`}
      style={{
        fontFamily: "var(--font-headline)",
        background: "linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)",
        color: "var(--color-on-primary)",
        boxShadow:
          "0 8px 24px color-mix(in srgb, var(--color-primary) 25%, transparent)",
      }}
    >
      <span className="material-symbols-outlined text-xl">download</span>
      Download the Motherly App
    </motion.a>
  );
}
```

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors referencing `AppDownloadButton.tsx`.

`navigator.platform` is formally deprecated but is still the only reliable iPadOS
signal and is present in every browser. If eslint flags it, suppress with a
targeted `// eslint-disable-next-line` and a comment explaining why — do not
remove the clause.

- [ ] **Step 4: Commit**

```bash
git add src/components/AppDownloadButton.tsx
git commit -m "feat: add shared device-aware app download button"
```

---

## Task 2: Reference implementation on mother-care

This page is the reference. Get it exactly right, verify it in a browser, then
Tasks 3–12 repeat the same three edits on the remaining pages.

**Files:**
- Modify: `src/app/services/mother-care/page.tsx`

- [ ] **Step 1: Import the component**

Find the import block at the top and add the import after the `ScrollReveal` line:

```tsx
import ScrollReveal from "@/components/ScrollReveal";
import AppDownloadButton from "@/components/AppDownloadButton";
```

- [ ] **Step 2: Add the hero CTA**

Find the closing of the hero paragraph inside the first `<ScrollReveal>` — the
`</p>` that ends the text beginning "Comprehensive postnatal care from verified".
Insert the button between that `</p>` and the `</section>` that follows:

```tsx
                </p>
                <div className="mt-6">
                  <AppDownloadButton variant="hero" />
                </div>
              </section>
```

- [ ] **Step 3: Convert the badge card**

Find the block containing `Book through the Motherly app`. Replace the entire
`<div className="flex flex-wrap justify-center gap-4 pt-2"> … </div>` holding the
two `<a>`/`<Image>` badge pairs with:

```tsx
                <div className="flex justify-center pt-2">
                  <AppDownloadButton variant="card" />
                </div>
```

Leave the surrounding card, its heading, its description paragraph and the
"Or visit www.mothrly.com" line untouched.

- [ ] **Step 4: Remove the now-unused Image import if it is unused**

Run: `npm run lint`
If it reports `Image` is defined but never used in this file, remove the
`import Image from "next/image";` line. If `Image` is still used elsewhere in the
file (mother-care uses it for the hero photo, so it will be), leave it.

- [ ] **Step 5: Cap the card height and make it a flex column**

Find the `motion.div` inside the `<aside>` and add the flex/height classes to its
`className`:

```tsx
              className="rounded-2xl border overflow-hidden flex flex-col max-h-[calc(100dvh-7rem)]"
```

`dvh`, not `vh`. On mobile Safari `vh` measures the viewport excluding browser
chrome, which pushes the button under the address bar — the exact bug being fixed.

- [ ] **Step 6: Make the inner padding wrapper a flex column**

Change:

```tsx
              <div className="p-4 md:p-5">
```

to:

```tsx
              <div className="p-4 md:p-5 flex flex-col min-h-0 flex-1">
```

`min-h-0` is required at every level of the chain — without it a flex child
refuses to shrink below its content height and the inner scroll never engages.

- [ ] **Step 7: Split the form into a scrolling field region and a pinned footer**

Change the form element's className:

```tsx
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col min-h-0 flex-1"
```

Immediately after the opening `<motion.form …>` tag, open the scrolling region:

```tsx
                      <div className="space-y-3 overflow-y-auto min-h-0 flex-1 pr-1">
```

Close that `</div>` immediately **before** the `<motion.button type="submit"`,
and wrap the submit button plus the disclaimer paragraph in the pinned footer:

```tsx
                      </div>

                      <div className="shrink-0">
                        <div
                          className="h-4 -mt-4 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(to top, var(--color-surface-container-lowest), transparent)",
                          }}
                        />
                        <motion.button
                          type="submit"
                          ...unchanged...
                        </motion.button>

                        <p className="text-center mt-3 leading-relaxed" ...unchanged...>
                          By submitting, you agree to our privacy policy. ...
                        </p>
                      </div>
```

Do not change the button's own markup, styles or contents — only its wrapper.

- [ ] **Step 8: Pair Service with Patient Name**

The Service field and the Patient Name field are currently two sibling
`<div className="space-y-1.5">` blocks. Wrap them in a grid:

```tsx
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            ...Select Service, unchanged...
                          </div>
                          <div className="space-y-1.5">
                            ...Patient Name, unchanged...
                          </div>
                        </div>
```

- [ ] **Step 9: Pair Email with Phone**

Same treatment for the Email Address and Phone Number blocks:

```tsx
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            ...Email Address, unchanged...
                          </div>
                          <div className="space-y-1.5">
                            ...Phone Number, unchanged...
                          </div>
                        </div>
```

- [ ] **Step 10: Tighten the two existing pairs**

Change `grid grid-cols-2 gap-4` (Location/Pincode) to `grid grid-cols-2 gap-3`.
Change `grid grid-cols-1 sm:grid-cols-2 gap-4` (Date/Time) to
`grid grid-cols-1 sm:grid-cols-2 gap-3`.

- [ ] **Step 11: Type check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 12: Verify in a browser — this is the real test**

Run: `npm run dev`

Open `http://localhost:3000/services/mother-care` and check, at each of 375px,
768px and 1440px widths using devtools device emulation:

1. The hero CTA is visible below the hero paragraph, filled magenta, reading
   "Download the Motherly App".
2. Scroll so the enquiry card is in view. **The Submit Enquiry button is visible
   without any further scrolling.** At 375px the fields scroll inside the card
   while the button stays put.
3. The browser console shows **no** hydration warning.
4. Right-click the CTA → Copy link address → it is the
   `id=com.kreosoft.monthly` Play Store URL.
5. In devtools, switch the user-agent string to an iPhone and click the CTA — it
   opens the `apps.apple.com/in/app/motherly-birth-companion/id6746041100` URL.
6. The bottom "Book through the Motherly app" card now shows one button instead
   of two badges.

Do not proceed to Task 3 until all six pass.

- [ ] **Step 13: Commit**

```bash
git add src/app/services/mother-care/page.tsx
git commit -m "feat: add app CTA and pin enquiry submit on mother-care page"
```

---

## Tasks 3–12: Apply the same three edits to the remaining pages

Each task below is one page and repeats the **same** transformation proved out in
Task 2. For each page:

**A. Import** — add `import AppDownloadButton from "@/components/AppDownloadButton";`
to the import block.

**B. Hero CTA** — insert after the hero's closing `</p>`, before `</section>`:

```tsx
                <div className="mt-6">
                  <AppDownloadButton variant="hero" />
                </div>
```

**C. Badge card** — replace the flex row of two badge `<a>`/`<Image>` (or
`<Link>`) pairs under `Book through the Motherly app` with:

```tsx
                <div className="flex justify-center pt-2">
                  <AppDownloadButton variant="card" />
                </div>
```

**D. Form card** — add `flex flex-col max-h-[calc(100dvh-7rem)]` to the card
`motion.div` className; add `flex flex-col min-h-0 flex-1` to the `p-4 md:p-5`
inner div; set the form className to `flex flex-col min-h-0 flex-1`; wrap all
fields in `<div className="space-y-3 overflow-y-auto min-h-0 flex-1 pr-1">`; wrap
submit + disclaimer in the `shrink-0` footer with the fade div, exactly as in
Task 2 Step 7.

**E. Pairing** — wrap Service+Name and Email+Phone in
`<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">` each; change existing
pair gaps from `gap-4` to `gap-3`. **Only pair fields the page actually has** —
see per-page notes.

**F. Verify** — `npx tsc --noEmit && npm run lint`, then load the page in the dev
server at 375px and confirm the submit button is visible once the card is in view.

**G. Commit** that page.

- [ ] **Task 3: `src/app/services/baby-care/page.tsx`** — full 9-field form, badge
  card at ~582 uses `<a>`+`<Image>`. Standard transformation, no variances.

- [ ] **Task 4: `src/app/services/doulas/page.tsx`** — full 9-field form, badge
  card at ~741 uses `<a>`+`<Image>`. Standard transformation, no variances.

- [ ] **Task 5: `src/app/services/gynaecology/page.tsx`** — full 9-field form.
  This page has **no** `formWrapperRef`/`formActive` sticky machinery; read the
  `<aside>` wrapper first and apply D to whatever card element it actually has.
  Imports `Link` from next/link — the badge card may use `<Link>` rather than `<a>`.

- [ ] **Task 6: `src/app/services/lactation/page.tsx`** — full 9-field form. Same
  caveat as Task 5: no `formWrapperRef`, inspect the wrapper before editing.
  Badge card at ~571 uses inline single-line `<Image>` markup.

- [ ] **Task 7: `src/app/services/nannies/page.tsx`** — full 9-field form. The
  `<aside>` carries `id="booking-form"`; **preserve that id**, something links to it.

- [ ] **Task 8: `src/app/services/pediatrician/page.tsx`** — **reduced field set**:
  Select Service, Email Address, Phone Number, Location, Pincode. No Patient Name,
  no Date, no Time. Apply E only to the pairs that exist: pair Service+Email and
  Phone+Location, leave Pincode full width. Badge card uses `<Link>` with
  **placeholder** URLs — replacing it fixes them.

- [ ] **Task 9: `src/app/services/physiotherapy/page.tsx`** — **reduced field set**:
  Email Address, Phone Number, Location, Pincode. Pair Email+Phone and
  Location+Pincode. Badge card at ~639 uses `<Link>` with **placeholder** URLs.

- [ ] **Task 10: `src/app/services/yoga/page.tsx`** — full 9-field form. Badge card
  at ~508 uses `<Link>` with **placeholder** URLs. Disclaimer text differs
  ("...and will be contacted via email") — wrap it, do not rewrite it.

- [ ] **Task 11: `src/app/our-services/postnatal-recovery-care/page.tsx`** — full
  9-field form. Wrapper is a plain `<aside className="lg:col-span-5">` with **no**
  sticky/formActive machinery — apply D to the card div inside it. Badge card is
  at ~867, far below the form.

- [ ] **Task 12: `src/app/our-services/postnatal-recovery-care/physiotherapy/page.tsx`**
  — **reduced field set**: Patient Name, Email Address only. **No badge card
  exists on this page** — skip step C entirely, apply A, B, D, E, F, G only.
  Wrapper is a plain `<aside className="lg:col-span-5">`.

---

## Task 13: Correct the stale Android package elsewhere

**Files:**
- Modify: `src/components/CTASection.tsx`
- Modify: `src/app/blogs/[slug]/page.tsx`

- [ ] **Step 1: Fix CTASection**

In `src/components/CTASection.tsx`, change:

```tsx
<a href="https://play.google.com/store/apps/details?id=com.mothrly" target="_blank" rel="noopener noreferrer">
```

to:

```tsx
<a href="https://play.google.com/store/apps/details?id=com.kreosoft.monthly&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
```

Leave the badge `<Image>` elements alone — CTASection keeps its official store
badges, only the URL is wrong.

- [ ] **Step 2: Fix the blog template link**

In `src/app/blogs/[slug]/page.tsx` near line 228, change the injected
`'href="https://play.google.com/store/apps/details?id=com.mothrly&hl=en_IN"'`
string to
`'href="https://play.google.com/store/apps/details?id=com.kreosoft.monthly&pcampaignid=web_share"'`.

Read the surrounding code first — this is a string replacement inside HTML
post-processing, so the quoting must stay exactly as it was.

- [ ] **Step 3: Confirm no stale package references remain**

Run: `grep -rn "com.mothrly" src/ --include=*.tsx --include=*.ts`
Expected: no results. (`src/data/*.json` blog backups may still contain it; those
are archived content, leave them.)

- [ ] **Step 4: Type check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/CTASection.tsx src/app/blogs/\[slug\]/page.tsx
git commit -m "fix: correct stale Android package id in app store links"
```

---

## Task 14: Full verification

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build completes; all `/services/*` and `/our-services/*` routes appear
in the route table without errors.

- [ ] **Step 4: Confirm the CTA is in the server-rendered HTML**

Run: `npm run start`, then in another shell:

```bash
curl -s http://localhost:3000/services/mother-care | grep -c "com.kreosoft.monthly"
```

Expected: at least 2 (hero CTA + converted badge card). This proves the link is
in the server HTML and crawlable, not injected by JavaScript.

- [ ] **Step 5: Spot-check three pages in a browser**

Load `/services/pediatrician` (reduced fields), `/services/yoga` (was placeholder
links) and `/our-services/postnatal-recovery-care/physiotherapy` (no badge card)
at 375px and 1440px. For each: hero CTA present, submit button visible once the
form card is in view, no console hydration warning.

- [ ] **Step 6: Verify an alias route inherited the change**

Load `/services/lactation-consultants` — it re-exports the lactation page and must
show the hero CTA without having been edited.

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found in full verification"
```

---

## Out of scope — do not implement

Recorded in the spec, deliberately excluded:

- **Moving the form up on mobile.** Adding `order-first lg:order-none` to the
  aside would put the form under the hero instead of at the page bottom. High
  value, one class per page, but it reorders page elements which the brief rules out.
- **Extracting a shared form component.** Would stop the drift that has already
  affected three pages, but is a much larger diff needing the drifted pages reconciled.
- **Normalising the drifted field sets** on pediatrician, physiotherapy and
  our-services physiotherapy. Apply layout to the fields each page has; do not add
  or remove fields.
