'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RATE_SECTIONS, type RateSection, type SpecItem } from '@/data/ratePlans';

export type PlanKey = 'silver' | 'gold';

const PLAN_META: Record<PlanKey, { name: string; rate: string; blurb: string; ink: string }> = {
  silver: {
    name: 'Silver Plan',
    rate: '₹1,550',
    blurb: 'Standard Quality Package',
    ink: '#8d8d8d',
  },
  gold: {
    name: 'Gold Plan',
    rate: '₹1,850',
    blurb: 'Premium Finish Package',
    ink: '#b08d1f',
  },
};

// One category per leaf: the left page of spread p is the back face of page
// p-1 (category 2p-2), the right page is the front face of page p (2p-1).
// One extra leaf carries the covers.
const TOTAL_PAGES = Math.ceil(RATE_SECTIONS.length / 2);
const frontSection = (i: number): RateSection | undefined => (i >= 1 ? RATE_SECTIONS[2 * i - 1] : undefined);
const backSection = (i: number): RateSection | undefined => RATE_SECTIONS[2 * i];

const LEATHER_NOISE =
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' mix-blend-mode='overlay'/%3E%3C/svg%3E")`;

const PAGE_LEFT =
  'rounded-l-lg lg:rounded-l-xl border-r border-black/10 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06),_-2px_5px_15px_rgba(0,0,0,0.1)]';
const PAGE_RIGHT =
  'rounded-r-lg lg:rounded-r-xl border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06),_2px_5px_15px_rgba(0,0,0,0.1)]';

/* ─────────────────── Category icons ─────────────────── */
const ICONS: Record<RateSection['icon'], React.ReactNode> = {
  structure: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />,
  flooring: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />,
  toilet: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm-3 3h.01M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />,
  kitchen: <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />,
  ceiling: <path d="M4 6h16M4 6v3m16-3v3M4 9h16M8 9v11M16 9v11M4 20h16" strokeLinecap="round" strokeLinejoin="round" />,
  electrical: <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />,
  doors: <path d="M15 7a2 2 0 012 2m-2 4a2 2 0 012-2m-2-4a2 2 0 11-4 0 2 2 0 014 0zM7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />,
  fabrication: <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6M4 9l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />,
  drainage: <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />,
  painting: <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />,
};

function isAbsent(value: string) {
  return /^not (included|itemized)/i.test(value.trim());
}

/** Painting and electrical read as sequential steps ("X + Y"); list them. */
function SpecValue({ value }: { value: string }) {
  if (isAbsent(value)) return <span className="italic text-neutral-400">{value}</span>;
  const steps = value.split(' + ').map((s) => s.trim());
  if (steps.length > 1) {
    return (
      <ol className="space-y-0.5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-neutral-400 shrink-0">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    );
  }
  return <span>{value}</span>;
}

