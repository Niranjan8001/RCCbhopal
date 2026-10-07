'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import TeamElevation from './TeamElevation';

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);


  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" id="about">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* About RCC Content */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Accent line */}
            <div className="w-12 h-1 bg-accent-yellow rounded-full mb-6" />
            
            <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Our Vision
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              Engineering <span className="text-muted text-glow-white">Excellence</span> Since 1991.
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              RCC is the modern evolution of a 35-year engineering legacy. Our foundational engineering expertise began in 1991, delivering solid structural projects across Madhya Pradesh. In 2022, RCC was established to bring that time-tested expertise into the modern era of luxury residential construction.
            </p>

            {/* Years badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glass-card-premium !rounded-full">
              <span className="text-3xl font-black text-accent-yellow tabular-nums">35+</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Years of Experience</span>
                <span className="text-xs text-muted">RCC founded 2022</span>
              </div>
            </div>
          </motion.div>
        </div>

        <TeamElevation />

      </div>
    </section>
  );
}
