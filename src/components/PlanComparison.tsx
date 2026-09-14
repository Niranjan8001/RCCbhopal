'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RateCard, { type PlanKey } from './RateCard';

gsap.registerPlugin(ScrollTrigger);

export default function PlanComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [plan, setPlan] = useState<PlanKey>('both');

  // Clicking a plan's rate opens that plan's specifications below.
  const showPlan = (next: PlanKey) => {
    setPlan(next);
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.comparison-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.comparison-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        '.plan-card-col',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.plan-cards-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Table animation
      gsap.fromTo(
        '.spec-table-container',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.spec-table-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="pricing">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 comparison-heading">
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Plans
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Silver &amp; Gold
            <br />
            <span className="text-muted">Plans</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Understand the visual, tactile, and grade differences between our two custom-tailored residential building plans.
          </p>
        </div>

        {/* Side-by-Side Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 plan-cards-wrapper">
          {/* Silver Card */}
          <div className="relative glass-card-premium p-8 rounded-3xl overflow-hidden border border-white/5 plan-card-col hover:border-neutral-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-400/5 rounded-full blur-[50px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neutral-500/10 flex items-center justify-center text-neutral-400 border border-neutral-500/20">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 5.04M12 2.944v18.118" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Silver Plan</h3>
                <p className="text-xs text-neutral-400">Standard Quality Package</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Our standard build plan, designed for durability and budget consciousness. Ideal for families looking for high-structural standards with clean, default finishes and approved brands.
            </p>
            <div className="mb-6">
              <button
                onClick={() => showPlan('silver')}
                aria-label="View the full Silver plan specification"
                className="group text-left"
              >
                <span className="text-3xl font-black text-white underline decoration-white/30 decoration-2 underline-offset-[6px] group-hover:decoration-white transition-colors">
                  ₹1,550
                </span>
                <span className="text-xs text-muted font-normal"> / sq ft starting rate</span>
                <span className="block mt-2 text-xs font-bold uppercase tracking-wider text-muted group-hover:text-white transition-colors">
                  View Silver specifications →
                </span>
              </button>
            </div>
          </div>

          {/* Gold Card */}
          <div className="relative glass-card-premium p-8 rounded-3xl overflow-hidden border border-accent-yellow/10 plan-card-col hover:border-accent-yellow/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/5 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-yellow text-background text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(255,214,10,0.3)]">
              Most Popular
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-yellow/10 flex items-center justify-center text-accent-yellow border border-accent-yellow/20">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 5.04M12 2.944v18.118" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-accent-yellow">Gold Plan</h3>
                <p className="text-xs text-accent-yellow/60">Premium Finish Package</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Our premium luxury specification tier. Built for those who desire top-of-the-line internal selections, elegant structural aesthetics, and heavy-duty wear-resistant finishes.
            </p>
            <div className="mb-6">
              <button
                onClick={() => showPlan('gold')}
                aria-label="View the full Gold plan specification"
                className="group text-left"
              >
                <span className="text-3xl font-black text-accent-yellow underline decoration-accent-yellow/30 decoration-2 underline-offset-[6px] group-hover:decoration-accent-yellow transition-colors">
                  ₹1,850
                </span>
                <span className="text-xs text-muted font-normal"> / sq ft starting rate</span>
                <span className="block mt-2 text-xs font-bold uppercase tracking-wider text-accent-yellow/70 group-hover:text-accent-yellow transition-colors">
                  View Gold specifications →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Specification Rate Card */}
        <div ref={tableRef} className="spec-table-container scroll-mt-24">
          <RateCard plan={plan} onPlanChange={setPlan} />
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/917987900965?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20Silver%20and%20Gold%20plans"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto min-h-[44px] justify-center"
          >
            <span>Ask About These Plans on WhatsApp</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn-secondary w-full sm:w-auto min-h-[44px] justify-center">
            Other ways to reach us
          </a>
        </div>

      </div>
    </section>
  );
}
