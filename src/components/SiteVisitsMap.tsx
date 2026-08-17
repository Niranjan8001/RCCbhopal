'use client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    gm_authFailure: () => void;
  }
}

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { siteVisits, type SiteVisit } from '@/data/siteVisits';

// Fallback center (Bhopal) used only if siteVisits is ever empty — normally
// the map fits its bounds to whatever visits exist, since they're spread
// across Madhya Pradesh rather than clustered in one city.
const MP_CENTER = { lat: 23.2599, lng: 77.4126 };

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0a0a0a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a0a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d4af37' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6b6b6b' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#12261c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0a0a0a' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#0a0a0a' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#FFD60A' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1b2a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#0A84FF' }] },
];

const PIN_ICON_URL =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 24 30">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12z" fill="#FF6500" stroke="#0A0A0A" stroke-width="1"/>
      <circle cx="12" cy="12" r="5" fill="#0A0A0A"/>
    </svg>`
  );

const HAS_MAPS_KEY = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

export default function SiteVisitsMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>(
    HAS_MAPS_KEY ? 'loading' : 'error'
  );
  const [activeVisit, setActiveVisit] = useState<SiteVisit | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const openVisit = useCallback((visit: SiteVisit) => {
    setActivePhotoIndex(0);
    setActiveVisit(visit);
  }, []);

  const closeVisit = useCallback(() => setActiveVisit(null), []);

  // Poll for the Google Maps script (loaded globally in layout.tsx via next/script)
  useEffect(() => {
    if (!HAS_MAPS_KEY) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 40; // ~8s at 200ms

    // Google calls this for key/referrer/billing failures (invalid key,
    // referrer not allowed, etc.) — fall back to the styled list instead of
    // leaving Google's raw error box on screen. (A 'tilesloaded'/'idle'
    // timeout was tried as a catch-all for failures with no callback, e.g.
    // ApiTargetBlockedMapError, but those events aren't reliable enough on
    // the newer WebGL vector renderer to use as a health check — it produced
    // false positives that hid an actually-working map.)
    window.gm_authFailure = () => {
      if (!cancelled) setMapStatus('error');
    };

    const tryInit = () => {
      if (cancelled) return;
      attempts += 1;

      if (typeof window !== 'undefined' && window.google?.maps && mapContainerRef.current) {
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: MP_CENTER,
          zoom: 11,
          styles: DARK_MAP_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
        });
        mapInstanceRef.current = map;

        if (siteVisits.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          siteVisits.forEach((visit) => {
            const position = { lat: visit.lat, lng: visit.lng };
            bounds.extend(position);

            const marker = new window.google.maps.Marker({
              position,
              map,
              title: visit.title,
              icon: {
                url: PIN_ICON_URL,
                scaledSize: new window.google.maps.Size(36, 44),
                anchor: new window.google.maps.Point(18, 44),
              },
              animation: window.google.maps.Animation.DROP,
            });
            marker.addListener('click', () => openVisit(visit));
          });

          // Visits are spread across Madhya Pradesh, not one city — frame
          // whatever pins exist instead of assuming a fixed city center.
          if (siteVisits.length === 1) {
            map.setCenter(bounds.getCenter());
            map.setZoom(13);
          } else {
            map.fitBounds(bounds, 48);
          }
        }

        setMapStatus('ready');
        return;
      }

      if (attempts >= maxAttempts) {
        setMapStatus('error');
        return;
      }

      window.setTimeout(tryInit, 200);
    };

    tryInit();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openVisit]);

  // Modal: scroll lock + Escape to close
  useEffect(() => {
    if (activeVisit) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVisit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVisit) return;
      if (e.key === 'Escape') closeVisit();
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((i) => (i + 1) % activeVisit.photos.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((i) => (i - 1 + activeVisit.photos.length) % activeVisit.photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVisit, closeVisit]);

  return (
    <section
      className="section-padding relative bg-background overflow-hidden"
      id="site-visits"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid-faint opacity-40" />

      <div className="max-w-screen-2xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.3em] mb-4 block"
          >
            On The Ground
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white"
          >
            Site Visits Across India
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light"
          >
            Every pin is a real project we&apos;ve walked through — click one to see photos and details from that visit.
          </motion.p>
        </div>

        {mapStatus !== 'error' ? (
          <div
            key="map-shell"
            ref={mapContainerRef}
            className="sv-map-shell w-full h-[420px] md:h-[560px] bg-white/[0.03]"
          />
        ) : (
          <div key="fallback-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteVisits.map((visit) => (
              <button
                key={visit.id}
                onClick={() => openVisit(visit)}
                className="glass-card p-5 text-left hover:border-accent-yellow/40 transition-colors"
              >
                <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest">
                  {visit.projectType}
                </span>
                <h3 className="text-white font-bold mt-2 mb-1">{visit.title}</h3>
                <p className="text-muted text-sm">{visit.locality}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pin Detail Modal */}
      <AnimatePresence>
        {activeVisit && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background/[0.98] backdrop-blur-xl overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeVisit}
          >
            <button
              onClick={closeVisit}
              className="fixed top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white text-xl backdrop-blur-md"
              aria-label="Close site visit details"
            >
              ✕
            </button>

            <div className="min-h-full flex items-center justify-center p-4 md:p-8">
              <motion.div
                className="glass-card-premium w-full max-w-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Photo Gallery */}
                <div className="relative w-full aspect-[16/10] bg-black/40 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhotoIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(6px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={activeVisit.photos[activePhotoIndex]}
                        alt={`${activeVisit.title} — ${activeVisit.locality}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23C5A880' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21 15 16 10 5 21'/%3E%3C/svg%3E";
                          target.style.objectFit = 'center';
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                  {activeVisit.photos.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActivePhotoIndex(
                            (i) => (i - 1 + activeVisit.photos.length) % activeVisit.photos.length
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-md"
                        aria-label="Previous photo"
                      >
                        ←
                      </button>
                      <button
                        onClick={() =>
                          setActivePhotoIndex((i) => (i + 1) % activeVisit.photos.length)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-md"
                        aria-label="Next photo"
                      >
                        →
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sv-dots">
                        {activeVisit.photos.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActivePhotoIndex(idx)}
                            className={`sv-dot ${idx === activePhotoIndex ? 'sv-dot-active' : ''}`}
                            aria-label={`Go to photo ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <span className="text-accent-yellow text-xs font-bold uppercase tracking-widest">
                    {activeVisit.projectType}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mt-2 mb-3">
                    {activeVisit.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">
                    {activeVisit.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-white/10 pt-4">
                    <div>
                      <p className="text-muted text-[10px] uppercase tracking-widest mb-1">Location</p>
                      <p className="text-white font-semibold text-sm">{activeVisit.locality}</p>
                    </div>
                    <div>
                      <p className="text-muted text-[10px] uppercase tracking-widest mb-1">Visit Date</p>
                      <p className="text-white font-semibold text-sm">
                        {new Date(activeVisit.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
