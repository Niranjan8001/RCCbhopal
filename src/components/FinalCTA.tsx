'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden" id="contact">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#080818] to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-accent-yellow/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Decorative architectural lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[200px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45" />
        <div className="absolute top-[40%] right-[15%] w-[150px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-12" />
        <div className="absolute bottom-[30%] left-[20%] w-[180px] h-px bg-gradient-to-r from-transparent via-accent-yellow/5 to-transparent rotate-[30deg]" />
        <div className="absolute top-[60%] right-[10%] w-[120px] h-px bg-gradient-to-r from-transparent via-accent-blue/5 to-transparent -rotate-45" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={contentRef} className="glass-card-premium p-12 sm:p-20 text-center rounded-[3rem] relative overflow-hidden">
          {/* Inner gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/5 via-transparent to-accent-blue/5 pointer-events-none" />

          <span className="text-accent-yellow text-sm font-bold uppercase tracking-[0.2em] mb-6 block relative z-10">
            Start Your Project
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 relative z-10">
            Ready to Build
            <br />
            <span className="text-muted">Your Legacy?</span>
          </h2>

          <p className="text-lg text-muted max-w-xl mx-auto mb-4 relative z-10">
            Schedule a confidential consultation with our lead architects and engineers today.
          </p>

          {/* Urgency text */}
          <p className="text-sm text-accent-yellow/80 font-medium mb-12 relative z-10">
            ✦ Free consultation for projects above ₹50 Lakhs
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 cursor-pointer relative z-10">
            <a href="https://wa.me/917987900965?text=Hello%20RCC,%20I%20want%20to%20know%20about%20your%20services" target="_blank" rel="noopener noreferrer" className="btn-primary pulse-glow text-lg !px-12 !py-5">
              Contact Us Today
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted relative z-10">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Direct access to lead partners</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>No obligation estimate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
