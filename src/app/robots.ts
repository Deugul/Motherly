import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/blog-admin/"] },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
