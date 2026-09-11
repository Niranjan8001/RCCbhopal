'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { DesignImage } from '@/data/designShowcase';

interface ImageLightboxProps {
  images: DesignImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /** Documentation drawings get a zoom toggle; render photos don't need it. */
  allowZoom?: boolean;
}

export default function ImageLightbox({ images, index, onClose, onNavigate, allowZoom }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const current = images[index];

  const goPrev = useCallback(() => {
    setZoomed(false);
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    setZoomed(false);
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background/[0.97] backdrop-blur-2xl flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.label} — image viewer`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none"
        aria-label="Close viewer"
      >
        ✕
      </button>

      <div
        className="flex-1 flex items-center justify-center px-4 sm:px-16 py-16 sm:py-20 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full h-full flex items-center justify-center ${
              allowZoom ? (zoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in') : ''
            }`}
            onClick={allowZoom ? () => setZoomed((z) => !z) : undefined}
          >
            <div
              className={`relative transition-transform duration-300 ${
                zoomed ? 'w-[180%] h-[180%] max-w-none' : 'w-full h-full max-w-5xl'
              }`}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-accent-yellow outline-none"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div className="pb-6 sm:pb-8 pt-2 text-center shrink-0" onClick={(e) => e.stopPropagation()}>
        <p className="text-white font-bold text-sm sm:text-base">{current.label}</p>
        {current.caption && <p className="text-white/50 text-xs mt-0.5">{current.caption}</p>}
        {images.length > 1 && (
          <p className="text-white/40 text-xs mt-2 tabular-nums tracking-wider">
            {index + 1} / {images.length}
          </p>
        )}
        {allowZoom && (
          <p className="text-white/30 text-[11px] mt-1 uppercase tracking-widest">
            {zoomed ? 'Tap image to zoom out' : 'Tap image to zoom in'}
          </p>
        )}
      </div>
    </motion.div>
  );
}
