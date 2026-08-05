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
    ctaLabel: "Book Your Lactation Consult",
    defaultService: "Lactation Consultants",
    pageLabel: "Lactation",
  },
  "postnatal-recovery": {
    ctaLabel: "Book Your Recovery Care",
    defaultService: "Postnatal Recovery",
    pageLabel: "Postnatal Recovery Care",
  },
  nannies: {
    ctaLabel: "Book Your Nanny",
    defaultService: "Nanny Care",
    pageLabel: "Nanny Care",
  },
  gynaecology: {
    ctaLabel: "Book Your Gynae Consult",
    defaultService: "Gynaecology Consultation",
    pageLabel: "Gynaecology",
  },
  "baby-care": {
    ctaLabel: "Book Your Baby Care",
    defaultService: "Baby Care",
    pageLabel: "Baby Care",
  },
  "mother-care": {
    ctaLabel: "Book Your Mother Care Specialist",
    defaultService: "Mother Care",
    pageLabel: "Mother Care",
  },
  yoga: {
    ctaLabel: "Book Your Prenatal Yoga",
    defaultService: "Prenatal Yoga",
    pageLabel: "Yoga",
  },
  pediatrician: {
    ctaLabel: "Book Your Pediatric Consult",
    defaultService: "Pediatrician Consultation",
    pageLabel: "Pediatrician",
  },
  physiotherapy: {
    ctaLabel: "Book Your Physiotherapy",
    defaultService: "Physiotherapy",
    pageLabel: "Physiotherapy",
  },
};

export function getServiceEnquiryCta(key: ServiceEnquiryKey): ServiceEnquiryCtaConfig {
  return SERVICE_ENQUIRY_CTA[key];
}
