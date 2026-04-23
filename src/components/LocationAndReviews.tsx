'use client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    gm_authFailure: () => void;
  }
}

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Public Place ID
const GOOGLE_PLACE_ID = 'ChIJSbhTdQBBfDkRwRB832aNDBY';

interface GooglePlaceReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface PlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GooglePlaceReview[];
}

const FALLBACK_DATA: PlaceDetails = {
  name: "Reliable Construction & Consultancy (RCC)",
  rating: 5.0,
  user_ratings_total: 100,
  reviews: [
    {
      author_name: "Amitesh Tiwari",
      profile_photo_url: "https://ui-avatars.com/api/?name=Amitesh+Tiwari&background=random",
      rating: 5,
      text: "Reliable construction is really a reliable vendor when it comes to construction and building. They are really good in terms of services.",
      relative_time_description: "3 months ago"
    },
    {
      author_name: "Renu Sahai",
      profile_photo_url: "https://ui-avatars.com/api/?name=Renu+Sahai&background=random",
      rating: 5,
      text: "Our house looks completely transformed thanks to Reliable Construction & Consultancy. The renovation was done with great care and professionalism.",
      relative_time_description: "4 months ago"
    }
  ]
};

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
  const [apiError, setApiError] = useState(!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  const [placeData, setPlaceData] = useState<PlaceDetails | null>(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? null : FALLBACK_DATA);
  const [loadingConfig, setLoadingConfig] = useState({ reviews: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.gm_authFailure = () => {
      console.error("[RCC Map] Authentication Failure");
      setApiError(true);
      setLoadingConfig({ reviews: false });
      setPlaceData(FALLBACK_DATA);
    };
  }, []);

  const fetchReviews = useCallback(() => {
    if (!GOOGLE_PLACE_ID || !window.google?.maps?.places) {
      setPlaceData(FALLBACK_DATA);
      setLoadingConfig({ reviews: false });
      return;
    }

    try {
      const dummyElement = document.createElement('div');
      const service = new window.google.maps.places.PlacesService(dummyElement);
      service.getDetails({
        placeId: GOOGLE_PLACE_ID,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews']
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, (place: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const validReviews = place.reviews?.filter((r: any) => r.text && r.text.trim().length > 5) || [];
          if (validReviews.length > 0) {
            setPlaceData({
              name: place.name || 'RCC',
              rating: place.rating || 0,
              user_ratings_total: place.user_ratings_total || 0,
              reviews: validReviews
            });
          } else {
            setPlaceData(FALLBACK_DATA);
          }
        } else {
          setPlaceData(FALLBACK_DATA);
        }
        setLoadingConfig({ reviews: false });
      });
    } catch (err) {
      console.error("[RCC Map] Error fetching places:", err);
      setPlaceData(FALLBACK_DATA);
      setLoadingConfig({ reviews: false });
    }
  }, []);

  useEffect(() => {
    if (apiError) return;
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    const waitForGoogle = () => {
      if (cancelled) return;
      if (window.google?.maps) {
        fetchReviews();
        return;
      }
      attempts++;
      if (attempts >= MAX_ATTEMPTS) {
        setApiError(true);
        setLoadingConfig({ reviews: false });
        setPlaceData(FALLBACK_DATA);
        return;
      }
      setTimeout(waitForGoogle, 200);
    };

    waitForGoogle();
    return () => { cancelled = true; };
  }, [fetchReviews, apiError]);

  useEffect(() => {
    if (!placeData?.reviews?.length || isPaused) return;
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % placeData.reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [placeData, isPaused]);

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

          {/* --- RIGHT: TESTIMONIAL CARD --- */}
          <TiltCard className="w-full h-full" delay={1}>
            <div className="relative glass-card-premium h-full p-8 md:p-12 !rounded-[2.5rem] overflow-hidden group flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] glow-edge-gold bg-black/40 backdrop-blur-3xl">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-yellow/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {loadingConfig.reviews ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-6 animate-pulse">
                  <div className="w-20 h-20 bg-white/5 rounded-full" />
                  <div className="w-40 h-6 bg-white/5 rounded-lg" />
                  <div className="w-full h-32 bg-white/5 rounded-2xl mt-8" />
                </div>
              ) : placeData ? (
                <div className="flex flex-col h-full z-10 relative" style={{ transform: "translateZ(40px)" }}>
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px">
                          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20c11 0 20-8.955 20-20C44 22.659 43.862 21.35 43.611 20.083z" />
                          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.653-3.34-11.124-7.868l-6.529 5.044C9.646 39.695 16.31 44 24 44z" />
                          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571 c.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{placeData.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-white">{placeData.rating.toFixed(1)}</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(placeData.rating) ? "#FFD60A" : "#333"} className="drop-shadow-[0_0_5px_rgba(255,214,10,0.5)]">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-white/50 ml-2">({placeData.user_ratings_total})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="flex-grow flex flex-col relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                  >
                    <span className="absolute -top-6 -left-4 text-8xl text-white/[0.03] font-serif leading-none select-none pointer-events-none drop-shadow-2xl">&quot;</span>
                    
                    <div className="relative h-[200px] w-full flex items-center">
                      <AnimatePresence mode="wait">
                        {placeData.reviews.length > 0 && (
                          <motion.div
                            key={activeReviewIndex}
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full"
                          >
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed line-clamp-4 italic font-light drop-shadow-md">
                              &quot;{placeData.reviews[activeReviewIndex].text}&quot;
                            </p>
                            
                            <div className="mt-8 flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-black ring-2 ring-accent-yellow/50 shadow-[0_0_15px_rgba(255,214,10,0.3)] shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={placeData.reviews[activeReviewIndex].profile_photo_url} 
                                  alt={placeData.reviews[activeReviewIndex].author_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-white tracking-wide">{placeData.reviews[activeReviewIndex].author_name}</span>
                                <span className="text-xs text-white/50 font-medium">{placeData.reviews[activeReviewIndex].relative_time_description}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {placeData.reviews.length > 1 && (
                      <div className="flex gap-2 justify-center mt-6">
                        {placeData.reviews.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveReviewIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeReviewIndex ? 'w-8 bg-accent-yellow shadow-[0_0_10px_rgba(255,214,10,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to review ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-red-400 text-sm bg-red-400/5 rounded-2xl border border-red-400/10">
                  Reviews unavailable.
                </div>
              )}
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
