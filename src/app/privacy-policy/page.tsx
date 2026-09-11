import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Reliable Construction & Consultancy (RCC) collects, uses, and protects information submitted through this website.',
  alternates: { canonical: '/privacy-policy' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="text-muted text-sm sm:text-base leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <Section title="Who we are">
          <p>
            This website is operated by Reliable Construction &amp; Consultancy (&quot;RCC&quot;, &quot;we&quot;, &quot;us&quot;),
            based in Katara Hills, Bhopal, Madhya Pradesh, India. This policy explains what
            information we collect through this website, why, and how it&apos;s handled.
          </p>
        </Section>

        <Section title="What we collect">
          <p>
            <strong className="text-white/90">Contact form:</strong> if you fill in our contact form,
            we collect your name, phone number, the message/project details you provide, and — if you
            choose to share it — your email address.
          </p>
          <p>
            <strong className="text-white/90">AI chat widget:</strong> messages you type into the RCC
            AI Advisor are sent to Anthropic (the provider of the underlying AI model) to generate a
            response. We don&apos;t ask the assistant to collect personal details beyond what you
            volunteer in conversation, and we don&apos;t recommend sharing sensitive personal or
            payment information with it.
          </p>
          <p>
            <strong className="text-white/90">Analytics (if enabled):</strong> we may use Google
            Analytics to understand overall traffic and which sections of the site people use — this
            uses cookies/local identifiers set by Google, not information that identifies you
            personally.
          </p>
          <p>
            We do not require account creation, and we do not collect payment information on this
            website.
          </p>
        </Section>

        <Section title="Why we collect it">
          <p>
            Contact-form details are used only to respond to your enquiry — to understand your
            project and get back to you. We don&apos;t use this information for unrelated marketing,
            and we don&apos;t sell it to third parties.
          </p>
        </Section>

        <Section title="Third parties involved">
          <p>
            Contact-form submissions are delivered to us via Resend, an email-delivery service. AI
            chat messages are processed by Anthropic to generate responses. Our site-visits map uses
            Google Maps/Places, which is subject to Google&apos;s own privacy policy for any data it
            collects while the map is loaded. We only use these providers to operate the features
            described above.
          </p>
        </Section>

        <Section title="Cookies & local storage">
          <p>
            This site itself does not set marketing or tracking cookies. If Google Analytics is
            active, it sets its own cookies to distinguish visitors; embedded Google Maps content may
            do the same. You can control cookies through your browser settings.
          </p>
        </Section>

        <Section title="How long we keep information">
          <p>
            Contact-form submissions are delivered to us by email and are not stored in a database on
            this website. We retain enquiry emails for as long as reasonably needed to respond to and
            follow up on your enquiry.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We use reasonable technical measures (such as server-side validation and not exposing
            service credentials to the browser) to protect the information submitted through this
            site. No method of transmission over the internet is completely secure, so we can&apos;t
            guarantee absolute security.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can choose not to submit the contact form or use the AI chat widget — WhatsApp and
            phone remain available as direct alternatives. If you&apos;d like us to delete an enquiry
            you previously sent us, contact us using the details below and we&apos;ll action it.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about this policy or your information can be sent to{' '}
            <a href="mailto:help@rccbhopal.in" className="text-accent-yellow hover:underline">
              help@rccbhopal.in
            </a>{' '}
            or via{' '}
            <a
              href="https://wa.me/917987900965"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-yellow hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </Section>

        <p className="text-xs text-muted/60 leading-relaxed">
          This page is provided for transparency and does not constitute legal advice or a claim of
          compliance with any specific data-protection regulation.
        </p>

        <Link href="/" className="inline-block mt-12 text-xs text-muted hover:text-foreground transition-colors uppercase tracking-widest">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
