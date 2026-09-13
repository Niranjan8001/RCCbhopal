'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DESIGN_GALLERY, type DesignImage } from '@/data/designShowcase';
import ImageLightbox from './design/ImageLightbox';

// Two images per spread: the left page of spread p is the back face of page
// p-1 (image 2p-2) and the right page is the front face of page p (image
// 2p-1). One extra leaf carries the front and back covers.
const TOTAL_PAGES = Math.ceil(DESIGN_GALLERY.length / 2);
const frontImage = (i: number): DesignImage | undefined => (i >= 1 ? DESIGN_GALLERY[2 * i - 1] : undefined);
const backImage = (i: number): DesignImage | undefined => DESIGN_GALLERY[2 * i];

const LEATHER_NOISE =
  `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' mix-blend-mode='overlay'/%3E%3C/svg%3E")`;

const PAGE_LEFT =
  'rounded-l-lg lg:rounded-l-xl border-r border-black/10 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06),_-2px_5px_15px_rgba(0,0,0,0.1)]';
const PAGE_RIGHT =
  'rounded-r-lg lg:rounded-r-xl border-l border-black/10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.06),_2px_5px_15px_rgba(0,0,0,0.1)]';

/** A single cream leaf of the book carrying one drawing or render. */
function GalleryPage({
  image,
  side,
  pageNumber,
  onZoom,
}: {
  image: DesignImage;
  side: 'left' | 'right';
  pageNumber: number;
  onZoom: () => void;
}) {
  const isLeft = side === 'left';
  return (
    <div
      className={`absolute inset-0 bg-[#f4f2eb] flex flex-col overflow-hidden ${isLeft ? PAGE_LEFT : PAGE_RIGHT}`}
    >
      {/* Page gradient fold along the spine */}
      <div
        className={`absolute top-0 bottom-0 w-8 z-10 pointer-events-none ${
          isLeft
            ? 'right-0 bg-gradient-to-l from-[rgba(0,0,0,0.08)] to-transparent'
            : 'left-0 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-transparent'
        }`}
      />

      <div className="relative z-0 w-full h-full p-4 sm:p-7 lg:p-9 flex flex-col">
        {/* Mounted image */}
        <button
          onClick={onZoom}
          className="relative flex-1 min-h-0 w-full overflow-hidden rounded-sm bg-[#fdfcf8] ring-1 ring-black/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] cursor-zoom-in group outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
          aria-label={`Enlarge ${image.group} — ${image.label}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 550px"
            className={`transition-transform duration-1000 group-hover:scale-[1.03] ${
              image.fit === 'contain' ? 'object-contain p-1.5 sm:p-2.5' : 'object-cover'
            }`}
          />
          {/* Page lighting reflection */}
          <span
            className={`absolute inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-r ${
              isLeft
                ? 'from-transparent via-[rgba(255,255,255,0.1)] to-[rgba(0,0,0,0.2)]'
                : 'from-[rgba(0,0,0,0.2)] via-[rgba(255,255,255,0.1)] to-transparent'
            }`}
          />
          <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-neutral-900/70 text-white text-[10px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Enlarge ↗
          </span>
        </button>

        {/* Caption plate — identification only, no dimensions or specifications */}
        <div className="shrink-0 flex items-end justify-between gap-3 border-t border-neutral-200 mt-3 sm:mt-4 pt-2.5 sm:pt-3">
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-0.5 truncate">
              {image.group}
            </p>
            <p
              className="font-black text-neutral-800 text-sm sm:text-lg lg:text-xl leading-tight truncate"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {image.label}
            </p>
          </div>
          <span
            className="shrink-0 text-neutral-300 font-bold text-base sm:text-xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {String(pageNumber).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Plain parchment leaf, shown when the gallery has an odd number of images. */
function BlankPage({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute inset-0 bg-[#f4f2eb] flex items-center justify-center overflow-hidden ${
        side === 'left' ? PAGE_LEFT : PAGE_RIGHT
      }`}
    >
      <p
        className="text-neutral-300 text-4xl sm:text-5xl font-black tracking-tight select-none"
        style={{
          fontFamily: 'var(--font-serif)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
        }}
      >
        RCC
      </p>
    </div>
  );
}

