'use client';

import { useRef } from 'react';
import { easeInOut, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

/**
 * The dramatic type beat with the bone "wash". A #EDE8DF overlay's OPACITY is eased by
 * scrollYProgress (in → hold → out) so the cream washes in and back out smoothly — opacity is
 * clamped 0–1 and can never overshoot to white, and it's spread over a long range so it's gradual
 * at any scroll speed (no flash/strobe). The statement + ghost words use mix-blend-difference so
 * they stay readable as the background changes. Desktop pins it; mobile flows it (no pin); reduced
 * motion shows a plain static ink section.
 */
export default function Statement() {
  const desktop = useDesktopMotion();
  const reduced = useReducedMotion();
  if (reduced) return <StaticStatement />;
  return desktop ? <PinnedStatement /> : <FlowStatement />;
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

/* The shared washing stage. `p` is scroll progress 0→1 across whatever range the parent provides. */
function WashStage({ p, zoom }: { p: MotionValue<number>; zoom: boolean }) {
  // Bone wash: gentle ease in (0→0.42), LONG hold (0.42→0.86) so the white moment is relaxed,
  // then a QUICK ease out (0.86→1) so there's almost no trailing fade-to-black before the next
  // section. Opacity only — no colour interpolation, so it can't overshoot to white.
  const wash = useTransform(p, [0, 0.42, 0.86, 1], [0, 1, 1, 0], { ease: easeInOut });
  const scale = useTransform(p, [0, 0.86], zoom ? [0.72, 1.12] : [0.92, 1.04]);
  const textOpacity = useTransform(p, [0, 0.12, 0.92, 1], [0, 1, 1, 0.8]);
  const ghostOpacity = useTransform(p, [0, 0.22, 0.86, 1], [0, 0.12, 0.12, 0]);
  const driftA = useTransform(p, [0, 1], ['10%', '-22%']);
  const driftB = useTransform(p, [0, 1], ['-14%', '18%']);

  return (
    <div className="relative isolate flex h-[100svh] items-center justify-center overflow-hidden bg-ink">
      {/* Bone wash overlay — opacity eased by scroll. */}
      <motion.div style={{ opacity: wash }} className="pointer-events-none absolute inset-0 bg-bone" aria-hidden="true" />

      {/* Ghost words — drift + eased opacity; mix-blend keeps them faint on ink OR bone. */}
      <motion.span
        style={{ x: driftA, opacity: ghostOpacity }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[10%] whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone mix-blend-difference"
      >
        A LABEL · A COLLECTIVE
      </motion.span>
      <motion.span
        style={{ x: driftB, opacity: ghostOpacity }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-0 whitespace-nowrap font-display text-[18vw] font-medium uppercase leading-none tracking-[-0.04em] text-bone mix-blend-difference"
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
  );
}

/* Desktop: pinned over a long track so the wash in→hold→out is graceful at any scroll speed. The
   long bone HOLD makes it feel relaxed; the quick wash-out (in WashStage) means the next section
   arrives shortly after the white resolves — no big trailing black region. */
function PinnedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative h-[195vh]">
      <div className="sticky top-0">
        <WashStage p={scrollYProgress} zoom />
      </div>
    </section>
  );
}

/* Mobile: not pinned — the wash maps to the section passing through the viewport (smooth, cheap). */
function FlowStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <section ref={ref} aria-label="The next label is a lab" className="relative">
      <WashStage p={scrollYProgress} zoom={false} />
    </section>
  );
}
