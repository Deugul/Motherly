import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OurStorySection from "@/components/OurStorySection";
import WhyMotherlySection from "@/components/WhyMotherlySection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

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
