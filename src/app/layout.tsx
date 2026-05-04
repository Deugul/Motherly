import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import FontLoader from "@/components/FontLoader";

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
    default: "Motherly | Your Birth Companion in Chennai",
    template: "%s | Motherly",
  },
  description:
    "Motherly connects families with expert doulas, lactation consultants, gynaecologists, nannies, and postnatal care specialists in Chennai. Book a consultation today.",
  keywords: [
    "doula Chennai", "lactation consultant Chennai", "gynaecologist Chennai",
    "postnatal care Chennai", "nanny care Chennai", "maternal care Chennai",
    "birth companion Chennai", "pregnancy support Chennai",
  ],
  metadataBase: new URL("https://www.mothrly.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Motherly",
    title: "Motherly | Your Birth Companion in Chennai",
    description:
      "Expert doulas, lactation consultants, gynaecologists, nannies, and postnatal care specialists in Chennai.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Motherly — Your Birth Companion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motherly | Your Birth Companion in Chennai",
    description: "Expert maternal care in Chennai — doulas, lactation, gynaecology, nannies & more.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "40Vdcti_y2l_y4vcTdGyjxw1am30YkUF30Llx8mg_Go",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <FontLoader />
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
