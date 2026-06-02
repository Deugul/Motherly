import type { Metadata } from "next";
import { ensureCanonicalOrigin } from "../lib/site-url";

export type KeywordLink = { label: string; url: string };

export type ServiceSeoEntry = {
  /** App route path, e.g. `/services/doulas` */
  path: string;
  h1: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  keywordLinks: KeywordLink[];
  howToSchema?: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
};

const SERVICE_PATH_REWRITES: [RegExp, string][] = [
  [/\/our-services\/postnatal-Recovery-care/gi, "/services/postnatal-recovery-care"],
  [/\/our-services\/postnatal-recovery-care/gi, "/services/postnatal-recovery-care"],
  [/\/our-services\/doulas/gi, "/services/doulas"],
  [/\/our-services\/lactation-consultants/gi, "/services/lactation-consultants"],
  [/\/our-services\/nanny-services/gi, "/services/nanny-services"],
  [/\/our-services\/gynecology-consultation/gi, "/services/gynecologist-consultation"],
  // (?!-) avoids matching already-canonical paths (e.g. gynecologist-consultation → …-consultation-consultation)
  [/\/services\/lactation(?!-)/gi, "/services/lactation-consultants"],
  [/\/services\/postnatal(?!-)/gi, "/services/postnatal-recovery-care"],
  [/\/services\/nannies(?!-)/gi, "/services/nanny-services"],
  [/\/services\/gynecologist(?!-)/gi, "/services/gynecologist-consultation"],
  [/\/services\/gynaecology(?!-)/gi, "/services/gynecologist-consultation"],
  [/\/services\/gynecology-consultation/gi, "/services/gynecologist-consultation"],
  [/\/services\/nutrition\b/gi, "/services/pediatrician"],
];

/** Normalize legacy /our-services and old /services paths to canonical SEO URLs. */
export function normalizeServiceSeoUrl(url: string): string {
  let normalized = ensureCanonicalOrigin(url);
  for (const [pattern, replacement] of SERVICE_PATH_REWRITES) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized;
}

export function buildServiceMetadata(entry: ServiceSeoEntry): Metadata {
  const canonical = normalizeServiceSeoUrl(entry.canonical);
  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    keywords: entry.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Motherly",
      title: entry.metaTitle,
      description: entry.metaDescription,
      url: canonical,
    },
  };
}

export function getServiceSeoByPath(path: string): ServiceSeoEntry | undefined {
  return Object.values(SERVICE_SEO).find((entry) => entry.path === path);
}

