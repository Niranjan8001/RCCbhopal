'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurPresence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      }

      if (cardRef.current) {
        gsap.fromTo(cardRef.current, { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }

      if (mapRef.current) {
        gsap.fromTo(mapRef.current, { x: 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToReviews = () => {
    const el = document.getElementById('testimonials');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            Visit Our
            <br />
            <span className="text-muted">Office</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Delivering RCC excellence from our headquarters in Bhopal — where trust meets engineering precision.
          </p>
        </div>

        {/* ─── Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* ─── LEFT: Business Identity Card ─── */}
          <div ref={cardRef} className="opacity-0">
            <div className="glass-card-premium h-full p-8 md:p-10 relative overflow-hidden group flex flex-col">
              {/* Inner glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent-blue/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-yellow/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Top badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 mb-6 w-fit">
                  <svg width="14" height="14" fill="#FFD60A" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span className="text-[11px] font-bold text-accent-yellow uppercase tracking-wider">Top Rated Construction Company in Bhopal</span>
                </div>

                {/* Business Name + Verified */}
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                    Reliable Construction<br />&amp; Consultancy (RCC)
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-[11px] font-bold text-accent-blue uppercase tracking-wider">Verified Business</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black text-white">5.0</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FFD60A">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted">(13 Google Reviews)</span>
                </div>

                {/* Category & Address */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted">Construction Company</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted">
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted leading-relaxed">Katara Hills, Bhopal, MP 462043</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
                    </div>
                    <span className="text-sm font-semibold text-accent-green">Open Now</span>
                  </div>
                </div>

                {/* Mini review snippet */}
                <div className="glass-card px-5 py-4 mb-8 !rounded-xl relative">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FFD60A">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/80 italic leading-relaxed">
                    &quot;Professional and high-quality construction work. Truly reliable!&quot;
                  </p>
                  <p className="text-[11px] text-muted mt-2">— Google Review</p>
                </div>

                {/* ─── Action Buttons ─── */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {/* Call Now */}
                  <a
                    href="tel:8435973391"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-bold transition-all duration-300 hover:bg-accent-green hover:text-black hover:shadow-[0_0_25px_rgba(48,209,88,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Call Now
                  </a>

                  {/* Get Directions */}
                  <a
                    href="https://www.google.com/maps?q=23.2599,77.4126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-bold transition-all duration-300 hover:bg-accent-blue hover:text-white hover:shadow-[0_0_25px_rgba(10,132,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Directions
                  </a>

                  {/* View Reviews */}
                  <button
                    onClick={handleScrollToReviews}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-sm font-bold transition-all duration-300 hover:bg-accent-yellow hover:text-black hover:shadow-[0_0_25px_rgba(255,214,10,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Reviews
                  </button>

                  {/* Share Location */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'RCC Bhopal',
                          text: 'Reliable Construction & Consultancy, Katara Hills, Bhopal',
                          url: 'https://www.google.com/maps?q=23.2599,77.4126',
                        });
                      } else {
                        navigator.clipboard.writeText('https://www.google.com/maps?q=23.2599,77.4126');
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-muted text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Map ─── */}
          <div ref={mapRef} className="opacity-0">
            <div className="relative group h-full">
              {/* Animated glowing border */}
              <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-accent-yellow/40 via-accent-blue/30 to-accent-yellow/40 opacity-30 group-hover:opacity-70 blur-[3px] transition-opacity duration-700 pointer-events-none" />

              {/* Map container */}
              <div className="relative glass-card-strong rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 h-full flex flex-col transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-15px_rgba(10,132,255,0.2)]">
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
                      <span className="text-sm font-semibold text-white">📍 RCC HQ – Bhopal</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[10px] text-accent-green font-semibold uppercase tracking-wider">Live</span>
                  </div>
                </div>

                {/* Google Maps Embed — exact coordinates, zoom 16 */}
                <div className="w-full flex-1 min-h-[350px] md:min-h-[450px] relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1832.5!2d77.4126!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzM1LjYiTiA3N8KwMjQnNDUuNCJF!5e0!3m2!1sen!2sin!4v1712345678901!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: 'invert(0.92) hue-rotate(180deg) saturate(0.25) brightness(0.65) contrast(1.1)',
                      position: 'absolute',
                      inset: 0,
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RCC Office - Katara Hills, Bhopal"
                  />
                  {/* Dark premium overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Map footer */}
                <div className="px-6 py-3 flex items-center justify-between border-t border-white/5 bg-white/[0.02]">
                  <span className="text-xs text-muted">Reliable Construction &amp; Consultancy</span>
                  <a
                    href="https://www.google.com/maps?q=23.2599,77.4126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-accent-blue font-semibold hover:underline transition-colors"
                  >
                    Open in Google Maps
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
