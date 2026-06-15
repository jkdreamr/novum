'use client';

import { useState, type FormEvent } from 'react';

type Kind = 'general' | 'artist' | 'investor';

const CONFIG: Record<Kind, { showLinks: boolean; orgLabel: string; messageLabel: string; cta: string }> = {
  general: { showLinks: false, orgLabel: 'Organization (optional)', messageLabel: 'Message', cta: 'Send' },
  artist: {
    showLinks: true,
    orgLabel: 'Project / alias (optional)',
    messageLabel: 'What you make — and what you’d build if the tooling weren’t in the way',
    cta: 'Submit application',
  },
  investor: {
    showLinks: false,
    orgLabel: 'Firm / fund (optional)',
    messageLabel: 'What you invest in, stage, and why NOVUM',
    cta: 'Start the conversation',
  },
};

const FALLBACK_EMAIL = 'novumcreate@gmail.com';
const inputCls =
  'w-full rounded-sm border border-bone/20 bg-surface px-4 py-3 text-bone placeholder-bone/30 outline-none transition-colors focus:border-bone/60 focus-visible:outline-none';
const labelCls = 'mb-2 block text-[0.7rem] uppercase tracking-label text-muted';

export default function ContactForm({ kind = 'general' }: { kind?: Kind }) {
  const cfg = CONFIG[kind];
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [err, setErr] = useState('');
  const [fallback, setFallback] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', org: '', links: '', message: '', company: '' });

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const mailtoHref = () => {
    const subject = encodeURIComponent(`[NOVUM ${kind}] ${values.name || ''}`.trim());
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.org ? `Org: ${values.org}` : '',
      values.links ? `Links: ${values.links}` : '',
      '',
      values.message,
    ].filter(Boolean);
    return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    setFallback(false);
    if (!values.name || !values.email || !values.message) {
      setStatus('error');
      setErr('Name, email, and message are required.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, type: kind }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('ok');
        return;
      }
      // Graceful fallback — email transport not configured or send failed.
      setStatus('error');
      setFallback(Boolean(data.fallback) || res.status >= 500);
      setErr(data.error || 'Something went wrong.');
    } catch {
      setStatus('error');
      setFallback(true);
      setErr('Network error.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-sm border border-bone/20 bg-surface p-8">
        <p className="text-[0.7rem] uppercase tracking-label text-muted">( Received )</p>
        <p className="mt-3 text-lg text-bone">Thanks — we’ll be in touch.</p>
        <p className="mt-2 text-sm text-bone/60">We only write when there’s something real to say.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-6">
      {/* honeypot */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={set('company')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <input id="cf-name" name="name" required value={values.name} onChange={set('name')} className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={set('email')}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-org" className={labelCls}>
          {cfg.orgLabel}
        </label>
        <input id="cf-org" name="org" value={values.org} onChange={set('org')} className={inputCls} />
      </div>

      {cfg.showLinks ? (
        <div>
          <label htmlFor="cf-links" className={labelCls}>
            Links / portfolio
          </label>
          <input
            id="cf-links"
            name="links"
            value={values.links}
            onChange={set('links')}
            placeholder="https://"
            className={inputCls}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          {cfg.messageLabel}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={set('message')}
          className={`${inputCls} resize-y`}
        />
      </div>

      {status === 'error' && (
        <div role="alert" className="text-sm text-bone/80">
          <p>{err}</p>
          {fallback && (
            <p className="mt-2">
              Email transport isn’t connected yet —{' '}
              <a href={mailtoHref()} className="underline underline-offset-4 hover:text-bone">
                email us directly at {FALLBACK_EMAIL}
              </a>
              .
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-[48px] items-center rounded-sm bg-bone px-7 text-sm font-semibold uppercase tracking-label text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : cfg.cta}
      </button>

      <p className="text-xs leading-relaxed text-bone/40">
        By submitting you agree we may contact you about collaborations. We don’t use your work without explicit
        written permission.
      </p>
    </form>
  );
}
