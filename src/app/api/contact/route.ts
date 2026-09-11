import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const PHONE_PATTERN = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown; // honeypot
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const honeypot = typeof body.company === 'string' ? body.company.trim() : '';

  // Bots tend to fill every field, including hidden ones. Pretend success but drop it.
  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (!name || name.length > 100) {
    return Response.json({ error: 'Please enter a valid name.' }, { status: 400 });
  }
  if (!phone || !PHONE_PATTERN.test(phone)) {
    return Response.json({ error: 'Please enter a valid 10-digit Indian phone number.' }, { status: 400 });
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 1000) {
    return Response.json({ error: 'Please add a short project description (10-1000 characters).' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[api/contact] RESEND_API_KEY is not set');
    return Response.json(
      { error: 'Our contact form is temporarily unavailable. Please reach us on WhatsApp instead.' },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'help@rccbhopal.in';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'RCC Website <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email || undefined,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || '(not provided)'}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('[api/contact] Resend error:', error);
      return Response.json(
        { error: 'Could not send your enquiry right now. Please reach us on WhatsApp instead.' },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] error:', err);
    return Response.json(
      { error: 'Could not send your enquiry right now. Please reach us on WhatsApp instead.' },
      { status: 500 }
    );
  }
}
