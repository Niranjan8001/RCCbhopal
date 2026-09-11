'use client';

import { motion } from 'framer-motion';
import { DESIGN_SECTIONS } from '@/data/designShowcase';
import RoomGallery from './design/RoomGallery';
import DesignDocumentation from './design/DesignDocumentation';

const [livingArea, diningArea, technical] = DESIGN_SECTIONS;

const JUMP_LINKS = [
  { href: '#living-area', label: 'Living Area' },
  { href: '#dining-area', label: 'Dining Area' },
  { href: '#technical', label: 'Design Documentation' },
];

export default function DesignShowcase() {
  return (
    <section className="section-padding relative overflow-hidden" id="design-showcase">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.25em] mb-4 block">
            3D Design Visualization
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            From Plan to a
            <br />
            <span className="text-muted">Visual Experience</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Explore our interior design concepts through realistic 3D visualizations — and the wall
            elevations, sections, and floor layouts behind them.
          </p>
        </motion.div>

        {/* Quick jump nav */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 md:mb-20">
          {JUMP_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-muted hover:text-white hover:border-white/25 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <RoomGallery section={livingArea} priority />

        <div className="section-divider my-16 md:my-24" />

        <RoomGallery section={diningArea} />

        <div className="section-divider my-16 md:my-24" />

        <DesignDocumentation section={technical} />

        {/* Bridge to consultancy pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center glass-card p-8 sm:p-10"
        >
          <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
            Curious what design work like this costs?
          </h4>
          <p className="text-muted text-sm sm:text-base mb-6 max-w-md mx-auto">
            Every drawing set above — floor plans, elevations, structurals — is priced on our published
            consultancy rate card.
          </p>
          <a
            href="#consultancy-pricing"
            className="btn-secondary min-h-[44px] inline-flex"
          >
            View Consultancy Pricing
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
