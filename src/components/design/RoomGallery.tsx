'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { DesignSection } from '@/data/designShowcase';
import ImageLightbox from './ImageLightbox';

export default function RoomGallery({ section, priority }: { section: DesignSection; priority?: boolean }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const images = section.images;

  const goPrev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) (delta > 0 ? goPrev : goNext)();
    touchStartX.current = null;
  };

  return (
    <div id={section.id} className="scroll-mt-24">
      {/* Editorial header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="mb-8 sm:mb-10"
      >
        <span className="text-accent-yellow text-xs sm:text-sm font-bold uppercase tracking-[0.25em] block mb-3">
          {section.eyebrow}
        </span>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">{section.title}</h3>
        <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">{section.description}</p>
      </motion.div>

      {/* Featured large render */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div
          className="relative w-full aspect-[6/5] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] bg-white/[0.02] cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority={priority && active === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* View visualization hint, desktop hover */}
          <div className="hidden sm:flex absolute bottom-5 right-5 items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View visualization <span aria-hidden="true">↗</span>
          </div>

          <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest">
            {images[active].label}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/10 items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none"
              aria-label={`Previous view of ${section.title}`}
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/10 items-center justify-center text-white backdrop-blur-md hover:bg-black/60 transition-colors focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none"
              aria-label={`Next view of ${section.title}`}
            >
              →
            </button>
          </>
        )}
      </motion.div>

      {/* Mobile counter + prev/next */}
      {images.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-6 mt-4">
          <button onClick={goPrev} aria-label="Previous view" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
            ←
          </button>
          <span className="text-xs text-muted tabular-nums tracking-wider">{active + 1} / {images.length}</span>
          <button onClick={goNext} aria-label="Next view" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
            →
          </button>
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 sm:gap-4 mt-5 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory sm:overflow-visible">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              aria-label={`Show ${img.label}`}
              aria-pressed={active === i}
              className={`relative shrink-0 w-32 sm:w-40 aspect-[6/5] rounded-xl overflow-hidden border-2 transition-all duration-300 snap-start ${
                active === i ? 'border-accent-yellow shadow-[0_0_20px_rgba(255,214,10,0.25)]' : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          index={active}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActive}
        />
      )}
    </div>
  );
}
