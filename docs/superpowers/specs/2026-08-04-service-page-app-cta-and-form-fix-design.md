# Service Page App CTA and Enquiry Form Fix

**Date:** 2026-08-04
**Status:** Approved

## Problem

Two separate defects across the service pages.

1. There is no single call to action driving visitors to the mobile app. Each page
   instead carries a "Book through the Motherly app" card holding two platform
   badges, so the visitor must work out which store is theirs. Three pages link to
   placeholder store URLs that resolve to store home pages rather than the app.
2. The "Send an Enquiry" form is taller than the viewport. Its submit button sits
   below the fold, so a visitor who fills the form cannot see the control that
   submits it without scrolling further.

## Scope

Eleven canonical pages carry the enquiry form:

| Page | Enquiry form | App badge card |
| --- | --- | --- |
| `src/app/services/baby-care/page.tsx` | yes | yes |
| `src/app/services/doulas/page.tsx` | yes | yes |
| `src/app/services/gynaecology/page.tsx` | yes | yes |
| `src/app/services/lactation/page.tsx` | yes | yes |
| `src/app/services/mother-care/page.tsx` | yes | yes |
| `src/app/services/nannies/page.tsx` | yes | yes |
| `src/app/services/pediatrician/page.tsx` | yes | yes (placeholder URLs) |
| `src/app/services/physiotherapy/page.tsx` | yes | yes (placeholder URLs) |
| `src/app/services/yoga/page.tsx` | yes | yes (placeholder URLs) |
| `src/app/our-services/postnatal-recovery-care/page.tsx` | yes | yes |
| `src/app/our-services/postnatal-recovery-care/physiotherapy/page.tsx` | yes | no |

So: 11 hero CTA insertions and 10 badge-card conversions.

Eleven further routes are one-line `export { default } from ...` re-exports and
inherit every change without being edited:

- `/services/gynecologist`
- `/services/gynecologist-consultation`
- `/services/lactation-consultants`
- `/services/nanny-services`
- `/services/postnatal`
- `/services/postnatal-recovery-care`
- `/services/postnatal-recovery-care/physiotherapy`
- `/our-services/doulas`
- `/our-services/gynecology-consultation`
- `/our-services/lactation-consultants`
- `/our-services/nanny-services`

That is 22 URLs in total, reached by editing 11 files.

## Decisions

| Question | Decision |
| --- | --- |
| Android package | `com.kreosoft.monthly`. Stale `com.mothrly` links elsewhere in the site are corrected to match. |
| Form approach | Condense field layout and pin the submit button. All nine fields retained. |
| CTA placement | Under the hero paragraph, and the existing badge card converted to the same button. |
| CTA label | Static `Download the Motherly App` on every device. |
| CTA styling | Filled, reusing the existing magenta gradient. |
| Desktop target | Play Store. |
| Structure | CTA extracted to a shared component; form edited in place per page. |

## Component: `src/components/AppDownloadButton.tsx`

A client component holding the only copy of the store URLs and the only copy of
the device-detection logic.

```
PLAY_STORE_URL = https://play.google.com/store/apps/details?id=com.kreosoft.monthly&pcampaignid=web_share
APP_STORE_URL  = https://apps.apple.com/in/app/motherly-birth-companion/id6746041100
```

### Mechanism

The button renders as a real anchor whose `href` is the Play Store URL:

```tsx
<a href={PLAY_STORE_URL} onClick={redirectIfIOS} target="_blank" rel="noopener noreferrer">
  Download the Motherly App
</a>
```

Nothing in the markup depends on `navigator`, so server and client output are
byte-identical. This is the reason the label is static rather than device-adaptive:
it eliminates hydration mismatch, first-paint text flicker and layout shift, and
leaves a genuine crawlable outbound link.

Detection runs only inside the click handler. If the visitor is on iOS the handler
calls `preventDefault()` and opens `APP_STORE_URL` via `window.open(url, "_blank",
"noopener")`, matching the anchor's `target="_blank"`. Android and desktop are not
branched on at all — both fall through to the `href`, which is already correct for
them. A visitor with JavaScript disabled still gets a working Play Store link.

### iOS detection

```
/iPad|iPhone|iPod/.test(navigator.userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
```

