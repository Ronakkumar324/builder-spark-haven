import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import CTASection from '@/components/CTASection';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <WhyUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
