/** Official Motherly social profiles — single source for footer, contact, and schema. */
export const SOCIAL_LINKS = [
  {
    id: "youtube",
    href: "https://www.youtube.com/@Mothrly",
    label: "YouTube",
    hoverColor: "#FF0000",
  },
  {
    id: "x",
    href: "https://x.com/mothrly_com",
    label: "X",
    hoverColor: "#000000",
  },
  {
    id: "pinterest",
    href: "https://in.pinterest.com/mothrly/",
    label: "Pinterest",
    hoverColor: "#E60023",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/mothrly",
    label: "Instagram",
    hoverColor: "#E1306C",
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/mothrly/",
    label: "Facebook",
    hoverColor: "#1877F2",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/mothrly/",
    label: "LinkedIn",
    hoverColor: "#0A66C2",
  },
] as const;

export const SOCIAL_PROFILE_URLS = SOCIAL_LINKS.map((link) => link.href);
