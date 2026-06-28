'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rightVisualRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  // Stagger entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.anim-left',
        { y: 30, opacity: 0, filter: 'blur(3px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.08 }
      );

      gsap.fromTo(
        '.anim-right',
        { scale: 0.98, opacity: 0, filter: 'blur(5px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Parallax Mouse Move effect on the right visual card
  useEffect(() => {
    const el = rightVisualRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Soft architectural 3D card tilt
      gsap.to(el, {
        rotateY: x * 0.06,
        rotateX: -y * 0.06,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.out',
        duration: 0.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (el) el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Floating warm gold ambient particles
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#070707] pt-24 pb-10"
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
            <div className="anim-left flex items-center gap-4 mb-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#F5C542]">
                Backed by 30 Years of Engineering Excellence.
              </span>
              <div className="h-px bg-[#F5C542]/30 w-16 hidden sm:block" />
            </div>

            {/* Massive Bold Headline */}
            <h1 className="anim-left text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.05] tracking-tight text-white mb-3">
              Reliable <br className="hidden lg:block" />
              Construction <br />
              <span className="text-[#F5C542] drop-shadow-[0_0_30px_rgba(245,197,66,0.12)]">&amp; Consultancy</span>
            </h1>

            {/* Premium Description */}
            <p className="anim-left text-[#AFAFAF] text-xs sm:text-sm md:text-base max-w-lg mb-5 leading-relaxed font-light">
              We don&apos;t just construct buildings — we engineer experiences that stand the test of time.
            </p>

            {/* CTA Buttons */}
            <div className="anim-left flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-6">
              <a href="#estimator" className="btn-primary w-full sm:w-auto min-h-[42px] bg-[#F5C542] text-[#070707] hover:bg-[#FFD86B] font-bold rounded-full px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 group">
                <span>Get Free Estimate</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a href="#projects" className="btn-secondary w-full sm:w-auto min-h-[42px] border-white/20 hover:border-white text-white rounded-full px-6 py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 group">
                <span>View Our Work</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>

            {/* Trust Badges grid */}
            <div className="anim-left grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-6">
              {/* Badge 1: 100% Client Trust */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-6 h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-none mb-0.5">100%</p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Client Trust</p>
                </div>
              </div>

              {/* Badge 2: Quality Assured */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-6 h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a7.5 7.5 0 00-7.5 7.5v1h15v-1a7.5 7.5 0 00-7.5-7.5zM3.5 14h17M6 14v1a3 3 0 006 0v-1M12 14v1a3 3 0 006 0v-1M12 2v2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-none mb-0.5">Quality</p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Assured</p>
                </div>
              </div>

              {/* Badge 3: On-Time Delivery */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-6 h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-none mb-0.5">On-Time</p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Delivery</p>
                </div>
              </div>

              {/* Badge 4: End-to-End Solutions */}
              <div className="flex items-center gap-2.5">
                <div className="text-[#F5C542] flex-shrink-0">
                  <svg className="w-6 h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21h10.5V3.75c0-.414-.336-.75-.75-.75H7.5a.75.75 0 00-.75.75V21z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-none mb-0.5">End-to-End</p>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#AFAFAF] leading-none">Solutions</p>
                </div>
              </div>
            </div>

            {/* Horizontal Feature Card Container */}
            <div className="anim-left w-full border border-white/[0.08] bg-[#111111]/30 backdrop-blur-md rounded-xl p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:divide-x md:divide-white/[0.08]">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Dedicated Team</h4>
                    <p className="text-[10px] text-[#AFAFAF] leading-normal font-light">Skilled. Reliable. Experienced.</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3 md:pl-5">
                  <div className="p-2 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Modern Equipment</h4>
                    <p className="text-[10px] text-[#AFAFAF] leading-normal font-light">Advanced tools for precision &amp; safety.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3 md:pl-5">
                  <div className="p-2 rounded-xl bg-[#F5C542]/10 text-[#F5C542] flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Long-Term Partnerships</h4>
                    <p className="text-[10px] text-[#AFAFAF] leading-normal font-light">Building relationships that last.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Luxury Architectural Visual Panel with Staggered Columns */}
          <div ref={rightRef} className="lg:col-span-5 relative w-full flex items-center justify-center anim-right py-4 min-h-[380px] lg:min-h-[500px]">
            
            {/* Visual Wrapper - with 3D perspective */}
            <div 
              ref={rightVisualRef} 
              className="relative w-full aspect-[4/5] max-w-[360px]"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              
              {/* Column 1 - deepest 3D depth */}
              <div 
                className="absolute left-0 w-[25.2%] h-full pointer-events-none overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0% 35%, 100% 35%, 100% 100%, 0% 100%)', 
                  transform: 'translateZ(-35px) scale(1.02)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                <div className="absolute left-0 top-0 w-[400%] h-full">
                  <Image
                    src="/images/HDBack.png"
                    alt="Column 1 sunset skyline view"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />
                </div>
              </div>
              {/* Border Overlay for Column 1 */}
              <div 
                className="absolute left-0 w-[25%] top-[35%] bottom-0 border-l border-t border-[#F5C542]/30 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none z-20"
                style={{ transform: 'translateZ(-35px) scale(1.02)' }}
              />

              {/* Column 2 - medium depth */}
              <div 
                className="absolute left-[25%] w-[25.2%] h-full pointer-events-none overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0% 20%, 100% 20%, 100% 100%, 0% 100%)', 
                  transform: 'translateZ(-20px) scale(1.01)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                <div className="absolute left-[-100%] top-0 w-[400%] h-full">
                  <Image
                    src="/images/HDBack.png"
                    alt="Column 2 sunset skyline view"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />
                </div>
              </div>
              {/* Border Overlay for Column 2 */}
              <div 
                className="absolute left-[25%] w-[25%] top-[20%] bottom-0 border-l border-t border-[#F5C542]/30 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none z-20"
                style={{ transform: 'translateZ(-20px) scale(1.01)' }}
              />

              {/* Column 3 - near depth */}
              <div 
                className="absolute left-[50%] w-[25.2%] h-full pointer-events-none overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0% 5%, 100% 5%, 100% 100%, 0% 100%)', 
                  transform: 'translateZ(-5px)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                <div className="absolute left-[-200%] top-0 w-[400%] h-full">
                  <Image
                    src="/images/HDBack.png"
                    alt="Column 3 sunset skyline view"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />
                </div>
              </div>
              {/* Border Overlay for Column 3 */}
              <div 
                className="absolute left-[50%] w-[25%] top-[5%] bottom-0 border-l border-t border-[#F5C542]/30 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none z-20"
                style={{ transform: 'translateZ(-5px)' }}
              />

              {/* Column 4 - front depth */}
              <div 
                className="absolute left-[75%] w-[25.2%] h-full pointer-events-none overflow-hidden"
                style={{ 
                  clipPath: 'polygon(0% 15%, 100% 15%, 100% 100%, 0% 100%)', 
                  transform: 'translateZ(10px) scale(0.99)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                <div className="absolute left-[-300%] top-0 w-[400%] h-full">
                  <Image
                    src="/images/HDBack.png"
                    alt="Column 4 sunset skyline view"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent z-10" />
                </div>
              </div>
              {/* Border Overlay for Column 4 */}
              <div 
                className="absolute left-[75%] w-[25%] top-[15%] bottom-0 border-l border-r border-t border-[#F5C542]/30 shadow-[0_-8px_24px_rgba(245,197,66,0.05)] pointer-events-none z-20"
                style={{ transform: 'translateZ(10px) scale(0.99)' }}
              />

              {/* Blueprint Guideline Accents behind visual */}
              <div className="absolute -z-10 -inset-4 pointer-events-none opacity-20">
                <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.04">
                  <line x1="10" y1="0" x2="10" y2="100" strokeDasharray="1 1" />
                  <line x1="90" y1="0" x2="90" y2="100" strokeDasharray="1 1" />
                </svg>
              </div>

              {/* Awwwards Rotating Text Badge (Top Right) - highest 3D float */}
              <div 
                className="layer-badge absolute top-6 right-2 z-30 hidden md:block"
                style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-18 h-18 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                    <text className="text-[6.5px] uppercase font-bold tracking-[0.22em] fill-[#F5C542]/70">
                      <textPath href="#circlePath">
                        Building Tomorrow Today • Building Tomorrow Today •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-7 h-7 rounded-full border border-[#F5C542]/20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <svg className="w-3.5 h-3.5 text-[#F5C542]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
      <div className="absolute bottom-4 left-6 sm:left-12 flex items-center gap-3 text-white/40 text-[9px] font-bold uppercase tracking-[0.25em] pointer-events-none z-10">
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#F5C542] to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-bounce" />
        </div>
        <span>Scroll to explore</span>
      </div>

    </section>
  );
}
