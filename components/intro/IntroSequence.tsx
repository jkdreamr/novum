'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

const GlassTextScene = dynamic(() => import('./GlassTextScene'), { ssr: false });
const ShatterScene = dynamic(() => import('./ShatterScene'), { ssr: false });

type Phase = 'flat' | 'glass' | 'shatter';

interface Props {
  onComplete: () => void;
  onReady?: () => void;
}

export default function IntroSequence({ onComplete, onReady }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const flatTextRef = useRef<HTMLSpanElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('flat');

  useEffect(() => {
    // The overlay is painted now → safe for the parent to drop its static boot cover.
    onReady?.();

    const finish = () => {
      sessionStorage.setItem('novum_intro_seen', '1');
      onComplete();
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Motion-free intro: show the name, then reveal the page.
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(flatTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .to(flatTextRef.current, { duration: 0.8 })
        .to(overlayRef.current, { opacity: 0, duration: 0.8 });
      return () => { tl.kill(); };
    }

    const tl = gsap.timeline();

    // PHASE 1 — the flat name resolves in from a soft blur, then holds.
    tl.fromTo(flatTextRef.current,
      { opacity: 0, letterSpacing: '0.5em', filter: 'blur(6px)' },
      { opacity: 1, letterSpacing: '0.28em', filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
    )
      .to(flatTextRef.current, { duration: 0.7 })

      // PHASE 2 — cross-fade the flat name into the 3D glass word.
      .add(() => setPhase('glass'))
      .to(flatTextRef.current, { opacity: 0, filter: 'blur(6px)', duration: 0.6, ease: 'power2.in' }, '<')
      .to(glassRef.current, { opacity: 1, duration: 0.9, ease: 'power2.out' }, '<+0.15')
      .to(glassRef.current, { duration: 1.4 }) // hold the glass word

      // PHASE 3 — the word shatters and bursts; the overlay fades to reveal the page.
      .add(() => setPhase('shatter'))
      .to(glassRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<')
      .to(overlayRef.current, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, '<+0.45')
      .add(finish);

    return () => { tl.kill(); };
  }, [onComplete, onReady]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      {/* Phase 1 — flat name */}
      <span
        ref={flatTextRef}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(4rem, 11vw, 9rem)',
          letterSpacing: '0.28em',
          color: '#f0ebe0',
          opacity: 0,
          userSelect: 'none',
          pointerEvents: 'none',
          paddingLeft: '0.28em', // optically centre against the trailing letter-spacing
        }}
      >
        novum
      </span>

      {/* Phase 2 — glass word (mounted from the start, hidden, so the font + buffers warm up) */}
      <div ref={glassRef} style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none' }}>
        <ErrorBoundary>
          <GlassTextScene />
        </ErrorBoundary>
      </div>

      {/* Phase 3 — shatter burst */}
      {phase === 'shatter' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <ErrorBoundary>
            <ShatterScene />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
