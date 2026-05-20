import type { NextConfig } from "next";
import { BLOG_SEO } from "./src/data/blog-seo";

/** Legacy WordPress root URLs → /blogs/{slug} */
const legacyBlogRedirects = Object.keys(BLOG_SEO).map((slug) => ({
  source: `/${slug}`,
  destination: `/blogs/${slug}`,
  permanent: true as const,
}));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        source: "/our-services/lactation-consultants",
        destination: "/services/lactation",
        permanent: true,
      },
      {
        source: "/our-services/doulas",
        destination: "/services/doulas",
        permanent: true,
      },
      {
        source: "/our-services/nannies-postnatal-care",
        destination: "/services/postnatal",
        permanent: true,
      },
      {
        source: "/our-services/gynecology-consultation",
        destination: "/services/gynecologist",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/nutrition",
        destination: "/services/pediatrician",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-recovery-care/phsiotherapy",
        destination: "/our-services/postnatal-recovery-care/physiotherapy",
        permanent: true,
      },
      ...legacyBlogRedirects,
    ];
  },
};

export default nextConfig;
