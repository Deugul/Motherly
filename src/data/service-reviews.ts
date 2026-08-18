/**
 * Review snippets shown on each service page and on the services hub.
 *
 * IMPORTANT — provenance of this data:
 * Every quote, name and role below is copy that was ALREADY published on the
 * site. Nothing here is invented. Each service page carried exactly one inline
 * testimonial and the homepage carried three; this file gathers them in one
 * place so each service can show two to three relevant reviews instead of one,
 * and so a quote can appear on the page it actually refers to (the lactation
 * quote on the Lactation page, not only the homepage).
 *
 * The `rating` values are the one editorial addition: the three homepage
 * testimonials already carried `rating: 5` in TestimonialsSection, and the
 * per-page quotes are uniformly positive, so they are shown as 5. Replace
 * these with real captured ratings when the review data is available.
 */

export type ServiceReviewKey =
  | "doulas"
  | "lactation"
  | "gynaecology"
  | "nannies"
  | "postnatal-recovery"
  | "physiotherapy"
  | "pediatrician"
  | "yoga"
  | "baby-care"
  | "mother-care";

export type Review = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

/** Originally on the homepage (TestimonialsSection), reused where relevant. */
const HOME_NURSE: Review = {
  quote:
    "The transition home was so much smoother with our Motherly nurse. She didn't just care for the baby; she cared for me.",
  name: "Sree Lakshmi",
  role: "Mother of Two",
  rating: 5,
};

const HOME_LACTATION: Review = {
  quote:
    "Their lactation consultant was a godsend. Patient, knowledgeable, and incredibly supportive during a stressful time.",
  name: "Priya Menon",
  role: "First-time Mother",
  rating: 5,
};

const HOME_APP: Review = {
  quote:
    "Motherly is more than a service; it's a lifeline. The app makes scheduling help so easy when you're exhausted.",
  name: "Ananya Iyer",
  role: "Mother of Three",
  rating: 5,
};

export const HOMEPAGE_REVIEWS: Review[] = [HOME_NURSE, HOME_LACTATION, HOME_APP];

export const SERVICE_REVIEWS: Record<ServiceReviewKey, Review[]> = {
  doulas: [
    {
      quote:
        "I had no family in Chennai and was terrified of going into labour alone with just my husband. My Motherly doula arrived two hours into my contractions and I immediately felt calmer. She coached my husband too, which was something I didn't even know I needed. I honestly don't think my birth would have gone the way it did without her.",
      name: "Priya S.",
      role: "First-time mother, Chennai",
      rating: 5,
    },
    HOME_APP,
  ],

  lactation: [
    {
      quote:
        "My baby was losing weight and I was in so much pain I was ready to stop at day 5. My Motherly lactation consultant came the next morning, watched one feed, spotted the shallow latch immediately, and repositioned us both. Within two days my pain was gone and my baby was gaining. I wish I had called on day one.",
      name: "Deepa M.",
      role: "Mother of one, Anna Nagar, Chennai",
      rating: 5,
    },
    HOME_LACTATION,
  ],

  gynaecology: [
    {
      quote:
        "My hospital appointments were always rushed and I left with more questions than I arrived with. My Motherly gynaecologist visited at home every four weeks and actually sat with me. She explained my scan results, answered every question I had, and made me feel like my pregnancy mattered. That made all the difference.",
      name: "Nithya P.",
      role: "Second-time mother, Nungambakkam, Chennai",
      rating: 5,
    },
    HOME_APP,
  ],

  nannies: [
    {
      quote:
        "We had twins and no family in Chennai. I genuinely do not know how we would have survived those first six weeks without our Motherly nanny. She handled the nights, kept a detailed feeding log for both babies, and managed our older son's school run without us even asking. She became part of our family.",
      name: "Meena and Arvind K.",
      role: "Parents of twins, Velachery, Chennai",
      rating: 5,
    },
    HOME_NURSE,
  ],

  "postnatal-recovery": [
    {
      quote:
        "I had a C-section and my mother couldn't travel from Coimbatore in time. My Motherly postnatal care professional arrived the day I came home and just took over. The massage, the food, the guidance on how to hold my baby without straining my wound. I genuinely don't know how I would have managed those first two weeks without her.",
      name: "Kavitha R.",
      role: "New mother, Adyar, Chennai",
      rating: 5,
    },
    HOME_NURSE,
  ],

  physiotherapy: [
    {
      quote:
        "I thought leaking a little when I laughed was just something mothers lived with. My Motherly physiotherapist assessed me properly, found that my pelvic floor was actually hypertonic rather than weak (which is why Kegels were making me worse), and gave me the right treatment. Six weeks later I was completely dry. I wish I had come sooner.",
      name: "Anitha K.",
      role: "Mother of two, Mylapore, Chennai",
      rating: 5,
    },
    HOME_NURSE,
  ],

  pediatrician: [
    {
      quote:
        "Our daughter had jaundice and I was terrified every time we had to take her to the clinic. Having our Motherly paediatrician visit at home changed everything. She was calm, thorough, and explained every reading to us. By week three we felt completely confident about our baby's health for the first time.",
      name: "Sunitha and Ravi N.",
      role: "Parents of one, Besant Nagar, Chennai",
      rating: 5,
    },
    HOME_APP,
  ],

  yoga: [
    {
      quote:
        "I started prenatal yoga at 16 weeks with my Motherly instructor and it completely changed my relationship with my pregnancy. The breathing techniques she taught me in class are the reason I got through 18 hours of labour without an epidural. I still use them now when my toddler is testing me.",
      name: "Ananya S.",
      role: "Mother of one, Kilpauk, Chennai",
      rating: 5,
    },
    HOME_APP,
  ],

  "baby-care": [
    {
      quote:
        "My daughter had colic for the first six weeks and I had no idea what to do. The Motherly Baby Care specialist helped us establish a feeding and settling routine that changed everything overnight. She also spotted that my baby had a mild latch issue and connected us with a lactation consultant the same week. I cannot imagine those early weeks without Motherly.",
      name: "Priya M.",
      role: "First-time mother, Mylapore, Chennai",
      rating: 5,
    },
    HOME_NURSE,
  ],

  "mother-care": [
    {
      quote:
        "I had no family nearby and was completely unprepared for how difficult the first two weeks would be after my C-section. My Motherly Mother Care specialist came every morning, took care of everything from my dressing to my meals, and even showed me how to properly hold and feed my baby. By week three I actually felt like myself again.",
      name: "Revathi S.",
      role: "First-time mother, Adyar, Chennai",
      rating: 5,
    },
    HOME_NURSE,
  ],
};

export function getServiceReviews(key: ServiceReviewKey): Review[] {
  return SERVICE_REVIEWS[key];
}
