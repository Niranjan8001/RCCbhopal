'use client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    gm_authFailure: () => void;
  }
}

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TestimonialCarousel from './TestimonialCarousel';



// 3D Tilt Card Component
function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className} ${delay ? 'animate-anti-gravity-delayed' : 'animate-anti-gravity'}`}
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function LocationAndReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);



  return (
    <section ref={sectionRef} className="section-padding relative min-h-screen flex flex-col justify-center overflow-hidden bg-black" id="visit-us">
      {/* Cinematic High-Tech Background */}
      <div className="absolute inset-0 pointer-events-none bg-grid-faint opacity-50"></div>
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[160px] pulse-glow"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-accent-yellow/10 rounded-full blur-[160px] pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-purple-500/5 rotate-45 blur-[120px]"></div>
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue text-sm font-semibold uppercase tracking-[0.3em] mb-4 block glow-text"
          >
            Our Presence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-5 text-white drop-shadow-2xl"
          >
            Visit Us &amp;
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-purple-400 to-accent-yellow">What Clients Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light"
          >
            Delivering excellence from our futuristic headquarters in Bhopal. Read real feedback from homeowners and builders who trusted us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: PREMIUM CONTACT CARD --- */}
          <TiltCard className="w-full">
            <div className="relative glass-card-premium p-1 !rounded-[2.5rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] glow-edge-blue bg-black/40 backdrop-blur-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>
              
              <div className="relative h-[250px] md:h-[300px] w-full rounded-[2rem] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/modern_building_hq.png" 
                  alt="RCC Headquarters" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter contrast-125 saturate-110"
                />
                
                <div className="absolute bottom-4 left-6 z-20" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(10,132,255,0.5)]">
                      <svg width="20" height="20" fill="none" stroke="#0A84FF" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white tracking-wide drop-shadow-lg">RCC Headquarters</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 relative z-20" style={{ transform: "translateZ(50px)" }}>
                <p className="text-white/70 font-light text-sm md:text-base leading-relaxed mb-8 pl-1 border-l-2 border-accent-blue/50">
                  Katara Hills, Bhopal, Madhya Pradesh. <br/>
                  Experience the future of construction consultancy at our state-of-the-art facility.
                </p>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=23.2597,77.4126"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#0A84FF] to-[#005bb5] text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,132,255,0.6)] hover:scale-[1.02] border border-white/10"
                >
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </TiltCard>

          {/* --- RIGHT: TESTIMONIAL CAROUSEL --- */}
          <TiltCard className="w-full h-full" delay={1}>
            <TestimonialCarousel />
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
