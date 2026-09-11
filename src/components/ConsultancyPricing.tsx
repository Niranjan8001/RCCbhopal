'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  CONSULTANCY_SERVICES,
  BUNDLE_ONE_TIME_DISCOUNT_PERCENT,
  CONSULTANCY_SQFT_THRESHOLD,
} from '@/data/consultancyPricing';
import ResponseTimeNote from './ResponseTimeNote';
import { trackEvent } from '@/lib/analytics';

type Tier = 'under' | 'over';
type PlanType = 'simplex' | 'duplex' | 'triplex';

function AnimatedRupees({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => `₹${Math.round(v).toLocaleString('en-IN')}`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref} className="tabular-nums" />;
}

const PLAN_LABELS: { key: PlanType; label: string }[] = [
  { key: 'simplex', label: 'Simplex' },
  { key: 'duplex', label: 'Duplex' },
  { key: 'triplex', label: 'Triplex' },
];

export default function ConsultancyPricing() {
  const [tier, setTier] = useState<Tier>('under');
  const [area, setArea] = useState(6000);

  const bundle = useMemo(() => CONSULTANCY_SERVICES.find((s) => s.isBundle)!, []);
  const bundleAreaPrice = bundle.ratePerSqft * area;
  const bundleDiscounted = bundleAreaPrice * (1 - BUNDLE_ONE_TIME_DISCOUNT_PERCENT / 100);

  const sliderPercent = ((area - CONSULTANCY_SQFT_THRESHOLD) / (20000 - CONSULTANCY_SQFT_THRESHOLD)) * 100;

  return (
    <section className="section-padding relative overflow-hidden" id="consultancy-pricing">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-accent-green/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.25em] mb-4 block">
            Design &amp; Consultancy
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            Transparent Consultancy
            <br />
            <span className="text-muted">Pricing</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            The design work behind every project — floor plans, elevations, and structural drawings —
            priced upfront. Consultancy is a paid service, published here rather than left as a
            free-estimate guessing game.
          </p>
        </motion.div>

        {/* Tier toggle */}
        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setTier('under')}
            aria-pressed={tier === 'under'}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
              tier === 'under' ? 'bg-accent-yellow text-background' : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'
            }`}
          >
            Under 5,000 sq ft
          </button>
          <button
            onClick={() => setTier('over')}
            aria-pressed={tier === 'over'}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
              tier === 'over' ? 'bg-accent-yellow text-background' : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'
            }`}
          >
            5,000 sq ft &amp; Above
          </button>
        </div>

        {tier === 'under' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-card-premium rounded-3xl overflow-hidden border border-white/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0D0D0D]">
                    <th className="py-5 px-5 sm:px-6 text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Service
                    </th>
                    {PLAN_LABELS.map((p) => (
                      <th key={p.key} className="py-5 px-5 sm:px-6 text-xs sm:text-sm font-bold text-muted uppercase tracking-wider text-right">
                        {p.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {CONSULTANCY_SERVICES.map((service) => (
                    <tr
                      key={service.name}
                      className={`transition-colors duration-200 ${service.isBundle ? 'bg-accent-yellow/[0.04]' : 'hover:bg-white/[0.015]'}`}
                    >
                      <td className="py-4 px-5 sm:px-6">
                        <span className={`text-sm ${service.isBundle ? 'font-black text-accent-yellow' : 'font-semibold text-white'}`}>
                          {service.name}
                        </span>
                      </td>
                      {PLAN_LABELS.map((p) => (
                        <td
                          key={p.key}
                          className={`py-4 px-5 sm:px-6 text-right tabular-nums ${
                            service.isBundle ? 'text-lg font-black text-accent-yellow' : 'text-sm text-foreground/90'
                          }`}
                        >
                          ₹{service[p.key].toLocaleString('en-IN')}/-
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 sm:p-6 bg-accent-green/[0.04] border-t border-accent-green/10 flex items-start gap-3">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-accent-green shrink-0 mt-0.5">
                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Get an extra <strong className="text-accent-green">{BUNDLE_ONE_TIME_DISCOUNT_PERCENT}% discount</strong> on
                the Complete Civil Drawings set with a one-time payment.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-card-premium p-6 sm:p-10 rounded-3xl border border-white/5"
          >
            {/* Area slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="consultancy-area" className="text-sm font-medium text-muted flex items-center gap-2">
                  Project Area
                </label>
                <span className="text-xl font-bold text-white">
                  {area.toLocaleString('en-IN')} <span className="text-sm text-muted font-normal">sq ft</span>
                </span>
              </div>
              <input
                id="consultancy-area"
                type="range"
                min={CONSULTANCY_SQFT_THRESHOLD}
                max={20000}
                step={100}
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2 outline-none"
                style={{
                  background: `linear-gradient(to right, #FFD60A ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-muted">
                <span>{CONSULTANCY_SQFT_THRESHOLD.toLocaleString('en-IN')} sq ft</span>
                <span>20,000 sq ft</span>
              </div>
            </div>

            {/* Per-service rates at this area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {CONSULTANCY_SERVICES.filter((s) => !s.isBundle).map((service) => (
                <div key={service.name} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-sm text-muted">{service.name}</span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    <AnimatedRupees value={service.ratePerSqft * area} />
                  </span>
                </div>
              ))}
            </div>

            {/* Bundle total */}
            <div className="text-center pt-8 border-t border-white/10">
              <span className="text-sm text-muted block mb-2">Complete Civil Drawings (₹{bundle.ratePerSqft}/sq ft)</span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-accent-yellow mb-2">
                <AnimatedRupees value={bundleAreaPrice} />
              </div>
              <p className="text-sm text-accent-green">
                Pay in full upfront and save {BUNDLE_ONE_TIME_DISCOUNT_PERCENT}%: <strong><AnimatedRupees value={bundleDiscounted} /></strong>
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/917987900965?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20design%20%26%20consultancy%20services"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'consultancy_pricing' })}
            className="btn-primary w-full sm:w-auto min-h-[44px] justify-center"
          >
            Get a Custom Quote
          </a>
        </div>
        <ResponseTimeNote className="mt-4" />
      </div>
    </section>
  );
}
