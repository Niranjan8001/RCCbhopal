'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { label: 'Silver', rate: 1500, color: '#C0C0C0' },
  { label: 'Gold', rate: 1800, color: '#FFD60A' },
];

const buildTypes = [
  { label: 'Singlex', multiplier: 1, desc: '1 Floor' },
  { label: 'Duplex', multiplier: 2, desc: '2 Floors' },
  { label: 'Triplex', multiplier: 3, desc: '3 Floors' },
];

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString('en-IN'));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = v;
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={displayRef} className="tabular-nums" />;
}

export default function CostEstimator() {
  const [area, setArea] = useState(1500);
  const [tierIndex, setTierIndex] = useState(0);
  const [buildIndex, setBuildIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const cost = area * tiers[tierIndex].rate * buildTypes[buildIndex].multiplier;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        '.estimator-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.estimator-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(parseInt(e.target.value));
  }, []);

  const sliderPercent = ((area - 500) / (10000 - 500)) * 100;

  return (
    <section ref={sectionRef} className="section-padding relative" id="estimator">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 estimator-heading">
          <span className="text-accent-blue text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Estimator
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Instant Cost
            <br />
            <span className="text-muted">Calculator</span>
          </h2>
          <p className="text-muted max-w-md mx-auto text-sm md:text-base">
            Get an approximate project cost in seconds. Adjust area, tier, and build type.
          </p>
        </div>

        {/* Estimator card */}
        <div ref={cardRef} className="max-w-2xl mx-auto opacity-0">
          <div className="glass-card-premium p-8 sm:p-12 relative overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 transition-colors duration-500"
              style={{ background: tiers[tierIndex].color }}
            />

            {/* Area Slider */}
            <div className="mb-10 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-muted flex items-center gap-2">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-60">
                    <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Project Area
                </label>
                <span className="text-2xl font-bold">
                  <AnimatedNumber value={area} /> <span className="text-sm text-muted font-normal">sq ft</span>
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={area}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
                  style={{
                    background: `linear-gradient(to right, ${tiers[tierIndex].color} ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted">
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {/* Tier Toggle */}
            <div className="mb-10 relative z-10">
              <label className="text-sm font-medium text-muted mb-4 block">Construction Tier</label>
              <div className="flex gap-3">
                {tiers.map((tier, i) => (
                  <button
                    key={tier.label}
                    onClick={() => setTierIndex(i)}
                    className={`flex-1 py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all duration-400 cursor-pointer ${
                      tierIndex === i
                        ? 'text-background scale-[1.02]'
                        : 'text-muted border border-white/10 hover:border-white/20 bg-transparent'
                    }`}
                    style={
                      tierIndex === i
                        ? { background: tier.color, boxShadow: `0 0 30px ${tier.color}30` }
                        : {}
                    }
                  >
                    {tier.label}
                    <span className="block text-xs font-normal mt-1 opacity-70">
                      ₹{tier.rate.toLocaleString()}/sqft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Build Type Toggle */}
            <div className="mb-10 relative z-10">
              <label className="text-sm font-medium text-muted mb-4 block">Build Type</label>
              <div className="flex gap-3">
                {buildTypes.map((bt, i) => (
                  <button
                    key={bt.label}
                    onClick={() => setBuildIndex(i)}
                    className={`flex-1 py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all duration-400 cursor-pointer ${
                      buildIndex === i
                        ? 'text-background scale-[1.02]'
                        : 'text-muted border border-white/10 hover:border-white/20 bg-transparent'
                    }`}
                    style={
                      buildIndex === i
                        ? { background: '#22C55E', boxShadow: '0 0 30px #22C55E30' }
                        : {}
                    }
                  >
                    {bt.label}
                    <span className="block text-xs font-normal mt-1 opacity-70">
                      {bt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Display */}
            <div className="relative z-10 text-center pt-8 border-t border-white/10">
              <span className="text-sm text-muted block mb-2">Estimated Cost</span>
              <div className="text-5xl sm:text-6xl font-black tracking-tight cost-glow">
                <span className="text-muted text-3xl mr-1">₹</span>
                <motion.span
                  style={{ color: tiers[tierIndex].color }}
                  className="transition-colors duration-500"
                >
                  <AnimatedNumber value={cost} />
                </motion.span>
                <span className="text-muted text-2xl ml-1">*</span>
              </div>
              <p className="text-sm text-muted mt-4 leading-relaxed mb-8">
                * This is an approximate estimate. Final cost may vary based on materials and specifications.
              </p>

              {/* CTA Button */}
              <a
                href="https://wa.me/917987900965?text=Hi%2C%20I%20need%20a%20cost%20estimate%20for%20my%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-8 !py-4 !text-base"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Get Detailed Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
