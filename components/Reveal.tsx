'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'mask' | 'rise' | 'clip' | 'fade';

type RevealProps = {
  children: ReactNode;
  /** mask = a clip-mask line rise (overflow-hidden frame, content rides up inside it);
   *  rise/clip/fade = opacity + small offset/scale. */
  variant?: Variant;
  delay?: number;
  duration?: number;
  as?: 'div' | 'span';
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Opacity/offset targets for the flat (non-mask) variants — never clipped out of view.
const HIDDEN: Record<'rise' | 'clip' | 'fade', Record<string, number>> = {
  rise: { opacity: 0, y: 26 },
  clip: { opacity: 0, scale: 0.98 },
  fade: { opacity: 0 },
};
const SHOWN: Record<'rise' | 'clip' | 'fade', Record<string, number>> = {
  rise: { opacity: 1, y: 0 },
  clip: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered reveal, safe by construction:
 *  - SSR / no-JS / first paint / reduced-motion → plain, fully VISIBLE text.
 *  - After mount it reveals immediately if already in view (rect check — the above-the-fold
 *    guarantee), via IntersectionObserver as it scrolls in, and a 2.5s catch-all otherwise.
 *  - For the `mask` variant the observer/ref sits on the NON-transformed outer frame, so the
 *    inner can ride up from a clip without ever clipping itself out of the observer's view.
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
    // Already on screen at mount → reveal now (never depend on the observer for above-the-fold).
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
    io.observe(el);
    // Absolute catch-all: never leave content hidden, even if the observer never fires.
    const failsafe = window.setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [reduced]);

  const Tag = as;
  const transition = { duration: duration ?? (variant === 'fade' ? 0.6 : 0.85), delay, ease: EASE };

  // Visible-safe baseline.
  if (reduced || !mounted) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  // Clip-mask line rise: outer frame clips, inner rides up. Observer is on the outer (untransformed).
  if (variant === 'mask') {
    if (as === 'span') {
      return (
        <span ref={ref as never} className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={false}
            animate={{ y: shown ? '0%' : '110%' }}
            transition={transition}
          >
            {children}
          </motion.span>
        </span>
      );
    }
    return (
      <div ref={ref as never} className={className} style={{ overflow: 'hidden' }}>
        <motion.div initial={false} animate={{ y: shown ? '0%' : '110%' }} transition={transition}>
          {children}
        </motion.div>
      </div>
    );
  }

  // Flat variants — the motion element itself carries the ref (it's never clipped out of view).
  const MotionTag = as === 'span' ? motion.span : motion.div;
  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={as === 'span' ? { display: 'inline-block' } : undefined}
      initial={false}
      animate={shown ? SHOWN[variant] : HIDDEN[variant]}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
