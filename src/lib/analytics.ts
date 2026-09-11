export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fires a GA4 event. No-ops silently if analytics isn't configured/loaded —
// never throws, and callers must never pass PII (names, phone numbers, emails) as params.
export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, params);
}
