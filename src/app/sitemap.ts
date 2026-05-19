import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mothrly.com";
  const pages = [
    { url: "/",                                               priority: 1.0,  changeFrequency: "weekly"  },
    { url: "/about",                                          priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services",                                       priority: 0.9,  changeFrequency: "weekly"  },
    { url: "/our-services/doulas",                            priority: 0.85, changeFrequency: "monthly" },
    { url: "/our-services/gynecology-consultation",           priority: 0.85, changeFrequency: "monthly" },
    { url: "/our-services/lactation-consultants",             priority: 0.85, changeFrequency: "monthly" },
    { url: "/our-services/nanny-services",                    priority: 0.8,  changeFrequency: "monthly" },
    { url: "/services/pediatrician",                          priority: 0.8,  changeFrequency: "monthly" },
    { url: "/our-services/postnatal-recovery-care",           priority: 0.8,  changeFrequency: "monthly" },
    { url: "/our-services/postnatal-recovery-care/physiotherapy", priority: 0.8, changeFrequency: "monthly" },
    { url: "/services/yoga",                                  priority: 0.75, changeFrequency: "monthly" },
    { url: "/doctors",                                        priority: 0.75, changeFrequency: "monthly" },
    { url: "/investors",                                      priority: 0.75, changeFrequency: "monthly" },
    { url: "/blogs",                                          priority: 0.7,  changeFrequency: "weekly"  },
    { url: "/contact-us",                                     priority: 0.7,  changeFrequency: "monthly" },
  ] as const;

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
