'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specifications = [
  {
    name: 'Superstructure',
    desc: 'Steel reinforcement & cement grade',
    silver: 'Standard Branded Steel & Cement',
    gold: 'Tata Tiscon / JSW + Premium Cement',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Electricals',
    desc: 'Wiring, conduits & distribution boards',
    silver: 'RR Kabel + Anchor',
    gold: 'Polycab / Finolex + Legrand / Schneider',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Switches & Sockets',
    desc: 'Modular switchboards & plates',
    silver: 'Standard Series',
    gold: 'Premium Series',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M18 12a6 6 0 11-12 0 6 6 0 0112 0zM12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Plumbing Fittings',
    desc: 'Pipes, valves & internal systems',
    silver: 'Standard Range',
    gold: 'Premium Range',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Bath Fittings',
    desc: 'Water closets, basins & bathroom accessories',
    silver: 'Jaquar / Cera (Standard)',
    gold: 'Kohler / Grohe / TOTO',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm-3 3h.01M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Flooring',
    desc: 'Vitrified tiles for living & bedrooms',
    silver: '2x4 ft Vitrified Tiles (₹50-60/sqft)',
    gold: '4x8 ft GVT / Italian Finish (₹120+/sqft)',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Wall Tiles',
    desc: 'Ceramic tiles for kitchen & toilets',
    silver: 'Standard Selection',
    gold: 'Premium Selection',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Kitchen',
    desc: 'Countertops, sink & cabinet hardware',
    silver: 'Granite Top + Stainless Sink',
    gold: 'Quartz Top + Hettich/Blum Hardware',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Doors & Windows',
    desc: 'Interior doors, frames & window systems',
    silver: '7-foot Flush Doors + UPVC',
    gold: '8-foot Teak Veneer + Premium Aluminum',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M15 7a2 2 0 012 2m-2 4a2 2 0 012-2m-2-4a2 2 0 11-4 0 2 2 0 014 0zM7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Paint Finish',
    desc: 'Wall putty, primer & final coats',
    silver: 'Standard Finish',
    gold: 'Premium Finish',
    isSame: false,
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PlanComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.25em] mb-4 block">
            Plan Comparison
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Silver vs. Gold
            <br />
            <span className="text-muted">Material Packages</span>
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
              <div className="flex items-center gap-3 mb-1.5">
                <div className="relative inline-block">
                  <span className="text-xl font-bold text-neutral-500">₹1,600</span>
                  <span className="price-strike" />
                </div>
                <span className="text-[10px] font-bold text-accent-red uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-red/10 border border-accent-red/20">
                  Save ₹50
                </span>
              </div>
              <div className="text-3xl font-black text-white">
                ₹1,550 <span className="text-xs text-muted font-normal">/ sq ft starting rate</span>
              </div>
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
              <div className="flex items-center gap-3 mb-1.5">
                <div className="relative inline-block">
                  <span className="text-xl font-bold text-neutral-500">₹1,900</span>
                  <span className="price-strike" style={{ animationDelay: '1.2s' }} />
                </div>
                <span className="text-[10px] font-bold text-accent-red uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-red/10 border border-accent-red/20">
                  Save ₹50
                </span>
              </div>
              <div className="text-3xl font-black text-accent-yellow">
                ₹1,850 <span className="text-xs text-muted font-normal">/ sq ft starting rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Comparison Table */}
        <div className="glass-card-premium rounded-3xl overflow-hidden border border-white/5 spec-table-container shadow-2xl">
          <div className="overflow-x-auto overflow-y-auto max-h-[680px]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-white/10 bg-[#0D0D0D]">
                  <th className="py-6 px-6 text-sm font-bold text-white uppercase tracking-wider">Specifications</th>
                  <th className="py-6 px-6 text-sm font-bold text-neutral-400 uppercase tracking-wider w-1/3">Silver Plan</th>
                  <th className="py-6 px-6 text-sm font-bold text-accent-yellow uppercase tracking-wider w-1/3 bg-accent-yellow/[0.04]">
                    <div className="flex items-center gap-2.5">
                      <span>Gold Plan</span>
                      <span className="text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30">★ Top Pick</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {specifications.map((spec) => (
                  <tr key={spec.name} className="hover:bg-white/[0.01] transition-colors duration-200">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.03] text-muted flex-shrink-0">
                          {spec.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-none mb-1">{spec.name}</p>
                          <p className="text-xs text-muted leading-tight">{spec.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <svg className="text-neutral-500 flex-shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-neutral-400">
                          {spec.silver}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 bg-accent-yellow/[0.02]">
                      <div className="flex items-center gap-2">
                        <svg className="text-accent-yellow flex-shrink-0 filter drop-shadow-[0_0_6px_rgba(255,214,10,0.5)]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-accent-yellow font-bold">
                          {spec.gold}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes section below the table */}
          <div className="p-6 bg-white/[0.01] border-t border-white/5">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-accent-yellow/10 text-accent-yellow flex-shrink-0 mt-0.5">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Both plans utilize trusted and approved brands. The Gold Plan offers higher-end specifications, premium-grade finishes, and top-tier product selections within the same brands, while the Silver Plan includes the standard quality options provided by the company.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#estimator" className="btn-primary w-full sm:w-auto min-h-[44px] justify-center">
            <span>Get Quote</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="https://wa.me/917987900965?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20Silver%20and%20Gold%20plans" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto min-h-[44px] justify-center">
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}
