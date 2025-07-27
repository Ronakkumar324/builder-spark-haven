import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import WhyUs from "@/components/WhyUs";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <AboutSection />
        <WhyUs />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
