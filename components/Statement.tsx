'use client';

import { useRef } from 'react';
import { easeInOut, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';

/**
 * The bone "wash" beat. NOT pinned — it's a normal one-screen section you scroll PAST, so there's
 * no long pinned black region (the recurring "too much blank black space" problem). As the section
 * passes through the viewport, a #EDE8DF overlay's OPACITY eases in → holds → out (clamped 0–1, so
 * it can't overshoot to white), while the serif statement + ghost words (mix-blend-difference) stay
 * readable as the bg washes ink→bone→ink. Reduced-motion → a plain static ink section.
 */
export default function Statement() {
  const reduced = useReducedMotion();
  return reduced ? <StaticStatement /> : <FlowStatement />;
}

function StaticStatement() {
  return (
    <section aria-label="The next label is a lab" className="px-6 py-[clamp(5rem,16vw,9rem)] sm:px-10 lg:px-16">
      <p className="mb-7 text-[0.7rem] uppercase tracking-label text-bone/50">( The next label is a lab )</p>
      <h2 className="font-serif uppercase leading-[0.95] tracking-[-0.01em] text-bone text-[clamp(2.75rem,14vw,6rem)]">
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

function FlowStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Bone wash: ease in (0→0.45), hold (0.45→0.8), ease out (0.8→1). Opacity only — no flash.
  const wash = useTransform(p, [0, 0.45, 0.8, 1], [0, 1, 1, 0], { ease: easeInOut });
  const scale = useTransform(p, [0.1, 0.9], [0.88, 1.08]);
  const textOpacity = useTransform(p, [0.12, 0.28, 0.8, 0.95], [0, 1, 1, 0]);
  const ghostOpacity = useTransform(p, [0.1, 0.35, 0.75, 0.95], [0, 0.12, 0.12, 0]);
  const driftA = useTransform(p, [0, 1], ['12%', '-18%']);
  const driftB = useTransform(p, [0, 1], ['-12%', '16%']);

  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative">
      <div className="relative isolate flex h-[143svh] items-center justify-center overflow-hidden bg-ink">
        {/* Bone wash overlay — opacity eased by scroll. */}
        <motion.div style={{ opacity: wash }} className="pointer-events-none absolute inset-0 bg-bone" aria-hidden="true" />

        {/* Ghost words — drift + eased opacity; mix-blend keeps them faint on ink OR bone. */}
        <motion.span
          style={{ x: driftA, opacity: ghostOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[12%] whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone mix-blend-difference"
        >
          A LABEL · A COLLECTIVE
        </motion.span>
        <motion.span
          style={{ x: driftB, opacity: ghostOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[12%] right-0 whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone mix-blend-difference"
        >
          A CREATIVE LAB
        </motion.span>

        {/* Statement — mix-blend-difference reads on ink and on the bone wash. */}
        <motion.h2
          style={{ scale, opacity: textOpacity }}
          className="relative z-10 px-6 text-center font-serif text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.9] tracking-[-0.01em] text-bone mix-blend-difference will-change-transform"
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
