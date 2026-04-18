'use client';

declare global {
  interface Window {
    google: any;
    gm_authFailure: () => void;
  }
}

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Public Place ID (not a secret — this is a public Google Business identifier)
const GOOGLE_PLACE_ID = 'ChIJSbhTdQBBfDkRwRB832aNDBY';

// Minimum viable types for Google API data
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

export default function LocationAndReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Robust State Management
  const [apiError, setApiError] = useState(false);
  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [loadingConfig, setLoadingConfig] = useState({ map: true, reviews: true });
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const coordinates = { lat: 23.19777, lng: 77.46467 }; // Exact Katara Hills (5G93+JF)

  // --- 1. Global Auth Failure Handling (CRITICAL FOR MAP ERRORS) ---
  useEffect(() => {
    window.gm_authFailure = () => {
      console.error("[RCC Map] Authentication Failure: Check API Key, Billing, and Referrer Restrictions.");
      setApiError(true);
      setLoadingConfig({ map: false, reviews: false });
      setPlaceData(FALLBACK_DATA);
    };
  }, []);

  // --- 2. GSAP Layout Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
        );
      }
      if (mapContainerRef.current) {
        gsap.fromTo(mapContainerRef.current, 
          { x: -50, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: mapContainerRef.current, start: 'top 80%' } }
        );
      }
      if (reviewsContainerRef.current) {
        gsap.fromTo(reviewsContainerRef.current, 
          { x: 50, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: reviewsContainerRef.current, start: 'top 80%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // --- 3. Google Maps Dark Theme ---
  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
  ];

  // --- 4. Places API Fetching ---
  const fetchReviews = useCallback((map: any) => {
    if (!GOOGLE_PLACE_ID || !window.google?.maps?.places) {
      console.warn("[RCC Map] Places API not ready or missing Place ID, using fallback data.");
      setPlaceData(FALLBACK_DATA);
      setLoadingConfig(prev => ({ ...prev, reviews: false }));
      return;
    }

    try {
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: GOOGLE_PLACE_ID,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews']
      }, (place: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
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
        setLoadingConfig(prev => ({ ...prev, reviews: false }));
      });
    } catch (err) {
      console.error("[RCC Map] Error fetching places:", err);
      setPlaceData(FALLBACK_DATA);
      setLoadingConfig(prev => ({ ...prev, reviews: false }));
    }
  }, []);

  // --- 5. Safe Map Initialization ---
  const initMap = useCallback(() => {
    if (!window.google?.maps || !mapElementRef.current || mapInstanceRef.current || apiError) return;

    try {
      const map = new window.google.maps.Map(mapElementRef.current, {
        center: coordinates,
        zoom: 16,
        styles: darkMapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "cooperative",
      });
      
      mapInstanceRef.current = map;

      // Add Marker
      new window.google.maps.Marker({
        position: coordinates,
        map,
        title: "RCC Headquarters",
        animation: window.google.maps.Animation.DROP,
      });

      setLoadingConfig(prev => ({ ...prev, map: false }));
      fetchReviews(map);

    } catch (error) {
      console.error("[RCC Map] Failed to initialize map:", error);
      setApiError(true);
      setLoadingConfig({ map: false, reviews: false });
      setPlaceData(FALLBACK_DATA);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchReviews, apiError]);

  // --- 6. Wait for Google Maps script (loaded globally from layout.tsx) ---
  useEffect(() => {
    if (apiError) return;

    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 100; // 20 seconds max (100 × 200ms)

    const waitForGoogle = () => {
      if (cancelled) return;

      if (window.google?.maps) {
        initMap();
        return;
      }

      attempts++;
      if (attempts >= MAX_ATTEMPTS) {
        console.error('[RCC Map] Google Maps failed to load after 20 seconds.');
        setApiError(true);
        setLoadingConfig({ map: false, reviews: false });
        setPlaceData(FALLBACK_DATA);
        return;
      }

      setTimeout(waitForGoogle, 200);
    };

    waitForGoogle();

    return () => { cancelled = true; };
  }, [initMap, apiError]);

  // Fallback trigger if auth failure is detected
  useEffect(() => {
    if (apiError) {
      setLoadingConfig({ map: false, reviews: false });
      setPlaceData(FALLBACK_DATA);
    }
  }, [apiError]);

  // --- 7. Review Carousel Auto-Advance ---
  useEffect(() => {
    if (!placeData?.reviews?.length || isPaused) return;

    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % placeData.reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [placeData, isPaused]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="visit-us">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Presence
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-5">
            Visit Us &amp;
            <br />
            <span className="text-muted">What Clients Say</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Delivering excellence from our headquarters in Bhopal. Read real feedback from homeowners and builders who trusted us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* --- LEFT: MAP CONTAINER --- */}
          <div ref={mapContainerRef} className="lg:col-span-7 h-[400px] md:h-[500px] lg:h-auto min-h-[400px] md:min-h-[500px] opacity-0 flex flex-col relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#4285F4]/20 via-transparent to-[#34A853]/20 rounded-[2rem] blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
            
            <div className="relative glass-card-premium w-full h-full flex flex-col overflow-hidden !rounded-[2rem]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4285F4]/10 flex items-center justify-center">
                    <svg width="16" height="16" fill="none" stroke="#4285F4" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white tracking-wide">📍 RCC Headquarters</span>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Katara Hills, Bhopal</p>
                  </div>
                </div>
              </div>

              {/* Map Instance */}
              <div className="w-full flex-grow relative bg-[#121212]">
                {loadingConfig.map && !apiError && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-10 h-10 border-4 border-white/10 border-t-[#4285F4] rounded-full animate-spin"></div>
                  </div>
                )}
                {apiError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#121212]">
                     <svg className="w-12 h-12 mb-4 opacity-50" viewBox="0 0 48 48">
                       <path fill="#757575" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20c11 0 20-8.955 20-20C44 22.659 43.862 21.35 43.611 20.083z" />
                     </svg>
                     <p className="text-center text-muted font-medium">Map currently unavailable.</p>
                     <p className="text-center text-[11px] text-muted max-w-[200px] mt-2">Please check back later or use the directions link below.</p>
                  </div>
                )}
                {/* Map renders here */}
                <div ref={mapElementRef} className="w-full h-full absolute inset-0" />
              </div>

              {/* Footer Action */}
              <div className="px-6 py-5 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=23.19777,77.46467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[44px] rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm md:text-base font-bold transition-all duration-300 hover:bg-accent-blue hover:text-white hover:-translate-y-0.5"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT: REVIEWS CONTAINER --- */}
          <div ref={reviewsContainerRef} className="lg:col-span-5 opacity-0 flex flex-col h-full">
            <div className="glass-card-premium w-full h-full p-8 flex flex-col !rounded-[2rem] relative group overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FBBC05]/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {loadingConfig.reviews ? (
                /* Loading Skeletons */
                <div className="flex-grow flex flex-col items-center justify-center space-y-6 animate-pulse">
                  <div className="w-20 h-20 bg-white/5 rounded-full" />
                  <div className="w-40 h-6 bg-white/5 rounded-lg" />
                  <div className="w-full h-32 bg-white/5 rounded-2xl mt-8" />
                </div>
              ) : placeData ? (
                /* Render Reviews */
                <div className="flex flex-col h-full z-10 relative">
                  <div className="flex flex-col items-center text-center pb-6 border-b border-white/5 shrink-0">
                    
                    {/* Official Google G Logo */}
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28px" height="28px">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20c11 0 20-8.955 20-20C44 22.659 43.862 21.35 43.611 20.083z" />
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.653-3.34-11.124-7.868l-6.529 5.044C9.646 39.695 16.31 44 24 44z" />
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571 c.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{placeData.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-white">{placeData.rating.toFixed(1)}</span>
                      <div className="flex flex-col text-left gap-1">
                        
                        {/* Authentic Google Stars Color #FBBC04 */}
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(placeData.rating) ? "#FBBC04" : "#e0e0e0"}>
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Based on {placeData.user_ratings_total} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="flex-grow flex flex-col relative mt-6"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                  >
                    <span className="absolute -top-4 -left-2 text-6xl text-white/[0.03] font-serif leading-none select-none pointer-events-none">&quot;</span>
                    
                    <div className="relative h-[220px] w-full">
                      <AnimatePresence mode="wait">
                        {placeData.reviews.length > 0 && (
                          <motion.div
                            key={activeReviewIndex}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0 flex flex-col"
                          >
                            <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-5 italic px-2">
                              &quot;{placeData.reviews[activeReviewIndex].text}&quot;
                            </p>
                            
                            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 ring-2 ring-[#4285F4]/30 shrink-0">
                                <img 
                                  src={placeData.reviews[activeReviewIndex].profile_photo_url} 
                                  alt={placeData.reviews[activeReviewIndex].author_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold text-white tracking-wide truncate">{placeData.reviews[activeReviewIndex].author_name}</span>
                                <span className="text-[11px] text-muted">{placeData.reviews[activeReviewIndex].relative_time_description}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {placeData.reviews.length > 1 && (
                      <div className="flex gap-2 justify-center mt-4">
                        {placeData.reviews.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveReviewIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'w-6 bg-[#4285F4]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            aria-label={`Go to review ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Google Attribution & Call To Action */}
                  <div className="mt-6 shrink-0 flex flex-col items-center gap-3">
                    <div className="text-[10px] text-muted font-medium flex items-center gap-1">
                      Powered by <strong className="text-white">Google</strong>
                    </div>
                    <a
                      href={`https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold transition-all hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30 hover:text-[#4285F4]"
                    >
                      Read more reviews on Google
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-red-400 text-sm text-center bg-red-400/5 rounded-xl border border-red-400/10">
                  Failed to initialize Reviews module.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
