'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

/**
 * The dramatic type beat. Desktop + motion → a pinned, scroll-LINKED zoom (the editorial-serif
 * statement scales toward the viewer while faint oversized words drift horizontally). It stays on
 * INK — NO background colour animation, so there is no white/cream flash at any scroll speed, and
 * every section seam is ink→ink. Mobile / reduced-motion / SSR → a static ink section with a
 * clip-mask reveal.
 */
export default function Statement() {
  const desktop = useDesktopMotion();
  return desktop ? <PinnedStatement /> : <StaticStatement />;
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
      {/* Editorial serif — a different voice from the grotesque sections. */}
      <h2 className="font-serif uppercase leading-[0.95] tracking-[-0.01em] text-bone text-[clamp(2.75rem,14vw,6rem)]">
        <Lines />
      </h2>
    </section>
  );
}

function PinnedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Gradual zoom across ~80% of the pin (slow move). NO bg colour — flash-proof.
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.66, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.95, 1], [0, 1, 1, 0.85]);
  const driftA = useTransform(scrollYProgress, [0, 1], ['8%', '-24%']);
  const driftB = useTransform(scrollYProgress, [0, 1], ['-14%', '20%']);

  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative h-[135vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-ink">
        <motion.span
          style={{ x: driftA }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[10%] whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone opacity-[0.06]"
        >
          A LABEL · A COLLECTIVE
        </motion.span>
        <motion.span
          style={{ x: driftB }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] right-0 whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone opacity-[0.06]"
        >
          A CREATIVE LAB
        </motion.span>

        <motion.h2
          style={{ scale, opacity }}
          className="relative z-10 px-6 text-center font-serif text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.9] tracking-[-0.01em] text-bone will-change-transform"
        >
          THE NEXT
          <br />
          LABEL IS
          <br />
          A LAB.
        </motion.h2>
      </div>
    </section>
  );
}
