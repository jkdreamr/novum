'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Mark3D from '@/components/Mark3D';

// The Three.js bundle loads only on the client, only when this mounts (desktop + in view).
const GlassScene = dynamic(() => import('@/components/GlassScene'), { ssr: false, loading: () => null });

type GlassIconProps = {
  shape: 'gem' | 'knot';
  /** CSS mark shape used as the pre-load placeholder + error fallback. */
  fallback: 'cube' | 'gyro';
  size?: string;
  className?: string;
};

/**
 * Big glass icon. Shows the CSS mark until it scrolls into view, then mounts the WebGL glass.
 * If WebGL throws, the ErrorBoundary swaps back to the CSS mark — so it can never break the page.
 */
export default function GlassIcon({ shape, fallback, size = 'clamp(5rem,12vw,9rem)', className = '' }: GlassIconProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Warm the Three.js chunk in the background (idle if available) so it's already cached by the
    // time Team scrolls in — first paint of the glass is then near-instant.
    const warm = () => void import('@/components/GlassScene');
    const useIdle = typeof window.requestIdleCallback === 'function';
    const idleId = useIdle ? window.requestIdleCallback(warm, { timeout: 2500 }) : window.setTimeout(warm, 1500);

    // Mount the canvas a bit before it's visible (rootMargin) so it's ready as it enters.
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px' },
    );
    if (el) io.observe(el);

    return () => {
      io.disconnect();
      if (useIdle) window.cancelIdleCallback(idleId as number);
      else window.clearTimeout(idleId as number);
    };
  }, []);

  const style = { width: size, height: size } as CSSProperties;

  return (
    <span ref={ref} className={`inline-block ${className}`} style={style} aria-hidden="true">
      {inView ? (
        <ErrorBoundary fallback={<Mark3D shape={fallback} size={size} />}>
          <GlassScene shape={shape} />
        </ErrorBoundary>
      ) : (
        <Mark3D shape={fallback} size={size} />
      )}
    </span>
  );
}
