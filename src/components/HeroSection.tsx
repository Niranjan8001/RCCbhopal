'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax background movements
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animate left side text elements
      gsap.fromTo(
        '.anim-left',
        { y: 40, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', stagger: 0.12 }
      );

      // Scale and fade in the architectural panel
      gsap.fromTo(
        '.anim-right',
        { scale: 0.96, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out', delay: 0.4 }
      );

      // Stagger entry for feature cards
      gsap.fromTo(
        '.anim-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.8 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating warm gold particles
  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 2 + 1) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = (Math.random() * 0.4 + 0.1).toString();
      p.style.backgroundColor = '#F5C542';
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: -100 - Math.random() * 100,
        x: (Math.random() - 0.5) * 50,
        opacity: 0,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none',
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070707] pt-32 pb-16"
      id="hero"
    >
      {/* Background blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFD86B]/[0.02] rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#F5C542]/[0.03] rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Main 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Premium Content Layout */}
          <div ref={leftRef} className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Welcome Badge */}
            <div className="anim-left inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#AFAFAF] font-bold">
                Crafting Iconic Structures Since 2024
              </span>
            </div>

            {/* Massive Bold Headline */}
            <h1 className="anim-left text-4xl sm:text-6xl lg:text-[70px] font-black leading-[1.08] tracking-tight text-white mb-6">
              Reliable Construction
              <br />
              <span className="text-[#F5C542] drop-shadow-[0_0_30px_rgba(245,197,66,0.15)]">&amp; Consultancy</span>
            </h1>

            {/* Premium Description */}
            <p className="anim-left text-sm sm:text-base md:text-lg text-[#AFAFAF] max-w-2xl mb-8 leading-relaxed font-light">
              We don&apos;t just construct buildings — we engineer bespoke residential spaces and monumental structures that reflect architectural luxury and unmatched structural durability.
            </p>

            {/* Trust Badges */}
            <div className="anim-left flex flex-wrap gap-x-6 gap-y-3 mb-8">
              {[
                'Quality Assured',
                'On-Time Delivery',
                'End-to-End Solutions',
                '100% Client Trust',
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90">
                  <svg className="w-4 h-4 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="anim-left flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href="#estimator" className="btn-primary w-full sm:w-auto min-h-[48px] bg-[#F5C542] text-[#070707] hover:bg-[#FFD86B] font-bold">
                <span>Get Free Estimate</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#projects" className="btn-secondary w-full sm:w-auto min-h-[48px] border-white/20 hover:border-white text-white">
                View Our Work
              </a>
            </div>
          </div>

          {/* Right Column: Luxury Architectural Visual Panel */}
          <div ref={rightRef} className="lg:col-span-5 relative w-full flex items-center justify-center anim-right py-8">
            
            {/* Blueprint Grid Underlay */}
            <div className="absolute inset-0 border border-white/[0.04] rounded-3xl pointer-events-none bg-gradient-to-br from-[#111111]/30 to-transparent backdrop-blur-[2px]">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#F5C542]/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#F5C542]/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#F5C542]/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#F5C542]/40" />
            </div>

            {/* Glowing accents */}
            <div className="absolute -top-4 -left-4 w-12 h-px bg-gradient-to-r from-transparent via-[#F5C542] to-transparent opacity-60 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-12 h-px bg-gradient-to-r from-transparent via-[#F5C542] to-transparent opacity-60 animate-pulse" />

            {/* Overlapping Render Container */}
            <div className="relative p-3 rounded-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#070707] w-full max-w-[420px] aspect-[4/5] overflow-hidden group">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/HDBack.png"
                  alt="Luxury Modern Architecture Render"
                  fill
                  className="object-cover transition-transform duration-[4s] group-hover:scale-105 filter brightness-95 contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-[#070707]/10 to-transparent z-10" />
              </div>

              {/* Floating glass overlay card 1 */}
              <div className="absolute top-6 left-6 z-20 glass-card-strong px-4 py-2.5 rounded-xl border border-[#F5C542]/20 flex items-center gap-2 shadow-[0_12px_24px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <div className="w-5 h-5 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#F5C542]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] text-[#AFAFAF] uppercase tracking-wider leading-none">End-to-End</p>
                  <p className="text-xs font-bold text-white leading-tight">Quality Assured</p>
                </div>
              </div>

              {/* Floating glass overlay card 2 */}
              <div className="absolute bottom-6 right-6 z-20 glass-card-strong px-4 py-2.5 rounded-xl border border-[#F5C542]/20 flex items-center gap-2 shadow-[0_12px_24px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <div className="w-5 h-5 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                </div>
                <div>
                  <p className="text-[9px] text-[#AFAFAF] uppercase tracking-wider leading-none">Verified Rate</p>
                  <p className="text-xs font-bold text-white leading-tight">100% Client Trust</p>
                </div>
              </div>
            </div>

            {/* Wireframe blueprints visual */}
            <div className="absolute -z-10 w-full h-full pointer-events-none opacity-25">
              <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.04">
                <line x1="0" y1="10" x2="100" y2="10" />
                <line x1="0" y1="90" x2="100" y2="90" />
                <line x1="10" y1="0" x2="10" y2="100" strokeDasharray="1 1" />
                <line x1="90" y1="0" x2="90" y2="100" strokeDasharray="1 1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Footer of the Hero Section) */}
        <div ref={featuresRef} className="mt-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                title: 'Dedicated Team',
                desc: 'Skilled. Reliable. Experienced.',
                icon: (
                  <svg className="w-5 h-5 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20 11.386 11.386 0 015 19.237v-.11c0-1.112.286-2.16.786-3.07M15 19.128v.11a11.386 11.386 0 01-4.911.762H10m0 0A11.386 11.386 0 015 19.237v-.11m0 0a9.01 9.01 0 012.625-.371H10m0 0a9.01 9.01 0 014.121.952m-7.533-2.493a3.522 3.522 0 014.59-4.59M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 5.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  </svg>
                ),
              },
              {
                title: 'Modern Equipment',
                desc: 'Advanced tools for precision & safety.',
                icon: (
                  <svg className="w-5 h-5 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.87-5.83m-3.71 3.75L3 7.5M12 12l9-9m-9 9l-9 9m9-9l9 9M9 5.25A2.25 2.25 0 1113.5 7.5 2.25 2.25 0 019 5.25z" />
                  </svg>
                ),
              },
              {
                title: 'Long-Term Partnerships',
                desc: 'Building relationships that last.',
                icon: (
                  <svg className="w-5 h-5 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="anim-card glass-card-premium p-6 rounded-2xl border border-white/5 hover:border-[#F5C542]/20 flex items-start gap-4 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[#F5C542]">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#AFAFAF] font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
