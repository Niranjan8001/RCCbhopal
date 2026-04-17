'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'The Aurora Tower',
    category: 'Commercial',
    location: 'Mumbai, India',
    year: '2024',
    color: '#FFD60A',
    description: 'A 45-story commercial masterpiece featuring sustainable design and panoramic sky gardens.',
    image: '/project1.png',
  },
  {
    title: 'Serenity Villas',
    category: 'Residential',
    location: 'Goa, India',
    year: '2023',
    color: '#0A84FF',
    description: 'Luxury oceanfront villas blending modern architecture with tropical paradise.',
    image: '/project2.png',
  },
  {
    title: 'Metro Central Hub',
    category: 'Infrastructure',
    location: 'Delhi, India',
    year: '2024',
    color: '#30D158',
    description: 'A state-of-the-art transit hub serving 50,000+ commuters daily with world-class amenities.',
    image: '/project1.png',
  },
  {
    title: 'Horizon Mall',
    category: 'Retail',
    location: 'Bangalore, India',
    year: '2023',
    color: '#FF3B30',
    description: 'Premium retail destination with cinematic atrium design and immersive shopping experience.',
    image: '/project2.png',
  },
  {
    title: 'CloudNine Residences',
    category: 'Residential',
    location: 'Pune, India',
    year: '2024',
    color: '#FFD60A',
    description: 'Smart-home integrated luxury apartments with infinity pools and rooftop observatory.',
    image: '/project1.png',
  },
];

