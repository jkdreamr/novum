'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';

/**
 * The dramatic type moment that replaces the old video block. Desktop + motion-OK: a pinned,
 * scroll-LINKED beat — the palette inverts ink↔bone, a giant statement zooms toward the viewer,
 * and faint oversized words drift horizontally for depth, then it hands straight off to Team
 * (no dead gap). Mobile / reduced-motion / SSR: a static bone-on-ink contrast block (still a
 * palette-flip beat) that's fully visible with a clip-mask reveal — no pinning, so it's smooth.
 */
export default function Statement() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return pinned ? <PinnedStatement /> : <StaticStatement />;
}

/* Mobile / reduced-motion / SSR: a static palette-flip block (bone bg, ink type). */
function StaticStatement() {
  return (
    <section
      aria-label="The next label is a lab"
      className="bg-bone px-6 py-[clamp(5rem,16vw,9rem)] text-ink sm:px-10 lg:px-16"
    >
      <p className="mb-7 text-[0.7rem] uppercase tracking-label text-ink/50">
        ( The next label is a lab )
      </p>
      <h2 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.5rem,13vw,5.5rem)]">
        <Reveal variant="mask">
          <span className="block">THE NEXT</span>
        </Reveal>
        <Reveal variant="mask" delay={0.08}>
          <span className="block">LABEL IS</span>
        </Reveal>
        <Reveal variant="mask" delay={0.16}>
          <span className="block">A LAB.</span>
        </Reveal>
      </h2>
    </section>
  );
}

/* Desktop: pinned, scroll-linked invert + zoom + parallax drift. */
function PinnedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Palette inverts ink → bone → ink, so it opens out of About and flows back into Team (both ink).
  const bg = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], ['#0A0A0A', '#EDE8DF', '#EDE8DF', '#0A0A0A']);
  const fg = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], ['#EDE8DF', '#0A0A0A', '#0A0A0A', '#EDE8DF']);
  // Massive scroll-scaling type: zooms toward the viewer, then fades as it hands off.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 1.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.86, 1], [0, 1, 1, 0]);
  // Opposing horizontal parallax drift on faint oversized words (depth).
  const driftA = useTransform(scrollYProgress, [0, 1], ['8%', '-26%']);
  const driftB = useTransform(scrollYProgress, [0, 1], ['-16%', '22%']);

  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative h-[170vh]">
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* Faint drifting layers for parallax depth. */}
        <motion.span
          style={{ x: driftA }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[10%] whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] opacity-[0.08]"
        >
          A LABEL · A COLLECTIVE
        </motion.span>
        <motion.span
          style={{ x: driftB }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] right-0 whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] opacity-[0.08]"
        >
          A CREATIVE LAB
        </motion.span>

        {/* The zooming statement. */}
        <motion.h2
          style={{ scale, opacity }}
          className="relative z-10 px-6 text-center font-display text-[clamp(3rem,9vw,8rem)] font-medium uppercase leading-[0.85] tracking-[-0.04em] will-change-transform"
        >
          THE NEXT
          <br />
          LABEL IS
          <br />
          A LAB.
        </motion.h2>
      </motion.div>
    </section>
  );
}
