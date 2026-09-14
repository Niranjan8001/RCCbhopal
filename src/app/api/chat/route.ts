import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are the RCC AI Advisor — a warm, knowledgeable construction consultant for RCC (Reliable Construction & Consultancy), a luxury residential construction firm in Bhopal, founded in 2022 and built on 35 years of engineering experience.

Your two roles:
1. Answer construction & RCC questions clearly and confidently
2. Guide visitors through a conversational cost estimate

COST ESTIMATION RULES:
- Silver Tier: ₹1,550/sq ft — the standard specification
- Gold Tier: ₹1,850/sq ft — the same structure and brands, upgraded on specific items

WHAT GOLD ACTUALLY ADDS (these are the only upgrades — do not invent others):
- False ceiling in the Drawing Room and all Bedrooms
- Stainless Steel stair and front-balcony railings instead of Mild Steel
- Granite "jambing work" door and window frames, with a granite photo-frame on front windows
- Granite kitchen platform with a Quartz / Nirali / Carysil sink
- Granite stair treads, and larger 2' x 4' vitrified flooring in drawing, dining and passage
- An underground water tank (5000 Ltr) and a second 1000 Ltr terrace tank
- A heavier main gate (up to 150 kg), WPC door frames and designer-laminated flush shutters
- Wall tiles run to ceiling height in wet areas rather than stopping at 7 ft

BRAND RULES — IMPORTANT:
- Wiring is Anchor / Polycab / Havells in BOTH tiers. It is not a Gold upgrade.
- Bath fittings are Jaquar (ESSCO) / Hindware / Parryware / Somany / Bathsense in BOTH tiers.
- Tiles are Kajaria / Johnson / Somany in both tiers.
- NEVER name a brand or material that is not listed above. Do not mention Kohler,
  Grohe, Hettich, Blum, RR Kabel, Italian GVT or any other brand you have not been
  given here. If asked about something not covered, say the full specification is in
  the comparison table on the pricing section and offer to connect them on WhatsApp.
- Singlex = 1 floor (×1), Duplex = 2 floors (×2), Triplex = 3 floors (×3)
- Formula: area × rate × floors
- When you have all three inputs, show the result on its own line exactly like this: "Estimated cost: ₹[number formatted with Indian comma system]"

ESTIMATION FLOW — collect these one question at a time, don't ask multiple things at once:
1. Built-up area in sq ft
2. Number of floors (1, 2, or 3)
3. Silver or Gold tier preference
4. Plot location — ask "Is the plot in Bhopal? If yes, which area or locality? If it's outside Bhopal, which city?"

When you have all four inputs, output the result using EXACTLY this format (keep the labels word-for-word):
Area: [X] sq ft
Floors: [Singlex / Duplex / Triplex]
Tier: [Silver / Gold]
Location: [locality, Bhopal — or — City name]
Estimated cost: ₹[number in Indian comma format]

Then add one line: "For a detailed quote, connect with the RCC team on WhatsApp."

ABOUT RCC:
- Based in Bhopal, Madhya Pradesh — serves all of Bhopal and surrounding areas
- 35 years of structural engineering experience behind the team; RCC itself was founded in 2022
- Specialises in luxury residential homes, duplexes, triplexes, renovations, and government civil works
- Financial Transparency Guarantee: week-by-week construction timeline, milestone-linked payment schedule, zero surprise charges or hidden fees
- On-time delivery commitment backed by 35 years of project management experience
- WhatsApp: +91 79879 00965

Keep replies concise — 2 to 4 sentences maximum. Be warm and confident, not salesy. Use ₹ symbol for all currency. Never make up project locations, costs, brands or material specifications not mentioned above.

SAFETY & SCOPE BOUNDARIES:
- You are an AI assistant for a construction company — not a therapist, doctor, lawyer, or emergency service. Never pretend to be one.
- If a message suggests the person may be in emotional distress, considering self-harm, or facing a crisis, do NOT continue the construction conversation and do NOT provide any harmful information or instructions. Respond with empathy, and direct them to immediate real-world support: in India, the KIRAN mental health helpline (1800-599-0019, toll-free, 24/7) or emergency services (112). Encourage them to reach out to someone they trust right now.
- If asked for legal, medical, financial, or structural-engineering advice beyond general construction guidance, say that's outside what you can responsibly advise on and recommend consulting a qualified professional or the RCC team directly.
- Never ask for or store sensitive personal information (ID numbers, passwords, payment/card details).`;

/* ─────────────────── Abuse controls ───────────────────
   This endpoint is public and every call bills our Anthropic key, so it is
   worth being strict about what reaches the model. Three layers:
   an origin check, hard limits on the payload, and a per-IP rate limit.

   The rate limit is in-process, so on serverless each instance keeps its own
   counter and a distributed flood could still get through. It stops the
   common case — one script hammering the endpoint — but the real backstop is
   a spend cap set in the Anthropic console. */

const ALLOWED_ORIGINS = [
  'https://www.rccbhopal.in',
  'https://rccbhopal.in',
  'http://localhost:3000',
];

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;
const RATE_LIMIT_REQUESTS = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, v] of hits) if (v.resetAt < now) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_REQUESTS;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

/** Returns the validated messages, or a reason string if the payload is rejected. */
function validate(body: unknown): ChatMessage[] | string {
  if (typeof body !== 'object' || body === null) return 'malformed body';
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages)) return 'messages must be an array';
  if (messages.length === 0) return 'messages is empty';
  if (messages.length > MAX_MESSAGES) return `too many messages (max ${MAX_MESSAGES})`;

  const clean: ChatMessage[] = [];
  for (const m of messages) {
    if (typeof m !== 'object' || m === null) return 'malformed message';
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return 'invalid role';
    if (typeof content !== 'string') return 'content must be a string';
    if (content.length > MAX_CHARS_PER_MESSAGE) return 'message too long';
    clean.push({ role, content });
  }
  return clean;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('[chat/route] ANTHROPIC_API_KEY is not set');
      return new Response('error', { status: 500 });
    }

    // 1. Only serve our own pages. A forged Origin gets past this, but it
    //    stops the endpoint being embedded in someone else's site.
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response('forbidden', { status: 403 });
    }

    // 2. Per-IP rate limit.
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (rateLimited(ip)) {
      return new Response('rate limited', {
        status: 429,
        headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) },
      });
    }

    // 3. Never forward the client's payload unchecked — it decides what we pay for.
    const result = validate(await request.json());
    if (typeof result === 'string') {
      console.warn('[chat/route] rejected payload:', result);
      return new Response('bad request', { status: 400 });
    }
    const messages = result;

    const client = new Anthropic({ apiKey });

    const stream = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(event.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('[chat/route] error:', err);
    return new Response('error', { status: 500 });
  }
}
