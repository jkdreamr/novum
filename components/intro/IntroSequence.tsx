'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

const GlassTextScene = dynamic(() => import('./GlassTextScene'), { ssr: false });
const ShatterScene   = dynamic(() => import('./ShatterScene'),   { ssr: false });

type Phase = 'flat' | 'glass' | 'shatter' | 'done';

interface Props { onComplete: () => void; }

export default function IntroSequence({ onComplete }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const flatTextRef = useRef<HTMLSpanElement>(null);
  const glassRef    = useRef<HTMLDivElement>(null);
  const shatterRef  = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('flat');

  useEffect(() => {
    const tl = gsap.timeline();

    // PHASE 1 — Flat text fades in (0 → 1.2s)
    tl.fromTo(flatTextRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
    // Hold (1.2s → 1.8s)
    .to(flatTextRef.current, { duration: 0.6 })

    // PHASE 2 — Cross-fade to glass (1.8s → 2.6s)
    .add(() => setPhase('glass'))
    .to(flatTextRef.current,
      { opacity: 0, duration: 0.5, ease: 'power2.in' },
      '<'
    )
    .fromTo(glassRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '<+0.1'
    )
    // Hold glass (2.6s → 3.6s)
    .to(glassRef.current, { duration: 1.0 })

    // PHASE 3 — Shatter begins (3.6s)
    .add(() => setPhase('shatter'))
    .to(glassRef.current,
      { opacity: 0, duration: 0.25, ease: 'power2.in' },
      '<'
    )
    // Overlay fades out revealing page (3.8s → 4.6s)
    .to(overlayRef.current,
      { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
      '<+0.4'
    )
    .add(() => {
      sessionStorage.setItem('novum_intro_seen', '1');
      onComplete();
    });

  }, [onComplete]);

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
      {/* Phase 1: flat text */}
      <span
        ref={flatTextRef}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontWeight: 200,
          fontSize: 'clamp(4rem, 10vw, 9rem)',
          letterSpacing: '0.28em',
          color: '#f0ebe0',
          opacity: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        novum
      </span>

      {/* Phase 2: glass canvas */}
      <div
        ref={glassRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {(phase === 'glass' || phase === 'shatter') && <GlassTextScene />}
      </div>

      {/* Phase 3: shatter canvas */}
      <div
        ref={shatterRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {phase === 'shatter' && <ShatterScene />}
      </div>
    </div>
  );
}
