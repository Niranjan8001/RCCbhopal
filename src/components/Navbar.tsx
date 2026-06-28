'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down past 80px, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="fixed top-4 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-4">
        <nav
          className={`pointer-events-auto w-fit px-6 h-12 flex items-center justify-between gap-6 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hidden && !isOpen 
              ? 'translate-y-[-100px] opacity-0' 
              : 'translate-y-0 opacity-100'
          }`}
          style={{
            backgroundColor: 'rgba(7, 7, 7, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: 'rgba(245, 197, 66, 0.18)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 z-10 flex-shrink-0">
            <Image src="/logo.png" alt="RCC Logo" width={28} height={28} className="rounded-full bg-white object-cover" />
            <span className="text-sm font-black tracking-wider text-white">RCC</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 h-full z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group text-[10px] font-bold uppercase tracking-wider text-white/70 hover:text-[#F5C542] transition-colors duration-300 relative py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F5C542] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center z-10 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-5 h-0.5 bg-current block"
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-current block"
                animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </div>

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
                  className="text-xl font-bold uppercase tracking-wider text-white hover:text-[#F5C542] transition-colors flex items-center justify-center min-h-[44px] py-2 w-full"
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
