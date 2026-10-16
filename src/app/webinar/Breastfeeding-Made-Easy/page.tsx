import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebinarClient from "./WebinarClient";

const PAGE_TITLE = "Breastfeeding Made Easy Webinar | Dr. Varshika.S | Motherly";
const PAGE_DESCRIPTION =
  "Join Dr. Varshika.S, Homoeopathic Physician & Advanced Certified Lactation Professional, for a 90-minute live interactive webinar on Breastfeeding Made Easy on 25th October. Overcome latch issues, position comfortably, and master early feeding for just ₹149.";
const CANONICAL_URL = "https://www.mothrly.com/webinar/Breastfeeding-Made-Easy";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    siteName: "Motherly",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/webinar/dr_varshika.png",
        width: 1024,
        height: 1024,
        alt: "Dr. Varshika.S (BHMS, CLE, ACLP, RM IYCAN, MBA(HHM)) - Breastfeeding Made Easy Webinar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/webinar/dr_varshika.png"],
  },
};

const webinarJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  name: "Breastfeeding Made Easy Webinar",
  description: PAGE_DESCRIPTION,
  startDate: "2026-10-25T11:00:00+05:30",
  endDate: "2026-10-25T12:30:00+05:30",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: "https://payments.cashfree.com/forms/motherly-lactation-webinar",
  },
  image: ["https://www.mothrly.com/webinar/dr_varshika.png"],
  organizer: {
    "@type": "Organization",
    name: "Motherly",
    url: "https://www.mothrly.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8968967000",
      contactType: "customer service",
      email: "ramya@mothrly.com",
    },
  },
  performer: {
    "@type": "Person",
    name: "Dr. Varshika.S",
    jobTitle: "Advanced Certified Lactation Professional & Homoeopathic Physician (BHMS, CLE, ACLP, RM IYCAN, MBA(HHM))",
  },
  offers: {
    "@type": "Offer",
    price: "149",
    priceCurrency: "INR",
    url: "https://payments.cashfree.com/forms/motherly-lactation-webinar",
    availability: "https://schema.org/InStock",
    validFrom: "2026-10-01T00:00:00+05:30",
  },
};

export default function WebinarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webinarJsonLd) }}
      />
      <Navbar />
      <main className="pt-28 md:pt-32 overflow-x-hidden">
        <WebinarClient />
      </main>
      <Footer />
    </>
  );
}
