'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Seal from './Seal';
import { ESTABLISHED, GSTIN, REGISTRATIONS, TAGLINE } from '@/data/registrations';

/**
 * A quiet trigger in the hero that opens RCC's registrations as a card.
 *
 * The hero panel is full and fades out on scroll, and four licence numbers are
 * verification detail rather than persuasion — nobody is convinced by
 * "4/CA/EDC/EMP/2024/2937", they just want to be able to check it. So the hero
 * carries one line and the numbers get a surface of their own.
 *
 * The same figures are set out in the foundation band under the team; both
 * read them from src/data/registrations.ts.
 */
export default function CredentialsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog, so the card is where the keyboard already is.
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  /* Portalled to <body>. HeroSection animates its content with a transform,
     and a transformed ancestor becomes the containing block for fixed
     descendants — so inset-0 resolved to the hero panel, not the viewport,
     and backdrop-filter only sampled what was inside it. */
  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-2xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="credentials-title"
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#FFD60A]/25 bg-[#0B0B0B] shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The drawing-sheet hatch, as under the team */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 7px)',
              }}
            />

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close credentials"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 transition-colors hover:border-[#FFD60A]/60 hover:text-[#FFD60A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD60A]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {/* Letterhead */}
            <div className="relative flex items-center gap-4 border-b border-white/10 bg-gradient-to-r from-[#FFD60A]/[0.14] to-transparent px-6 py-5 pr-14">
              <Image
                src="/logo.png"
                alt=""
                width={46}
                height={46}
                className="shrink-0 rounded-full bg-white object-cover"
              />
              <div className="min-w-0">
                <p id="credentials-title" className="text-sm font-black uppercase tracking-[0.12em] text-white">
                  Reliable Construction &amp; Consultancy
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.1em] text-[#FFD60A]/85">
                  {TAGLINE}
                </p>
              </div>
            </div>

            {/* Registrations */}
            <div className="relative px-6 py-5">
              <div aria-hidden="true" className="pointer-events-none absolute -right-4 top-3 w-[104px] rotate-[-9deg] opacity-[0.14]">
                <Seal id="credentials" top="REGISTERED" center="RCC" accent="#FFD60A" fill="transparent" />
              </div>

              <dl className="relative space-y-3.5">
                {REGISTRATIONS.map((reg) => (
                  <div key={reg.label} className="border-b border-white/[0.07] pb-3 last:border-0 last:pb-0">
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                      {reg.label}
                    </dt>
                    <dd className="mt-1 font-mono text-[13px] text-white/85 break-words">
                      {reg.body} <span className="text-[#FFD60A]">{reg.no}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Foot */}
            <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-white/[0.02] px-6 py-4">
              <p className="font-mono text-[11px] tracking-[0.12em] text-white/70">GSTIN {GSTIN}</p>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#FFD60A]/80">EST. {ESTABLISHED}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="hero-anim mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 hover:border-[#FFD60A]/60 hover:text-[#FFD60A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD60A]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 4.5 6v5.5c0 4.3 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.2 7.5-9.5V6L12 3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        View Credentials
      </button>

      {/* No body to portal into while rendering on the server. The overlay
          is empty until opened, so both sides render nothing in place. */}
      {typeof document === 'undefined' ? null : createPortal(overlay, document.body)}
    </>
  );
}
