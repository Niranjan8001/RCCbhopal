'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'assistant'; content: string };

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the RCC AI Advisor. Ask me anything about construction, materials, or timelines — or say **\"estimate my project\"** to get an instant cost estimate.",
};

function renderContent(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

type ProjectDetails = { cost: string; area?: string; floors?: string; tier?: string; location?: string };

function extractDetails(content: string): ProjectDetails | null {
  const costMatch = content.match(/Estimated cost:\s*(₹[\d,]+)/i);
  if (!costMatch) return null;
  return {
    cost: costMatch[1],
    area: content.match(/Area:\s*([\d,]+)\s*sq ft/i)?.[1],
    floors: content.match(/Floors:\s*(\w+)/i)?.[1],
    tier: content.match(/Tier:\s*(Silver|Gold)/i)?.[1],
    location: content.match(/Location:\s*(.+?)(?:\n|$)/i)?.[1]?.trim(),
  };
}

function buildWhatsAppMessage(d: ProjectDetails): string {
  const lines = [`Hi RCC! I used your AI Advisor and got a project estimate.\n`];
  if (d.area)     lines.push(`📐 Area: ${d.area} sq ft`);
  if (d.floors)   lines.push(`🏠 Type: ${d.floors}`);
  if (d.tier)     lines.push(`✨ Tier: ${d.tier}`);
  if (d.location) lines.push(`📍 Location: ${d.location}`);
  lines.push(`💰 Estimated Cost: ${d.cost}`);
  lines.push(`\nI'd like a detailed quote and to discuss my project.`);
  return lines.join('\n');
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again or reach us on WhatsApp.',
        };
        return copy;
      });
    }

    setStreaming(false);
  }, [input, messages, streaming]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[5.5rem] left-4 sm:left-6 z-[65] w-[calc(100vw-2rem)] sm:w-[360px] flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/10"
            style={{
              backgroundColor: 'rgba(10, 10, 10, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              height: 'min(520px, calc(100dvh - 7rem))',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="w-8 h-8 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/30 flex items-center justify-center text-[#F5C542] text-sm font-black shrink-0">
                ✦
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold leading-none">RCC AI Advisor</p>
                <p className="text-[10px] text-[#30D158] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] inline-block animate-pulse" />
                  Online — Ask me anything
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors text-xs shrink-0"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {messages.map((msg, idx) => {
                const isAI = msg.role === 'assistant';
                const isStreaming = streaming && idx === messages.length - 1 && isAI;
                const details = isAI ? extractDetails(msg.content) : null;

                return (
                  <div key={idx} className={`flex gap-2.5 ${isAI ? '' : 'flex-row-reverse'}`}>
                    {isAI && (
                      <div className="w-6 h-6 rounded-full bg-[#F5C542]/10 border border-[#F5C542]/30 flex items-center justify-center text-[#F5C542] text-[10px] font-black shrink-0 mt-0.5">
                        ✦
                      </div>
                    )}
                    <div className={`max-w-[80%] ${isAI ? '' : 'items-end flex flex-col'}`}>
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          isAI
                            ? 'bg-white/5 border border-white/8 text-white/90 rounded-tl-sm'
                            : 'bg-[#F5C542] text-[#070707] font-medium rounded-tr-sm'
                        }`}
                      >
                        {renderContent(msg.content)}
                        {isStreaming && msg.content === '' && (
                          <span className="inline-block w-2 h-4 bg-[#F5C542]/70 rounded-sm animate-pulse ml-0.5" />
                        )}
                        {isStreaming && msg.content !== '' && (
                          <span className="inline-block w-0.5 h-3.5 bg-white/50 animate-pulse ml-0.5 align-middle" />
                        )}
                      </div>
                      {/* WhatsApp CTA after estimate */}
                      {isAI && details && !isStreaming && (
                        <a
                          href={`https://wa.me/917987900965?text=${encodeURIComponent(buildWhatsAppMessage(details))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold tracking-wide hover:bg-[#1ebe59] transition-colors"
                        >
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.845L0 24l6.335-1.483A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.727.871.938-3.63-.235-.374A9.818 9.818 0 1112 21.818z"/>
                          </svg>
                          Get Detailed Quote on WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10 shrink-0">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#F5C542]/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about construction or get an estimate…"
                  disabled={streaming}
                  className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || streaming}
                  className="w-7 h-7 rounded-lg bg-[#F5C542] text-[#070707] flex items-center justify-center hover:bg-[#FFD86B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 left-4 sm:left-6 z-[65] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(245,197,66,0.35)] border border-[#F5C542]/30"
        style={{ backgroundColor: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-white/80 text-lg"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="text-[#F5C542] text-xl"
            >
              ✦
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
