import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-24">
      <div className="glass-card-premium max-w-lg w-full p-10 sm:p-14 text-center">
        <div className="w-14 h-14 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center mx-auto mb-6">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-accent-green">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          Thank You
        </h1>
        <p className="text-muted text-sm sm:text-base leading-relaxed mb-2">
          We&apos;ve received your enquiry and our team will get back to you within 1 business day.
        </p>
        <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
          If your project is urgent, feel free to message us directly on WhatsApp in the meantime.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#projects" className="btn-primary w-full sm:w-auto justify-center min-h-[44px]">
            View Our Projects
          </Link>
          <a
            href="https://wa.me/917987900965?text=Hello%20RCC,%20I%20just%20submitted%20an%20enquiry%20on%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto justify-center min-h-[44px]"
          >
            WhatsApp Us
          </a>
        </div>

        <Link href="/" className="inline-block mt-8 text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
