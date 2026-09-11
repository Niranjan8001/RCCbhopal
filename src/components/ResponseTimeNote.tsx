export default function ResponseTimeNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-muted flex items-center justify-center gap-1.5 ${className}`}>
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0">
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      We typically respond within 1 business day.
    </p>
  );
}
