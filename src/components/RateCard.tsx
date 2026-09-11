'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RATE_SECTIONS, TECHNICAL_NOTES, WHY_GOLD, type RateSection, type SpecItem } from '@/data/ratePlans';

/* ─────────────────── Icons (stroke style matches the rest of the site) ─────────────────── */
const ICONS: Record<RateSection['icon'], React.ReactNode> = {
  structure: (
    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  flooring: (
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  toilet: (
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm-3 3h.01M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  kitchen: (
    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
  ),
  ceiling: (
    <path d="M4 6h16M4 6v3m16-3v3M4 9h16M8 9v11M16 9v11M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
  ),
  electrical: (
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  doors: (
    <path d="M15 7a2 2 0 012 2m-2 4a2 2 0 012-2m-2-4a2 2 0 11-4 0 2 2 0 014 0zM7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  fabrication: (
    <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6M4 9l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  drainage: (
    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  painting: (
    <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

function CategoryIcon({ name }: { name: RateSection['icon'] }) {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}

/* ─────────────────── Helpers ─────────────────── */
function isAbsent(value: string) {
  return /^not (included|itemized)/i.test(value.trim());
}

// Painting/electrical specs often read as sequential steps ("X + Y"); render
// those as a short vertical list instead of one dense run-on sentence.
function ValueText({ value, emphasize }: { value: string; emphasize?: boolean }) {
  if (isAbsent(value)) {
    return <span className="italic text-muted/50">{value}</span>;
  }
  const steps = value.split(' + ').map((s) => s.trim());
  if (steps.length > 1) {
    return (
      <ul className="space-y-1">
        {steps.map((step, i) => (
          <li key={i} className={`flex gap-1.5 ${emphasize ? 'text-accent-yellow' : 'text-foreground/90'}`}>
            <span className="opacity-50 shrink-0">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <span className={emphasize ? 'text-accent-yellow' : 'text-foreground/90'}>{value}</span>;
}

function GoldBadge() {
  return (
    <span className="inline-block ml-2 align-middle px-2 py-0.5 rounded-full bg-accent-yellow/15 text-accent-yellow text-[9px] font-extrabold uppercase tracking-wider border border-accent-yellow/30 whitespace-nowrap">
      Gold Advantage
    </span>
  );
}

/* ─────────────────── Row ─────────────────── */
function SpecRow({ item }: { item: SpecItem }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-3 md:gap-4 px-5 sm:px-6 py-4 sm:py-5">
      <div>
        <p className="text-sm font-bold text-white leading-snug">{item.name}</p>
        {item.note && <p className="text-xs text-muted/70 mt-1 leading-relaxed">{item.note}</p>}
      </div>

      <div className="text-sm leading-relaxed">
        <span className="md:hidden text-[10px] uppercase tracking-wider text-muted/60 font-bold block mb-1">
          Silver
        </span>
        <ValueText value={item.silver} />
      </div>

      <div className="text-sm leading-relaxed">
        <span className="md:hidden text-[10px] uppercase tracking-wider text-accent-yellow/70 font-bold block mb-1">
          Gold
        </span>
        <ValueText value={item.gold} emphasize={item.highlight} />
        {item.highlight && !isAbsent(item.gold) && <GoldBadge />}
      </div>
    </div>
  );
}

/* ─────────────────── Category panel ─────────────────── */
function CategoryPanel({
  section,
  isOpen,
  onToggle,
}: {
  section: RateSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.015]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`rate-panel-${section.id}`}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition-colors min-h-[44px]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-accent-yellow flex items-center justify-center shrink-0">
            <CategoryIcon name={section.icon} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-white text-sm sm:text-base truncate">{section.title}</h4>
            <p className="text-xs text-muted">{section.items.length} specification{section.items.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-accent-yellow transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`rate-panel-${section.id}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="hidden md:grid grid-cols-[1.3fr_1fr_1fr] gap-4 px-6 py-2.5 sticky top-[72px] z-10 bg-[#0d0d0d] border-y border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Specification</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Silver</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-yellow">Gold</span>
            </div>
            <div className="divide-y divide-white/5 border-t border-white/5 md:border-t-0">
              {section.items.map((item) => (
                <SpecRow key={item.name} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── Main component ─────────────────── */
type FilterMode = 'all' | 'differences';

export default function RateCard() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([RATE_SECTIONS[0].id]));
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const query = search.trim().toLowerCase();
  const isFiltering = filterMode === 'differences' || query.length > 0;

  const visibleSections = useMemo(() => {
    return RATE_SECTIONS.map((section) => {
      const items = section.items.filter((item) => {
        if (filterMode === 'differences' && !item.highlight) return false;
        if (query) {
          const haystack = `${item.name} ${item.silver} ${item.gold} ${item.note ?? ''}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      });
      return { ...section, items };
    }).filter((section) => section.items.length > 0);
  }, [filterMode, query]);

  return (
    <div>
      {/* Why Choose Gold */}
      <div className="glass-card-premium p-6 sm:p-8 mb-10">
        <h3 className="text-accent-yellow font-black text-base sm:text-lg mb-5 flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 5.04M12 2.944v18.118" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Why Choose Gold?
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {WHY_GOLD.map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-accent-yellow shrink-0 mt-0.5">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex gap-2" role="group" aria-label="Filter specifications">
          <button
            onClick={() => setFilterMode('all')}
            aria-pressed={filterMode === 'all'}
            className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px] ${
              filterMode === 'all' ? 'bg-accent-yellow text-background' : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'
            }`}
          >
            All Specifications
          </button>
          <button
            onClick={() => setFilterMode('differences')}
            aria-pressed={filterMode === 'differences'}
            className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px] ${
              filterMode === 'differences' ? 'bg-accent-yellow text-background' : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'
            }`}
          >
            Differences Only
          </button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search specifications…"
              aria-label="Search specifications"
              className="w-full sm:w-56 pl-9 pr-3 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 outline-none focus:border-accent-yellow/50 transition-colors min-h-[40px]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mb-4">
        <button
          onClick={() => setOpenIds(new Set(RATE_SECTIONS.map((s) => s.id)))}
          className="text-xs font-semibold text-muted hover:text-white transition-colors"
        >
          Expand All
        </button>
        <button
          onClick={() => setOpenIds(new Set())}
          className="text-xs font-semibold text-muted hover:text-white transition-colors"
        >
          Collapse All
        </button>
      </div>

      {/* Category panels */}
      <div className="space-y-3">
        {visibleSections.map((section) => (
          <CategoryPanel
            key={section.id}
            section={section}
            isOpen={isFiltering || openIds.has(section.id)}
            onToggle={() => toggle(section.id)}
          />
        ))}
        {visibleSections.length === 0 && (
          <p className="text-center text-sm text-muted py-12">
            No specifications match your search.
          </p>
        )}
      </div>

      {/* Technical Notes */}
      <div className="mt-14">
        <h3 className="text-lg sm:text-xl font-black text-white mb-1.5 flex items-center gap-2">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-accent-yellow">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Technical Notes
        </h3>
        <p className="text-sm text-muted mb-6">These terms apply equally to both the Silver and Gold plans.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TECHNICAL_NOTES.map((note, i) => (
            <div key={i} className="glass-card p-4 flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-bold text-accent-yellow">
                {i + 1}
              </span>
              <p className="text-sm text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