The second clause is required: iPadOS 13 and later report `MacIntel` and omit
`iPad` from the user agent. Without it, iPad visitors are sent to the Play Store
for an app they cannot install. `maxTouchPoints > 1` distinguishes an iPad from a
real desktop Mac.

### Variants

`variant="hero"` — full-width filled button placed beneath the hero paragraph.
`variant="card"` — same button sized for the badge card it replaces.

Both use the gradient, pill radius and shadow already on the Submit Enquiry
button (`linear-gradient(135deg, #ba0e56 0%, #f4447f 100%)`), preserving the
pink/magenta accent. A leading download icon uses the existing
`material-symbols-outlined` convention.

### Accepted trade-off

Converting the badge card removes the official Google Play and App Store badge
images from service pages. Those are recognised brand assets and both vendors'
brand guidelines expect them on distribution surfaces. `CTASection` retains its
badges on other pages, so they do not disappear site-wide. This was chosen
knowingly in exchange for a single consistent CTA.

## Form layout

Current field order, all full-width except two pairs: Service, Patient Name,
Email, Phone, `Location | Pincode`, `Date | Time`, Message. Roughly 770px tall
against roughly 650px of usable phone viewport.

### Desktop: pairing

The aside is `lg:col-span-5` of a `max-w-7xl` grid, about 460px of usable width —
enough for two columns. Two further pairs are introduced:

```
Service        | Patient Name
Email Address  | Phone Number
Location       | Pincode          (already paired)
Select Date    | Enter Time       (already paired)
Message                           (full width, rows=2)
```

This brings the card to roughly 570px against roughly 700px available below the
navbar, so on desktop the whole form including submit fits with room to spare and
internal scrolling never engages.

### Mobile and tablet: pinned submit

Below `sm` (640px) the pairs collapse back to a single column. A 375px phone split
into two ~160px columns would truncate select options such as
"In-Home Mother Care", so pairing is not applied there.

Instead the card becomes a flex column with a height cap:

- Card: `flex flex-col max-h-[calc(100dvh-7rem)]`
- Field region: `flex-1 overflow-y-auto`
- Footer holding submit and disclaimer: `shrink-0`, with a top border and a short
  gradient fade so it reads as pinned rather than clipped

The unit must be `dvh`, not `vh`. On mobile Safari `vh` measures the viewport
excluding browser chrome, which would push the button under the address bar —
precisely the bug being fixed.

Result: the submit button is visible as soon as the card enters the viewport, at
every breakpoint, with no fields removed.

### Preserved behaviour

The existing `formActive` state, `formWrapperRef` and the `useLayoutEffect` scroll
compensation that toggles `sticky top-28` stay untouched. They become more useful
with a height-capped card, not less.

### Drifted pages

`pediatrician`, `physiotherapy` and
`our-services/postnatal-recovery-care/physiotherapy` already carry reduced or
differing field sets. Each receives the same layout treatment applied to whatever
fields it currently has. Field sets are **not** normalised — that would change
behaviour beyond the brief.

## Link corrections

- `yoga`, `physiotherapy`, `pediatrician`: placeholder `https://play.google.com/store`
  and `https://apps.apple.com` links are removed by the card conversion.
- `src/components/CTASection.tsx`: badge links corrected from `com.mothrly` to
  `com.kreosoft.monthly`.
- `src/app/blogs/[slug]/page.tsx`: the injected `com.mothrly` link corrected likewise.

## Out of scope

Recommended but explicitly excluded, because the brief rules out modifying other
page elements:

**Mobile form position.** The aside stacks below the ~10-section content column,
so on mobile the form sits at the bottom of a very long page. Adding
`order-first lg:order-none` to the aside would move it directly beneath the hero.
This is a one-class change per page with high value and low risk, and is
recommended as a follow-up.

**Form extraction.** The form is copy-pasted into all 11 pages and has already
drifted on three of them. Extracting a shared `ServiceEnquiryForm` component would
prevent further drift but produces a much larger diff and requires reconciling the
drifted pages. Recommended as a separate piece of work.

## Verification

1. `npx tsc --noEmit` — clean
2. `npm run lint` — clean
3. `npm run build` — succeeds
4. Dev server, `/services/mother-care` at 375px, 768px and 1440px: submit button
   visible without scrolling once the form card is in view
5. Hero CTA `href` resolves to the Play Store URL in server-rendered HTML
6. No hydration warning in the browser console on load
