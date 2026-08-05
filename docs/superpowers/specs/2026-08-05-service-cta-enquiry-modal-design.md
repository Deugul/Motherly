# Service-Specific CTA + Enquiry Modal Design

**Date:** 2026-08-05  
**Status:** Approved (pending user review of this written spec)  
**Related:** `2026-08-04-service-page-app-cta-and-form-fix-design.md` (download CTA + form sticky behaviour — partially superseded on service pages)

## Goal

On every Motherly service page, replace the hero “Download the Motherly App” button with a **service-specific booking CTA** that opens the existing enquiry form in a **modal**. Move app download to the **navbar**. Keep **Contact Us** available via the **footer**. Reclaim the former sticky form column for imagery.

## Non-goals

- Changing enquiry validation rules or `/api` submission contract beyond accepting a preselected service
- Removing the mid-page “Book through the Motherly app” download cards (those stay)
- Building new service pages for table rows that have no live route (e.g. Home Visit, Mental Wellness)

## Approach

Shared **CTA + modal shell** (Approach 1): one reusable client component pair driven by a central `serviceKey → { ctaLabel, formServiceValue }` map. Each service page passes its key and optional secondary image.

## Service → CTA mapping

| Route / page | CTA label | Form “Select Service” default |
|---|---|---|
| `/services/doulas` | Book Your Doula | Doulas (or existing option string used on that page) |
| `/services/lactation` (+ lactation aliases) | Book Lactation Consult | Lactation Consultants |
| Postnatal Recovery Care pages | Book Recovery Care | Postnatal Recovery |
| `/services/nannies` (+ nanny aliases) | Book a Nanny | Nanny Care |
| `/services/gynaecology` (+ gynecologist aliases) | Book Gynae Consult | Gynaecology Consultation |
| `/services/baby-care` | Book Baby Care | Baby Care |
| `/services/mother-care` | Get Postpartum Care | Mother Care |
| `/services/yoga` | Join a Class | Prenatal Yoga |
| `/services/pediatrician` | Book Pediatric Consult | Pediatrician |
| Physiotherapy pages | Book Physiotherapy | Physiotherapy |

Exact option strings must match the `<select>` options already used on each page’s form so preselect works without renaming backend enums.

## Service page layout

1. **Hero:** Replace `AppDownloadButton variant="hero"` with `ServiceEnquiryCta` (label from map). Click → open modal.
2. **Remove** the sticky right-column (`lg:col-span-5`) enquiry form aside.
3. **Reclaim space:** Expand main content to full width **or** use a two-column media layout: primary hero image + secondary service image in the space formerly held by the form. Prefer reusing an existing page image asset when available; otherwise enlarge the existing featured image so the first viewport is not empty on the right.
4. **Keep** lower-page “Book through the Motherly app” blocks with `AppDownloadButton variant="card"`.

## Modal behaviour

- Overlay backdrop (`z-index` above navbar), centered panel, scrollable on small viewports
- Close: X button, Escape, backdrop click
- Body scroll locked while open
- Form fields, validation, and submit logic identical to current service-page forms
- On open: set service select to the page’s mapped default
- On successful submit: keep existing success UI inside the modal; allow dismiss

## Navbar

- Replace far-right **Contact Us** button (desktop + mobile) with **Download Motherly Mobile App** using existing device-aware `AppDownloadButton` (Play Store default, iOS → App Store).
- Nav links otherwise unchanged.

## Footer

- **Contact Us** remains a footer link to `/contact-us` (already present in quick links).
- Optionally style it as a primary button in the brand column for visibility; must remain a navigation to `/contact-us`, not a modal.

## New / changed modules (implementation sketch)

| Module | Role |
|---|---|
| `src/data/service-enquiry-cta.ts` | Map of service keys → CTA label + form default |
| `src/components/ServiceEnquiryCta.tsx` | Button that opens modal |
| `src/components/EnquiryModal.tsx` | Modal shell + form (extract from duplicated page forms where practical) |
| Service `page.tsx` files | Wire CTA, remove sidebar form, adjust grid/images |
| `Navbar.tsx` | Contact → App download |
| `Footer.tsx` | Ensure Contact Us is clear (link or button → `/contact-us`) |

## Success criteria

- Every listed service page shows the correct CTA text from the table above
- CTA opens modal with service preselected; submit still works
- No sticky on-page enquiry form in the right column
- Navbar shows app download on the right; Contact Us reachable from footer
- Desktop and mobile layouts remain usable; modal is accessible (focus trap preferred)

## Out of scope follow-ups

- Wire unused CTA table rows (Home Visit, Mental Wellness, Nutrition, Virtual Consultation, Childbirth Education as separate products) when those pages exist
- Consolidate all service forms into a single shared schema if still duplicated after extraction
