'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (ignore touch devices)
    if (window.matchMedia('(hover: none)').matches) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.15, // Smooth ease out follow
        y: prev.y + (targetY - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Set initial position immediately if already inside window
    const firstMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      targetX = e.clientX;
      targetY = e.clientY;
      window.removeEventListener('mousemove', firstMove);
      rafId = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', firstMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', firstMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Core glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'tween', duration: 0 }}
        style={{
          background: 'radial-gradient(circle, rgba(255,214,10,0.8) 0%, rgba(255,214,10,0) 70%)',
          filter: 'blur(4px)',
        }}
      />
      {/* Large ambient glow following behind */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[99] mix-blend-screen opacity-30"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(10,132,255,0.4) 0%, rgba(10,132,255,0) 70%)',
          filter: 'blur(20px)',
        }}
      />
    </>
  );
}