export const SERVICE_SEO = {
  doulas: {
    path: "/services/doulas",
    h1: "Best Doula Services in Chennai",
    canonical: "https://www.mothrly.com/services/doulas",
    metaTitle: "Hire a Verified Doula in Chennai | Motherly",
    metaDescription:
      "Find and book verified birth doulas in Chennai through Motherly. Expert emotional and physical birth support for expecting Indian mothers — home visits available.",
    keywords: [
      "hire doula India",
      "birth doula India",
      "doula service Chennai",
      "book doula India",
      "birth support doula",
    ],
    keywordLinks: [
      { label: "doula vs midwife", url: "https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "postpartum care Chennai", url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Hire a Doula in India Through Motherly",
      description: "Steps to find and book a verified birth doula for your pregnancy and delivery.",
      step: [
        { "@type": "HowToStep", name: "Understand what a doula does", text: "A doula provides continuous emotional, informational, and physical support before, during, and after birth — complementing your medical team." },
        { "@type": "HowToStep", name: "Book early", text: "Connect with a doula in your second trimester — verified doulas book up quickly, especially in Chennai." },
        { "@type": "HowToStep", name: "Browse Motherly profiles", text: "Use the Motherly app to view verified doula profiles, experience, and reviews in your city." },
        { "@type": "HowToStep", name: "Schedule a meet & greet", text: "Meet your shortlisted doulas virtually or in person before your third trimester to confirm fit." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What does a birth doula do?", acceptedAnswer: { "@type": "Answer", text: "A birth doula provides continuous non-medical support during labour — breathing techniques, positioning, emotional reassurance, and communication support with the medical team." } },
        { "@type": "Question", name: "Do I need a doula if I have a good doctor?", acceptedAnswer: { "@type": "Answer", text: "A doula complements your doctor and hospital team. Research shows doulas reduce caesarean rates, shorten labour duration, and improve birth satisfaction." } },
        { "@type": "Question", name: "Are doulas available in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly has a network of verified, trained doulas available for home visits and hospital accompaniment across Chennai." } },
        { "@type": "Question", name: "How much does a doula cost in India?", acceptedAnswer: { "@type": "Answer", text: "Doula fees vary based on experience and services. Browse transparent pricing on the Motherly app to find a doula that fits your budget." } },
      ],
    },
  },
  postnatalRecoveryCare: {
    path: "/services/postnatal-recovery-care",
    h1: "Postnatal Recovery Care at Home in Chennai",
    canonical: "https://www.mothrly.com/services/postnatal-recovery-care",
    metaTitle: "Postnatal Recovery Care at Home in Chennai | Motherly",
    metaDescription:
      "Book verified postnatal recovery care at home in Chennai with Motherly. Expert support for Indian new mothers — massage, nutrition, breastfeeding help, and emotional care.",
    keywords: [
      "postnatal recovery care India",
      "postpartum care at home",
      "postnatal care service Chennai",
      "postnatal massage India",
      "postpartum home care",
    ],
    keywordLinks: [
      { label: "postpartum belly", url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
      { label: "postpartum care Chennai", url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "increase breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "doulas", url: "https://www.mothrly.com/services/doulas" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Access Postnatal Recovery Care Through Motherly",
      description: "Steps to book at-home postnatal recovery support in India.",
      step: [
        { "@type": "HowToStep", name: "Plan your postnatal care in the third trimester", text: "Arrange postnatal care before your due date — having support ready from day 1 of discharge is ideal." },
        { "@type": "HowToStep", name: "Choose your care package", text: "Select from postnatal massage, nutrition guidance, breastfeeding support, emotional care, or a combined package." },
        { "@type": "HowToStep", name: "Book through Motherly", text: "Use the Motherly app to browse verified postnatal care professionals and book home visits in your city." },
        { "@type": "HowToStep", name: "Start care from day 3–5", text: "Postnatal massage and care can begin from day 3–5 after a normal delivery, or when medically cleared after a C-section." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is included in postnatal recovery care?", acceptedAnswer: { "@type": "Answer", text: "Postnatal recovery care includes oil massage, abdominal binding (patt bandhi), dietary guidance, breastfeeding support, emotional wellbeing check-ins, and newborn care assistance." } },
        { "@type": "Question", name: "When can I start postnatal massage after delivery?", acceptedAnswer: { "@type": "Answer", text: "Postnatal massage can typically begin from day 3–5 after a vaginal delivery. After a C-section, massage is usually started after 4–6 weeks or with doctor clearance." } },
        { "@type": "Question", name: "Is postnatal care the same as jaapa?", acceptedAnswer: { "@type": "Answer", text: "Jaapa is the traditional South Indian postnatal confinement practice. Motherly's postnatal care integrates traditional jaapa elements with modern evidence-based recovery support." } },
        { "@type": "Question", name: "Does Motherly offer postnatal care in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly has verified postnatal care professionals available for home visits across Chennai. Book through the Motherly app." } },
      ],
    },
  },
  lactationConsultants: {
    path: "/services/lactation-consultants",
    h1: "Lactation Consultant in Chennai",
    canonical: "https://www.mothrly.com/services/lactation-consultants",
    metaTitle: "Book a Lactation Consultant in Chennai | Motherly",
    metaDescription:
      "Find and book certified lactation consultants in Chennai through Motherly. Get expert breastfeeding help at home — latch issues, low supply, and more solved.",
    keywords: [
      "lactation consultant India",
      "book lactation consultant",
      "breastfeeding consultant India",
      "IBCLC India",
      "lactation support home visit",
    ],
    keywordLinks: [
      { label: "why every new mother needs a lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "breast milk not coming", url: "https://www.mothrly.com/blogs/why-is-my-breast-milk-not-coming-causes-and-easy-solutions" },
      { label: "increase breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book a Lactation Consultant Through Motherly",
      description: "Steps to find and work with a certified lactation consultant in India.",
      step: [
        { "@type": "HowToStep", name: "Identify your breastfeeding challenge", text: "Common reasons to see a lactation consultant: latch pain, low supply, engorgement, mastitis, baby not gaining weight, or returning to work." },
        { "@type": "HowToStep", name: "Book early", text: "Ideally schedule a lactation consultation for day 2–3 after delivery, before milk fully comes in." },
        { "@type": "HowToStep", name: "Browse Motherly verified consultants", text: "Use the Motherly app to find IBCLC-certified or trained lactation consultants available for home visits in your city." },
        { "@type": "HowToStep", name: "Follow the personalised plan", text: "Implement positioning adjustments, feeding schedules, and dietary recommendations from your consultant." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What does a lactation consultant do?", acceptedAnswer: { "@type": "Answer", text: "A lactation consultant assesses latch quality, milk supply, feeding frequency, and baby weight gain, then provides a personalised breastfeeding support plan." } },
        { "@type": "Question", name: "When should I call a lactation consultant?", acceptedAnswer: { "@type": "Answer", text: "Call a lactation consultant if you have persistent nipple pain, low milk supply, a baby struggling to latch, engorgement, mastitis, or a baby not regaining birth weight by 2 weeks." } },
        { "@type": "Question", name: "Do lactation consultants do home visits in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly's verified lactation consultants offer home visits across Chennai and other major Indian cities, as well as virtual consultations." } },
        { "@type": "Question", name: "Is a lactation consultant different from a nurse?", acceptedAnswer: { "@type": "Answer", text: "Yes. A lactation consultant specialises exclusively in breastfeeding support. IBCLC (International Board Certified Lactation Consultant) is the gold standard credential." } },
      ],
    },
  },
  nannyServices: {
    path: "/services/nanny-services",
    h1: "Nanny Services in Chennai",
    canonical: "https://www.mothrly.com/services/nanny-services",
    metaTitle: "Hire a Verified Postnatal Nanny Services in Chennai | Motherly",
    metaDescription:
      "Find and hire verified postnatal nannies and baby care professionals in Chennai through Motherly. Expert newborn care and mother support — home visits available.",
    keywords: [
      "postnatal nanny India",
      "newborn nanny Chennai",
      "baby care nanny India",
      "hire nanny after delivery",
      "postnatal baby nurse India",
    ],
    keywordLinks: [
      { label: "postpartum care Chennai", url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
      { label: "newborn sleep patterns", url: "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "doulas", url: "https://www.mothrly.com/services/doulas" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Hire a Postnatal Nanny Through Motherly",
      description: "Steps to find and book a verified postnatal nanny for newborn care.",
      step: [
        { "@type": "HowToStep", name: "Decide on nanny vs japa maid", text: "A postnatal nanny is trained in newborn care and safe sleep. A japa maid focuses on traditional postpartum practices. Both can be arranged through Motherly." },
        { "@type": "HowToStep", name: "Book in the third trimester", text: "Good postnatal nannies are in high demand. Book before your due date." },
        { "@type": "HowToStep", name: "Review profiles and experience", text: "Use the Motherly app to browse verified nanny profiles, training, and parent reviews." },
        { "@type": "HowToStep", name: "Schedule a trial or intro session", text: "Meet your shortlisted nanny before delivery to discuss routines, preferences, and newborn care expectations." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What does a postnatal nanny do?", acceptedAnswer: { "@type": "Answer", text: "A postnatal nanny provides trained newborn care — bathing, feeding support, safe sleep guidance, and assisting the mother with recovery — typically for the first 40–90 days after delivery." } },
        { "@type": "Question", name: "How is a postnatal nanny different from a japa maid?", acceptedAnswer: { "@type": "Answer", text: "A postnatal nanny is trained in modern newborn care and infant safety. A japa maid provides traditional postpartum care including massage and dietary preparation." } },
        { "@type": "Question", name: "How much does a postnatal nanny cost in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Costs vary based on duration and experience. Transparent pricing is available through the Motherly app when browsing nanny profiles." } },
        { "@type": "Question", name: "Can I hire a postnatal nanny through Motherly?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly provides verified, background-checked postnatal nannies for home care across Chennai and other Indian cities." } },
      ],
    },
  },
  gynecologistConsultation: {
    path: "/services/gynecologist-consultation",
    h1: "Gynaecology Consultation in Chennai",
    canonical: "https://www.mothrly.com/services/gynecologist-consultation",
    metaTitle: "Book a Gynaecology Consultation in Chennai | Motherly",
    metaDescription:
      "Book verified gynaecology consultations in Chennai through Motherly — prenatal check-ups, postnatal care, and women's health support for Indian mothers at home or online.",
    keywords: [
      "gynaecology consultation India",
      "book gynaecologist online India",
      "prenatal consultation",
      "women's health India",
      "gynaecologist home visit Chennai",
    ],
    keywordLinks: [
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "postpartum belly", url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
      { label: "doulas", url: "https://www.mothrly.com/services/doulas" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book a Gynaecology Consultation Through Motherly",
      description: "Steps to access verified gynaecology consultations in India.",
      step: [
        { "@type": "HowToStep", name: "Identify your need", text: "Whether it is a routine antenatal check-up, postnatal follow-up, or a specific concern like bleeding or pain — Motherly connects you with verified specialists." },
        { "@type": "HowToStep", name: "Choose in-person or virtual", text: "Select a home visit or virtual consultation based on your preference and stage of pregnancy." },
        { "@type": "HowToStep", name: "Book through the Motherly app", text: "Browse verified gynaecologist profiles, read reviews, and book your slot directly on the Motherly app." },
        { "@type": "HowToStep", name: "Prepare your questions", text: "Note symptoms, last period date, medications, and any pregnancy history before your consultation." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Can I book a gynaecologist online in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly offers verified gynaecology consultations virtually or at home across India. Book through the Motherly app in a few steps." } },
        { "@type": "Question", name: "When should I see a gynaecologist during pregnancy?", acceptedAnswer: { "@type": "Answer", text: "Book your first antenatal visit as soon as you confirm your pregnancy — ideally by weeks 8–10. Routine visits are typically every 4 weeks until week 28, then more frequently." } },
        { "@type": "Question", name: "What is a postnatal gynaecology check?", acceptedAnswer: { "@type": "Answer", text: "A postnatal gynaecology check at 6 weeks after delivery assesses uterine recovery, perineal healing, contraception, and emotional wellbeing." } },
        { "@type": "Question", name: "Does Motherly have gynaecologists in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly has verified gynaecologists available for consultations in Chennai — both home visits and virtual appointments." } },
      ],
    },
  },
  pediatrician: {
    path: "/services/pediatrician",
    h1: "Pediatrician Consultation in Chennai",
    canonical: "https://www.mothrly.com/services/pediatrician",
    metaTitle: "Book a Pediatrician Consultation in Chennai | Motherly",
    metaDescription:
      "Find and book verified pediatrician through Motherly for newborn and infant care consultations in Chennai  — home visits and online appointments available.",
    keywords: [
      "paediatrician India",
      "book paediatrician online India",
      "newborn doctor consultation",
      "infant doctor home visit Chennai",
      "baby health check India",
    ],
    keywordLinks: [
      { label: "newborn sleep patterns", url: "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month" },
      { label: "signs baby getting enough breast milk", url: "https://www.mothrly.com/blogs/5-signs-baby-getting-enough-breast-milk" },
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book a Paediatrician Through Motherly",
      description: "Steps to access expert paediatric care for your newborn or infant.",
      step: [
        { "@type": "HowToStep", name: "Identify the right time to consult", text: "Book a paediatrician for newborn check-ups (day 3–5, 2 weeks, 6 weeks), vaccination schedules, feeding concerns, or illness." },
        { "@type": "HowToStep", name: "Choose home visit or online", text: "Home visits are ideal for newborns in the first 2 weeks to avoid clinic exposure. Online consultations suit follow-ups and minor concerns." },
        { "@type": "HowToStep", name: "Book on the Motherly app", text: "Browse verified paediatric profiles on the Motherly app and book the slot that suits you." },
        { "@type": "HowToStep", name: "Prepare a feeding and sleep log", text: "Note your baby's feeding frequency, wet nappies, weight changes, and sleep patterns before the consultation." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "When should I take my newborn to a paediatrician?", acceptedAnswer: { "@type": "Answer", text: "Newborns should see a paediatrician within the first 3–5 days after discharge from hospital, then at 2 weeks, and 6 weeks for routine checks." } },
        { "@type": "Question", name: "Can I get a paediatric home visit in India?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly offers verified paediatric home visits for newborns and infants across Chennai and other Indian cities." } },
        { "@type": "Question", name: "What does a paediatric check-up include for a newborn?", acceptedAnswer: { "@type": "Answer", text: "A newborn paediatric check includes weight monitoring, feeding assessment, jaundice screening, physical examination, and vaccination guidance." } },
        { "@type": "Question", name: "Can I consult a paediatrician online for my baby?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly's verified paediatricians offer virtual consultations for non-emergency concerns, follow-ups, and advice on feeding, sleep, and development." } },
      ],
    },
  },
  yoga: {
    path: "/services/yoga",
    h1: "Prenatal & Postnatal Yoga in Chennai",
    canonical: "https://www.mothrly.com/services/yoga",
    metaTitle: "Prenatal & Postnatal Yoga in Chennai | Motherly",
    metaDescription:
      "Book certified prenatal and postnatal yoga sessions in Chennai through Motherly. Safe, expert-guided yoga for Indian mothers during pregnancy and postpartum recovery.",
    keywords: [
      "prenatal yoga India",
      "postnatal yoga India",
      "pregnancy yoga Chennai",
      "yoga for pregnant women",
      "postpartum yoga sessions India",
    ],
    keywordLinks: [
      { label: "walking during pregnancy", url: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
      { label: "can stress cause miscarriage", url: "https://www.mothrly.com/blogs/can-stress-cause-miscarriage-in-first-trimester" },
      { label: "postpartum belly", url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
      { label: "lose weight while breastfeeding", url: "https://www.mothrly.com/blogs/why-is-it-so-hard-to-lose-weight-while-breastfeeding" },
      { label: "postnatal care", url: "https://www.mothrly.com/services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Start Prenatal or Postnatal Yoga Safely",
      description: "A guide to beginning yoga during pregnancy or postpartum recovery.",
      step: [
        { "@type": "HowToStep", name: "Get medical clearance", text: "Confirm with your gynaecologist that yoga is safe for your specific pregnancy. Most uncomplicated pregnancies can begin from the second trimester." },
        { "@type": "HowToStep", name: "Choose a certified prenatal instructor", text: "Ensure your yoga teacher is certified in prenatal yoga — not all yoga poses are safe during pregnancy." },
        { "@type": "HowToStep", name: "Book through Motherly", text: "Browse certified prenatal and postnatal yoga instructors on the Motherly app for home sessions or virtual classes." },
        { "@type": "HowToStep", name: "Start gentle and progress slowly", text: "Begin with breathing (pranayama), gentle stretching, and pelvic floor work. Add poses progressively with instructor guidance." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is yoga safe during pregnancy?", acceptedAnswer: { "@type": "Answer", text: "Yes, for most women with uncomplicated pregnancies. Prenatal yoga supports flexibility, reduces stress, relieves back pain, and prepares the body for labour. Avoid inversions, hot yoga, and deep twists." } },
        { "@type": "Question", name: "When can I start postnatal yoga after delivery?", acceptedAnswer: { "@type": "Answer", text: "Most mothers can begin gentle postnatal yoga from 6–8 weeks after a normal delivery with medical clearance. After a C-section, wait 8–12 weeks or until your doctor advises." } },
        { "@type": "Question", name: "What are the benefits of prenatal yoga?", acceptedAnswer: { "@type": "Answer", text: "Prenatal yoga reduces stress and anxiety, strengthens pelvic floor muscles, improves sleep, relieves back pain and swelling, and prepares the body and mind for labour." } },
        { "@type": "Question", name: "Can Motherly provide yoga at home?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly has certified prenatal and postnatal yoga instructors available for home sessions and virtual classes across Chennai and major Indian cities." } },
      ],
    },
  },
  physiotherapy: {
    path: "/services/postnatal-recovery-care/physiotherapy",
    h1: "Physiotherapy in Chennai",
    canonical: "https://www.mothrly.com/services/postnatal-recovery-care/physiotherapy",
    metaTitle: "Physiotherapy in Chennai | Motherly",
    metaDescription:
      "Book certified postnatal physiotherapy in Chennai. Pelvic floor recovery, diastasis recti, C-section rehab and mother back pain. In-clinic and virtual sessions",
    keywords: [
      "physiotherapy in Chennai",
      "postnatal physiotherapy Chennai",
      "pelvic floor physiotherapy Chennai",
      "diastasis recti treatment Chennai",
      "postpartum rehabilitation Chennai",
    ],
    keywordLinks: [],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Start Postnatal Physiotherapy in Chennai",
      description: "Steps to access certified postnatal physiotherapy through Motherly in Chennai.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Get medical clearance", text: "Confirm with your gynaecologist that physiotherapy is safe to begin. Most mothers can start from 6 weeks after a vaginal delivery or 6 to 8 weeks after a C-section." },
        { "@type": "HowToStep", position: 2, name: "Book your initial assessment on Motherly", text: "Download the Motherly app or visit mothrly.com. Browse verified women's health physiotherapists in Chennai, view their credentials and reviews, and book your first appointment." },
        { "@type": "HowToStep", position: 3, name: "Attend your comprehensive assessment", text: "Your physiotherapist conducts a full assessment covering pelvic floor function, abdominal separation (diastasis recti), posture, C-section scar if applicable, and your specific recovery goals. Sessions are available in-clinic or virtually." },
        { "@type": "HowToStep", position: 4, name: "Follow your personalised rehabilitation programme", text: "Your physiotherapist prescribes a tailored programme including pelvic floor exercises, core reconnection, posture correction, and scar mobilisation as needed. Programmes are updated at every session based on your clinical progress." },
        { "@type": "HowToStep", position: 5, name: "Progress to return-to-exercise phase", text: "Once your foundation and strengthening phases are complete, your physiotherapist guides your safe return to walking, yoga, running, or any physical activity using clinically validated readiness assessments." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is postnatal physiotherapy?", acceptedAnswer: { "@type": "Answer", text: "Postnatal physiotherapy is a specialist rehabilitation programme designed to help mothers recover physically after childbirth. It addresses pelvic floor dysfunction, diastasis recti (abdominal separation), C-section scar tissue, postpartum back and pelvic pain, and guides a safe return to exercise." } },
        { "@type": "Question", name: "When can I start physiotherapy after delivery in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Most mothers can begin a postnatal physiotherapy assessment from 6 weeks after a vaginal delivery with medical clearance. After a C-section, a comprehensive assessment is appropriate from 6 to 8 weeks. C-section scar mobilisation typically begins from 8 to 12 weeks once the wound has fully closed." } },
        { "@type": "Question", name: "Can physiotherapy treat diastasis recti?", acceptedAnswer: { "@type": "Answer", text: "Yes. Physiotherapy is the primary evidence-based treatment for diastasis recti (abdominal muscle separation after pregnancy). Your physiotherapist measures the gap, assesses tissue function, and prescribes a progressive core rehabilitation programme. Common exercises like crunches can worsen the condition and should be avoided without clinical guidance." } },
        { "@type": "Question", name: "Does physiotherapy help with urinary leakage after childbirth?", acceptedAnswer: { "@type": "Answer", text: "Yes. Urinary leakage (stress incontinence) after childbirth is one of the most responsive conditions to pelvic floor physiotherapy. The majority of cases improve significantly with a properly assessed and supervised rehabilitation programme. Not all pelvic floor problems require strengthening — some require releasing — which is why clinical assessment is essential before starting any exercise programme." } },
        { "@type": "Question", name: "Is physiotherapy available after a C-section in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly offers specialist C-section postnatal physiotherapy in Chennai. This includes post-operative recovery guidance, C-section scar mobilisation from 8 to 12 weeks, abdominal rehabilitation adapted to avoid stress on the healing incision, and pelvic floor recovery tailored to C-section delivery." } },
        { "@type": "Question", name: "Is it too late for postnatal physiotherapy if my baby is older?", acceptedAnswer: { "@type": "Answer", text: "It is never too late. Pelvic floor dysfunction, diastasis recti, C-section scar restriction, and postpartum back pain all respond well to physiotherapy even months or years after delivery. Many mothers seek treatment ahead of a second pregnancy to ensure they are in the best physical condition before conceiving again." } },
        { "@type": "Question", name: "How much does physiotherapy cost in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Physiotherapy session fees vary based on consultation type (in-clinic or virtual), session duration, and the physiotherapist's level of experience. Browse transparent, current pricing on each physiotherapist's profile directly through the Motherly app before booking." } },
        { "@type": "Question", name: "Does Motherly offer virtual physiotherapy sessions in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motherly offers both in-clinic and virtual physiotherapy sessions in Chennai. Virtual sessions are ideal for exercise programme guidance, follow-up consultations, posture coaching, and mothers who cannot easily attend a clinic with a newborn. Your physiotherapist observes your movement on video call and provides real-time corrections and programme updates." } },
      ],
    },
  },
  babyCare: {
    path: "/services/baby-care",
    h1: "Baby Care in Chennai",
    canonical: "https://www.mothrly.com/services/baby-care",
    metaTitle: "Baby Care in Chennai | Motherly",
    metaDescription:
      "Need trusted Baby Care in Chennai? Motherly connects you with verified newborn care specialists for in-home bathing, feeding, sleep routines & baby massage support.",
    keywords: [
      "baby care in Chennai",
      "newborn care Chennai",
      "infant care specialist Chennai",
      "baby care specialist Chennai",
      "in-home baby care Chennai",
      "newborn care at home Chennai",
      "baby massage Chennai",
      "overnight baby care Chennai",
      "newborn specialist Chennai",
      "Motherly baby care",
    ],
    keywordLinks: [
      { label: "paediatrician in Chennai", url: "/services/pediatrician" },
      { label: "lactation consultant", url: "/services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book Baby Care Services in Chennai with Motherly",
      description:
        "Book a verified Baby Care specialist in Chennai through Motherly for in-home newborn support including safe bathing, feeding assistance, sleep routine guidance, and traditional baby massage.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Download the Motherly App", text: "Download the Motherly app on Android or iOS and create your account to access verified Baby Care specialists across Chennai." },
        { "@type": "HowToStep", position: 2, name: "Select Baby Care Service", text: "Navigate to the Baby Care section and choose between in-home newborn care or virtual Baby Care consultations based on your baby's age and your family's needs." },
        { "@type": "HowToStep", position: 3, name: "Enter Your Location and Baby's Age", text: "Enter your Chennai neighbourhood and your baby's date of birth so Motherly can match you with specialists experienced in the appropriate stage of newborn or infant care." },
        { "@type": "HowToStep", position: 4, name: "Review Verified Specialist Profiles", text: "Browse background-verified Baby Care specialist profiles, including their training in newborn bathing, feeding support, colic management, and traditional Indian baby massage." },
        { "@type": "HowToStep", position: 5, name: "Book Your Baby Care Package", text: "Select your preferred specialist, choose your care schedule (daily visits, overnight shifts, or virtual sessions), and confirm your booking through the Motherly app." },
        { "@type": "HowToStep", position: 6, name: "Welcome Your Baby Care Specialist", text: "Your Baby Care specialist arrives on the scheduled date and begins a personalised care routine for your newborn covering safe bathing, feeding, sleep, monitoring, and baby massage." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How much does Baby Care cost in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Baby Care pricing at Motherly depends on whether you choose in-home daily care, overnight newborn support, or virtual consultations, and the duration of engagement. Overnight care is priced separately from daytime visits. Please use the Motherly app or contact us for a customised quote based on your baby's age, your location in Chennai, and your family's specific needs." } },
        { "@type": "Question", name: "How is a Motherly Baby Care specialist different from a regular nanny or ayah?", acceptedAnswer: { "@type": "Answer", text: "A regular nanny or domestic ayah is not trained in newborn physiology, safe sleep practices, feeding science, or medical monitoring. Motherly's Baby Care specialists are certified newborn care professionals who can identify early warning signs of illness or developmental concerns that an untrained caregiver would miss, and they know when to escalate to a paediatrician." } },
        { "@type": "Question", name: "Do you offer overnight Baby Care in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Yes. Overnight Baby Care is one of our most requested services, particularly for exhausted mothers in the first few weeks after delivery. A Motherly Baby Care specialist can manage night feeds, settling, and monitoring so you can rest and recover. Overnight shifts are available across Chennai through the Motherly app." } },
        { "@type": "Question", name: "Can Baby Care specialists help with colic and reflux?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our specialists are trained to identify feeding-related causes of colic and apply soothing techniques that calm a colicky baby. For suspected reflux, your specialist will coordinate with Motherly's paediatric network to ensure your baby receives appropriate medical evaluation." } },
        { "@type": "Question", name: "At what age can I use Baby Care services?", acceptedAnswer: { "@type": "Answer", text: "Motherly's Baby Care services are available from birth through the first year of life. Our specialists are experienced with newborns from day one. For babies older than one year, our service transitions into toddler care guidance, which can be discussed during your initial consultation." } },
        { "@type": "Question", name: "Is Baby Care available if I have twins?", acceptedAnswer: { "@type": "Answer", text: "Motherly can arrange specialist support for twin care. Depending on your needs, we may recommend two specialists for round-the-clock coverage or one experienced newborn specialist trained in managing multiple infants. Please contact us to discuss your specific twin care requirements." } },
        { "@type": "Question", name: "Do you provide Baby Care across all areas of Chennai?", acceptedAnswer: { "@type": "Answer", text: "Motherly provides in-home Baby Care services across Chennai including Mylapore, Adyar, Anna Nagar, T. Nagar, Velachery, Nungambakkam, Porur, Sholinganallur, and surrounding areas. Use the Motherly app to confirm availability in your pincode." } },
      ],
    },
  },
  motherCare: {
    path: "/services/mother-care",
    h1: "Mother Care in Chennai",
    canonical: "https://www.mothrly.com/services/mother-care",
    metaTitle: "Mother Care in Chennai | Motherly",
    metaDescription:
      "Looking for postnatal Mother Care in Chennai? Motherly connects you with verified specialists for in-home recovery support, oil massage, nutrition & newborn care.",
    keywords: [
      "mother care in Chennai",
      "postnatal care Chennai",
      "postnatal recovery Chennai",
      "mother care specialist Chennai",
      "in-home postnatal care",
      "post delivery care Chennai",
      "confinement care Chennai",
      "caesarean recovery support Chennai",
      "new mother care Chennai",
      "Motherly postnatal care",
    ],
    keywordLinks: [
      { label: "lactation consultant", url: "/services/lactation-consultants" },
      { label: "postnatal recovery care", url: "/services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Book Mother Care Services in Chennai with Motherly",
      description:
        "Book a verified postnatal Mother Care specialist in Chennai through Motherly for in-home recovery support, nutritional guidance, baby care assistance, and emotional wellbeing after delivery.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Download the Motherly App", text: "Download the Motherly app on Android or iOS and create your account to access verified Mother Care specialists across Chennai." },
        { "@type": "HowToStep", position: 2, name: "Select Mother Care Service", text: "Navigate to the Mother Care section and choose between in-home postnatal care or virtual Mother Care consultations based on your recovery needs." },
        { "@type": "HowToStep", position: 3, name: "Enter Your Location and Due Date", text: "Enter your Chennai neighbourhood and your expected delivery date or discharge date so Motherly can match you with available specialists near you." },
        { "@type": "HowToStep", position: 4, name: "Review Verified Specialist Profiles", text: "Browse background-verified Mother Care specialist profiles, including their training, experience with caesarean or normal delivery recovery, and availability." },
        { "@type": "HowToStep", position: 5, name: "Book Your Mother Care Package", text: "Select your preferred specialist, choose your care duration (daily visits, full confinement period, or virtual sessions), and confirm your booking through the app." },
        { "@type": "HowToStep", position: 6, name: "Begin Your Postnatal Recovery", text: "Your Mother Care specialist arrives on your scheduled start date and begins your personalised postnatal recovery plan covering physical healing, nutrition, breastfeeding support, and emotional wellbeing." },
      ],
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How much does Mother Care cost in Chennai?", acceptedAnswer: { "@type": "Answer", text: "Mother Care pricing at Motherly depends on whether you choose in-home daily care, overnight support, or virtual consultations, and the duration of engagement. In-home care is priced per visit or as a weekly package. Please visit the Motherly app or contact us for a customised quote based on your location in Chennai and your specific postnatal needs." } },
        { "@type": "Question", name: "How is a Mother Care specialist different from a regular maid or helper?", acceptedAnswer: { "@type": "Answer", text: "A regular domestic helper is not trained in postnatal anatomy, wound care, breastfeeding support, or postpartum emotional health. Motherly's Mother Care specialists are certified professionals who provide clinically informed, structured postnatal care, not just household assistance." } },
        { "@type": "Question", name: "Can I book Mother Care for the full 40-day confinement period?", acceptedAnswer: { "@type": "Answer", text: "Yes. The traditional 40-day postnatal confinement period is something Motherly's specialists understand and respect. You can book continuous in-home Mother Care for this entire period, with flexibility to adjust the schedule as your recovery progresses." } },
        { "@type": "Question", name: "Is Mother Care available after caesarean delivery?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Post-caesarean recovery requires more structured support, including wound care, limited mobility assistance, and careful posture guidance. Our specialists are specifically trained for caesarean postnatal care." } },
        { "@type": "Question", name: "Do you provide Mother Care across all areas of Chennai?", acceptedAnswer: { "@type": "Answer", text: "Motherly provides in-home Mother Care across Chennai including Anna Nagar, Adyar, Velachery, T. Nagar, Mylapore, Nungambakkam, Porur, Sholinganallur, Perambur, and surrounding neighbourhoods. Use the Motherly app to confirm availability in your pincode." } },
      ],
    },
  },
} as const satisfies Record<string, ServiceSeoEntry>;
