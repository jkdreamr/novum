'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'mask' | 'rise' | 'clip' | 'fade';

type RevealProps = {
  children: ReactNode;
  /** mask = text rises out of a clip; clip = image insets open; rise/fade = generic. */
  variant?: Variant;
  delay?: number;
  duration?: number;
  as?: 'div' | 'span';
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2 };

/**
 * Scroll-triggered reveal. Plays once when ~20% in view. Under prefers-reduced-motion
 * it renders the children statically with no transform, so nothing is hidden.
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

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // The mask variant needs an overflow-hidden frame with the content riding up inside it.
  if (variant === 'mask') {
    const dur = duration ?? 0.9;
    const transition = { duration: dur, delay, ease: EASE };
    if (as === 'span') {
      return (
        <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            whileInView={{ y: 0 }}
            viewport={VIEWPORT}
            transition={transition}
          >
            {children}
          </motion.span>
        </span>
      );
    }
    return (
      <div className={className} style={{ overflow: 'hidden' }}>
        <motion.div
          initial={{ y: '115%' }}
          whileInView={{ y: 0 }}
          viewport={VIEWPORT}
          transition={transition}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  const initial = {
    rise: { y: 36, opacity: 0 },
    clip: { clipPath: 'inset(100% 0% 0% 0%)' },
    fade: { opacity: 0 },
  }[variant];
  const animate = {
    rise: { y: 0, opacity: 1 },
    clip: { clipPath: 'inset(0% 0% 0% 0%)' },
    fade: { opacity: 1 },
  }[variant];
  const dur = duration ?? (variant === 'clip' ? 1.0 : 0.75);
  const transition = { duration: dur, delay, ease: EASE };

  if (as === 'span') {
    return (
      <motion.span
        className={className}
        style={{ display: 'inline-block' }}
        initial={initial}
        whileInView={animate}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.span>
    );
  }
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
