'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Every stage carries a real RCC image rather than a stroke icon: the first
 * two from the drawing sets in DESIGN_GALLERY, the last two from the logged
 * site visits in src/data/siteVisits.ts, captioned with the locality and
 * month they were actually taken.
 *
 * Line drawings are framed 'contain' so nothing is cropped off a sheet, the
 * same distinction DESIGN_GALLERY draws.
 */
const steps = [
  {
    title: 'Plan',
    description: 'In-depth consultation to understand your vision, requirements, and budget.',
    image: '/images/3d-design/plan-ground-floor.png',
    alt: 'Ground floor plan showing bedrooms, dining, hall, kitchen, lobby, porch and parking',
    caption: 'Ground floor plan — residential drawing set',
    fit: 'contain' as const,
    color: '#FFD60A',
  },
  {
    title: 'Design',
    description: 'Architectural blueprints and 3D visualizations crafted by experienced designers.',
    image: '/images/3d-design/exterior-1.jpg',
    alt: '3D exterior elevation render of a three-storey corner residence with grey and wood cladding',
    caption: '3D exterior elevation render',
    fit: 'cover' as const,
    color: '#0A84FF',
  },
  {
    title: 'Build',
    description: 'Premium materials and expert craftsmanship bring your blueprint to reality.',
    image: '/images/site-visits/padariya-ryt/visit-1.jpeg',
    alt: 'Multi-storey RCC frame at an open framing stage, columns and slab cast ahead of walling',
    caption: 'Padariya Ryt. · December 2023',
    fit: 'cover' as const,
    color: '#30D158',
  },
  {
    title: 'Deliver',
    description: 'Final walkthrough, quality assurance, and keys to your dream handed over.',
    image: '/images/site-visits/singhodi-basti/visit-1.jpeg',
    alt: 'Exterior plaster and window-frame finishing under review on a completed facade',
    caption: 'Singhodi Basti · July 2023',
    fit: 'cover' as const,
    color: '#FF3B30',
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(
        '.process-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        lineRef.current.style.strokeDasharray = `${length}`;
        lineRef.current.style.strokeDashoffset = `${length}`;

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 70%',
            scrub: 1,
          },
        });
      }

      // Steps pop in
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative" id="process">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 process-heading">
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            From Vision
            <br />
            <span className="text-muted">To Reality</span>
          </h2>
          <p className="text-muted max-w-md mx-auto text-sm md:text-base">
            A proven 4-step approach that turns your dream into a landmark.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* SVG connecting line - desktop */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 hidden md:block"
            preserveAspectRatio="none"
          >
            <path
              d={`M 0.5 0 L 0.5 ${steps.length * 300}`}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              fill="none"
            />
            <path
              ref={lineRef}
              d={`M 0.5 0 L 0.5 ${steps.length * 300}`}
              stroke="url(#lineGrad)"
              strokeWidth="2"
              fill="none"
              className="timeline-line"
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD60A" />
                <stop offset="33%" stopColor="#0A84FF" />
                <stop offset="66%" stopColor="#30D158" />
                <stop offset="100%" stopColor="#FF3B30" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mobile connecting dots */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-yellow via-accent-blue via-accent-green to-accent-red opacity-20" />

          {/* Steps */}
          <div className="space-y-20 md:space-y-32">
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card relative overflow-hidden group transition-all duration-500 hover:-translate-y-1"
                    style={{
                      boxShadow: 'none',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px -20px ${step.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* The stage, photographed or drawn */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0C0C0C]">
                      {step.fit === 'contain' && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-50"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 7px)',
                          }}
                        />
                      )}
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className={`${step.fit === 'contain' ? 'object-contain p-3' : 'object-cover'} transition-transform duration-700 group-hover:scale-[1.04]`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                      <p className="absolute bottom-2.5 left-4 right-4 font-mono text-[10px] tracking-[0.12em] text-white/70 text-left">
                        {step.caption}
                      </p>
                    </div>

                    <div
                      className="absolute inset-0 opacity-5 pointer-events-none"
                      style={{ background: `radial-gradient(circle at ${i % 2 === 0 ? 'right' : 'left'} center, ${step.color}, transparent 70%)` }}
                    />
                    <div className="relative z-10 p-8 md:p-10">
                      <span
                        className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
                        style={{ color: step.color }}
                      >
                        Step {i + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Centre node — the icon it replaces is now the card's image */}
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl hidden md:flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-500 hover:scale-110 font-black text-2xl tabular-nums"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    color: step.color,
                    boxShadow: `0 0 30px ${step.color}15`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
