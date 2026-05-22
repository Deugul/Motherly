import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import FontLoader from "@/components/FontLoader";
import ScrollToTop from "@/components/ScrollToTop";
import { SOCIAL_PROFILE_URLS } from "@/data/social-links";
import Script from "next/script";

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

export const metadata: Metadata = {
  title: {
    default: "Motherly – Chennai's No1 Mother Care & Baby Care Service at Home",
    template: "%s | Motherly",
  },
  description:
    "Motherly connects Indian mothers with verified lactation consultants in Chennai, doulas, nannies, and postnatal care experts. Book trusted maternal care on the Motherly app.",
  keywords: [
    "Motherly birth companion India",
    "maternal care app India",
    "book lactation consultant India",
    "postnatal care app",
    "doula India",
  ],
  metadataBase: new URL("https://www.mothrly.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Motherly – Chennai's No1 Mother Care & Baby Care Service at Home",
    description:
      "Motherly connects Indian mothers with verified lactation consultants in Chennai, doulas, nannies, and postnatal care experts. Book trusted maternal care on the Motherly app.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Motherly — Your Birth Companion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motherly – Chennai's No1 Mother Care & Baby Care Service at Home",
    description:
      "Motherly connects Indian mothers with verified lactation consultants in Chennai, doulas, nannies, and postnatal care experts. Book trusted maternal care on the Motherly app.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "OtmpGxUNJzvLtBhjMKEES6VbL3cV9j0jWsE5BL8cXrE",
  },
  robots: { index: true, follow: true },
};

const APPLE_APP_ID = "6746041100";
const APP_STORE_RATING_COUNT =
  process.env.NEXT_PUBLIC_APP_STORE_RATING_COUNT ?? "4.5";

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
                ratingValue: "4.5",
                ratingCount: APP_STORE_RATING_COUNT,
              },
            }),
          }}
        />

        {/* Preload the Hero Background Image for fast mobile LCP */}
        <link rel="preload" as="image" href="/hero-bg.jpg" />

        {/* Meta Pixel noscript (GTM/Pixel JavaScript is loaded non-blockingly via next/script below) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `
          <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1626727235196727&ev=PageView&noscript=1" />
        `}} />
      </head>

      <body className="antialiased" suppressHydrationWarning>
        {/* Google Analytics & Meta Pixel non-blocking script loader */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MKFG9J3JPM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKFG9J3JPM');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1626727235196727');
            fbq('track', 'PageView');
          `}
        </Script>

        <FontLoader />
        <ScrollToTop />
        {children}
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
