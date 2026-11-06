'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * A glow that follows the pointer.
 *
 * Position is held in motion values, not React state. The earlier version ran
 * a requestAnimationFrame loop calling setState every frame, which re-rendered
 * the component ~60 times a second and showed up in DevTools as forced reflow.
 * Motion values write the transform straight to the DOM, so the lag is a
 * spring rather than a render loop and React is not involved after mount.
 */
export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  // Read inside the listener so the effect does not resubscribe on every show.
  const visibleRef = useRef(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  // The ambient layer trails the core, as the eased follow used to.
  const ambientX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const ambientY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const coreLeft = useTransform(x, (v) => v - 16);
  const coreTop = useTransform(y, (v) => v - 16);
  const ambientLeft = useTransform(ambientX, (v) => v - 128);
  const ambientTop = useTransform(ambientY, (v) => v - 128);

  useEffect(() => {
    // Pointer glow means nothing on a touch device.
    if (window.matchMedia('(hover: none)').matches) return;

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };
    const hide = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      show();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, [x, y]);

  if (!isVisible) return null;

  /* No mix-blend-screen on either layer. Blending composites against the
     backdrop, and over an element with its own backdrop-filter — every
     glass card on the page — the browser resolves that against the card's
     backdrop root, so the glow's own box edge shows up as a hard seam
     across the card. Plain alpha has no backdrop to resolve against. */
  return (
    <>
      {/* Core glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100]"
        style={{
          x: coreLeft,
          y: coreTop,
          background: 'radial-gradient(circle, rgba(255,214,10,0.33) 0%, rgba(255,214,10,0) 70%)',
          filter: 'blur(4px)',
        }}
      />
      {/* Large ambient glow following behind */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[99] opacity-25"
        style={{
          x: ambientLeft,
          y: ambientTop,
          background: 'radial-gradient(circle, rgba(10,132,255,0.4) 0%, rgba(10,132,255,0) 70%)',
          filter: 'blur(20px)',
        }}
      />
    </>
  );
}
