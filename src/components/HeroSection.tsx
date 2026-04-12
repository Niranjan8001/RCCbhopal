'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

const heroStats = [
  { value: '30+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Trust' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: background moves slower than foreground
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out', delay: 0.3 }
      );

      // Subheading
      gsap.fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      );

      // CTA buttons stagger
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15, delay: 1 }
        );
      }

      // Stats bar
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.4 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating particles
  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.width = (Math.random() * 3 + 1) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: -100 - Math.random() * 200,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 4 + Math.random() * 6,
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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="/hero-bg.png"
          alt="Premium RCC construction"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay gradient - heavier at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </motion.div>

      {/* Animated gradient background (existing, now layered on top of image) */}
      <div className="gradient-bg" style={{ opacity: 0.5 }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-yellow/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm text-muted font-medium">Crafting Iconic Structures Since 1991</span>
        </motion.div>

        <h1
          ref={headingRef}
          className="flex flex-col items-center justify-center text-4xl sm:text-6xl lg:text-[70px] font-black leading-[1.1] tracking-[-0.02em] mb-8 opacity-0 text-center"
        >
          <span>Reliable Construction</span>
          <span className="text-accent-yellow text-glow-yellow mt-2">&amp; Consultancy</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg sm:text-xl text-muted max-w-xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          We don&apos;t just construct buildings — we engineer experiences
          that stand the test of time.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
          <a href="#estimator" className="btn-primary w-full sm:w-auto min-h-[44px]">
            <span>Get Free Estimate</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#projects" className="btn-secondary w-full sm:w-auto min-h-[44px]">
            View Our Work
          </a>
        </div>

        {/* Floating Stats Bar */}
        <div
          ref={statsRef}
          className="mt-16 opacity-0"
        >
          <div className="glass-card-premium inline-flex flex-wrap items-center justify-center gap-6 sm:gap-0 px-6 sm:px-0 py-5 sm:py-0 rounded-2xl sm:rounded-full">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 ${
                  i < heroStats.length - 1 ? 'sm:border-r sm:border-white/10' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-accent-yellow tabular-nums">{stat.value}</span>
                <span className="text-xs sm:text-sm text-muted font-medium whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          animate={{}}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-accent-yellow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