export default function DesignShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isLastPage = currentPage === TOTAL_PAGES;

  const closeBookAndScroll = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setCurrentPage(0);
    // Wait for the close animation (1.2s) + 400ms breathing room, then scroll
    setTimeout(() => {
      document.body.style.overflow = '';
      document.getElementById('consultancy-pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsClosing(false);
    }, 1600);
  }, [isClosing]);

  // Lock scroll while the book is open. Depends on lightboxIndex so the lock
  // is re-applied after the lightbox's own cleanup clears it on close.
  useEffect(() => {
    if (isMobile) return;
    if (currentPage > 0) {
      document.body.style.overflow = 'hidden';
    } else if (!isClosing) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPage, isClosing, isMobile, lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isClosing || lightboxIndex !== null) return;
      if (currentPage > 0) {
        if (e.key === 'ArrowRight') {
          if (isLastPage) closeBookAndScroll();
          else setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES));
        } else if (e.key === 'ArrowLeft') {
          setCurrentPage((p) => Math.max(p - 1, 0));
        } else if (e.key === 'Escape') {
          setCurrentPage(0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isLastPage, isClosing, lightboxIndex, closeBookAndScroll]);

  // Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile modal scroll lock
  useEffect(() => {
    if (mobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else if (isMobile) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileModalOpen, isMobile, lightboxIndex]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-background overflow-hidden ${
        isMobile ? '' : 'h-screen flex flex-col items-center justify-start pt-16 md:pt-20'
      }`}
      id="design-showcase"
    >
      {isMobile ? (
        <div className="px-4 py-12">
          <span className="text-accent-yellow text-xs font-semibold uppercase tracking-[0.2em] mb-4 block text-center">
            3D Design Visualization
          </span>
          <h2 className="text-[28px] font-black tracking-tight leading-tight mb-3 text-center">
            From Plan to a<br />
            <span className="text-muted">Visual Experience</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed text-center max-w-sm mx-auto mb-6">
            Interior and exterior 3D visualizations alongside the elevations, layouts, floor plans and
            column drawings they are developed from.
          </p>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setMobileModalOpen(true)}
              className="btn-primary w-full max-w-[300px] min-h-[48px] text-sm font-bold"
            >
              <span>Open Design Gallery</span>
              <span className="inline-block ml-1">↗</span>
            </button>
          </div>

          {/* Bridge to consultancy pricing */}
          <div className="glass-card p-6 text-center">
            <h4 className="text-lg font-black text-white mb-2">Curious what design work like this costs?</h4>
            <p className="text-muted text-sm mb-5">
              Every drawing in the gallery — floor plans, elevations, structurals — is priced on our
              published consultancy rate card.
            </p>
            <a href="#consultancy-pricing" className="btn-secondary min-h-[44px] inline-flex !text-sm">
              View Consultancy Pricing
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Full-screen gallery modal */}
          <AnimatePresence>
            {mobileModalOpen && (
              <motion.div
                className="fixed inset-0 z-[100] bg-background/[0.98] backdrop-blur-xl overflow-y-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md"
                  aria-label="Close design gallery"
                >
                  ✕
                </button>

                <div className="px-4 pt-16 pb-10">
                  <h2 className="text-2xl font-black text-center mb-2">Design Gallery</h2>
                  <p className="text-muted text-xs text-center mb-8 tracking-widest uppercase">
                    Tap any image to enlarge
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {DESIGN_GALLERY.map((image, idx) => (
                      <motion.button
                        key={image.src}
                        onClick={() => setLightboxIndex(idx)}
                        className="glass-card rounded-xl overflow-hidden text-left"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx, 8) * 0.05, duration: 0.4 }}
                      >
                        <div className="relative w-full aspect-[4/3] bg-[#f4f2eb]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="50vw"
                            className={image.fit === 'contain' ? 'object-contain p-1' : 'object-cover'}
                          />
                        </div>
                        <div className="px-2.5 py-2">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-muted truncate">
                            {image.group}
                          </p>
                          <p className="text-[11px] font-bold text-white leading-tight truncate">{image.label}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <button onClick={() => setMobileModalOpen(false)} className="btn-secondary !py-3 !px-8 !text-sm">
                      Close Gallery
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <>
          {/* Ambient background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] bg-accent-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          </div>

          <div className="relative w-full max-w-[1400px] mx-auto flex items-center flex-1 min-h-0 px-6 lg:px-16 z-10">
            {/* Left side: minimal text, visible while the book is closed */}
            <div
              className={`absolute left-6 lg:left-16 w-full max-w-[280px] sm:max-w-[400px] transition-all duration-1000 ease-in-out z-0 ${
                currentPage === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <span className="text-accent-yellow text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                3D Design Visualization
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
                From Plan to a
                <br />
                <span className="text-muted">Visual Experience</span>
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed max-w-sm mb-6">
                Interior and exterior 3D visualizations alongside the elevations, layouts, floor plans
                and column drawings they are developed from.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="btn-primary text-sm font-bold min-h-[44px] px-6 py-2.5 flex items-center gap-2"
                >
                  <span>Open Design Gallery</span>
                  <span className="inline-block">↗</span>
                </button>
                <a href="#consultancy-pricing" className="btn-secondary !text-sm min-h-[44px] !px-5 !py-2.5">
                  Consultancy Pricing
                </a>
              </div>
            </div>

            {/* 3D book container */}
            <div
              className={`relative mx-auto w-[95vw] sm:w-[85vw] lg:w-[70vw] max-w-[1100px] aspect-[2/1.3] transition-transform duration-1000 ease-in-out z-10 select-none ${
                currentPage > 0 ? 'translate-x-0' : 'translate-x-[20%] sm:translate-x-[25%]'
              }`}
              style={{ perspective: '3000px' }}
            >
              {/* Spine container (right half of the two-page spread) */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1/2" style={{ transformStyle: 'preserve-3d' }}>
                {Array.from({ length: TOTAL_PAGES + 1 }).map((_, i) => {
                  const isFlipped = i < currentPage;
                  const front = frontImage(i);
                  const back = backImage(i);

                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 origin-left rounded-r-lg lg:rounded-r-xl"
                      initial={false}
                      animate={{
                        rotateY: isFlipped ? -180 : 0,
                        z: isFlipped ? i * 2 : -i * 2, // Layer separation
                      }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        zIndex: isFlipped ? i : TOTAL_PAGES - i,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* --- FRONT FACE (right-hand page) --- */}
                      <div
                        className="absolute inset-0"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        {i === 0 ? (
                          // FRONT COVER
                          <div
                            className="w-full h-full relative cursor-pointer"
                            onClick={() => {
                              if (currentPage === 0) setCurrentPage(1);
                            }}
                          >
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
                                style={{
                                  boxShadow:
                                    'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)',
                                }}
                              />
                              <div className="absolute left-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
                              <div className="absolute left-[6%] top-0 bottom-0 w-[1px] bg-[rgba(0,0,0,0.8)]" />
                              <div className="absolute left-[6.5%] top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)]" />

                              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                <div className="w-28 h-28 sm:w-40 sm:h-40 relative opacity-70 mix-blend-overlay drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                  <Image src="/logo.png" alt="RCC" fill className="object-contain" />
                                </div>
                                <p
                                  className="mt-5 text-[#d4af37]/70 text-[10px] sm:text-xs uppercase tracking-[0.35em] font-bold"
                                  style={{ fontFamily: 'var(--font-serif)' }}
                                >
                                  Design Gallery
                                </p>
                              </div>

                              <div
                                className={`absolute bottom-8 right-8 flex items-center gap-2 text-[#d4af37] text-[10px] sm:text-xs tracking-widest uppercase transition-opacity duration-500 ${
                                  currentPage === 0 ? 'opacity-60' : 'opacity-0'
                                }`}
                              >
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                  Click to Open <span className="text-lg inline-block ml-1">→</span>
                                </motion.span>
                              </div>
                            </div>
                          </div>
                        ) : front ? (
                          <GalleryPage
                            image={front}
                            side="right"
                            pageNumber={2 * i}
                            onZoom={() => setLightboxIndex(2 * i - 1)}
                          />
                        ) : (
                          <BlankPage side="right" />
                        )}
                      </div>

                      {/* --- BACK FACE (left-hand page) --- */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        {back ? (
                          <GalleryPage
                            image={back}
                            side="left"
                            pageNumber={2 * i + 1}
                            onZoom={() => setLightboxIndex(2 * i)}
                          />
                        ) : (
                          // BACK COVER
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
                              style={{
                                boxShadow:
                                  'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)',
                              }}
                            />
                            <div className="absolute right-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-l from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation row — in flow below the book */}
          <AnimatePresence>
            {currentPage > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full flex justify-center items-center gap-4 md:gap-8 z-50 pointer-events-none shrink-0 py-4 md:py-5"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                  className={`btn-secondary !px-4 !py-3 md:!px-6 pointer-events-auto backdrop-blur-xl bg-white/5 border-white/10 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="hidden sm:inline">← Previous</span>
                  <span className="sm:hidden">←</span>
                </button>

                <span className="text-xs md:text-sm font-medium text-muted tracking-widest uppercase tabular-nums px-2">
                  {currentPage} / {TOTAL_PAGES}
                </span>

                {isLastPage ? (
                  <motion.button
                    onClick={closeBookAndScroll}
                    className="btn-secondary !px-4 !py-3 md:!px-6 pointer-events-auto backdrop-blur-xl border-accent-yellow/40 text-accent-yellow"
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(255,214,10,0.15), 0 0 20px rgba(255,214,10,0.05)',
                        '0 0 16px rgba(255,214,10,0.35), 0 0 40px rgba(255,214,10,0.12)',
                        '0 0 8px rgba(255,214,10,0.15), 0 0 20px rgba(255,214,10,0.05)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="hidden sm:inline">Close Gallery ✦</span>
                    <span className="sm:hidden">✦</span>
                  </motion.button>
                ) : (
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
                    className="btn-secondary !px-4 !py-3 md:!px-6 pointer-events-auto backdrop-blur-xl bg-white/5 border-white/10"
                  >
                    <span className="hidden sm:inline">Next →</span>
                    <span className="sm:hidden">→</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={DESIGN_GALLERY}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
            allowZoom
          />
        )}
      </AnimatePresence>
    </section>
  );
}
