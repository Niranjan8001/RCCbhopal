'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────── Types ─────────────────── */
interface ReviewItem {
  author: string;
  rating: number;
  text: string;
  time: string;
  avatar: string;
}

interface ReviewsData {
  name: string;
  rating: number;
  totalReviews: number;
  reviews: ReviewItem[];
}

/* ─────────────────── Review Data ─────────────────── */
const REVIEWS_DATA: ReviewsData = {
  name: "Reliable Construction & Consultancy (RCC)",
  rating: 5.0,
  totalReviews: 100,
  reviews: [
    {
      author: "Amitesh Tiwari",
      rating: 5,
      text: "Reliable construction is really a reliable vendor when it comes to construction and building. They are really good in terms of services.",
      time: "3 months ago",
      avatar: "https://ui-avatars.com/api/?name=Amitesh+Tiwari&background=1a1a2e&color=FFD60A&bold=true&size=128"
    },
    {
      author: "Renu Sahai",
      rating: 5,
      text: "Our house looks completely transformed thanks to Reliable Construction & Consultancy. The renovation was done with great care and professionalism.",
      time: "4 months ago",
      avatar: "https://ui-avatars.com/api/?name=Renu+Sahai&background=1a1a2e&color=FFD60A&bold=true&size=128"
    },
    {
      author: "Vikram Patel",
      rating: 5,
      text: "Exceptional quality of work and timely delivery. The team at RCC truly understands modern architecture and delivered beyond our expectations.",
      time: "2 months ago",
      avatar: "https://ui-avatars.com/api/?name=Vikram+Patel&background=1a1a2e&color=FFD60A&bold=true&size=128"
    },
    {
      author: "Priya Sharma",
      rating: 5,
      text: "From the initial consultation to the final handover, every step was handled with utmost professionalism. Our dream home is now a reality thanks to RCC.",
      time: "1 month ago",
      avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=1a1a2e&color=FFD60A&bold=true&size=128"
    },
    {
      author: "Rajesh Kumar",
      rating: 5,
      text: "Best construction company in Bhopal. Their attention to detail and use of premium materials sets them apart from the competition. Highly recommended!",
      time: "5 months ago",
      avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=1a1a2e&color=FFD60A&bold=true&size=128"
    },
    {
      author: "Anita Deshmukh",
      rating: 5,
      text: "We were impressed by the transparency and honesty throughout the project. No hidden costs, no delays. RCC delivered exactly what was promised.",
      time: "6 months ago",
      avatar: "https://ui-avatars.com/api/?name=Anita+Deshmukh&background=1a1a2e&color=FFD60A&bold=true&size=128"
    }
  ]
};

/* ─────────────────── Skeleton Shimmer ─────────────────── */
function SkeletonLoader() {
  return (
    <div className="testimonial-carousel-skeleton">
      {/* Header skeleton */}
      <div className="tc-skeleton-header">
        <div className="tc-shimmer tc-shimmer-icon" />
        <div className="tc-skeleton-header-text">
          <div className="tc-shimmer tc-shimmer-title" />
          <div className="tc-shimmer tc-shimmer-stars" />
        </div>
      </div>

      {/* Divider */}
      <div className="tc-skeleton-divider" />

      {/* Body skeleton */}
      <div className="tc-skeleton-body">
        <div className="tc-shimmer tc-shimmer-line tc-shimmer-line-full" />
        <div className="tc-shimmer tc-shimmer-line tc-shimmer-line-80" />
        <div className="tc-shimmer tc-shimmer-line tc-shimmer-line-60" />
      </div>

      {/* Author skeleton */}
      <div className="tc-skeleton-author">
        <div className="tc-shimmer tc-shimmer-avatar" />
        <div className="tc-skeleton-author-text">
          <div className="tc-shimmer tc-shimmer-name" />
          <div className="tc-shimmer tc-shimmer-time" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Star Rating ─────────────────── */
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="tc-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#FFD60A' : '#333'}
          className="tc-star"
          style={{
            filter: star <= Math.round(rating) ? 'drop-shadow(0 0 6px rgba(255, 214, 10, 0.6))' : 'none'
          }}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────── Avatar Component ─────────────────── */
function ReviewAvatar({ author, avatarUrl }: { author: string; avatarUrl: string }) {
  const [imgError, setImgError] = useState(false);
  const initials = author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (imgError) {
    return (
      <div className="tc-avatar tc-avatar-initials">
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div className="tc-avatar">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt={author}
        className="tc-avatar-img"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  );
}

/* ─────────────────── Main Component ─────────────────── */
export default function TestimonialCarousel() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Load reviews (with brief skeleton for polish) ── */
  useEffect(() => {
    // Brief skeleton display for smooth UX transition
    const timer = setTimeout(() => {
      setData(REVIEWS_DATA);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  /* ── Auto-slide ── */
  useEffect(() => {
    if (!data?.reviews?.length || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.reviews.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data, isPaused]);

  /* ── Dot click ── */
  const goToReview = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  /* ── Render states ── */
  if (loading) return <SkeletonLoader />;

  if (!data || !data.reviews?.length) {
    return (
      <div className="tc-error-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,214,10,0.4)" strokeWidth="1.5">
          <path d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="tc-error-text">No reviews available at the moment.</p>
      </div>
    );
  }

  const currentReview = data.reviews[activeIndex];

  return (
    <div
      className="tc-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Ambient glow orbs */}
      <div className="tc-glow-orb tc-glow-orb-1" />
      <div className="tc-glow-orb tc-glow-orb-2" />

      {/* ── Top Section: Business Info ── */}
      <div className="tc-header">
        <div className="tc-header-left">
          <div className="tc-google-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20c11 0 20-8.955 20-20C44 22.659 43.862 21.35 43.611 20.083z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.653-3.34-11.124-7.868l-6.529 5.044C9.646 39.695 16.31 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571c.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083z" />
            </svg>
          </div>
          <div className="tc-header-info">
            <h3 className="tc-business-name">{data.name}</h3>
            <div className="tc-rating-row">
              <span className="tc-rating-number">{data.rating.toFixed(1)}</span>
              <StarRating rating={data.rating} size={15} />
              <span className="tc-total-reviews">({data.totalReviews})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="tc-divider" />

      {/* ── Middle Section: Review Content ── */}
      <div className="tc-review-content">
        <span className="tc-quote-mark">&quot;</span>

        <div className="tc-review-text-container">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="tc-review-text"
            >
              &quot;{currentReview.text}&quot;
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Section: Author + Dots ── */}
      <div className="tc-footer">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="tc-author"
          >
            <ReviewAvatar author={currentReview.author} avatarUrl={currentReview.avatar} />
            <div className="tc-author-info">
              <span className="tc-author-name">{currentReview.author}</span>
              <span className="tc-author-time">{currentReview.time}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        {data.reviews.length > 1 && (
          <div className="tc-dots">
            {data.reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToReview(idx)}
                className={`tc-dot ${idx === activeIndex ? 'tc-dot-active' : ''}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
