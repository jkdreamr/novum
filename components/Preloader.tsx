'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Words cycle as the count climbs and morph toward the brand: the disciplines render in mono,
// then the final NOVUM lands large in the display face right before the wipe.
const WORDS = ['MUSIC', 'VISUALS', 'PERFORMANCE', 'SYSTEMS', 'NOVUM'];
const COUNT_MS = 1700; // 0 → 100

type Phase = 'idle' | 'counting' | 'wiping' | 'gone';

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
      /* private mode — non-fatal */
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
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        // Let the big NOVUM land and hold a beat before wiping.
        window.setTimeout(() => setPhase('wiping'), 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Failsafe: never leave the overlay up if the wipe's onAnimationComplete doesn't fire.
  useEffect(() => {
    if (phase !== 'wiping') return;
    const id = window.setTimeout(finish, 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'gone') return null;

  const activeWord = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length));
  const word = WORDS[activeWord];
  const isFinal = activeWord === WORDS.length - 1;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9995] overflow-hidden bg-ink"
      initial={{ y: 0 }}
      animate={phase === 'wiping' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'wiping') {
          setPhase('gone');
          finish();
        }
      }}
    >
      {/* Composed corner labels */}
      <span className="absolute left-6 top-6 text-[0.7rem] uppercase tracking-label text-bone/45 sm:left-10 sm:top-8 lg:left-16">
        ( NOVUM )
      </span>
      <span className="absolute right-6 top-6 text-[0.7rem] uppercase tracking-label text-bone/45 sm:right-10 sm:top-8 lg:right-16">
        ( LOADING )
      </span>

      {/* Center word — mono disciplines morphing into the big display NOVUM. */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence>
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className={
              isFinal
                ? 'absolute font-display font-medium uppercase leading-none tracking-[-0.04em] text-bone text-[clamp(3.5rem,16vw,13rem)]'
                : 'absolute font-mono uppercase tracking-label text-bone/75 text-[clamp(1.25rem,3.5vw,2.25rem)]'
            }
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Oversized counter, pinned bottom-left. */}
      <div className="absolute bottom-[clamp(1rem,4vw,3rem)] left-6 flex items-end leading-none sm:left-10 lg:left-16">
        <span className="font-mono font-bold tabular-nums text-bone text-[clamp(4.5rem,17vw,13rem)]">
          {String(count).padStart(2, '0')}
        </span>
        <span className="mb-[0.6em] ml-2 font-mono text-sm text-bone/50">%</span>
      </div>

      {/* Bottom-right marker */}
      <span className="absolute bottom-[clamp(1.25rem,4vw,3rem)] right-6 text-[0.7rem] uppercase tracking-label text-bone/45 sm:right-10 lg:right-16">
        ( EST. 2026 )
      </span>
    </motion.div>
  );
}
