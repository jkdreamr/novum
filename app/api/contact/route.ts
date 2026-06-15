import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  type?: string; // "general" | "artist" | "investor" | "partner"
  name?: string;
  email?: string;
  org?: string;
  links?: string;
  message?: string;
  company?: string; // honeypot — must be empty
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending.
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();
  const type = (body.type || 'general').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Name, email, and message are required.' }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 422 });
  }

  const TO = process.env.CONTACT_TO || 'novumcreate@gmail.com';
  const FROM = process.env.RESEND_FROM || 'NOVUM <onboarding@resend.dev>';
  const KEY = process.env.RESEND_API_KEY;

  const subject = `[NOVUM ${type}] ${name}`;
  const text = [
    `Type: ${type}`,
    `Name: ${name}`,
    `Email: ${email}`,
    body.org ? `Org: ${body.org}` : null,
    body.links ? `Links: ${body.links}` : null,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  // No transport configured yet — tell the client to show the direct-email fallback.
  if (!KEY) {
    return NextResponse.json(
      { ok: false, fallback: true, message: 'Email transport not configured.' },
      { status: 200 },
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text }),
    });
    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ ok: false, fallback: true, error: detail.slice(0, 200) }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, fallback: true, error: 'Send failed.' }, { status: 502 });
  }
}
