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
  content?: string;
  link?: string;
  slug?: string;
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
  link?: string;
  slug?: string;
}

export const featuredPost: FeaturedPost | null = null;

// ─────────────────────────────────────────────
//  GRID POSTS — add new posts here
// ─────────────────────────────────────────────
export const posts: BlogPost[] = [
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
