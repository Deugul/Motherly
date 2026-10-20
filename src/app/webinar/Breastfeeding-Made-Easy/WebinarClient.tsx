"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { m as motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const PAYMENT_LINK = "https://payments.cashfree.com/forms/motherly-lactation-webinar";
const CONTACT_PHONE = "8968967000";
const CONTACT_EMAIL = "ramya@mothrly.com";
const INSTAGRAM_URL = "https://www.instagram.com/mothrly";
const WHATSAPP_URL = "https://wa.me/918968967000?text=Hi%20Motherly%2C%20I%20have%20a%20query%20about%20the%20Breastfeeding%20Made%20Easy%20Webinar";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── BULLETPROOF INLINE SVG ICONS (Instant rendering, zero font delays) ── */
function CalendarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function VideoDevicesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function TimerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 8 14" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function VerifiedBadgeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BoltIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.9 17.55 11 21 11 21z" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowForwardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function StethoscopeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
      <path d="M9 12.5v3.5a4 4 0 0 0 8 0v-2" />
      <circle cx="17" cy="14" r="2" />
      <line x1="3" y1="3" x2="6" y2="3" />
      <line x1="12" y1="3" x2="15" y2="3" />
    </svg>
  );
}

function HeartIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CommunityIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LightbulbIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
    </svg>
  );
}

function VideoCamIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function HealingIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What if I cannot attend the live session at 11:00 AM?",
    answer:
      "Don't worry! All registered participants receive lifetime access to the full webinar video recording. Even if you miss the live broadcast, you can watch it at your convenience anytime, anywhere.",
  },
  {
    question: "How will I receive the link to join the webinar?",
    answer:
      "Once you complete registration on Cashfree, you will receive an instant confirmation email and WhatsApp message with the Zoom / Google Meet access link and calendar reminder.",
  },
  {
    question: "Is this webinar suitable for expecting (pregnant) mothers?",
    answer:
      "Yes, absolutely! The best time to learn breastfeeding techniques is before your baby arrives. Expecting mothers in their 2nd or 3rd trimester will gain immense confidence for the crucial first 48 hours after birth.",
  },
  {
    question: "Can my husband or support partner attend with me?",
    answer:
      "Yes! One registration covers your household. Partner support is a cornerstone of breastfeeding success, and partners are warmly encouraged to join.",
  },
  {
    question: "Will I be able to ask Dr. Varshika personal questions?",
    answer:
      "Yes, the session includes a dedicated interactive live Q&A where Dr. Varshika answers your questions and addresses common doubts directly.",
  },
  {
    question: "Is the payment safe and secure?",
    answer:
      "Yes, payment is processed securely via Cashfree with standard 256-bit encryption. You can pay with UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, or NetBanking.",
  },
];

const DEGREES = [
  {
    code: "BHMS",
    full: "Bachelor of Homeopathic Medicine and Surgery",
    badge: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  },
  {
    code: "CLE",
    full: "Certified Lactation Educator",
    badge: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
  },
  {
    code: "ACLP",
    full: "Advanced Certified Lactation Professional",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },
  {
    code: "RM IYCAN",
    full: "Registered Mentor - Infant & Young Child Nutrition",
    badge: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  },
  {
    code: "MBA(HHM)",
    full: "MBA in Hospital & Healthcare Management",
    badge: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100",
  },
];

