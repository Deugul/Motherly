import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mothrly.com";
  const pages = [
    { url: "/",                        priority: 1.0,  changeFrequency: "weekly"  },
    { url: "/about",                   priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services",                priority: 0.9,  changeFrequency: "weekly"  },
    { url: "/services/doulas",         priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/gynaecology",    priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/lactation",      priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/nannies",        priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services/nutrition",      priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services/postnatal",      priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services/yoga",           priority: 0.75, changeFrequency: "monthly" },
    { url: "/doctors",                 priority: 0.75, changeFrequency: "monthly" },
    { url: "/blogs",                   priority: 0.7,  changeFrequency: "weekly"  },
    { url: "/contact",                 priority: 0.7,  changeFrequency: "monthly" },
  ] as const;

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
