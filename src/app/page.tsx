import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import SiteVisitsMap from '@/components/SiteVisitsMap';
import CostEstimator from '@/components/CostEstimator';
import PlanComparison from '@/components/PlanComparison';
import ProcessTimeline from '@/components/ProcessTimeline';
import LocationAndReviews from '@/components/LocationAndReviews';
import AboutUs from '@/components/AboutUs';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { siteVisits } from '@/data/siteVisits';

const siteVisitsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'RCC Site Visits — Madhya Pradesh',
  itemListElement: siteVisits.map((visit, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Place',
      name: visit.title,
      address: {
        '@type': 'PostalAddress',
        streetAddress: visit.address,
        addressLocality: visit.locality,
        addressRegion: 'MP',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: visit.lat,
        longitude: visit.lng,
      },
      photo: visit.photos.map((photo) => ({
        '@type': 'ImageObject',
        contentUrl: `https://www.rccbhopal.in${photo}`,
        caption: `${visit.title} — ${visit.locality}`,
      })),
    },
  })),
};

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-accent-yellow/30 selection:text-accent-yellow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteVisitsJsonLd) }}
      />
      <CursorGlow />
      <Navbar />
      <WhatsAppFloat />

      {/* Sections structured for cinematic flow */}
      <HeroSection />

      <div className="section-divider" />
      <ProjectShowcase />

      <div className="section-divider" />
      <SiteVisitsMap />

      <div className="section-divider" />
      <CostEstimator />

      <div className="section-divider" />
      <PlanComparison />

      <div className="section-divider" />
      <ProcessTimeline />

      <div className="section-divider" />
      <LocationAndReviews />

      <div className="section-divider" />
      <AboutUs />

      <div className="section-divider" />
      <FAQ />

      <FinalCTA />
      <Footer />
    </main>
  );
}
