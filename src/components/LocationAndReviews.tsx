

'use client';

declare global {
  interface Window {
    google: any;
  }
}

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Define Google API types minimally to avoid full type definitions overhead
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

export default function LocationAndReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [loadingConfig, setLoadingConfig] = useState({ map: true, reviews: true });
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const coordinates = { lat: 23.197992, lng: 77.469599 }; // Approximate Katara Hills / Plus Code 5G93+JF

  // Setup GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Map container reveal (slide from left)
      if (mapContainerRef.current) {
        gsap.fromTo(mapContainerRef.current, { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: mapContainerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }

      // Reviews container reveal (slide from right)
      if (reviewsContainerRef.current) {
        gsap.fromTo(reviewsContainerRef.current, { x: 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: reviewsContainerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Map Dark Theme Styling Array
  const darkMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
  ];

  // Initialize Map and Places Service
  useEffect(() => {
    // Declare the initialize function to run once script is loaded
    const initGoogleApis = () => {
      if (!window.google) return;

      try {
        // 1. Initialize Map
        const map = new window.google.maps.Map(mapElementRef.current!, {
          center: coordinates,
          zoom: 16,
          styles: darkMapStyles,
          disableDefaultUI: true, // Disable all default controls
          zoomControl: true, // Re-enable just zoom
          mapId: 'rcc_premium_map_style',
        });

        // 2. Add Custom Marker
        new window.google.maps.Marker({
          position: coordinates,
          map,
          title: "RCC Headquarters",
          animation: window.google.maps.Animation.DROP,
        });

        setLoadingConfig(prev => ({ ...prev, map: false }));

        // 3. Initialize Places Service & Fetch Details
        const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
        if (placeId) {
          const service = new window.google.maps.places.PlacesService(map);

          service.getDetails({
            placeId: placeId,
            fields: ['name', 'rating', 'user_ratings_total', 'reviews']
          }, (place: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              // Ensure we sort by highest rated reviews or simply use as is (API returns top)
              // Only taking reviews with text
              const validReviews = place.reviews?.filter((r: any) => r.text && r.text.length > 5) || [];

              setPlaceData({
                name: place.name || 'RCC',
                rating: place.rating || 0,
                user_ratings_total: place.user_ratings_total || 0,
                reviews: validReviews
              });
            }
            setLoadingConfig(prev => ({ ...prev, reviews: false }));
          });
        }
      } catch (err) {
        console.error("Google Maps Initialization Error:", err);
      }
    };

    // Load Script dynamically to ensure clean state and correct lazy loading
    if (!document.getElementById('google-maps-script')) {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.warn("Google Maps API key missing.");
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = initGoogleApis;
      document.head.appendChild(script);
    } else if (window.google) {
      initGoogleApis();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Review Carousel Auto-Advance
  useEffect(() => {
    if (!placeData?.reviews?.length || isPaused) return;

    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % placeData.reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [placeData, isPaused]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" id="visit-us">
      {/* ─── Background Ambience ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-screen-2xl mx-auto">
        {/* ─── Section Header ─── */}
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

        {/* ─── Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ─── LEFT: Google Maps Card ─── */}
          <div ref={mapContainerRef} className="lg:col-span-7 h-[500px] lg:h-auto min-h-[500px] opacity-0 flex flex-col relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-accent-yellow/20 via-transparent to-accent-blue/20 rounded-[2rem] blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>

            <div className="relative glass-card-premium w-full h-full flex flex-col overflow-hidden !rounded-[2rem]">

              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                    <svg width="16" height="16" fill="none" stroke="#0A84FF" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white tracking-wide">📍 RCC Headquarters</span>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Katara Hills, Bhopal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent-green/10 rounded-full border border-accent-green/20">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">Open Now</span>
                </div>
              </div>

              {/* Map Instance */}
              <div className="w-full flex-grow relative bg-[#121212]">
                {loadingConfig.map && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white/10 border-t-accent-blue rounded-full animate-spin"></div>
                  </div>
                )}
                <div ref={mapElementRef} className="w-full h-full absolute inset-0 mix-blend-screen" />
                {/* Premium Gradient Overlay on Map */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-5 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=5G93%2BJF+Bhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-bold transition-all duration-300 hover:bg-accent-blue hover:text-white hover:shadow-[0_0_20px_rgba(10,132,255,0.3)] hover:-translate-y-0.5"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Active Reviews Panel ─── */}
          <div ref={reviewsContainerRef} className="lg:col-span-5 opacity-0 flex flex-col h-full">
            <div className="glass-card-premium w-full h-full p-8 md:p-10 flex flex-col !rounded-[2rem] relative group overflow-hidden">
              {/* Inner ambient glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-yellow/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {loadingConfig.reviews ? (
                <div className="flex-grow flex flex-col items-center justify-center space-y-6 animate-pulse">
                  <div className="w-24 h-24 bg-white/5 rounded-full" />
                  <div className="w-48 h-8 bg-white/5 rounded-lg" />
                  <div className="w-full h-32 bg-white/5 rounded-2xl" />
                </div>
              ) : placeData ? (
                <div className="flex flex-col h-full z-10 relative">

                  {/* Google Business Header Info */}
                  <div className="flex flex-col items-center text-center pb-8 border-b border-white/5 mb-8 shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      {/* Google G Logo icon */}
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{placeData.name}</h3>

                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-white">{placeData.rating.toFixed(1)}</span>
                      <div className="flex flex-col text-left gap-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(placeData.rating) ? "#FFD60A" : "#333"}>
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-muted font-medium tracking-wide">Based on {placeData.user_ratings_total} reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Presenter Carousel */}
                  <div
                    className="flex-grow flex flex-col relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                  >
                    {/* Quotation Marks Background */}
                    <span className="absolute -top-4 -left-2 text-6xl text-white/[0.03] font-serif leading-none select-none pointer-events-none">"</span>

                    <div className="relative h-[250px] w-full mt-4">
                      <AnimatePresence mode="wait">
                        {placeData.reviews.length > 0 && (
                          <motion.div
                            key={activeReviewIndex}
                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 flex flex-col"
                          >
                            <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-6 italic">
                              "{placeData.reviews[activeReviewIndex].text}"
                            </p>

                            <div className="mt-auto flex items-center gap-4 pt-4">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 ring-2 ring-white/5">
                                {/* NextJS image unoptimized export requires direct <img> for dynamic external urls */}
                                <img
                                  src={placeData.reviews[activeReviewIndex].profile_photo_url}
                                  alt={placeData.reviews[activeReviewIndex].author_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-wide">{placeData.reviews[activeReviewIndex].author_name}</span>
                                <span className="text-[11px] text-muted">{placeData.reviews[activeReviewIndex].relative_time_description}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Carousel Indicators / Controls */}
                    {placeData.reviews.length > 1 && (
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                        <div className="flex gap-2">
                          {placeData.reviews.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveReviewIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeReviewIndex ? 'w-6 bg-accent-yellow' : 'bg-white/20 hover:bg-white/40'}`}
                              aria-label={`Go to review ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 shrink-0">
                    <a
                      href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:-translate-y-0.5"
                    >
                      Read All on Google
                    </a>
                  </div>

                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-muted text-sm text-center">
                  Error loading places data.<br />Verify API key restrictions.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
