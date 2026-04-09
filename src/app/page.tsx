import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import CostEstimator from '@/components/CostEstimator';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import AboutUs from '@/components/AboutUs';
import OurPresence from '@/components/OurPresence';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-accent-yellow/30 selection:text-accent-yellow">
      <CursorGlow />
      <Navbar />
      <WhatsAppFloat />
      
      {/* Sections structured for cinematic flow */}
      <HeroSection />

      <div className="section-divider" />
      <ProjectShowcase />

      <div className="section-divider" />
      <CostEstimator />

      <div className="section-divider" />
      <ProcessTimeline />

      <div className="section-divider" />
      <Testimonials />

      <div className="section-divider" />
      <OurPresence />

      <div className="section-divider" />
      <AboutUs />

      <FinalCTA />
      <Footer />
    </main>
  );
}
