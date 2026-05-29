'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor: a small bone dot that follows the pointer with spring lag and scales
 * up over interactive elements. Uses mix-blend-difference so it stays visible on both
 * ink and bone areas. Renders nothing on touch devices or under prefers-reduced-motion
 * (in which case the native cursor is also kept — see globals.css).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });

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
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest('a, button, input, label, [data-cursor]')));
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
      className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-bone mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ scale: hovering ? 3 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    />
  );
}
