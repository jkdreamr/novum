'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Each frame renders the word in a DIFFERENT typeface so the type itself shapeshifts as the
// counter climbs, landing on NOVUM in the primary display face.
type Frame = { word: string; font: string; italic?: boolean; final?: boolean };
const SEQUENCE: Frame[] = [
  { word: 'MUSIC', font: 'var(--font-mono)' },
  { word: 'VISUALS', font: 'var(--font-serif)' },
  { word: 'PERFORMANCE', font: 'var(--font-condensed)' },
  { word: 'SYSTEMS', font: 'var(--font-extended)' },
  { word: 'SOUND', font: 'var(--font-contrast)', italic: true },
  { word: 'NOVUM', font: 'var(--font-display)', final: true },
];
const COUNT_MS = 1900; // 0 → 100, ~315ms per word

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
        window.setTimeout(() => setPhase('wiping'), 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Failsafe: lift the overlay even if the wipe's onAnimationComplete never fires.
  useEffect(() => {
    if (phase !== 'wiping') return;
    const id = window.setTimeout(finish, 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'gone') return null;

  const idx = Math.min(SEQUENCE.length - 1, Math.floor((count / 100) * SEQUENCE.length));
  const frame = SEQUENCE[idx];
  const wordStyle: CSSProperties = {
    fontFamily: frame.font,
    fontStyle: frame.italic ? 'italic' : 'normal',
  };

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

      {/* Center word — a different typeface each frame, ending big on NOVUM. */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <AnimatePresence>
          <motion.span
            key={frame.word}
            style={wordStyle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={
              frame.final
                ? 'absolute font-medium uppercase leading-none tracking-[-0.04em] text-bone text-[clamp(3.5rem,16vw,12rem)]'
                : 'absolute uppercase leading-none tracking-[0.02em] text-bone text-[clamp(1.75rem,6vw,3.5rem)]'
            }
          >
            {frame.word}
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
