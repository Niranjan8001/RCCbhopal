import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import CostEstimator from '@/components/CostEstimator';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import AboutUs from '@/components/AboutUs';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-accent-yellow/30 selection:text-accent-yellow">
      <CursorGlow />
      <Navbar />
      
      {/* Sections structured for cinematic flow */}
      <HeroSection />
      <ProjectShowcase />
      <CostEstimator />
      <ProcessTimeline />
      <Testimonials />
      <AboutUs />
      <FinalCTA />
      <Footer />
    </main>
  );
}
