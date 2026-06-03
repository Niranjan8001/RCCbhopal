'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Accent line */}
            <div className="w-12 h-1 bg-accent-yellow rounded-full mb-6" />
            
            <h2 className="text-sm font-bold tracking-[0.2em] text-accent-yellow uppercase mb-4">
              Our Vision
            </h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Engineering <span className="text-muted text-glow-white">Excellence</span> Since 1991.
            </h3>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Reliable Construction & Consultancy (RCC) is built on a foundation of trust, precision, 
              and uncompromising quality. Dominating the construction landscape since 1991 and formally established in 2024, 
              we have spent over three decades transforming urban landscapes 
              with iconic structures that blend visionary design with enduring structural integrity.
            </p>

            {/* Years badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glass-card-premium !rounded-full lg:hidden">
              <span className="text-3xl font-black text-accent-yellow tabular-nums">30+</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Years of Excellence</span>
                <span className="text-xs text-muted">Building Trust Since 1991</span>
              </div>
            </div>
          </motion.div>

          {/* Founder Cards — Anti-Gravity Floating */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-stretch">

            {/* Card 1 — Sanjay Saxena */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="flex-1 animate-anti-gravity"
            >
              <div className="relative glass-card-premium !rounded-2xl overflow-hidden group glow-edge-gold bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

                {/* Circular Image Container */}
                <div className="flex justify-center pt-8 px-6 shrink-0">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent-yellow/30 transition-all duration-700 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <Image
                      src="/sanjay.png"
                      alt="Sanjay Saxena"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h4 className="text-xl font-bold text-white tracking-wide mb-1">Sanjay Saxena</h4>
                  <span className="text-accent-yellow text-sm font-semibold mb-4">Founder & CEO</span>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    Visionary leader with 30+ years of experience in transforming urban landscapes through iconic architectural projects.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Roshan Saxena */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex-1 animate-anti-gravity-delayed"
            >
              <div className="relative glass-card-premium !rounded-2xl overflow-hidden group glow-edge-blue bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

                {/* Circular Image Container */}
                <div className="flex justify-center pt-8 px-6 shrink-0">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent-blue/30 transition-all duration-700 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <Image
                      src="/roshan.png"
                      alt="Roshan Saxena"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <h4 className="text-xl font-bold text-white tracking-wide mb-1">Roshan Saxena</h4>
                  <span className="text-accent-blue text-sm font-semibold mb-4">Managing Director</span>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    Strategic mind driving operational excellence and client relationships, ensuring every project exceeds expectations.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Founders Statements */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="glass-card-premium p-10 rounded-[2rem] relative group border border-white/5"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <p className="text-lg text-foreground font-medium mb-8 leading-relaxed relative z-10 italic">
              &quot;We didn&apos;t just want to build structures; we wanted to engineer legacies. Every project we undertake is a testament to our commitment to pushing the boundaries of what&apos;s possible in modern architecture.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-yellow to-accent-red p-[2px] flex-shrink-0">
                <div className="w-full h-full rounded-full relative overflow-hidden border border-background">
                  <Image src="/sanjay.png" alt="Sanjay Saxena" fill className="object-cover" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Sanjay Saxena</h4>
                <p className="text-sm text-accent-yellow font-medium">Founder & CEO</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-premium p-10 rounded-[2rem] relative group border border-white/5"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <p className="text-lg text-foreground font-medium mb-8 leading-relaxed relative z-10 italic">
              &quot;True luxury lies in the details. From the foundation to the final finishes, our philosophy is rooted in uncompromising quality and a relentless pursuit of perfection for our clients.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-green p-[2px] flex-shrink-0">
                <div className="w-full h-full rounded-full relative overflow-hidden border border-background">
                  <Image src="/roshan.png" alt="Roshan Saxena" fill className="object-cover" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Roshan Saxena</h4>
                <p className="text-sm text-accent-yellow font-medium">Founder & Managing Director</p>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
