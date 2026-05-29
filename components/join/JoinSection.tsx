'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/shared/SectionLabel';

const schema = z.object({
  email: z.string().email('Please enter a valid email.'),
  why: z.string().min(20, 'Tell us a bit more (min 20 characters).'),
  links: z.array(z.object({ url: z.string().url('Must be a valid URL.').or(z.literal('')) })),
});
type FormData = z.infer<typeof schema>;

export default function JoinSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { links: [{ url: '' }] },
  });

  const { fields, append } = useFieldArray({ control, name: 'links' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-base)',
        padding: '10rem 3rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel number="03" label="join" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2.2rem, 4vw, 4rem)',
          color: 'var(--text-primary)',
          margin: '1.5rem 0 1rem',
        }}>
          become part of novum
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginBottom: '4rem',
          lineHeight: 1.7,
        }}>
          We are always looking for thoughtful artists, writers, and thinkers. If our work resonates, reach out.
        </p>

        <div ref={formRef} style={{ maxWidth: '560px', opacity: 0 }}>
          {submitted ? (
            <div style={{
              padding: '3rem',
              border: '1px solid rgba(200,169,110,0.25)',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: 'var(--accent-gold)',
                marginBottom: '1rem',
              }}>✓</div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 300,
                color: 'var(--text-primary)',
              }}>Application received. We&apos;ll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <FloatField
                label="Email address"
                error={errors.email?.message}
                input={
                  <input
                    type="email"
                    placeholder=" "
                    {...register('email')}
                    style={inputStyle}
                  />
                }
              />

              {/* Why */}
              <FloatField
                label="Why you want to join"
                error={errors.why?.message}
                input={
                  <textarea
                    placeholder=" "
                    rows={4}
                    {...register('why')}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                  />
                }
              />

              {/* Links */}
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={floatLabelStatic}>Past work / portfolio links</label>
                {fields.map((field, i) => (
                  <div key={field.id} style={{ marginBottom: '0.75rem' }}>
                    <input
                      type="url"
                      placeholder="https://your-portfolio.com"
                      {...register(`links.${i}.url`)}
                      style={{ ...inputStyle, marginBottom: '0.2rem' }}
                    />
                    {errors.links?.[i]?.url && (
                      <span style={errorStyle}>{errors.links[i]?.url?.message}</span>
                    )}
                  </div>
                ))}
                {fields.length < 3 && (
                  <button
                    type="button"
                    onClick={() => append({ url: '' })}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: '0.4rem 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    + add another link
                  </button>
                )}
              </div>

              {error && (
                <p style={{ ...errorStyle, marginBottom: '1.5rem' }}>{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '4px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s ease',
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    e.currentTarget.style.background = 'rgba(200,169,110,0.08)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                {loading ? 'sending...' : 'submit application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// Floating label field wrapper
function FloatField({ label, input, error }: { label: string; input: React.ReactNode; error?: string }) {
  return (
    <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
      <div style={{ position: 'relative' }}>
        {input}
        <label style={{
          position: 'absolute',
          left: 0,
          top: '0.75rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
          transition: 'all 0.2s ease',
        }}>
          {label}
        </label>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.12)',
        }} />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
      <style>{`
        input:focus ~ label,
        input:not(:placeholder-shown) ~ label,
        textarea:focus ~ label,
        textarea:not(:placeholder-shown) ~ label {
          top: -1rem;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }
        input:focus + div,
        textarea:focus + div {
          background: var(--accent-gold) !important;
          transition: background 0.25s;
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  padding: '0.75rem 0',
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '0.95rem',
  color: 'var(--text-primary)',
  lineHeight: 1.6,
};

const floatLabelStatic: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  display: 'block',
  marginBottom: '0.75rem',
};

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.72rem',
  color: '#e07060',
  display: 'block',
  marginTop: '0.3rem',
};
