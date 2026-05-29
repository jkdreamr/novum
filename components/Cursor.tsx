'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor: a small bone ring that tracks the pointer tightly (very stiff spring → no
 * visible lag, no floaty blob) and grows slightly over interactive [data-cursor] targets.
 * mix-blend-difference keeps it visible on ink and bone. Renders nothing on touch /
 * reduced-motion (the native cursor is preserved — see globals.css).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Stiff + low mass = tight tracking with no perceptible trail.
  const config = { stiffness: 900, damping: 40, mass: 0.18 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest('a, button, input, label, [data-cursor]');
      setActive(Boolean(el));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border border-bone mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ scale: active ? 1.6 : 1 }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
    />
  );
}
