import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import ChatWidget from "@/components/ChatWidget";
import FontLoader from "@/components/FontLoader";
import MotionProvider from "@/components/MotionProvider";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import { GTM_ID, META_PIXEL_ID } from "@/lib/analytics-ids";
import { buildHeadSeo } from "@/lib/head-seo";
import { SOCIAL_PROFILE_URLS } from "@/data/social-links";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_TITLE = "Motherly – Chennai's No1 Mother Care & Baby Care Service at Home";
const SITE_DESCRIPTION =
  "Motherly connects Indian mothers with verified lactation consultants in Chennai, doulas, nannies, and postnatal care experts. Book trusted maternal care on the Motherly app.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Motherly",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Motherly birth companion India",
    "maternal care app India",
    "book lactation consultant India",
    "postnatal care app",
    "doula India",
  ],
  metadataBase: new URL("https://www.mothrly.com"),
  ...buildHeadSeo({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonical: "/",
    dcType: "Text.Homepage",
  }),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Motherly — Your Birth Companion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "OtmpGxUNJzvLtBhjMKEES6VbL3cV9j0jWsE5BL8cXrE",
  },
  robots: { index: true, follow: true },
};

const APPLE_APP_ID = "6746041100";

function parseFloatOrDefault(value: string | undefined, fallback: number): number {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseIntOrDefault(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const APP_STORE_RATING_VALUE = parseFloatOrDefault(
  process.env.NEXT_PUBLIC_APP_STORE_RATING_VALUE,
  4.9,
);
const APP_STORE_BEST_RATING = parseFloatOrDefault(
  process.env.NEXT_PUBLIC_APP_STORE_BEST_RATING,
  5,
);
const APP_STORE_WORST_RATING = parseFloatOrDefault(
  process.env.NEXT_PUBLIC_APP_STORE_WORST_RATING,
  1,
);
const APP_STORE_RATING_COUNT = parseIntOrDefault(
  process.env.NEXT_PUBLIC_APP_STORE_RATING_COUNT,
  200,
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* ///Motherly ASO/// */}
        <meta
          name="apple-itunes-app"
          content={`app-id=${APPLE_APP_ID}, app-argument=https://mothrly.com`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "Motherly: Birth Companion",
              operatingSystem: "ANDROID, IOS",
              applicationCategory: "HealthApplication",
              offers: {
                "@type": "Offer",
                price: "₹2500",
                priceCurrency: "INR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: APP_STORE_RATING_VALUE,
                bestRating: APP_STORE_BEST_RATING,
                worstRating: APP_STORE_WORST_RATING,
                ratingCount: APP_STORE_RATING_COUNT,
              },
            }),
          }}
        />

      </head>

      <body className="antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Meta Pixel noscript */}
        <noscript dangerouslySetInnerHTML={{
          __html: `
          <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />
        `}} />

        {/* GTM, GA4 and the Meta pixel all boot from DeferredAnalytics — see the
            note there for why they must not load during the initial paint. */}
        <DeferredAnalytics />
        <FontLoader />
        <ScrollToTop />
        <MotionProvider>{children}</MotionProvider>
        <ChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Motherly",
              description: "Expert maternal care services in Chennai — doulas, lactation consultants, gynaecologists, nannies, postnatal physiotherapy, yoga and pediatricians.",
              url: "https://www.mothrly.com",
              logo: "https://www.mothrly.com/logo.png",
              image: "https://www.mothrly.com/hero-bg.jpg",
              telephone: "+91-9952977170",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              geo: { "@type": "GeoCoordinates", latitude: 13.0827, longitude: 80.2707 },
              areaServed: "Chennai",
              priceRange: "₹₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: APP_STORE_RATING_VALUE,
                bestRating: APP_STORE_BEST_RATING,
                worstRating: APP_STORE_WORST_RATING,
                ratingCount: APP_STORE_RATING_COUNT,
              },
              sameAs: [
                ...SOCIAL_PROFILE_URLS,
                "https://play.google.com/store/apps/details?id=com.mothrly",
                "https://apps.apple.com/in/app/motherly-your-birth-companion/id6746041100",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Maternal Care Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Doula Services" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lactation Consulting" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gynaecology Consultation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nanny Care" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Postnatal Physiotherapy" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prenatal Yoga" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pediatrician Consultation" } },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
