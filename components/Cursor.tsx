'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 300, damping: 22 } as const;

/**
 * Custom cursor: a small bone dot that follows the pointer with spring lag. Over a
 * [data-cursor] target it scales up; if that target carries a label (e.g. data-cursor="VIEW")
 * it expands into an accent bubble showing the label. Uses mix-blend-difference for the dot so
 * it stays visible on ink and bone. Renders nothing on touch / reduced-motion (native cursor
 * is also preserved — see globals.css).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

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
      const el = (e.target as Element | null)?.closest('[data-cursor]');
      if (!el) {
        setActive(false);
        setLabel(null);
        return;
      }
      const value = el.getAttribute('data-cursor') ?? '';
      setActive(true);
      // "link"/empty = scale only; anything else is shown as a contextual label.
      setLabel(value && value !== 'link' && value !== 'true' ? value : null);
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
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Dot — hidden while a label bubble is showing. */}
        <motion.div
          className="h-3 w-3 rounded-full bg-bone mix-blend-difference"
          animate={{ scale: label ? 0 : active ? 2.6 : 1 }}
          transition={SPRING}
        />
        {/* Contextual label bubble. */}
        <AnimatePresence>
          {label && (
            <motion.div
              key="cursor-label"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={SPRING}
              className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent"
            >
              <span className="font-mono text-[0.6rem] font-bold uppercase tracking-label text-ink">
                {label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
