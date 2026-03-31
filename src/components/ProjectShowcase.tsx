'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Horizontal scroll
      if (containerRef.current && sectionRef.current) {
        const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

        gsap.to(containerRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (projects.length - 1),
              duration: { min: 0.2, max: 0.6 },
              ease: 'power1.inOut',
            },
            anticipatePin: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" id="projects">
      {/* Section header */}
      <div ref={headingRef} className="pt-32 pb-16 px-6 md:px-12 lg:px-20 opacity-0">
        <div className="max-w-7xl mx-auto">
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Our Landmark
            <br />
            <span className="text-muted">Projects</span>
          </h2>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div className="h-screen flex items-center">
        <div
          ref={containerRef}
          className="horizontal-scroll-container pl-6 md:pl-12 lg:pl-20 pr-20"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] h-[65vh] relative group cursor-pointer"
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-card-strong h-full p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-0 transition-opacity duration-700 group-hover:bg-black/40" />
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 group-hover:opacity-60 transition-opacity duration-700 z-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 z-10 pointer-events-none"
                  style={{ background: project.color }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: project.color + '18',
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="text-sm text-muted">{project.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 group-hover:text-accent-yellow transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-sm text-muted flex items-center gap-2">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>

                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent-yellow group-hover:border-accent-yellow transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="group-hover:text-background transition-colors duration-300"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>

                {/* Large project number */}
                <span
                  className="absolute -bottom-6 -right-2 text-[120px] font-black leading-none opacity-[0.03] select-none"
                  style={{ color: project.color }}
                >
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
