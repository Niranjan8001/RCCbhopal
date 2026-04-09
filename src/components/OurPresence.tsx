'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Project location data (scalable: add more in the future) ── */
interface ProjectLocation {
  name: string;
  area: string;
  type: string;
  status: 'completed' | 'active' | 'upcoming';
}

const PROJECT_LOCATIONS: ProjectLocation[] = [
  { name: 'RCC Head Office', area: 'Bhopal, MP', type: 'Main Office', status: 'active' },
  { name: 'Residential Tower – Phase I', area: 'Kolar Road, Bhopal', type: 'Residential', status: 'completed' },
  { name: 'Commercial Complex', area: 'MP Nagar, Bhopal', type: 'Commercial', status: 'completed' },
  { name: 'Villa Project', area: 'Hoshangabad Rd, Bhopal', type: 'Residential', status: 'active' },
];

/* ── Stat items shown alongside trust text ── */
const TRUST_STATS = [
  {
    value: '50+',
    label: 'RCC Projects Completed',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '10+',
    label: 'Active Sites Across the City',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '100%',
    label: 'Trusted by Homeowners & Builders',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ── Status badge color map ── */
const STATUS_COLORS: Record<ProjectLocation['status'], string> = {
  completed: '#30D158',
  active: '#FFD60A',
  upcoming: '#0A84FF',
};

export default function OurPresence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Heading slide-up ── */
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      /* ── Left panel fade-in ── */
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      /* ── Right panel (map) fade-in ── */
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      /* ── Project location cards stagger ── */
      if (locationsRef.current) {
        gsap.fromTo(
          locationsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: locationsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      id="presence"
    >
      {/* ─── Background Ambience ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ─── Section Header ─── */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="text-accent-blue text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Presence
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            Built Across
            <br />
            <span className="text-muted">The City</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Delivering RCC excellence across multiple locations — from residential towers to commercial landmarks.
          </p>
        </div>

        {/* ─── Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ─── Left: Trust Content ─── */}
          <div ref={leftRef} className="opacity-0">
            {/* Trust paragraph */}
            <div className="glass-card p-8 md:p-10 mb-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(10,132,255,0.15)]">
              {/* Subtle inner glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-blue/15 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
                  A Legacy of
                  <span className="text-accent-blue"> Reliable Construction</span>
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
                  With years of hands-on experience in RCC construction, we&apos;ve established a strong footprint
                  across Bhopal. Our projects stand as a testament to structural integrity, premium craftsmanship,
                  and unwavering commitment to quality — from foundation to finish.
                </p>

                {/* ─── Trust Stats ─── */}
                <div className="space-y-5">
                  {TRUST_STATS.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 group/stat"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(10, 132, 255, 0.08)',
                          border: '1px solid rgba(10, 132, 255, 0.15)',
                          color: '#0A84FF',
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div>
                        <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                          {stat.value}
                        </span>
                        <span className="text-muted text-sm ml-2">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── View All Locations Button ─── */}
            <a
              href="#presence"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent-blue/30 text-accent-blue text-sm font-bold tracking-widest uppercase transition-all duration-400 hover:bg-accent-blue hover:text-white hover:shadow-[0_0_30px_rgba(10,132,255,0.3)] hover:border-transparent group/btn"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View All Locations
            </a>
          </div>

          {/* ─── Right: Map ─── */}
          <div ref={rightRef} className="opacity-0">
            <div className="relative group">
              {/* Animated glowing border */}
              <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-accent-blue/50 via-accent-yellow/30 to-accent-blue/50 opacity-40 group-hover:opacity-70 blur-[2px] transition-opacity duration-700 pointer-events-none" />

              {/* Map container */}
              <div className="relative glass-card-strong rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-15px_rgba(10,132,255,0.2)]">
                {/* Map header bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                      <svg width="16" height="16" fill="none" stroke="#0A84FF" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">Bhopal, Madhya Pradesh</span>
                      <span className="text-xs text-muted ml-2">HQ</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[10px] text-accent-green font-semibold uppercase tracking-wider">Live</span>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="w-full aspect-[4/3] md:aspect-[16/11]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117063.53449498255!2d77.34525474132489!3d23.259329762207876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RCC Bhopal Office Location"
                  />
                </div>

                {/* Map footer */}
                <div className="px-6 py-3 flex items-center justify-between border-t border-white/5 bg-white/[0.02]">
                  <span className="text-xs text-muted">Reliable Construction & Consultancy</span>
                  <a
                    href="https://maps.google.com/?q=Bhopal,Madhya+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-blue font-semibold hover:underline transition-colors"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Project Locations Grid ─── */}
        <div ref={locationsRef} className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PROJECT_LOCATIONS.map((loc, i) => (
            <div
              key={i}
              className="glass-card p-6 group/loc transition-all duration-400 hover:-translate-y-1 hover:border-white/15 cursor-default"
            >
              {/* Status dot & label */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                  style={{
                    color: STATUS_COLORS[loc.status],
                    background: `${STATUS_COLORS[loc.status]}12`,
                    border: `1px solid ${STATUS_COLORS[loc.status]}25`,
                  }}
                >
                  {loc.status}
                </span>
                <span className="text-[10px] text-muted uppercase tracking-wider font-medium">{loc.type}</span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1 tracking-tight group-hover/loc:text-accent-blue transition-colors duration-300">
                {loc.name}
              </h4>
              <p className="text-xs text-muted flex items-center gap-1.5">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="opacity-50">
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {loc.area}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