function SpecList({ items, plan }: { items: SpecItem[]; plan: PlanKey }) {
  return (
    <dl className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="border-b border-neutral-200/80 pb-3 last:border-0 last:pb-0">
          <dt className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-500 mb-0.5">
            {item.name}
          </dt>
          <dd className="text-[11px] sm:text-[13px] text-neutral-800 leading-snug">
            <SpecValue value={plan === 'silver' ? item.silver : item.gold} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** One cream leaf carrying a specification category. */
function SpecPage({
  section,
  side,
  pageNumber,
  plan,
}: {
  section: RateSection;
  side: 'left' | 'right';
  pageNumber: number;
  plan: PlanKey;
}) {
  const isLeft = side === 'left';
  return (
    <div className={`absolute inset-0 bg-[#f4f2eb] flex flex-col overflow-hidden ${isLeft ? PAGE_LEFT : PAGE_RIGHT}`}>
      <div
        className={`absolute top-0 bottom-0 w-8 z-10 pointer-events-none ${
          isLeft
            ? 'right-0 bg-gradient-to-l from-[rgba(0,0,0,0.08)] to-transparent'
            : 'left-0 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-transparent'
        }`}
      />
      <div className="relative z-0 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col text-neutral-900">
        <div className="shrink-0 flex items-start justify-between gap-3 border-b border-neutral-300 pb-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span style={{ color: PLAN_META[plan].ink }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {ICONS[section.icon]}
              </svg>
            </span>
            <h3
              className="font-black text-neutral-900 text-sm sm:text-lg leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {section.title}
            </h3>
          </div>
          <span
            className="shrink-0 text-neutral-300 font-bold text-base sm:text-xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {String(pageNumber).padStart(2, '0')}
          </span>
        </div>

        {/* Long categories scroll rather than spill off the leaf */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <SpecList items={section.items} plan={plan} />
        </div>
      </div>
    </div>
  );
}

function Cover({ plan, isClosed }: { plan: PlanKey; isClosed: boolean }) {
  const meta = PLAN_META[plan];
  return (
    <div
      className="absolute inset-0 rounded-r-lg lg:rounded-r-xl overflow-hidden"
      style={{
        backgroundColor: '#3d2314',
        backgroundImage: `${LEATHER_NOISE}, linear-gradient(135deg, #4a2f1d 0%, #29150b 100%)`,
        boxShadow:
          'inset 4px 0 10px rgba(0,0,0,0.6), inset -4px 0 10px rgba(255,255,255,0.1), 10px 20px 40px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="absolute inset-4 border-2 border-[rgba(0,0,0,0.4)] rounded-sm"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)' }}
      />
      <div className="absolute left-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
      <div className="absolute left-[6%] top-0 bottom-0 w-[1px] bg-[rgba(0,0,0,0.8)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 sm:w-28 sm:h-28 relative opacity-70 mix-blend-overlay drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          <Image src="/logo.png" alt="RCC" fill className="object-contain" />
        </div>
        <p
          className="mt-5 text-[#d4af37] text-xl sm:text-3xl font-black tracking-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {meta.name}
        </p>
        <p className="text-[#d4af37]/60 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mt-1">
          {meta.blurb}
        </p>
        <p className="mt-6 text-white/90 text-2xl sm:text-4xl font-black tabular-nums">{meta.rate}</p>
        <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-1">
          per sq ft &middot; starting rate
        </p>
        <p className="text-white/30 text-[10px] sm:text-xs mt-4">
          {RATE_SECTIONS.length} sections &middot; {RATE_SECTIONS.reduce((n, s) => n + s.items.length, 0)} specifications
        </p>
      </div>

      <div
        className={`absolute bottom-6 right-6 flex items-center gap-2 text-[#d4af37] text-[10px] sm:text-xs tracking-widest uppercase transition-opacity duration-500 ${
          isClosed ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          Click to Open <span className="text-lg inline-block ml-1">→</span>
        </motion.span>
      </div>
    </div>
  );
}

function BackCover() {
  return (
    <div
      className="w-full h-full relative border-r border-black/80 rounded-l-lg lg:rounded-l-xl overflow-hidden"
      style={{
        backgroundColor: '#3d2314',
        backgroundImage: `${LEATHER_NOISE}, linear-gradient(135deg, #29150b 0%, #4a2f1d 100%)`,
        boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.6), inset 4px 0 10px rgba(255,255,255,0.1)',
      }}
    >
      <div
        className="absolute inset-4 border-2 border-[rgba(0,0,0,0.4)] rounded-sm"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)' }}
      />
      <div className="absolute right-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-l from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
    </div>
  );
}

/* ─────────────────── Overlay ─────────────────── */
export default function PlanBook({
  plan,
  page,
  onPageChange,
  onClose,
}: {
  plan: PlanKey | null;
  page: number;
  onPageChange: (p: number) => void;
  onClose: () => void;
}) {
  const open = plan !== null;
  const isLastPage = page === TOTAL_PAGES;

  const goNext = useCallback(() => onPageChange(Math.min(page + 1, TOTAL_PAGES)), [page, onPageChange]);
  const goPrev = useCallback(() => onPageChange(Math.max(page - 1, 0)), [page, onPageChange]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${PLAN_META[plan].name} specifications`}
          className="fixed inset-0 z-[120] bg-background/[0.97] backdrop-blur-2xl flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-yellow"
            aria-label="Close plan specifications"
          >
            ✕
          </button>

          {/* Mobile: the flip mechanic does not survive a phone screen, so the
              same content is presented as a plain scrolling list. */}
          <div className="md:hidden flex-1 overflow-y-auto px-4 pt-16 pb-10">
            <p className="text-accent-yellow text-[10px] font-bold uppercase tracking-[0.2em] text-center">
              {PLAN_META[plan].blurb}
            </p>
            <h2 className="text-2xl font-black text-center mt-1">{PLAN_META[plan].name}</h2>
            <p className="text-center text-3xl font-black text-white mt-3 tabular-nums">{PLAN_META[plan].rate}</p>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted mt-1 mb-8">
              per sq ft &middot; starting rate
            </p>
            <div className="space-y-4">
              {RATE_SECTIONS.map((section) => (
                <div key={section.id} className="bg-[#f4f2eb] rounded-2xl p-5 text-neutral-900">
                  <div className="flex items-center gap-2.5 border-b border-neutral-300 pb-3 mb-3">
                    <span style={{ color: PLAN_META[plan].ink }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        {ICONS[section.icon]}
                      </svg>
                    </span>
                    <h3 className="font-black text-sm" style={{ fontFamily: 'var(--font-serif)' }}>
                      {section.title}
                    </h3>
                  </div>
                  <SpecList items={section.items} plan={plan} />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={onClose} className="btn-secondary !py-3 !px-8 !text-sm">
                Close
              </button>
            </div>
          </div>

          {/* Desktop: the book */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 min-h-0 w-full px-6 pt-14">
            <div
              className="relative w-[86vw] lg:w-[72vw] max-w-[1060px] aspect-[2/1.3] select-none"
              style={{ perspective: '3000px' }}
            >
              <div className="absolute top-0 bottom-0 left-1/2 w-1/2" style={{ transformStyle: 'preserve-3d' }}>
                {Array.from({ length: TOTAL_PAGES + 1 }).map((_, i) => {
                  const isFlipped = i < page;
                  const front = frontSection(i);
                  const back = backSection(i);
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 origin-left rounded-r-lg lg:rounded-r-xl"
                      initial={false}
                      animate={{ rotateY: isFlipped ? -180 : 0, z: isFlipped ? i * 2 : -i * 2 }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ zIndex: isFlipped ? i : TOTAL_PAGES - i, transformStyle: 'preserve-3d' }}
                    >
                      {/* FRONT (right page) */}
                      <div
                        className="absolute inset-0"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        {i === 0 ? (
                          <div
                            className="w-full h-full relative cursor-pointer"
                            onClick={() => page === 0 && onPageChange(1)}
                          >
                            <Cover plan={plan} isClosed={page === 0} />
                          </div>
                        ) : front ? (
                          <SpecPage section={front} side="right" pageNumber={2 * i} plan={plan} />
                        ) : null}
                      </div>

                      {/* BACK (left page) */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        {back ? (
                          <SpecPage section={back} side="left" pageNumber={2 * i + 1} plan={plan} />
                        ) : (
                          <BackCover />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="w-full flex justify-center items-center gap-4 md:gap-8 shrink-0 py-5">
              <button
                onClick={goPrev}
                disabled={page === 0}
                className="btn-secondary !px-5 !py-3 backdrop-blur-xl bg-white/5 border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-xs md:text-sm font-medium text-muted tracking-widest uppercase tabular-nums px-2">
                {page === 0 ? 'Cover' : `${page} / ${TOTAL_PAGES}`}
              </span>
              <button
                onClick={isLastPage ? onClose : goNext}
                className={`btn-secondary !px-5 !py-3 backdrop-blur-xl ${
                  isLastPage ? 'border-accent-yellow/40 text-accent-yellow' : 'bg-white/5 border-white/10'
                }`}
              >
                {isLastPage ? 'Close ✦' : 'Next →'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
