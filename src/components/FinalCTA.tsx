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
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[500px] bg-accent-yellow/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={contentRef} className="glass-card-strong p-12 sm:p-20 text-center rounded-[3rem] border-white/10 shadow-2xl shadow-black/50">
          <span className="text-accent-yellow text-sm font-bold uppercase tracking-[0.2em] mb-6 block">
            Start Your Project
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-8">
            Ready to Build
            <br />
            <span className="text-muted">Your Legacy?</span>
          </h2>

          <p className="text-lg text-muted max-w-xl mx-auto mb-12">
            Schedule a confidential consultation with our lead architects and engineers today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 cursor-pointer">
            <a href="https://wa.me/918109618368" target="_blank" rel="noopener noreferrer" className="btn-primary pulse-glow text-lg !px-10 !py-5">
              Contact Us Today
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted">
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
          </div>
        </div>
      </div>
    </section>
  );
}
