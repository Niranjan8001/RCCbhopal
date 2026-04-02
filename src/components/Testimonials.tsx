'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mock types reflecting what we'd get from Google Places API
interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

// Temporary Mock Data
const MOCK_REVIEWS: GoogleReview[] = [
  {
    author_name: 'Renu Sahai',
    profile_photo_url: 'https://ui-avatars.com/api/?name=Renu+Sahai&background=random',
    rating: 5,
    text: 'Our house looks completely transformed thanks to Reliable Construction & Consultancy. The renovation was done with great care and professionalism. The team was polite, responsive, and committed to quality. Every detail was executed perfectly. We are truly satisfied and grateful for such outstanding work.',
    relative_time_description: '2 months ago',
  },
  {
    author_name: 'Amitesh Tiwari',
    profile_photo_url: 'https://ui-avatars.com/api/?name=Amitesh+Tiwari&background=random',
    rating: 5,
    text: 'Reliable construction is really a reliable vendor when it comes to construction and building. They are really good in terms of services and they also use the best material as per the budget. Most importantly, they are really professional and polite in nature.',
    relative_time_description: '4 months ago',
  },
  {
    author_name: 'Rushil Bhatia',
    profile_photo_url: 'https://ui-avatars.com/api/?name=Rushil+Bhatia&background=random',
    rating: 5,
    text: 'Reliable Construction & Consultancy truly lived up to their name! From start to finish, their team was professional, efficient, and delivered exceptional results. Their attention to detail and commitment to quality were impressive.',
    relative_time_description: '5 months ago',
  },
  {
    author_name: 'Ajay Panvar',
    profile_photo_url: 'https://ui-avatars.com/api/?name=Ajay+Panvar&background=random',
    rating: 5,
    text: 'Reliable Construction is a highly recommended, registered firm in Bhopal, known for its expertise in both construction and consultancy services. They are a professional and trustworthy team with a keen eye for detail.',
    relative_time_description: '7 months ago',
  },
  {
    author_name: 'Sonal Desai',
    profile_photo_url: 'https://ui-avatars.com/api/?name=Sonal+Desai&background=random',
    rating: 5,
    text: 'Excellent structural planning and execution. We gave them a tight deadline and they delivered far beyond expectations without compromising any luxury elements. Highly recommend this team.',
    relative_time_description: '10 months ago',
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Simulated Mock Fetch exactly as you would implement the real API call
  useEffect(() => {
    let isMounted = true;
    
    // In the future, this will be: fetch('/api/reviews/google')
    const fetchGoogleReviews = async () => {
      try {
        // Simulating network delay for realistic visual loading state
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        if (isMounted) {
          setReviews(MOCK_REVIEWS);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch google reviews:", error);
        setLoading(false);
      }
    };

    fetchGoogleReviews();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reviews-heading',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reviews-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" id="testimonials">
      
      {/* Background Ambience */}
       <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-red/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 reviews-heading opacity-0">
          <span className="text-accent-red text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Google Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-10">
            What Clients
            <br />
            <span className="text-muted">Say</span>
          </h2>
          
          {/* Top Center Statistics */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-xl shadow-black/20">
              <span className="text-3xl font-black text-white">4.8</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#FFD60A">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <p className="text-muted text-sm font-medium tracking-wide">
              Based on 100+ Google Reviews
            </p>
            
            <a 
              href="https://www.google.com/search?q=Reliable+Construction+Bhopal" // Placeholder Link
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 rounded-full border border-accent-yellow/40 text-accent-yellow text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-accent-yellow hover:text-black hover:shadow-[0_0_20px_rgba(255,214,10,0.3)]"
            >
              View on Google
            </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full pb-8">
          {/* Left/Right Fade Gradents for smooth masking */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {loading ? (
            // Loading skeleton
            <div className="flex gap-6 overflow-hidden py-4 justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[85vw] sm:w-[400px] h-[250px] rounded-[2rem] bg-white/5 animate-pulse flex-shrink-0" />
              ))}
            </div>
          ) : (
            <div 
              ref={carouselRef}
              className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-8 hide-scrollbar cursor-grab active:cursor-grabbing"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none',  // IE/Edge
              }}
            >
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[450px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: Math.min(idx * 0.1, 0.4), ease: "easeOut" }}
                >
                  <div className="glass-card-strong h-full p-8 md:p-10 rounded-[2rem] flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(255,214,10,0.2)] hover:border-accent-yellow/20 relative overflow-hidden">
                    
                    {/* Inner glowing corner effect on hover */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-yellow/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div>
                      {/* Rating & Verified Badge */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 opacity-60">
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4285F4]">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span className="text-[10px] uppercase tracking-widest font-bold">Verified</span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-white/80 leading-relaxed mb-8 line-clamp-4 text-sm md:text-base selection:bg-accent-yellow/30 relative z-10">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Author Bottom */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 ring-2 ring-white/5 group-hover:ring-accent-yellow/30 transition-colors">
                        {/* Using standard img here because external google profile urls require NextJS domain config adjustments */}
                        <img 
                          src={review.profile_photo_url} 
                          alt={review.author_name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white tracking-wide">{review.author_name}</span>
                        <span className="text-xs text-muted">{review.relative_time_description}</span>
                      </div>
                      
                      {/* Subtle Google "G" watermark icon in the background of user area */}
                      <svg className="ml-auto opacity-10 w-8 h-8 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hide scrollbar utility styling internal to this component just to be safe */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
