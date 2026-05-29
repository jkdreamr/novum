'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Words cross-fading center-screen as the count climbs (the deck's mediums + identity).
const WORDS = ['MUSIC', 'VISUALS', 'PERFORMANCE', 'SYSTEMS', 'NOVUM'];
const COUNT_MS = 2200; // duration of the 0 → 100 count

type Phase = 'idle' | 'counting' | 'wiping' | 'gone';

/**
 * First-load preloader (adcker-style): ink screen, a mono counter ticking 0→100 bottom-left,
 * placeholder frames cross-fading center, then a wipe-up reveal. Runs once per session via
 * sessionStorage; skipped entirely (with an immediate handoff) on return visits or under
 * prefers-reduced-motion.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const called = useRef(false);

  const finish = () => {
    if (called.current) return;
    called.current = true;
    try {
      sessionStorage.setItem('novum_preloaded', '1');
    } catch {
      /* sessionStorage may be unavailable (private mode) — non-fatal. */
    }
    onComplete();
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem('novum_preloaded'));
    } catch {
      seen = false;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Return visitors and reduced-motion users skip straight to the page.
    if (seen || reduced) {
      setPhase('gone');
      finish();
      return;
    }

    setPhase('counting');
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic — settles into 100
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        window.setTimeout(() => setPhase('wiping'), 280); // brief hold at 100
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;

  const activeWord = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length));

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9995] flex items-center justify-center bg-ink"
      initial={{ y: 0 }}
      animate={phase === 'wiping' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'wiping') {
          setPhase('gone');
          finish();
        }
      }}
    >
      {/* Center word stack — cross-fading as the count climbs. */}
      <div className="relative flex h-[30vmin] w-full items-center justify-center px-6">
        {WORDS.map((w, i) => (
          <span
            key={w}
            className="absolute font-display text-[clamp(2rem,10vw,7rem)] font-medium uppercase tracking-[-0.03em] text-bone transition-opacity duration-500"
            style={{ opacity: i === activeWord ? 1 : 0 }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Counter — pinned bottom-left. */}
      <div className="pointer-events-none absolute bottom-6 left-5 font-mono text-bone sm:bottom-8 sm:left-8">
        <span className="text-[clamp(2.5rem,9vw,5rem)] leading-none tabular-nums">{count}</span>
        <span className="ml-1 align-top text-sm text-bone/60">%</span>
      </div>

      {/* Corner labels. */}
      <span className="absolute left-5 top-6 font-mono text-[0.7rem] uppercase tracking-label text-bone/45 sm:left-8 sm:top-8">
        ( Loading )
      </span>
      <span className="absolute right-5 top-6 font-mono text-[0.7rem] uppercase tracking-label text-bone/45 sm:right-8 sm:top-8">
        NOVUM
      </span>
    </motion.div>
  );
}
