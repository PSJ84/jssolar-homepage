import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ServiceSection from '@/components/ServiceSection';
import ProcessSection from '@/components/ProcessSection';
import TrustSection from '@/components/TrustSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServiceSection />
        <ProcessSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
