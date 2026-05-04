import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

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
    </>
  );
}
