'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PhilosopherScene = dynamic(() => import('./PhilosopherScene'), { ssr: false });

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const textRef       = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll animation: scrub-linked parallax
      // Text slides up + fades
      gsap.to(textRef.current, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      // 3D bust scales down + drifts left (Ancient Art Museum scroll behaviour)
      gsap.to(canvasWrapRef.current, {
        scale: 0.58,
        x: '-18%',
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      // Label drifts opposite direction
      gsap.to(labelRef.current, {
        y: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'var(--bg-base)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 3D Scene — fills the right portion and center */}
      <div
        ref={canvasWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'center center',
        }}
      >
        <PhilosopherScene />
      </div>

      {/* Radial vignette overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 80% at 60% 50%, transparent 30%, var(--bg-base) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Top label — upper left */}
      <div
        ref={labelRef}
        style={{
          position: 'absolute',
          top: '2.5rem',
          left: '3rem',
          zIndex: 10,
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        — est. 2024 —
      </div>

      {/* Hero text — left center */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 10,
          paddingLeft: '3rem',
          maxWidth: '520px',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
        }}>
          Art · Philosophy · Vision
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 200,
          fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          letterSpacing: '0.02em',
          marginBottom: '1.5rem',
        }}>
          welcome<br />to novum
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em',
          maxWidth: '360px',
        }}>
          A collective for art, thought, and the human condition.
        </p>
      </div>

      {/* Scroll indicator — bottom center */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}>scroll</span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  );
}
