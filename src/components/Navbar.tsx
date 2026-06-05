'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  // Apple-style glassmorphism — dynamic tinting on scroll
  const bgOpacity = useTransform(scrollY, [0, 120], [0.25, 0.72]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0.06, 0.1]);
  const blurAmount = useTransform(scrollY, [0, 120], [20, 40]);
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 0.25]);
  const reflectionOpacity = useTransform(scrollY, [0, 120], [0.08, 0.03]);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-5xl px-4 md:px-6"
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: hidden && !isOpen ? -100 : 0, x: '-50%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass base — translucent tint + blur + gold border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: 'rgba(7, 7, 7, 0.8)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(245, 197, 66, 0.18)',
            boxShadow: `0 12px 40px rgba(0, 0, 0, ${shadowOpacity})`,
          }}
        />
        {/* Light reflection — Apple glass shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,${reflectionOpacity}), rgba(255,255,255,0.01))`,
          }}
        />

        <div className="relative flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 z-10 flex-shrink-0">
            <Image src="/logo.png" alt="RCC Logo" width={36} height={36} className="rounded-full bg-white" />
            <span className="text-lg font-bold tracking-tight text-white">RCC</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 h-full z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#F5C542] transition-colors duration-300 relative group flex items-center py-2 h-full"
              >
                {link.label}
                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-[#F5C542] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Spacer to balance the logo on desktop */}
          <div className="hidden md:block w-[78px]" />

          {/* Mobile Toggle */}
          <div className="flex items-center z-10 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-current block"
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current block"
                animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-bold uppercase tracking-wider text-white hover:text-[#F5C542] transition-colors flex items-center justify-center min-h-[44px] py-2 w-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/917987900965?text=Hello%20RCC,%20I%20want%20to%20know%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 min-h-[44px] w-[80vw] mx-auto text-center justify-center bg-[#F5C542] text-[#070707]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
