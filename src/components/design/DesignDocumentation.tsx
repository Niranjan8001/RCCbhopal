'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { DesignSection } from '@/data/designShowcase';
import ImageLightbox from './ImageLightbox';

type FilterKey = 'all' | 'elevation' | 'floor-plan' | 'column-layout';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'elevation', label: 'Elevations' },
  { key: 'floor-plan', label: 'Floor Plans' },
  { key: 'column-layout', label: 'Column Layouts' },
];

export default function DesignDocumentation({ section }: { section: DesignSection }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'all') return section.images;
    return section.images.filter((img) => img.category === filter);
  }, [filter, section.images]);

  const current = filtered[Math.min(active, filtered.length - 1)] ?? filtered[0];

  const selectFilter = (key: FilterKey) => {
    setFilter(key);
    setActive(0);
  };

  if (!current) return null;

  return (
    <div id={section.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="mb-8 sm:mb-10 text-center"
      >
        <span className="text-accent-yellow text-xs sm:text-sm font-bold uppercase tracking-[0.25em] block mb-3">
          {section.eyebrow}
        </span>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">{section.title}</h3>
        <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">{section.description}</p>
      </motion.div>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Filter technical drawings">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => selectFilter(f.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px] ${
              filter === f.key
                ? 'bg-accent-yellow text-background'
                : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Large preview + key specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 lg:gap-6 items-start mb-6">
        <div>
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#f4f2eb] cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-contain p-2 sm:p-4"
                />
              </motion.div>
            </AnimatePresence>

            <div className="hidden sm:flex absolute bottom-4 right-4 items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Zoom & inspect <span aria-hidden="true">↗</span>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-white font-bold text-sm">{current.label}</p>
            {current.caption && <p className="text-muted text-xs mt-0.5">{current.caption}</p>}
          </div>
        </div>

        {/* Key specifications, transcribed from the drawing */}
        {current.specs && current.specs.length > 0 && (
          <motion.div
            key={`specs-${current.src}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-5 sm:p-6"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-yellow mb-4">
              Key Specifications
            </h4>
            <dl className="space-y-3.5">
              {current.specs.map((spec) => (
                <div key={spec.label} className="border-b border-white/5 pb-3.5 last:border-0 last:pb-0">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-foreground/90 leading-relaxed">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </div>

      {/* Thumbnail selector with labels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-pressed={current.src === img.src}
            className={`text-left rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              current.src === img.src ? 'border-accent-yellow' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <div className="relative w-full aspect-[4/3] bg-[#f4f2eb]">
              <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-contain p-1.5" />
            </div>
            <div className="px-2.5 py-2 bg-white/[0.03]">
              <p className="text-[11px] font-bold text-white leading-tight truncate">{img.label}</p>
              {img.caption && <p className="text-[10px] text-muted truncate">{img.caption}</p>}
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={filtered}
          index={Math.min(active, filtered.length - 1)}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActive}
          allowZoom
        />
      )}
    </div>
  );
}
