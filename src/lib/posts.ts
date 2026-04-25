// ─────────────────────────────────────────────
//  HOW TO ADD A NEW BLOG POST
//  1. Add an object to the `posts` array below.
//  2. Save the file — the blogs page updates automatically.
//
//  Tag color options (pick one pair):
//    Prenatal / Wellness  → tagBg: "primary",  tagColor: "on-primary"
//    Newborn Care         → tagBg: "tertiary",  tagColor: "on-tertiary"
//    Postpartum           → tagBg: "secondary", tagColor: "on-secondary"
// ─────────────────────────────────────────────

export type TagTheme = "primary" | "secondary" | "tertiary";

const tagStyles: Record<TagTheme, { tagBg: string; tagColor: string }> = {
  primary: {
    tagBg: "var(--color-primary-container)",
    tagColor: "var(--color-on-primary-container)",
  },
  secondary: {
    tagBg: "var(--color-secondary-container)",
    tagColor: "var(--color-on-secondary-container)",
  },
  tertiary: {
    tagBg: "var(--color-tertiary-container)",
    tagColor: "var(--color-on-tertiary-container)",
  },
};

export interface BlogPost {
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
}

function post(
  tag: string,
  theme: TagTheme,
  title: string,
  excerpt: string,
  image: string,
  date: string,
  readTime: string
): BlogPost {
  return { tag: tag.toUpperCase(), ...tagStyles[theme], title, excerpt, image, date, readTime };
}

// ─────────────────────────────────────────────
//  FEATURED POST (shown as the large hero card)
// ─────────────────────────────────────────────
export interface FeaturedPost {
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
}

export const featuredPost: FeaturedPost = {
  tag: "Featured Wellness",
  title: "The Art of Mindful Motherhood: Finding Calm in the Chaos",
  excerpt:
    "Practical grounding techniques for busy mothers to maintain emotional balance during the first year of parenthood.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDRiWYdtWqwxS5N9OOT3pSNaKA0rIfD9nI0jZOx_VeXfj2ysiUJbF5WLYWHK5YsP6xk3wkthekovqt7_WenoYqDhwsxyRU4iLv9GX14uwu80ZXiee55EzDP3bLHx5Y2Xr2bNxqO06INlikfWjm_d07SK0K6rAoxmkagmBtPMvb68WwsOoo0lOLmXUj1i2FUvOXWuxXCVXNp18HU-70x5njcmjgL8YpFLW800MAajWobk0LeaV6FQtYqsoJgCYdfMm2jRX3p0GYWXqRh",
  author: "Dr. Sarah Mitchell",
  authorRole: "Clinical Psychologist",
};

// ─────────────────────────────────────────────
//  GRID POSTS — add new posts here
// ─────────────────────────────────────────────
export const posts: BlogPost[] = [
  post(
    "Newborn Care",
    "tertiary",
    "Safe Sleep Habits: A Comprehensive Guide for New Parents",
    "Navigating the complexities of sleep schedules and safety standards to ensure both you and your baby rest easy.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDNTtPSRu7xI-HyHEPfj57Q3Tmk33Aez_4LudaMcey1vuCI19sXdI2_LkFw5MzhxGPMrKVpiUUca86DcyVt6S36uKCiC1G1h1hSZhAyCG9y4Z0IvRMw4Dg3QcrX6yCVj5AU4KMlLxy0fdhuUVEJEvHs_8R7Ns-i6r7TwEsAMXCzTXfzcsMmtHMcnngxCwMX-d8MTu7Nu4OESIlempuOIGMJ-xuAF2iA7wq2UHVUFGAi-QWRf-i9n16oiwYOfTw344ahxQ0mnSMwV6aP",
    "June 12, 2024",
    "6 min read"
  ),
  post(
    "Prenatal",
    "secondary",
    "Optimal Nutrition: Fueling Your Body and Your Baby",
    "Essential vitamins and nutrients you need during each trimester, backed by nutritional science and maternal health experts.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuClZaALx_6qlclgPo3w8Q0GjnhndDIxY3vWRgHKgIL3v4CBtriPX0rT5QI9JKjK5jVFoHgbwqP6c4Djb-hCa6FR0qycHrN8HxXvyALxV4QxNBfsHhtwxuXOOfKEExFpix8zkBL4QRSZCyYLtg1Z-Mp80oXZsbU-lKCiQleKagUQgJTNTr1aj1q8FUlljrEW7RqCEfshpxQlfJeiJRidUaakutpZX7ljePEvSXIjhJkrhTdxLjG2-wY2Lg2qasPeVkVPnuNlGfd_2FcJ",
    "May 28, 2024",
    "8 min read"
  ),
  post(
    "Postpartum",
    "primary",
    "The Fourth Trimester: What to Honestly Expect",
    "A candid look at the physical and emotional changes during the postpartum period and how to seek support.",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAwVVOhuccbOlVly0xr5VT5RlJcZsaLZa81RCGsguOtupUFaQwB-glxXPfOl176YKo8OiCLOglqC-owL9mSlyK_5Fqt2IOzU9kl1ClVXf0FLRLaH9g-c7FEVRE0RTXm-eUdXiRIYHBY-BnO_l8EZW3M2fBU7Xvrcyiqas2hb0aysn2ARuwuQzh0UOTeUVFx2nJPDQYyb_z0KgsYI5CpLFTlX4T9SSwEn-rXsQYuXBQYOfg33eypHBzXPhmZGsjMTNpwWSiHKjEGO",
    "May 15, 2024",
    "10 min read"
  ),

  // ── ADD NEW POSTS BELOW THIS LINE ──────────
  // Example:
  // post(
  //   "Wellness",          ← label shown on the card
  //   "secondary",         ← color theme: "primary" | "secondary" | "tertiary"
  //   "Your Post Title",
  //   "A short excerpt that appears under the title on the card.",
  //   "/your-image.jpg",   ← put image in /public folder, then use "/filename.jpg"
  //   "July 1, 2025",
  //   "5 min read"
  // ),
];
