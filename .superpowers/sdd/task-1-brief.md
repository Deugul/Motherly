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


