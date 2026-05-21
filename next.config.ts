import type { NextConfig } from "next";
import { BLOG_SEO } from "./src/data/blog-seo";

/** Legacy WordPress root URLs → /blogs/{slug} (with and without trailing slash) */
const legacyBlogRedirects = Object.keys(BLOG_SEO).flatMap((slug) => [
  {
    source: `/${slug}`,
    destination: `/blogs/${slug}`,
    permanent: true as const,
  },
  {
    source: `/${slug}/`,
    destination: `/blogs/${slug}`,
    permanent: true as const,
  },
  {
    source: `/blogs/${slug}/`,
    destination: `/blogs/${slug}`,
    permanent: true as const,
  },
]);

/** Legacy duplicate app routes → canonical /services paths */
const ourServices1Redirects = [
  { source: "/our-services1/doulas", destination: "/services/doulas", permanent: true as const },
  {
    source: "/our-services1/lactation-consultants",
    destination: "/services/lactation-consultants",
    permanent: true as const,
  },
  {
    source: "/our-services1/nanny-services",
    destination: "/services/nanny-services",
    permanent: true as const,
  },
  {
    source: "/our-services1/gynecology-consultation",
    destination: "/services/gynecologist-consultation",
    permanent: true as const,
  },
  {
    source: "/our-services1/postnatal-recovery-care",
    destination: "/services/postnatal-recovery-care",
    permanent: true as const,
  },
  {
    source: "/our-services1/postnatal-recovery-care/physiotherapy",
    destination: "/services/postnatal-recovery-care/physiotherapy",
    permanent: true as const,
  },
] as const;

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
        destination: "/services/lactation-consultants",
        permanent: true,
      },
      {
        source: "/our-services/doulas",
        destination: "/services/doulas",
        permanent: true,
      },
      {
        source: "/our-services/nanny-services",
        destination: "/services/nanny-services",
        permanent: true,
      },
      {
        source: "/our-services/nannies-postnatal-care",
        destination: "/services/nanny-services",
        permanent: true,
      },
      {
        source: "/our-services/gynecology-consultation",
        destination: "/services/gynecologist-consultation",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-recovery-care",
        destination: "/services/postnatal-recovery-care",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-Recovery-care/physiotherapy",
        destination: "/services/postnatal-recovery-care/physiotherapy",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-Recovery-care/physiotherapy/:path*",
        destination: "/services/postnatal-recovery-care/physiotherapy",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-Recovery-care",
        destination: "/services/postnatal-recovery-care",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-Recovery-care/:path*",
        destination: "/services/postnatal-recovery-care",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-recovery-care/physiotherapy",
        destination: "/services/postnatal-recovery-care/physiotherapy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions/",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/services/lactation",
        destination: "/services/lactation-consultants",
        permanent: true,
      },
      {
        source: "/services/postnatal",
        destination: "/services/postnatal-recovery-care",
        permanent: true,
      },
      {
        source: "/services/nannies",
        destination: "/services/nanny-services",
        permanent: true,
      },
      {
        source: "/services/gynecologist",
        destination: "/services/gynecologist-consultation",
        permanent: true,
      },
      {
        source: "/services/gynaecology",
        destination: "/services/gynecologist-consultation",
        permanent: true,
      },
      {
        source: "/services/gynecology-consultation",
        destination: "/services/gynecologist-consultation",
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
        source: "/terms-and-conditions-motherly",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/privacy-policy-motherly",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/refund-policy-motherly",
        destination: "/refund-and-cancellation-policies",
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
      ...ourServices1Redirects,
      ...legacyBlogRedirects,
    ];
  },
};

export default nextConfig;
