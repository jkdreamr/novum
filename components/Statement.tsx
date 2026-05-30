'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

/**
 * The dramatic type moment (no video). Three renders:
 *  - desktop + motion  → PinnedStatement: pinned, scroll-linked invert + gradual zoom.
 *  - mobile  + motion  → FadeStatement: NOT pinned; the bg crossfades ink→bone→ink with scroll
 *                        so the cream beat blends into the ink neighbours (no hard seam).
 *  - reduced-motion    → StaticStatement: plain ink section, fully visible, no motion.
 */
export default function Statement() {
  const desktop = useDesktopMotion();
  const reduced = useReducedMotion();
  if (desktop) return <PinnedStatement />;
  if (reduced) return <StaticStatement />;
  return <FadeStatement />;
}

function Lines() {
  return (
    <>
      <Reveal variant="mask">
        <span className="block">THE NEXT</span>
      </Reveal>
      <Reveal variant="mask" delay={0.08}>
        <span className="block">LABEL IS</span>
      </Reveal>
      <Reveal variant="mask" delay={0.16}>
        <span className="block">A LAB.</span>
      </Reveal>
    </>
  );
}

function StaticStatement() {
  return (
    <section aria-label="The next label is a lab" className="px-6 py-[clamp(5rem,16vw,9rem)] sm:px-10 lg:px-16">
      <p className="mb-7 text-[0.7rem] uppercase tracking-label text-bone/50">( The next label is a lab )</p>
      <h2 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-bone text-[clamp(2.5rem,13vw,5.5rem)]">
        <Lines />
      </h2>
    </section>
  );
}

/* Mobile: scroll-driven bg crossfade ink→bone→ink — the cream beat eases in/out of its ink
   neighbours, so there's no hard horizontal cream/black seam. No pinning (smooth on phones). */
function FadeStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    ['#0A0A0A', '#EDE8DF', '#EDE8DF', '#0A0A0A'],
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.32, 0.68, 1],
    ['#EDE8DF', '#0A0A0A', '#0A0A0A', '#EDE8DF'],
  );
  return (
    <motion.section
      ref={ref}
      aria-label="The next label is a lab"
      style={{ backgroundColor, color }}
      className="px-6 py-[clamp(6rem,20vw,10rem)] sm:px-10"
    >
      <p className="mb-7 text-[0.7rem] uppercase tracking-label opacity-50">( The next label is a lab )</p>
      <h2 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.5rem,13vw,5.5rem)]">
        <Lines />
      </h2>
    </motion.section>
  );
}

/* Desktop: pinned invert + zoom. Track tightened 140→135vh; the move is spread across most of
   the pin (slower/gradual), and the palette returns to ink by ~0.9 so there's no dead tail. */
function PinnedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const bg = useTransform(scrollYProgress, [0, 0.32, 0.7, 0.92], ['#0A0A0A', '#EDE8DF', '#EDE8DF', '#0A0A0A']);
  const fg = useTransform(scrollYProgress, [0, 0.32, 0.7, 0.92], ['#EDE8DF', '#0A0A0A', '#0A0A0A', '#EDE8DF']);
  // Gradual zoom across ~80% of the pin (slower move) — was settled by ~0.5 before.
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.62, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const driftA = useTransform(scrollYProgress, [0, 1], ['8%', '-24%']);
  const driftB = useTransform(scrollYProgress, [0, 1], ['-14%', '20%']);

  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative h-[135vh]">
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
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
