'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/Reveal';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

/**
 * The dramatic type moment (no video). Desktop + motion-OK: a pinned, scroll-LINKED beat — the
 * palette inverts ink↔bone, a giant "THE NEXT / LABEL IS / A LAB." zooms toward the viewer, and
 * faint oversized words drift horizontally for depth. The track is sized so the statement stays
 * visible across the WHOLE pin and the palette returns to ink right as it releases into Team — no
 * dead black screen. Mobile / reduced-motion / SSR: a static bone-on-ink contrast block.
 */
export default function Statement() {
  const desktop = useDesktopMotion();
  return desktop ? <PinnedStatement /> : <StaticStatement />;
}

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

function PinnedStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Palette inverts ink → bone → ink, so it opens out of About and flows back into Team (both ink).
  const bg = useTransform(scrollYProgress, [0, 0.3, 0.72, 1], ['#0A0A0A', '#EDE8DF', '#EDE8DF', '#0A0A0A']);
  const fg = useTransform(scrollYProgress, [0, 0.3, 0.72, 1], ['#EDE8DF', '#0A0A0A', '#0A0A0A', '#EDE8DF']);
  // Zooms toward the viewer. Fades IN only and stays visible to the end — no empty pinned screen.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  // Opposing horizontal parallax drift on faint oversized words (depth).
  const driftA = useTransform(scrollYProgress, [0, 1], ['8%', '-24%']);
  const driftB = useTransform(scrollYProgress, [0, 1], ['-14%', '20%']);

  return (
    // 140vh track → ~40vh pin; the statement animates across the whole range, so there's no dead
    // black space before Team (was 170vh / ~70vh, which left an empty pinned screen at the end).
    <section ref={ref} aria-label="The next label is a lab" className="relative h-[140vh]">
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
