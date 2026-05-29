'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'mask' | 'rise' | 'clip' | 'fade';

type RevealProps = {
  children: ReactNode;
  /** Visual style of the entrance. All variants are opacity/transform only — none clip the
   *  element out of view, so the IntersectionObserver always fires. */
  variant?: Variant;
  delay?: number;
  duration?: number;
  as?: 'div' | 'span';
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Hidden + shown targets. Crucially these are gentle (small offset / scale / opacity) so the
// element is NEVER moved outside an overflow-hidden ancestor — that was the bug that left the
// headings permanently clipped and invisible.
const HIDDEN: Record<Variant, Record<string, number>> = {
  mask: { opacity: 0, y: 26 },
  rise: { opacity: 0, y: 26 },
  clip: { opacity: 0, scale: 0.98 },
  fade: { opacity: 0 },
};
const SHOWN: Record<Variant, Record<string, number>> = {
  mask: { opacity: 1, y: 0 },
  rise: { opacity: 1, y: 0 },
  clip: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
};

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered reveal that is safe by construction:
 *  - SSR / no-JS / first paint / reduced-motion → renders plain, fully VISIBLE text.
 *  - Once mounted (before paint) it switches to the animated version, starting hidden and
 *    revealing when the OWN element scrolls into view (it's only offset/faded, never clipped).
 *  - A failsafe timer guarantees content is shown even if the observer never fires.
 */
export default function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  duration,
  as = 'div',
  className = '',
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  // Flip to the animated render before the browser paints, so there's no visible flash.
  useIsoLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    // Never leave content hidden longer than this, whatever the observer does.
    const failsafe = window.setTimeout(() => setShown(true), 900);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          window.clearTimeout(failsafe);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [reduced]);

  const Tag = as;

  // Visible-safe baseline: server render, no-JS, reduced-motion, and the first client frame.
  if (reduced || !mounted) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = as === 'span' ? motion.span : motion.div;
  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={as === 'span' ? { display: 'inline-block' } : undefined}
      initial={false}
      animate={shown ? SHOWN[variant] : HIDDEN[variant]}
      transition={{ duration: duration ?? (variant === 'fade' ? 0.6 : 0.8), delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
