'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Renu Sahahi',
    role: 'Home Owner',
    quote: 'Our house looks completely transformed thanks to Reliable Construction & Consultancy. The renovation was done with great care and professionalism. The team was polite, responsive, and committed to quality. Every detail was executed perfectly. We are truly satisfied and grateful for such outstanding work.',
    rating: 5,
  },
  {
    name: 'Amitesh Tiwari',
    role: 'Home Owner',
    quote: 'Reliable construction is really a reliable vendor when it comes to construction and building. They are really good in terms of services and they also use the best material as per the budget. Most importantly, they are really professional and polite in nature. I recommend everyone to rely on reliable construction and take their services for building new homes, offices or their buildings.',
    rating: 5,
  },
  {
    name: 'Rushil Bhatia',
    role: 'Home Owner',
    quote: 'Reliable Construction & Consultancy truly lived up to their name! From start to finish, their team was professional, efficient, and delivered exceptional results. Their attention to detail and commitment to quality were impressive. Highly reliable and trustworthy, they\'re the go-to experts for any building needs.',
    rating: 5,
  },
  {
    name: 'Ajay Panvar',
    role: 'Home Owner',
    quote: 'Reliable Construction is a highly recommended, registered firm in Bhopal, known for its expertise in both construction and consultancy services. They are a professional and trustworthy team with a keen eye for detail, deep knowledge of building planning, and practical construction works. I strongly suggest Reliable Construction to anyone in need of construction or consultancy services.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  // Auto-slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 3D tilt on hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x: y, y: x });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="section-padding relative" id="testimonials">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 testimonials-heading">
          <span className="text-accent-red text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Client
            <br />
            <span className="text-muted">Love</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="glass-card-strong p-10 sm:p-14 text-center relative overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: tilt.x,
                rotateY: tilt.y,
              }}
              exit={{ opacity: 0, y: -40, rotateX: -5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow border */}
              <div className="absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, rgba(255,59,48,0.1) 50%, transparent 60%)',
                }}
              />

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="20" height="20" fill="#FFD60A" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-10 text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-lg">{t.name}</p>
                <p className="text-sm text-muted mt-1">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === current ? 'w-10 bg-accent-yellow' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
