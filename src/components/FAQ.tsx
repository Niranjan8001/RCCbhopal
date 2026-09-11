'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  {
    question: 'What construction services does RCC provide?',
    answer:
      'RCC specialises in luxury residential homes (singlex, duplex, and triplex builds), full home renovations, and government civil works under CPWD contracts. Our portfolio also includes commercial shop complexes built to durable RCC structural standards.',
  },
  {
    question: 'How does the consultation process work?',
    answer:
      'It starts with an in-depth consultation to understand your vision, requirements, and budget — either through our AI Advisor chat or directly on WhatsApp. From there we move through Design, Build, and Deliver, with a week-by-week timeline and milestone-linked payments throughout.',
  },
  {
    question: 'How do I request a project estimate?',
    answer:
      'Use the Instant Cost Calculator above to get an approximate figure by adjusting area, tier, and build type, or ask our AI Advisor to "estimate my project" for a guided, conversational estimate. Either way, you can send the result straight to our team on WhatsApp for a detailed quote.',
  },
  {
    question: 'What information is needed to start a project?',
    answer:
      "To put together an estimate we'll need your built-up area (in sq ft), the number of floors (singlex/duplex/triplex), your preferred finish tier (Silver or Gold), and your plot location.",
  },
  {
    question: 'Which locations does RCC serve?',
    answer:
      'RCC is based in Katara Hills, Bhopal, and primarily serves Bhopal and the surrounding areas. Our site-visit history also spans project locations across Madhya Pradesh, so reach out even if you’re outside Bhopal city.',
  },
  {
    question: "What's the difference between the Silver and Gold plans?",
    answer:
      "Both use trusted, approved brands across the same specification categories. Gold (₹1,850/sq ft) adds a false ceiling in the drawing room and bedrooms, stainless-steel railings, a second terrace water tank plus an underground tank, granite door/window framing with designer-laminated shutters, larger flooring tiles in the drawing, dining and passage areas, and a granite kitchen top — full details are in the comparison table above Silver (₹1,550/sq ft).",
  },
  {
    question: 'Is the design consultation free?',
    answer:
      'Design and consultancy work — floor plans, elevations, structural, working and EPD drawings — is a paid service with published, upfront rates based on plan type and project size. See our Design & Consultancy Pricing section for the full rate card; there are no hidden charges.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="section-padding relative" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-accent-yellow text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Common
            <br />
            <span className="text-muted">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.question}</span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-accent-yellow transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    role="region"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
