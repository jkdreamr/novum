'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import GlassCard from '@/components/shared/GlassCard';
import SectionLabel from '@/components/shared/SectionLabel';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

const OrbScene = dynamic(() => import('./OrbScene'), { ssr: false });

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal rule sweeps in (Ancient Art Museum section divider style)
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Word-by-word heading reveal (manual split)
      if (headingRef.current) {
        const text = headingRef.current.textContent || '';
        const words = text.split(' ');
        headingRef.current.innerHTML = words
          .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;">${w}&nbsp;</span></span>`)
          .join('');
        gsap.fromTo(
          headingRef.current.querySelectorAll('.word'),
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.045,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        );
      }

      // Body text fade
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        }
      );

      // Glass card slides in from right
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-base)',
        padding: '10rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Horizontal sweep line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.3), transparent)',
          transform: 'scaleX(0)',
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '5rem',
        alignItems: 'start',
      }}
      className="about-grid"
      >
        {/* Left column */}
        <div>
          <SectionLabel number="01" label="about" />
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(1.9rem, 3vw, 3.2rem)',
              lineHeight: 1.35,
              color: 'var(--text-primary)',
              margin: '2rem 0 2.5rem',
              maxWidth: '580px',
            }}
          >
            novum is a creative collective at the intersection of art, philosophy, and the human condition.
          </h2>
          <p
            ref={bodyRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '0.97rem',
              lineHeight: 1.85,
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              opacity: 0,
            }}
          >
            We exist at the edge of disciplines — where the visual and the conceptual collapse into each other.
            Novum is not a gallery, not a studio, not a magazine. It is all of these things and none of them.
            We make work that asks questions before it offers answers.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '3.5rem',
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { label: 'Founded', value: '2024' },
              { label: 'Scope', value: 'Global' },
              { label: 'Discipline', value: 'Multi' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginTop: '0.4rem',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Glass card with orbital 3D accent */}
        <div ref={cardRef} style={{ opacity: 0 }}>
          <GlassCard>
            {/* Mini Three.js orb — explicit height so the canvas never collapses */}
            <div style={{ position: 'relative', height: '200px', minHeight: '200px', width: '100%', marginBottom: '1.5rem' }}>
              <ErrorBoundary>
                <OrbScene />
              </ErrorBoundary>
            </div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}>
              &ldquo;Art is not what you see, but what you make others see.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '1rem',
            }}>— Edgar Degas</p>
          </GlassCard>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
