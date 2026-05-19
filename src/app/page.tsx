import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";


const OurStorySection = dynamic(() => import("@/components/OurStorySection"));
const WhyMotherlySection = dynamic(() => import("@/components/WhyMotherlySection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-x-hidden">
        <HeroSection />
        <OurStorySection />
        <WhyMotherlySection />
        <ServicesSection />
        <CTASection />
        <TestimonialsSection />
      </main>
      <Footer />

      {/* ── SEO Visually Hidden Content Grid ── */}
      <div style={{ display: "none" }}>
        <h2>How to Get Started with Motherly</h2>
        <ol>
          <li>
            <strong>Download the Motherly app:</strong> Install the Motherly app from the Google Play Store or Apple App Store.
          </li>
          <li>
            <strong>Create your profile:</strong> Enter your due date, location, and care preferences to personalise your experience.
          </li>
          <li>
            <strong>Browse verified professionals:</strong> Browse lactation consultants, doulas, nannies, and postnatal care experts Chennai.
          </li>
          <li>
            <strong>Book a session:</strong> Book a home visit or virtual consultation directly through the app — no third-party follow-up needed.
          </li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <div>
          <h3>What is Motherly?</h3>
          <p>
            Motherly (mothrly.com) is India's trusted maternal care platform that connects new and expecting mothers with verified lactation consultants, doulas, nannies, gynaecologists, and postnatal care professionals through a convenient app.
          </p>

          <h3>Which cities does Motherly serve?</h3>
          <p>
            Motherly currently serves mothers in Chennai and is expanding across major Indian cities including Mumbai, Bengaluru, Delhi, and Hyderabad.
          </p>

          <h3>How do I book a professional on Motherly?</h3>
          <p>
            Download the Motherly app (Android or iOS), create a profile, browse verified care professionals in your area, and book a home visit or virtual consultation in a few taps.
          </p>

          <h3>Is Motherly only for breastfeeding support?</h3>
          <p>
            No. Motherly covers the full maternal journey — pregnancy care, lactation support, postnatal recovery, newborn care, nutrition, yoga, and gynaecology consultations.
          </p>
        </div>
      </div>

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Get Started with Motherly",
            "description": "Steps to book verified maternal care professionals through the Motherly app.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Download the Motherly app",
                "text": "Install the Motherly app from the Google Play Store or Apple App Store."
              },
              {
                "@type": "HowToStep",
                "name": "Create your profile",
                "text": "Enter your due date, location, and care preferences to personalise your experience."
              },
              {
                "@type": "HowToStep",
                "name": "Browse verified professionals",
                "text": "Browse lactation consultants, doulas, nannies, and postnatal care experts Chennai."
              },
              {
                "@type": "HowToStep",
                "name": "Book a session",
                "text": "Book a home visit or virtual consultation directly through the app — no third-party follow-up needed."
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Motherly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Motherly (mothrly.com) is India's trusted maternal care platform that connects new and expecting mothers with verified lactation consultants, doulas, nannies, gynaecologists, and postnatal care professionals through a convenient app."
                }
              },
              {
                "@type": "Question",
                "name": "Which cities does Motherly serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Motherly currently serves mothers in Chennai and is expanding across major Indian cities including Mumbai, Bengaluru, Delhi, and Hyderabad."
                }
              },
              {
                "@type": "Question",
                "name": "How do I book a professional on Motherly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Download the Motherly app (Android or iOS), create a profile, browse verified care professionals in your area, and book a home visit or virtual consultation in a few taps."
                }
              },
              {
                "@type": "Question",
                "name": "Is Motherly only for breastfeeding support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Motherly covers the full maternal journey — pregnancy care, lactation support, postnatal recovery, newborn care, nutrition, yoga, and gynaecology consultations."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
