import type { NextConfig } from "next";

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
        source: "/services/lactation",
        destination: "https://mothrly.com/our-services/lactation-consultants/",
        permanent: true,
      },
      {
        source: "/services/doulas",
        destination: "https://mothrly.com/our-services/doulas/",
        permanent: true,
      },
      {
        source: "/services/postnatal",
        destination: "https://mothrly.com/our-services/postnatal-recovery-care/",
        permanent: true,
      },
      {
        source: "/services/gynecologist",
        destination: "https://mothrly.com/our-services/gynecology-consultation/",
        permanent: true,
      },
      {
        source: "/services/nutrition",
        destination: "/services/pediatrician",
        permanent: true,
      },
      {
        source: "/our-services/nannies-postnatal-care",
        destination: "/our-services/nanny-services",
        permanent: true,
      },
      {
        source: "/our-services/postnatal-recovery-care/phsiotherapy",
        destination: "/our-services/postnatal-recovery-care/physiotherapy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
