'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* About RCC Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
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
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-3xl font-black text-white mb-2">2</h4>
                <p className="text-sm font-medium text-muted uppercase tracking-wider">Visionary Owners</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white mb-2">150+</h4>
                <p className="text-sm font-medium text-muted uppercase tracking-wider">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white mb-2">34+<span className="text-accent-yellow text-xl">yrs</span></h4>
                <p className="text-sm font-medium text-muted uppercase tracking-wider">Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            className="hidden lg:block h-[500px] rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
            <div className="absolute inset-0 bg-[url('/founders.png')] bg-cover bg-center grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="backdrop-blur-md bg-black/40 border border-white/10 p-4 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <p className="text-white font-bold tracking-wide">The Founders</p>
                <p className="text-sm text-accent-yellow font-medium">Leading RCC to New Heights</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founders Statements */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 rounded-[2rem] relative group border border-white/5"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <p className="text-lg text-foreground font-medium mb-8 leading-relaxed relative z-10 italic">
              "We didn't just want to build structures; we wanted to engineer legacies. Every project we undertake is a testament to our commitment to pushing the boundaries of what's possible in modern architecture."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-yellow to-accent-red flex items-center justify-center font-bold text-lg text-background pb-0.5">
                S
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
            className="glass-card p-10 rounded-[2rem] relative group border border-white/5"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-accent-yellow"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <p className="text-lg text-foreground font-medium mb-8 leading-relaxed relative z-10 italic">
              "True luxury lies in the details. From the foundation to the final finishes, our philosophy is rooted in uncompromising quality and a relentless pursuit of perfection for our clients."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center font-bold text-lg text-background pb-0.5">
                R
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Roshan Saxena</h4>
                <p className="text-sm text-accent-yellow font-medium">Founder & Managing Director</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Developer Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden group border border-white/10 bg-white/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left relative z-10">
              <div className="w-32 h-32 rounded-full shrink-0 shadow-[0_0_30px_rgba(255,214,10,0.2)] border-2 border-accent-yellow/50 relative overflow-hidden">
                <Image src="/developer.png" alt="Niranjan Saxena" fill className="object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-[0.1em]">Website Developer</span>
                </div>
                
                <h3 className="text-3xl font-black mb-3 text-white">Niranjan Saxena</h3>
                
                <p className="text-lg text-muted leading-relaxed mb-6 font-medium">
                  I'm Niranjan Saxena, a Full Stack Web Developer from Bhopal, Madhya Pradesh, focused on delivering high-quality, conversion-driven websites. I design and develop digital experiences that combine aesthetics with performance, helping businesses grow online with precision and reliability. From business websites to custom solutions, I ensure every project reflects professionalism, speed, and scalability.
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                  <a href="https://github.com/Niranjan8001" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-white hover:text-accent-yellow transition-colors group/link">
                    <svg className="w-5 h-5 group-hover/link:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/niranjan-saxena-6587b23a1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-white hover:text-accent-yellow transition-colors group/link">
                    <svg className="w-5 h-5 group-hover/link:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-yellow/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-red/5 rounded-full blur-[80px] -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
