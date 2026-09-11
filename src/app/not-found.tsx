import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-24">
      <div className="glass-card-premium max-w-md w-full p-10 sm:p-12 text-center">
        <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
          404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Head back home or
          get in touch with us directly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary w-full sm:w-auto justify-center min-h-[44px]">
            Back to Home
          </Link>
          <a
            href="https://wa.me/917987900965?text=Hello%20RCC,%20I%20want%20to%20know%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto justify-center min-h-[44px]"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </main>
  );
}
