'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const blurAmount = useTransform(scrollY, [0, 100], [10, 40]);

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
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        initial={{ y: -100 }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(10, 10, 10, ${bgOpacity})`,
            borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 z-10">
            <Image src="/logo.png" alt="RCC Logo" width={48} height={48} className="rounded-full bg-white" />
            <span className="text-xl font-bold tracking-tight">RCC</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300 relative group flex items-center h-full"
              >
                {link.label}
                <span className="absolute bottom-6 left-0 w-0 h-px bg-accent-yellow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4 z-10">
            <a
              href="https://wa.me/917987900965?text=Hello%20RCC,%20I%20want%20to%20know%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary !py-3 !px-7 !text-sm"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-foreground block"
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-foreground block"
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center"
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
                  className="text-3xl font-bold text-foreground hover:text-accent-yellow transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
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
                className="btn-primary mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.4 }}
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
