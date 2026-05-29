'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FRAMES = [0, 1, 2, 3, 4]; // placeholder image frames that cross-fade center-screen
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

  const activeFrame = Math.min(FRAMES.length - 1, Math.floor((count / 100) * FRAMES.length));

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
      {/* Center frame stack — placeholder blocks cross-fading as the count climbs. */}
      <div className="relative h-[34vmin] w-[34vmin] max-h-[280px] max-w-[280px]">
        {FRAMES.map((f, i) => (
          <div
            key={f}
            className="absolute inset-0 flex items-center justify-center border border-bone/15 transition-opacity duration-500"
            style={{
              opacity: i === activeFrame ? 1 : 0,
              background: i % 2 ? 'rgba(237,232,223,0.06)' : 'transparent',
            }}
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-label text-bone/35">
              ( {String(f + 1).padStart(2, '0')} )
            </span>
          </div>
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
