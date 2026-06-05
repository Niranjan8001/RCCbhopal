'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Fade out slightly on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animate left side text elements
      gsap.fromTo(
        '.anim-left',
        { y: 30, opacity: 0, filter: 'blur(3px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      );

      // Fade/slide in right visual panel
      gsap.fromTo(
        '.anim-right',
        { scale: 0.98, opacity: 0, filter: 'blur(5px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating particles
  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 2 + 1) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      p.style.backgroundColor = '#F5C542';
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: -100 - Math.random() * 100,
        x: (Math.random() - 0.5) * 50,
        opacity: 0,
        duration: 6 + Math.random() * 6,
        repeat: -1,
        delay: Math.random() * 4,
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070707] pt-36 pb-20"
      id="hero"
    >
      {/* Background blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Architectural vertical guide lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none hidden lg:block" />
      <div className="absolute left-[58%] top-0 bottom-0 w-px bg-white/[0.02] pointer-events-none hidden lg:block" />

      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFD86B]/[0.01] rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#F5C542]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Main 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          
          {/* Left Column: Premium Content Layout */}
          <div ref={leftRef} className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Welcome Badge */}
            <div className="anim-left flex items-center gap-4 mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#F5C542]">
                Crafting Iconic Structures. Since 2024
              </span>
              <div className="h-px bg-[#F5C542]/30 w-24 hidden sm:block" />
            </div>

            {/* Massive Bold Headline */}
            <h1 className="anim-left text-5xl sm:text-6xl lg:text-[76px] font-black leading-[1.05] tracking-tight text-white mb-6">
              Reliable <br className="hidden lg:block" />
              Construction <br />
              <span className="text-[#F5C542] drop-shadow-[0_0_30px_rgba(245,197,66,0.15)]">&amp; Consultancy</span>
            </h1>

            {/* Premium Description */}
            <p className="anim-left text-[#AFAFAF] text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
              We don&apos;t just construct buildings — we engineer experiences that stand the test of time.
            </p>

            {/* CTA Buttons */}
            <div className="anim-left flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <a href="#estimator" className="btn-primary w-full sm:w-auto min-h-[48px] bg-[#F5C542] text-[#070707] hover:bg-[#FFD86B] font-bold rounded-full px-8 py-3.5 flex items-center justify-center gap-2 group">
                <span>Get Free Estimate</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a href="#projects" className="btn-secondary w-full sm:w-auto min-h-[48px] border-white/20 hover:border-white text-white rounded-full px-8 py-3.5 flex items-center justify-center gap-2 group">
                <span>View Our Work</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>

            {/* Trust Badges grid */}
            <div className="anim-left grid grid-cols-2 sm:grid-cols-4 gap-6 w-full mb-10">
              {/* Badge 1: 100% Client Trust */}
              <div className="flex items-center gap-3">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-none mb-0.5">100%</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Client Trust</p>
                </div>
              </div>

              {/* Badge 2: Quality Assured */}
              <div className="flex items-center gap-3">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a6 6 0 00-6 6v2h12v-2a6 6 0 00-6-6zM4 13h16a1 1 0 011 1v1H3v-1a1 1 0 011-1zM12 3v2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-none mb-0.5">Quality</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Assured</p>
                </div>
              </div>

              {/* Badge 3: On-Time Delivery */}
              <div className="flex items-center gap-3">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-none mb-0.5">On-Time</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Delivery</p>
                </div>
              </div>

              {/* Badge 4: End-to-End Solutions */}
              <div className="flex items-center gap-3">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white leading-none mb-0.5">End-to-End</p>
                  <p className="text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Solutions</p>
                </div>
              </div>
            </div>

            {/* Horizontal Feature Card Container */}
            <div className="anim-left w-full border border-white/[0.08] bg-[#111111]/30 backdrop-blur-md rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 md:divide-x md:divide-white/[0.08]">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Dedicated Team</h4>
                    <p className="text-[11px] text-[#AFAFAF] leading-normal font-light">Skilled. Reliable. Experienced.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4 md:pl-6">
                  <div className="p-2.5 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.87-5.83" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Modern Equipment</h4>
                    <p className="text-[11px] text-[#AFAFAF] leading-normal font-light">Advanced tools for precision &amp; safety.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4 md:pl-6">
                  <div className="p-2.5 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Long-Term Partnerships</h4>
                    <p className="text-[11px] text-[#AFAFAF] leading-normal font-light">Building relationships that last.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Luxury Architectural Visual Panel with Staggered Columns */}
          <div ref={rightRef} className="lg:col-span-5 relative w-full flex items-center justify-center anim-right py-8 min-h-[500px] lg:min-h-[650px]">
            
            {/* Visual Wrapper */}
            <div className="relative w-full aspect-[4/5] max-w-[450px]">
              
              {/* Continuous background image clipped into staggered columns */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0% 35%, 25% 35%, 25% 20%, 50% 20%, 50% 5%, 75% 5%, 75% 15%, 100% 15%, 100% 100%, 0% 100%)'
                }}
              >
                <Image
                  src="/images/HDBack.png"
                  alt="Luxury Architectural Building and Cranes Sunset visual"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />
              </div>

              {/* Gold borders on each column exactly overlaying the clip-path edges */}
              <div className="absolute left-0 w-1/4 top-[35%] bottom-0 border-l border-t border-[#F5C542]/30 z-20 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none" />
              <div className="absolute left-[25%] w-1/4 top-[20%] bottom-0 border-l border-t border-[#F5C542]/30 z-20 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none" />
              <div className="absolute left-[50%] w-1/4 top-[5%] bottom-0 border-l border-t border-[#F5C542]/30 z-20 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none" />
              <div className="absolute left-[75%] w-1/4 top-[15%] bottom-0 border-l border-r border-t border-[#F5C542]/30 z-20 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none" />

              {/* Blueprint Guideline Accents behind visual */}
              <div className="absolute -z-10 -inset-6 pointer-events-none opacity-20">
                <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.04">
                  <line x1="10" y1="0" x2="10" y2="100" strokeDasharray="1 1" />
                  <line x1="90" y1="0" x2="90" y2="100" strokeDasharray="1 1" />
                </svg>
              </div>

              {/* Awwwards Rotating Text Badge (Top Right) */}
              <div className="absolute top-10 right-4 lg:right-6 z-30 hidden md:block">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-22 h-22 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[7.5px] uppercase font-bold tracking-[0.22em] fill-[#F5C542]/70">
                      <textPath href="#circlePath">
                        Building Tomorrow Today • Building Tomorrow Today •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-8 h-8 rounded-full border border-[#F5C542]/20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <svg className="w-4 h-4 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21h10.5V3.75c0-.414-.336-.75-.75-.75H7.5a.75.75 0 00-.75.75V21z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </motion.div>

      {/* Scroll indicator (Bottom Left) */}
      <div className="absolute bottom-10 left-6 sm:left-12 flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] pointer-events-none z-10">
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#F5C542] to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-bounce" />
        </div>
        <span>Scroll to explore</span>
      </div>

    </section>
  );
}