export default function ProjectShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const NUM_PROJECTS = projects.length;
  const isLastPage = currentPage === NUM_PROJECTS;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const closeBookAndScroll = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setCurrentPage(0);
    // Wait for close animation (1.2s) + 400ms breathing room, then scroll
    setTimeout(() => {
      document.body.style.overflow = '';
      const estimator = document.getElementById('estimator');
      if (estimator) {
        estimator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsClosing(false);
    }, 1600);
  }, [isClosing]);

  useEffect(() => {
    // Lock scroll when book is fully open inside bounds
    if (currentPage > 0 && currentPage <= NUM_PROJECTS) {
      document.body.style.overflow = 'hidden';
    } else if (!isClosing) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPage, NUM_PROJECTS, isClosing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isClosing) return;
      if (currentPage > 0 && currentPage <= NUM_PROJECTS) {
        if (e.key === 'ArrowRight') {
          if (isLastPage) {
            closeBookAndScroll();
          } else {
            setCurrentPage((p) => Math.min(p + 1, NUM_PROJECTS));
          }
        } else if (e.key === 'ArrowLeft') {
          setCurrentPage((p) => Math.max(p - 1, 0));
        } else if (e.key === 'Escape') {
          setCurrentPage(0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, NUM_PROJECTS, isLastPage, isClosing, closeBookAndScroll]);

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
    return () => { document.body.style.overflow = ''; };
  }, [mobileModalOpen, isMobile]);

  return (
    <section 
      ref={sectionRef} 
      className={`relative w-full bg-background overflow-hidden ${isMobile ? '' : 'h-screen flex items-center justify-center pt-16 md:pt-20'}`}
      id="projects"
    >
      {isMobile ? (
        <div className="px-4 py-12">
          {/* Section Header */}
          <span className="text-accent-yellow text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-[28px] font-black tracking-tight leading-tight mb-3">
            Our Landmark<br />
            <span className="text-muted">Projects</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Tap the book to explore our luxury portfolio.
          </p>

          {/* Cover Card — Tap to Open */}
          <div
            className="relative w-[88%] max-w-[300px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => setMobileModalOpen(true)}
            style={{
              backgroundColor: '#3d2314',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' mix-blend-mode='overlay'/%3E%3C/svg%3E"), linear-gradient(135deg, #4a2f1d 0%, #29150b 100%)`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,214,10,0.08)',
            }}
          >
            <div className="absolute inset-3 border border-[rgba(255,255,255,0.08)] rounded-xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="w-24 h-24 relative opacity-60">
                <Image src="/logo.png" alt="RCC" fill className="object-contain" />
              </div>
              <div className="flex items-center gap-2 text-[#d4af37] text-xs tracking-widest uppercase opacity-80">
                <span>Tap to Explore</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </div>
            </div>
          </div>

          {/* Full Screen Modal */}
          <AnimatePresence>
            {mobileModalOpen && (
              <motion.div
                className="fixed inset-0 z-[100] bg-background/[0.98] backdrop-blur-xl overflow-y-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Close button */}
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md"
                  aria-label="Close portfolio"
                >
                  ✕
                </button>

                {/* Scrollable content */}
                <div className="px-4 pt-16 pb-10">
                  <h2 className="text-2xl font-black text-center mb-2">Our Projects</h2>
                  <p className="text-muted text-xs text-center mb-8 tracking-widest uppercase">Swipe up to explore</p>
                  <div className="space-y-5">
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.title}
                        className="glass-card rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.5 }}
                      >
                        {/* Project Image */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                          <Image src={project.image} alt={project.title} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <span
                            className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm"
                            style={{ backgroundColor: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Project Details */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                          <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {project.location}
                            </span>
                            <span>•</span>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom close */}
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setMobileModalOpen(false)}
                      className="btn-secondary !py-3 !px-8 !text-sm"
                    >
                      Close Portfolio
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (<>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-accent-yellow/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Navigation Layer */}
      <AnimatePresence>
        {currentPage > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-6 md:bottom-12 left-0 right-0 flex justify-center items-center gap-4 md:gap-8 z-50 pointer-events-none"
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
            
            <button
              onClick={() => setCurrentPage(0)}
              className="text-xs md:text-sm font-medium text-muted hover:text-white transition-colors pointer-events-auto px-4 tracking-widest uppercase"
            >
              Close Book
            </button>
            
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
                <span className="hidden sm:inline">Close Book ✦</span>
                <span className="sm:hidden">✦</span>
              </motion.button>
            ) : (
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, NUM_PROJECTS))}
                className="btn-secondary !px-4 !py-3 md:!px-6 pointer-events-auto backdrop-blur-xl bg-white/5 border-white/10"
              >
                <span className="hidden sm:inline">Next Project →</span>
                <span className="sm:hidden">→</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout Container */}
      <div className="relative w-full max-w-[1400px] mx-auto flex items-center h-full px-6 lg:px-16 z-10">
        
        {/* Left Side: Minimal Text (visible when closed) */}
        <div 
          className={`absolute left-6 lg:left-16 w-full max-w-[280px] sm:max-w-[400px] transition-all duration-1000 ease-in-out z-0 ${
            currentPage === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="text-accent-yellow text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            Our Landmark
            <br />
            <span className="text-muted">Projects</span>
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed max-w-sm">
            Click the book to open our interactive luxury portfolio. Experience our architectural legacy through a new dimension.
          </p>
        </div>

        {/* 3D Book Container */}
        <div 
          className={`relative mx-auto w-[95vw] sm:w-[85vw] lg:w-[70vw] max-w-[1100px] aspect-[2/1.3] transition-transform duration-1000 ease-in-out z-10 select-none ${
            currentPage > 0 ? 'translate-x-0' : 'translate-x-[20%] sm:translate-x-[25%]'
          }`}
          style={{ perspective: '3000px' }}
        >
          {/* Spine Container (Right Half of the 2-page spread) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1/2" style={{ transformStyle: 'preserve-3d' }}>
            
            {Array.from({ length: NUM_PROJECTS + 1 }).map((_, i) => {
              const isFlipped = i < currentPage;
              const closedRotation = 0;
              const openedRotation = -180;

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 preserve-3d origin-left rounded-r-lg lg:rounded-r-xl"
                  initial={false}
                  animate={{ 
                    rotateY: isFlipped ? openedRotation : closedRotation,
                    z: isFlipped ? i * 2 : -i * 2, // Layer separation
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  style={{
                    zIndex: isFlipped ? i : NUM_PROJECTS + 1 - i,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* --- FRONT FACE --- */}
                  <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    {i === 0 ? (
                      // 0: COVER FRONT
                      <div 
                        className="w-full h-full relative cursor-pointer"
                        onClick={() => { if (currentPage === 0) setCurrentPage(1); }}
                      >
                        {/* Leather Texture Base */}
                        <div className="absolute inset-0 rounded-r-lg lg:rounded-r-xl overflow-hidden" style={{
                          backgroundColor: '#3d2314',
                          backgroundImage: `
                            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' mix-blend-mode='overlay'/%3E%3C/svg%3E"), 
                            linear-gradient(135deg, #4a2f1d 0%, #29150b 100%)
                          `, 
                          boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.6), inset -4px 0 10px rgba(255,255,255,0.1), 10px 20px 40px rgba(0,0,0,0.5)',
                        }}>
                          {/* Inner border emboss */}
                          <div className="absolute inset-4 border-2 border-[rgba(0,0,0,0.4)] rounded-sm" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)' }} />

                          {/* Spine details */}
                          <div className="absolute left-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
                          <div className="absolute left-[6%] top-0 bottom-0 w-[1px] bg-[rgba(0,0,0,0.8)]" />
                          <div className="absolute left-[6.5%] top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.05)]" />

                          {/* Cover Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <div className="w-32 h-32 sm:w-48 sm:h-48 relative opacity-70 mix-blend-overlay drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                              <Image src="/logo.png" alt="RCC" fill className="object-contain" />
                            </div>
                          </div>

                          {/* Call to action arrow */}
                          <div 
                            className={`absolute bottom-8 right-8 flex items-center gap-2 text-[#d4af37] opacity-60 text-[10px] sm:text-xs tracking-widest uppercase transition-opacity duration-500 ${currentPage === 0 ? 'opacity-60' : 'opacity-0'}`}
                          >
                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                              Click to Open <span className="text-lg inline-block ml-1">→</span>
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 1..N: PROJECT DETAILS (Right Page)
                      <div className="absolute inset-0 bg-[#f4f2eb] flex flex-col rounded-r-lg lg:rounded-r-xl shadow-[inset_15px_0_30px_rgba(0,0,0,0.06),_2px_5px_15px_rgba(0,0,0,0.1)] border-l border-black/10 overflow-hidden">
                        
                        {/* Page gradient fold */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-transparent z-0 pointer-events-none" />

                        {/* Content Wrapper */}
                        <div className="relative z-10 w-full h-full p-6 sm:p-10 lg:p-16 flex flex-col text-neutral-900 border-[1px] border-[rgba(0,0,0,0.03)] m-2 sm:m-4 rounded-sm" style={{ width: 'calc(100% - 1rem)', height: 'calc(100% - 1rem)' }}>
                          <span 
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-neutral-300 font-bold text-xl sm:text-2xl"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            0{i}
                          </span>
                          
                          <h4 
                            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4" 
                            style={{ color: projects[i-1].color }}
                          >
                            Project Insight
                          </h4>
                          
                          <h3 
                            className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 mb-4 sm:mb-8 leading-[1.1] tracking-tight"
                            style={{ fontFamily: 'var(--font-serif)' }}
                          >
                            {projects[i-1].title}
                          </h3>
                          
                          <p className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed mb-auto max-w-sm">
                            {projects[i-1].description}
                          </p>

                          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-8 border-t border-neutral-200 pt-6 sm:pt-8 w-full max-w-sm">
                            <div>
                              <p className="text-neutral-400 text-[9px] sm:text-[10px] uppercase tracking-widest mb-1">Location</p>
                              <p className="font-semibold text-neutral-800 text-xs sm:text-sm">{projects[i-1].location}</p>
                            </div>
                            <div>
                              <p className="text-neutral-400 text-[9px] sm:text-[10px] uppercase tracking-widest mb-1">Year</p>
                              <p className="font-semibold text-neutral-800 text-xs sm:text-sm">{projects[i-1].year}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-neutral-400 text-[9px] sm:text-[10px] uppercase tracking-widest mb-1 mt-2">Category</p>
                              <span 
                                className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider bg-black/5 mt-1"
                                style={{ color: projects[i-1].color }}
                              >
                                {projects[i-1].category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- BACK FACE --- */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    {i === NUM_PROJECTS ? (
                      // N: BACK COVER EXTERIOR
                      <div className="w-full h-full relative border-r border-black/80 rounded-l-lg lg:rounded-l-xl overflow-hidden" style={{
                        backgroundColor: '#3d2314',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3' mix-blend-mode='overlay'/%3E%3C/svg%3E"), linear-gradient(135deg, #29150b 0%, #4a2f1d 100%)`, 
                        boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.6), inset 4px 0 10px rgba(255,255,255,0.1)',
                      }}>
                         <div className="absolute inset-4 border-2 border-[rgba(0,0,0,0.4)] rounded-sm" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)' }} />
                         <div className="absolute right-[2%] top-0 bottom-0 w-[4%] bg-gradient-to-l from-[rgba(0,0,0,0.5)] via-[rgba(255,255,255,0.08)] to-[rgba(0,0,0,0.5)]" />
                      </div>
                    ) : (
                      // 0..N-1: PROJECT IMAGE (Left Page)
                      <div className="absolute inset-0 bg-[#f4f2eb] flex flex-col rounded-l-lg lg:rounded-l-xl shadow-[inset_-15px_0_30px_rgba(0,0,0,0.06),_-2px_5px_15px_rgba(0,0,0,0.1)] border-r border-black/10 overflow-hidden">
                        
                        {/* Page gradient fold */}
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(0,0,0,0.08)] to-transparent z-10 pointer-events-none" />

                        {/* Image Wrapper */}
                        <div className="relative z-0 w-full h-full p-4 sm:p-8 lg:p-12">
                          <div className="w-full h-full relative overflow-hidden bg-neutral-200 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.1)] ring-1 ring-black/10">
                            <Image 
                              src={projects[i].image} 
                              alt={projects[i].title} 
                              fill 
                              className="object-cover transition-transform duration-1000 hover:scale-105" 
                            />
                            {/* Inner vignette */}
                            <div className="absolute inset-0 bg-black/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
                            
                            {/* Page lighting reflection */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-[rgba(0,0,0,0.2)] pointer-events-none mix-blend-overlay" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </>)}
    </section>
  );
}
