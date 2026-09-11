'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ResponseTimeNote from './ResponseTimeNote';
import { trackEvent } from '@/lib/analytics';

const PHONE_PATTERN = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;

export default function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot — real users never see/fill this
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = useCallback((): Errors => {
    const next: Errors = {};
    const trimmedName = name.trim();
    if (!trimmedName) next.name = 'Please enter your name.';
    else if (trimmedName.length > 100) next.name = 'Name is too long.';

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) next.phone = 'Please enter your phone number.';
    else if (!PHONE_PATTERN.test(trimmedPhone)) next.phone = 'Enter a valid 10-digit Indian phone number.';

    const trimmedEmail = email.trim();
    if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) next.email = 'Enter a valid email address.';

    const trimmedMessage = message.trim();
    if (!trimmedMessage) next.message = 'Tell us a little about your project.';
    else if (trimmedMessage.length < 10) next.message = 'Please add a few more details (at least 10 characters).';
    else if (trimmedMessage.length > 1000) next.message = 'Message is too long (max 1000 characters).';

    return next;
  }, [name, phone, email, message]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting) return;

      const validation = validate();
      setErrors(validation);
      if (Object.keys(validation).length > 0) return;

      setSubmitting(true);
      setSubmitError(null);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            message: message.trim(),
            company, // honeypot
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || 'Something went wrong. Please try again.');
        }

        trackEvent('contact_form_submit');
        router.push('/thank-you');
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        setSubmitting(false);
      }
    },
    [name, phone, email, message, company, submitting, validate, router]
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="relative z-10 text-left">
      <h3 className="text-lg font-black text-white mb-1">Send Us Your Details</h3>
      <p className="text-sm text-muted mb-6">Prefer not to WhatsApp? Fill this in instead.</p>

      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="cf-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="form-input"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
          />
          {errors.name && <p id="cf-name-error" className="form-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="cf-phone" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Phone
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            className="form-input"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
          />
          {errors.phone && <p id="cf-phone-error" className="form-error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="cf-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Email <span className="normal-case text-muted/60">(optional)</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={200}
            className="form-input"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
          />
          {errors.email && <p id="cf-email-error" className="form-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="cf-message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Project Details
          </label>
          <textarea
            id="cf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={4}
            className="form-input resize-none"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
          />
          {errors.message && <p id="cf-message-error" className="form-error">{errors.message}</p>}
        </div>
      </div>

      {submitError && (
        <div role="alert" className="mt-4 text-sm text-accent-red bg-accent-red/10 border border-accent-red/20 rounded-xl px-4 py-3">
          {submitError}{' '}
          <a
            href="https://wa.me/917987900965"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Message us on WhatsApp instead.
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-secondary w-full justify-center mt-6 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Send Enquiry'}
      </button>

      <ResponseTimeNote className="mt-4" />

      <p className="text-[11px] text-muted/70 mt-3 leading-relaxed">
        Your details are used only to respond to your enquiry. See our{' '}
        <Link href="/privacy-policy" className="underline hover:text-muted">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
