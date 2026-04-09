import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-background/50 backdrop-blur-3xl">
      {/* Top gradient border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-yellow/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo.png" alt="RCC Logo" width={40} height={40} className="rounded-full bg-white" />
              <span className="text-xl font-bold tracking-tight">RCC Build</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              Reliable Construction & Consultancy — Engineering excellence since 1991. Premium construction solutions for those who demand the best.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-yellow/30 hover:-translate-y-1 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-yellow/30 hover:-translate-y-1 transition-all duration-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'Cost Estimator', href: '#estimator' },
                { label: 'Our Process', href: '#process' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Our Presence', href: '#presence' },
                { label: 'About Us', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground hover:translate-x-1 transition-all duration-300 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted mt-0.5 flex-shrink-0">
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-muted">Bhopal, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted mt-0.5 flex-shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="tel:+917987900965" className="text-sm text-muted hover:text-foreground transition-colors">+91 79879 00965</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted mt-0.5 flex-shrink-0">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="mailto:info@rccbuild.in" className="text-sm text-muted hover:text-foreground transition-colors">info@rccbuild.in</a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Reliable Construction & Consultancy. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with <span className="text-accent-red">♥</span> by{' '}
            <a href="https://github.com/Niranjan8001" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline font-medium">
              Niranjan Saxena
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
