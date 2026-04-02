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

      // Horizontal scroll and 3D Books
      if (containerRef.current && sectionRef.current) {
        const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

        let horizontalTween = gsap.to(containerRef.current, {
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

        // 3D Scroll-Driven Book Opening logic
        const wrappers = document.querySelectorAll('.book-wrapper');
        
        wrappers.forEach((wrapper) => {
          const cover = wrapper.querySelector('.book-cover');
          const inner = wrapper.querySelector('.parallax-inner');
          const front = wrapper.querySelector('.parallax-front');

          if (cover) {
            gsap.fromTo(
              cover,
              { rotateY: 0 },
              {
                rotateY: -160,
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapper,
                  containerAnimation: horizontalTween,
                  start: 'left center', // starts opening when card's left hits center
                  end: 'right center', // fully open when passing
                  scrub: true,
                },
              }
            );
          }

          // Inner parallax effect (text slides in)
          if (inner) {
            gsap.fromTo(
              inner,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapper,
                  containerAnimation: horizontalTween,
                  start: 'left center',
                  end: 'center center',
                  scrub: true,
                },
              }
            );
          }

          // Front cover depth parallax
          if (front) {
            gsap.fromTo(
              front,
              { z: 0 },
              {
                z: 40,
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapper,
                  containerAnimation: horizontalTween,
                  start: 'left 80%',
                  end: 'right 20%',
                  scrub: true,
                },
              }
            );
          }
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
          className="horizontal-scroll-container pl-6 md:pl-12 lg:pl-20 pr-20 flex gap-8 md:gap-16 lg:gap-32"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="book-wrapper flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] h-[65vh] relative cursor-pointer"
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              {/* === INSIDE BASE (Right Page) === */}
              <div 
                className="absolute inset-0 glass-card-strong p-8 sm:p-10 flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10"
                style={{ transform: 'translateZ(-10px)' }}
              >
                <div className="absolute inset-0 bg-neutral-950/90 z-0" />
                <div 
                  className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.05] z-0 pointer-events-none" 
                  style={{ backgroundSize: '30px' }}
                />

                <div className="parallax-inner relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-accent-yellow mb-2">Project Insight</h4>
                    <h3 className="text-3xl font-bold tracking-tight mb-4 text-white/95">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed max-w-sm mb-6">
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm text-muted flex items-center gap-2">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {project.location}
                      </span>
                    </div>

                    <a href="#quote" className="btn-secondary w-full text-center inline-block">
                      View Details
                    </a>
                  </div>
                </div>
              </div>

              {/* === THE COVER (Origin Left) === */}
              <div 
                className="book-cover absolute inset-0 rounded-2xl transition-shadow duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  transformOrigin: 'left center',
                }}
              >
                {/* 1. FRONT FACE (Outer Cover) */}
                <div 
                  className="absolute inset-0 glass-card-strong p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-2xl rounded-2xl"
                  style={{ backfaceVisibility: 'hidden', transform: 'translateZ(2px)' }}
                >
                  <div className="absolute inset-0 bg-black/50 z-0 transition-opacity duration-700 hover:bg-black/30" />
                  <div 
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 z-0"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  {/* Glow accent */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-40 z-10 pointer-events-none"
                    style={{ background: project.color }}
                  />

                  <div className="parallax-front relative z-10 flex flex-col justify-between h-full" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="flex items-center gap-3">
                      <span
                        className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/20 backdrop-blur-md"
                        style={{
                          color: project.color,
                          border: `1px solid ${project.color}50`,
                        }}
                      >
                        {project.category}
                      </span>
                      <span className="text-sm font-bold tracking-wider" style={{ color: project.color }}>{project.year}</span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-xl" style={{ textShadow: '0px 10px 30px rgba(0,0,0,0.8)' }}>
                      {project.title}
                    </h3>
                  </div>

                  <span
                    className="absolute -bottom-4 -right-1 text-[130px] font-black leading-none opacity-[0.05] select-none z-0"
                    style={{ color: project.color }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* 2. BACK FACE (Inside the physical cover) */}
                <div 
                  className="absolute inset-0 bg-neutral-900 border border-white/5 rounded-2xl shadow-inner flex flex-col justify-center overflow-hidden pointer-events-none"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                >
                  {/* Spine inner gradient effect */}
                  <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent z-10" />
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 grayscale blur-[2px]" 
                    style={{ backgroundImage: `url(${project.image})` }} 
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  
                  {/* Texture to look like book inside */}
                  <div className="relative z-10 h-full w-full opacity-5"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), repeating-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
