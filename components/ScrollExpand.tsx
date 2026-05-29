'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ReelVideo from '@/components/ReelVideo';

/**
 * adcker-style scroll-expand showreel. A tall track pins a full-screen stage; as you scroll
 * through it the NOVUM reel grows from a small centered frame toward full-bleed (scroll-LINKED,
 * not a one-shot) while the headline drifts past with opposing parallax. Transforms read raw
 * scroll progress (no spring) so it tracks the pointer/Lenis scroll crisply.
 * Under prefers-reduced-motion it renders a static, fully-visible reel instead.
 */
export default function ScrollExpand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.42, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const typeY = useTransform(scrollYProgress, [0, 1], [40, -140]);

  if (reduced) {
    return (
      <section aria-label="Showreel" className="px-5 py-[clamp(4rem,10vw,8rem)] sm:px-8">
        <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
          <span>( Showreel )</span>
          <span>( 2026 / REEL 001 )</span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden border border-bone/15 bg-bone/[0.04]">
          <div className="reel-grain absolute inset-0 opacity-[0.05]" />
          <ReelVideo className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Showreel" className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Expanding reel — grows from a small centered frame to full-bleed. Fallback bg behind. */}
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="absolute inset-0 overflow-hidden bg-bone/[0.04] will-change-transform"
        >
          <div className="reel-grain absolute inset-0 opacity-[0.06]" />
          <ReelVideo className="absolute inset-0 h-full w-full object-cover" />
          {/* Subtle scrim keeps the overlaid type legible against busy footage. */}
          <div className="absolute inset-0 bg-ink/15" />
        </motion.div>

        {/* Parallax headline over the media (mix-blend keeps it readable on ink or bone). */}
        <motion.h2
          style={{ y: typeY }}
          className="pointer-events-none relative z-10 px-5 text-center font-display font-medium uppercase leading-[0.88] tracking-[-0.03em] text-bone mix-blend-difference text-[clamp(2.5rem,11vw,9rem)]"
        >
          BUILD THE
          <br />
          NEW MEDIUM
        </motion.h2>

        {/* Corner labels */}
        <span className="absolute left-5 top-6 z-10 text-[0.7rem] uppercase tracking-label text-bone/70 mix-blend-difference sm:left-8">
          ( Showreel )
        </span>
        <span className="absolute right-5 top-6 z-10 text-[0.7rem] uppercase tracking-label text-bone/70 mix-blend-difference sm:right-8">
          ( 2026 / REEL 001 )
        </span>
      </div>
    </section>
  );
}
