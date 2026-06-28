'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 40, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.14 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BG-IMG.png"
          alt="RCC luxury construction — Bhopal"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark gradient overlay — ensures white text is legible on all devices */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Centered content block */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto w-full py-32"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow badge */}
        <div className="hero-anim flex items-center gap-3 mb-7">
          <div className="h-px w-10 bg-[#F5C542]/50 hidden sm:block" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#F5C542]">
            Backed by 30 Years of Engineering Excellence
          </span>
          <div className="h-px w-10 bg-[#F5C542]/50 hidden sm:block" />
        </div>

        {/* Headline — scales text-4xl → text-5xl → text-7xl */}
        <h1 className="hero-anim text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
          Engineering<br />
          Generational Assets.
        </h1>

        {/* Subheadline — max-w-2xl keeps line length readable on large screens */}
        <p className="hero-anim text-base sm:text-lg lg:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Backed by 30 years of structural excellence. We design and build uncompromising luxury homes in Bhopal.
        </p>

        {/* CTA Buttons — stacked on mobile, side-by-side on md+ */}
        <div className="hero-anim flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <a
            href="#estimator"
            className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C542] text-[#070707] font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#FFD86B] hover:shadow-[0_0_35px_rgba(245,197,66,0.45)] active:scale-[0.98]"
          >
            Calculate Your Cost
          </a>
          <a
            href="#projects"
            className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-transparent text-white font-bold text-sm uppercase tracking-wider border border-white/60 transition-all duration-300 hover:bg-white/10 hover:border-white active:scale-[0.98]"
          >
            Explore Our Work
          </a>
        </div>

        {/* Social proof stats */}
        <div className="hero-anim flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-14 pt-8 border-t border-white/10 w-full max-w-lg mx-auto">
          {[
            { value: '30+', label: 'Years of Legacy' },
            { value: '100%', label: 'Client Trust' },
            { value: 'On-Time', label: 'Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#F5C542] tabular-nums">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator — centered at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[9px] font-bold uppercase tracking-[0.25em] pointer-events-none z-20">
        <div className="w-[1px] h-7 bg-gradient-to-b from-[#F5C542] to-transparent relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-bounce" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