export default function WebinarClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, show only when scrolled past Hero & Speaker (> 700px)
      // And automatically hide when reaching near the bottom pricing box
      const isMobile = window.innerWidth < 640;
      const threshold = isMobile ? 700 : 450;
      const nearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight - 550);
      setShowStickyBar(window.scrollY > threshold && !nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-12 bg-[var(--color-background)] text-[var(--color-on-surface)] selection:bg-[var(--color-secondary-container)] selection:text-[var(--color-on-secondary-container)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-4 sm:pt-8 md:pt-10 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft decorative background glows */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none -z-10"
          style={{ background: "radial-gradient(circle, var(--color-primary-container) 0%, transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Urgency Badge */}
          <div className="text-center mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] shadow-xs">
              <VerifiedBadgeIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
              <span>Motherly Masterclass Series</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              <span>Limited Seats</span>
            </div>
          </div>

          {/* Main Titles - Clean, neat, non-bloated font sizes on tablet/desktop */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-3.5">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Breastfeeding Made Easy{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--color-primary) 0%, #e33672 100%)",
                }}
              >
                Webinar
              </span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg font-semibold max-w-2xl mx-auto leading-snug"
              style={{ color: "var(--color-primary)" }}
            >
              Unlock the Secrets to Successful Breastfeeding with Expert Guidance!
            </p>

            {/* Mentor Quick Credential Badge */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 p-1.5 pr-3.5 sm:pr-4 rounded-full bg-[var(--color-surface-container-lowest)] border shadow-xs text-left max-w-full mx-auto" style={{ borderColor: "var(--color-surface-variant)" }}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden relative border-2 border-[var(--color-primary)] shrink-0">
                <Image
                  src="/webinar/dr_varshika.png"
                  alt="Dr. Varshika.S"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[var(--color-on-surface)] text-[11px] sm:text-xs">With Dr. Varshika.S</p>
                <p className="text-[var(--color-primary)] font-semibold text-[10px] sm:text-[11px]">
                  BHMS, CLE, ACLP, RM IYCAN, MBA(HHM)
                </p>
              </div>
            </div>

            <p
              className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed text-[var(--color-on-surface-variant)] pt-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join <strong>Dr. Varshika.S</strong>, a renowned Homoeopathic Physician and Advanced Certified
              Lactation Professional, as she shares clinical insights to help you overcome common breastfeeding
              challenges with confidence and ease.
            </p>
          </div>

          {/* Quick Schedule Strip */}
          <div className="mt-6 sm:mt-8 max-w-4xl mx-auto">
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl border"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "var(--color-surface-variant)",
                boxShadow: "0 8px 30px rgba(186, 14, 86, 0.06)",
              }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-primary)" }}
                >
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] font-medium">Date</p>
                  <p className="text-xs sm:text-base font-bold text-[var(--color-on-surface)]">22nd November 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-primary)" }}
                >
                  <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] font-medium">Time</p>
                  <p className="text-xs sm:text-base font-bold text-[var(--color-on-surface)]">11:00 AM – 12:30 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-tertiary-container)", color: "var(--color-on-tertiary-container)" }}
                >
                  <VideoDevicesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-on-tertiary-container)]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] font-medium">Platform</p>
                  <p className="text-xs sm:text-base font-bold text-[var(--color-on-surface)]">Online (Zoom/Meet)</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-1.5 sm:p-2">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-primary)" }}
                >
                  <TimerIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] font-medium">Duration</p>
                  <p className="text-xs sm:text-base font-bold text-[var(--color-on-surface)]">90 Mins + Q&A</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTAs & Pricing Highlight (ALWAYS visible, rock-solid on mobile) */}
          <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full px-2">
              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold text-white shadow-lg active:scale-95 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, #e33672 100%)",
                  boxShadow: "0 8px 22px rgba(186, 14, 86, 0.3)",
                }}
              >
                <span>Register Now for ₹99</span>
                <span className="line-through text-pink-200 text-xs sm:text-sm font-normal">₹1800</span>
                <ArrowForwardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold border-2 transition-all hover:border-green-600 hover:text-green-700 active:scale-95 duration-200"
                style={{
                  borderColor: "var(--color-outline-variant)",
                  backgroundColor: "var(--color-surface-container-lowest)",
                  color: "var(--color-on-surface)",
                }}
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                <span>Questions? Chat on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-[var(--color-on-surface-variant)] flex-wrap pt-2">
              <span className="inline-flex items-center gap-1">
                <LockIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                100% Secure via Cashfree
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1">
                <VideoDevicesIcon className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
                Includes Lifetime Recording
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-600" />
                Hurry! Limited Seats Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKER SPOTLIGHT: DR. VARSHIKA.S ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-container-low)]">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10 border bg-[var(--color-surface-container-lowest)]"
            style={{
              borderColor: "var(--color-surface-variant)",
              boxShadow: "0 10px 30px rgba(45, 52, 53, 0.05)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Speaker Visual / Badge Card */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative">
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 shadow-xl relative"
                    style={{ borderColor: "var(--color-primary-container)" }}
                  >
                    <Image
                      src="/webinar/dr_varshika.png"
                      alt="Dr. Varshika.S - BHMS, CLE, ACLP, RM IYCAN, MBA(HHM) - Advanced Certified Lactation Professional"
                      fill
                      sizes="(max-width: 640px) 144px, 208px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-white shadow-md flex items-center gap-1.5 whitespace-nowrap"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <VerifiedBadgeIcon className="w-3.5 h-3.5" />
                    <span>Expert Mentor</span>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 space-y-1.5">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-on-surface)]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Dr. Varshika.S
                  </h3>

                  {/* Studies / Degrees Pills - Distinct colors & badges for each qualification */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5 max-w-sm mx-auto">
                    {DEGREES.map((deg) => (
                      <span
                        key={deg.code}
                        title={deg.full}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border transition-all ${deg.badge}`}
                      >
                        {deg.code}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[var(--color-primary)] pt-1">
                    Advanced Certified Lactation Professional
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-[var(--color-on-surface-variant)]">
                    Homoeopathic Physician &amp; Maternal Health Specialist
                  </p>
                </div>
              </div>

              {/* Speaker Credentials & Overview */}
              <div className="md:col-span-7 space-y-3.5 sm:space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)]">
                  <StethoscopeIcon className="w-3.5 h-3.5" />
                  <span>Meet Your Mentor</span>
                </div>

                <h2
                  className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-on-surface)] leading-snug"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Learn Breastfeeding From A Practicing Clinical Specialist
                </h2>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[var(--color-on-surface-variant)]">
                  Breastfeeding is a natural bond, yet it is a skill that requires understanding, patience,
                  and proper clinical technique. As an Advanced Certified Lactation Professional and Homoeopathic
                  Physician, <strong>Dr. Varshika.S</strong> has helped hundreds of new mothers transition from
                  painful, anxious feeding to comfortable, deeply joyful nursing journeys.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-left">
                  <div className="flex items-start gap-2.5 p-3 rounded-md bg-[var(--color-surface-container-low)]">
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block text-[var(--color-on-surface)] font-bold text-xs sm:text-sm">
                        Pain-Free Latch Science
                      </strong>
                      Clinically proven latching correction to avoid cracked or sore nipples.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-md bg-[var(--color-surface-container-low)]">
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-tertiary)] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block text-[var(--color-on-surface)] font-bold text-xs sm:text-sm">
                        Gentle & Empathetic
                      </strong>
                      Holistic guidance that honors both mother&apos;s comfort and baby&apos;s nutrition.
                    </div>
                  </div>
                </div>

                <div className="pt-1.5">
                  <a
                    href={PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-primary)] hover:underline"
                  >
                    <span>Book Your Spot with Dr. Varshika for ₹99</span>
                    <ArrowForwardIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THIS WEBINAR ABOUT? ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              Session Overview
            </span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-on-surface)] leading-snug"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              What is this Webinar About?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--color-on-surface-variant)] leading-relaxed">
              This <strong>90-minute interactive webinar</strong> is designed to empower new and expecting
              mothers with the practical knowledge, biomechanics, and reassurance to breastfeed confidently
              and effectively. Learn the art of latching, comfortable positioning, and handling common
              early feeding issues without stress or self-doubt.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div
              className="p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "var(--color-surface-variant)",
              }}
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-primary)" }}
                >
                  <HealingIcon className="w-5 h-5 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-[var(--color-on-surface)]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Latching Correction
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  Understand why breastfeeding should NOT hurt. Learn the signs of a deep asymmetrical latch,
                  how to fix shallow latching, and how to relieve sore nipples instantly.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-surface-container)] text-[11px] sm:text-xs font-semibold text-[var(--color-primary)]">
                Pillar 01 &bull; Pain Prevention
              </div>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "var(--color-surface-variant)",
              }}
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-tertiary-container)", color: "var(--color-on-tertiary-container)" }}
                >
                  <HeartIcon className="w-5 h-5 sm:w-5 sm:h-5 text-[var(--color-on-tertiary-container)]" />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-[var(--color-on-surface)]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Comfortable Positions
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  Master ergonomic postures—cradle, football hold, laid-back biological feeding, and side-lying—so
                  you feed without neck, shoulder, or lower back strain.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-surface-container)] text-[11px] sm:text-xs font-semibold text-[var(--color-tertiary)]">
                Pillar 02 &bull; Maternal Comfort
              </div>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "var(--color-surface-variant)",
              }}
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-secondary-container)", color: "var(--color-primary)" }}
                >
                  <SparklesIcon className="w-5 h-5 sm:w-5 sm:h-5 text-[var(--color-primary)]" />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-[var(--color-on-surface)]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Early Feeding Solutions
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  Overcome colic, fussiness, engorgement, cluster feeding, and milk supply worries with practical,
                  doctor-approved strategies for the fourth trimester.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-surface-container)] text-[11px] sm:text-xs font-semibold text-[var(--color-primary)]">
                Pillar 03 &bull; Newborn Harmony
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD ATTEND? ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-container-low)]">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              Target Audience
            </span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-on-surface)] leading-snug"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Who Should Attend?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)]">
              This masterclass is curated specifically for mothers and mothers-to-be seeking clarity and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Persona 1 */}
            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border relative overflow-hidden flex flex-col"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 text-[var(--color-primary)] flex items-center justify-center mb-3 sm:mb-4">
                <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-[var(--color-on-surface)] mb-1.5"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Expecting Mothers
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4 flex-1">
                Pregnant mothers in their 2nd or 3rd trimester who want to be fully prepared before birth, avoid
                early feeding pitfalls, and build early confidence.
              </p>
              <ul className="text-[11px] sm:text-xs text-[var(--color-on-surface-variant)] space-y-1.5 pt-2 border-t border-[var(--color-surface-container)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-primary)] font-bold">&#10003;</span> Colostrum & Day 1 expectations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-primary)] font-bold">&#10003;</span> Hospital bag feeding essentials
                </li>
              </ul>
            </div>

            {/* Persona 2 */}
            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border relative overflow-hidden flex flex-col shadow-md"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <div
                className="absolute top-0 right-0 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-white rounded-bl-lg"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                RECOMMENDED
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-[var(--color-primary)] flex items-center justify-center mb-3 sm:mb-4">
                <HealingIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-[var(--color-on-surface)] mb-1.5"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Struggling New Mothers
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4 flex-1">
                Mothers facing latch pain, sore or cracked nipples, engorgement, baby refusing breast, or
                anxiety about whether baby is getting enough milk.
              </p>
              <ul className="text-[11px] sm:text-xs text-[var(--color-on-surface-variant)] space-y-1.5 pt-2 border-t border-[var(--color-surface-container)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-primary)] font-bold">&#10003;</span> Fast pain relief & healing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-primary)] font-bold">&#10003;</span> Latch mechanics step-by-step
                </li>
              </ul>
            </div>

            {/* Persona 3 */}
            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border relative overflow-hidden flex flex-col"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 text-[var(--color-tertiary)] flex items-center justify-center mb-3 sm:mb-4">
                <CommunityIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-tertiary)]" />
              </div>
              <h3
                className="text-base sm:text-lg font-bold text-[var(--color-on-surface)] mb-1.5"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Experienced & Improving Mothers
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4 flex-1">
                Mothers looking to improve their feeding efficiency, master nighttime feeds with ease,
                and create a peaceful, bonded rhythm with their baby.
              </p>
              <ul className="text-[11px] sm:text-xs text-[var(--color-on-surface-variant)] space-y-1.5 pt-2 border-t border-[var(--color-surface-container)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-tertiary)] font-bold">&#10003;</span> Comfortable side-lying holds
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-tertiary)] font-bold">&#10003;</span> Managing gas, colic & reflux
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILED WEBINAR CONTENT / CURRICULUM ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              Curriculum Breakdown
            </span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-on-surface)] leading-snug"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Webinar Content: What You Will Learn
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)]">
              Structured into practical, actionable modules so you walk away with immediate clarity.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Module 1 */}
            <div
              className="p-5 sm:p-6 md:p-7 rounded-2xl border bg-[var(--color-surface-container-lowest)] flex flex-col md:flex-row gap-4 sm:gap-5 items-start"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 text-sm sm:text-base font-bold"
                style={{
                  backgroundColor: "var(--color-secondary-container)",
                  color: "var(--color-primary)",
                }}
              >
                01
              </div>
              <div className="space-y-2 sm:space-y-2.5 flex-1">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-on-surface)]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Latching Issues: Pain Relief & Proper Techniques
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                    Core Module
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  Latching is the foundation of comfortable nursing. When done right, it allows your baby to drink
                  deeply without hurting your nipples.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Solving acute nipple pain & pinching</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Asymmetrical latch correction steps</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>How to unlatch baby safely without trauma</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Checking swallow sounds vs dummy sucking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div
              className="p-5 sm:p-6 md:p-7 rounded-2xl border bg-[var(--color-surface-container-lowest)] flex flex-col md:flex-row gap-4 sm:gap-5 items-start"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 text-sm sm:text-base font-bold"
                style={{
                  backgroundColor: "var(--color-tertiary-container)",
                  color: "var(--color-on-tertiary-container)",
                }}
              >
                02
              </div>
              <div className="space-y-2 sm:space-y-2.5 flex-1">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-on-surface)]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Breastfeeding Positions: Comfortable & Effective
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Ergonomics
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  How you hold your baby directly dictates how well they latch. Explore multiple holds tailored
                  for C-section recovery, large or small breasts, and sleepy babies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-tertiary)] shrink-0" />
                    <span>Cross-Cradle & Classic Cradle Hold</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-tertiary)] shrink-0" />
                    <span>Football (Clutch) Hold for C-Section relief</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-tertiary)] shrink-0" />
                    <span>Side-Lying technique for safe night feeds</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-tertiary)] shrink-0" />
                    <span>Laid-Back Biological Nursing posture</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div
              className="p-5 sm:p-6 md:p-7 rounded-2xl border bg-[var(--color-surface-container-lowest)] flex flex-col md:flex-row gap-4 sm:gap-5 items-start"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 text-sm sm:text-base font-bold"
                style={{
                  backgroundColor: "var(--color-secondary-container)",
                  color: "var(--color-primary)",
                }}
              >
                03
              </div>
              <div className="space-y-2 sm:space-y-2.5 flex-1">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-on-surface)]"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Early Feeding Issues: Colic, Fussiness & Milk Supply
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800">
                    Troubleshooting
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  Navigate the turbulent first weeks with calm confidence. Understand newborn digestive patterns
                  and manage common maternal breast concerns early.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Relieving gas, reflux, burping & colic</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Managing breast engorgement & clogged ducts</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Handling cluster feeding & growth spurts</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-on-surface)]">
                    <CheckIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    <span>Reliable wet-diaper checks for milk adequacy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY TAKEAWAYS: WHAT YOU GET ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-container-low)]">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              Attendee Benefits
            </span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-on-surface)] leading-snug"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Webinar Takeaways
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)]">
              Everything included when you reserve your seat today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border text-center space-y-2.5 sm:space-y-3"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-pink-100 text-[var(--color-primary)] flex items-center justify-center">
                <StethoscopeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[var(--color-on-surface)]">
                Expert Clinical Guidance
              </h4>
              <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                Step-by-step guidance on breastfeeding techniques directly from an Advanced Certified Lactation Professional.
              </p>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border text-center space-y-2.5 sm:space-y-3"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-teal-100 text-[var(--color-tertiary)] flex items-center justify-center">
                <LightbulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-tertiary)]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[var(--color-on-surface)]">
                Practical Actionable Tips
              </h4>
              <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                Real-world solutions to overcome painful latch, fatigue, engorgement, and fussy feeding episodes.
              </p>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border text-center space-y-2.5 sm:space-y-3"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-pink-100 text-[var(--color-primary)] flex items-center justify-center">
                <VideoCamIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-primary)]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[var(--color-on-surface)]">
                Lifetime Recording Access
              </h4>
              <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                Revisit the webinar recording whenever you need a refresher as your baby grows and feeding needs evolve.
              </p>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface-container-lowest)] border text-center space-y-2.5 sm:space-y-3"
              style={{ borderColor: "var(--color-surface-variant)" }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-teal-100 text-[var(--color-tertiary)] flex items-center justify-center">
                <CommunityIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-tertiary)]" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[var(--color-on-surface)]">
                Supportive Community
              </h4>
              <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">
                Connect with a loving, judgment-free community of mothers walking the same journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT & PRICING BOX (Compact layout: fits in one scroll on laptop & mobile) ── */}
      <section id="register" className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none -z-10"
          style={{
            background: "radial-gradient(ellipse at center, var(--color-primary-container) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 border-2 relative overflow-hidden shadow-xl"
            style={{
              backgroundColor: "var(--color-surface-container-lowest)",
              borderColor: "var(--color-primary)",
            }}
          >
            {/* Top Ribbon */}
            <div
              className="absolute top-0 left-0 right-0 py-1 px-3 text-[10px] sm:text-xs font-extrabold uppercase tracking-tight sm:tracking-wider text-white text-center"
              style={{ background: "linear-gradient(90deg, #ba0e56 0%, #e33672 100%)" }}
            >
              🔥 95% OFF &bull; LIMITED SEATS AVAILABLE &bull; HURRY!
            </div>

            <div className="mt-3 sm:mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-7 items-center">
              {/* Left Column: Heading, Price & CTA */}
              <div className="md:col-span-7 space-y-2.5 sm:space-y-3 text-center md:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-pink-100 text-[var(--color-primary)]">
                  Special Registration Offer
                </span>

                {/* Reduced font size for laptop and mobile */}
                <h2
                  className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-[var(--color-on-surface)] leading-snug"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Invest in a Peaceful, Confident Feeding Journey
                </h2>

                <p className="text-xs sm:text-xs md:text-sm text-[var(--color-on-surface-variant)] leading-relaxed max-w-lg mx-auto md:mx-0">
                  Secure your spot with Dr. Varshika.S and take the first step towards a happy, pain-free breastfeeding journey.
                </p>

                {/* Price Tag */}
                <div className="py-0.5">
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-2.5">
                    <span className="text-gray-400 text-sm sm:text-base line-through">₹1,800</span>
                    <span
                      className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold"
                      style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}
                    >
                      ₹99
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      SAVE ₹1,701 (95% OFF)
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] mt-0.5 font-medium">
                    Single one-time registration &bull; Includes lifetime recording access
                  </p>
                </div>

                {/* Register Button */}
                <div className="pt-0.5">
                  <a
                    href={PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-extrabold text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, var(--color-primary) 0%, #e33672 100%)",
                      boxShadow: "0 8px 20px rgba(186, 14, 86, 0.3)",
                    }}
                  >
                    <span>Register Now for ₹99</span>
                    <ArrowForwardIcon className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] flex-wrap pt-0.5">
                  <span className="flex items-center gap-1">
                    <LockIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    Secured by Cashfree Payments
                  </span>
                  <span className="flex items-center gap-1">
                    <BoltIcon className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
                    Instant Confirmation
                  </span>
                </div>
              </div>

              {/* Right Column: Ticket Inclusions Checklist */}
              <div className="md:col-span-5">
                <div
                  className="p-3.5 sm:p-4 rounded-xl border text-left space-y-2"
                  style={{
                    backgroundColor: "var(--color-surface-container-low)",
                    borderColor: "var(--color-surface-variant)",
                  }}
                >
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    Everything Included in Your Ticket:
                  </p>

                  <div className="space-y-1.5 text-xs text-[var(--color-on-surface)]">
                    <div className="flex items-start gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>90-Min Live Masterclass with Dr. Varshika.S</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>Interactive Live Q&amp;A for Personal Questions</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>Lifetime Access to Full HD Video Recording</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>Latching &amp; Ergonomic Positions Reference Notes</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckIcon className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                      <span>Access to Motherly Supportive Community of Mothers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-container-low)]">
        <div className="max-w-4xl mx-auto space-y-7 sm:space-y-9">
          <div className="text-center space-y-2 sm:space-y-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-secondary-container)",
                color: "var(--color-on-secondary-container)",
              }}
            >
              Got Questions?
            </span>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-on-surface)] leading-snug"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)]">
              Everything you need to know about the webinar.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-sm border transition-all duration-200 overflow-hidden bg-[var(--color-surface-container-lowest)]"
                  style={{
                    borderColor: isOpen ? "var(--color-primary)" : "var(--color-surface-variant)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm md:text-base text-[var(--color-on-surface)] cursor-pointer"
                    style={{ fontFamily: "var(--font-headline)" }}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className="shrink-0 transition-transform duration-200 text-[var(--color-primary)]"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[var(--color-on-surface-variant)] leading-relaxed border-t border-[var(--color-surface-container)]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT & ASSISTANCE SECTION ── */}
      <section className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-surface-variant)]">
        <div className="max-w-5xl mx-auto">
          <div
            className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl text-center space-y-4 sm:space-y-5"
            style={{
              backgroundColor: "var(--color-surface-container-low)",
            }}
          >
            <div className="space-y-1.5 sm:space-y-2">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-on-surface)]"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Need Help with Registration?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-on-surface-variant)] max-w-xl mx-auto">
                Have questions or need assistance completing your payment? Reach out directly to our team anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 pt-1 sm:pt-2">
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-surface-container-lowest)] border text-[var(--color-on-surface)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shadow-xs"
                style={{ borderColor: "var(--color-surface-variant)" }}
              >
                <PhoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary)]" />
                <span>{CONTACT_PHONE}</span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-surface-container-lowest)] border text-[var(--color-on-surface)] hover:text-green-600 hover:border-green-600 transition-all shadow-xs"
                style={{ borderColor: "var(--color-surface-variant)" }}
              >
                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-surface-container-lowest)] border text-[var(--color-on-surface)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shadow-xs"
                style={{ borderColor: "var(--color-surface-variant)" }}
              >
                <MailIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary)]" />
                <span>{CONTACT_EMAIL}</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-surface-container-lowest)] border text-[var(--color-on-surface)] hover:text-pink-600 hover:border-pink-600 transition-all shadow-xs"
                style={{ borderColor: "var(--color-surface-variant)" }}
              >
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600" />
                <span>@mothrly on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY BOTTOM BAR (Optimized for Mobile & Desktop) ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed bottom-0 left-0 right-0 z-40 py-2.5 px-3 sm:py-3 sm:px-4 bg-[var(--color-surface-container-lowest)] border-t shadow-2xl backdrop-blur-md bg-white/95"
            style={{ borderColor: "var(--color-surface-variant)" }}
          >
            {/* Added pr-16 on mobile so floating chat widget never clashes with Register CTA */}
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5 pr-14 sm:pr-24">
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                <span className="text-[10px] sm:text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider font-bold leading-tight">
                  22nd Nov &bull; 11 AM
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-xl font-extrabold text-[var(--color-primary)]">₹99</span>
                  <span className="text-xs line-through text-gray-400">₹1,800</span>
                </div>
              </div>

              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-white shadow-md active:scale-95 transition-all shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, #e33672 100%)",
                }}
              >
                <span>Register Now</span>
                <ArrowForwardIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
