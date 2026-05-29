'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReelVideo from '@/components/ReelVideo';
import Reveal from '@/components/Reveal';

/**
 * The video moment, composed WITH big type (adcker-style) — the reel is never a bare screen.
 * Desktop + motion-OK: a pinned, scroll-LINKED expand (the reel grows from a small jewel toward
 * full-bleed while the headline parallaxes past it via mix-blend). Mobile / reduced-motion: a
 * clean stacked composition (headline + framed reel) that reveals on scroll — no pinning, so it
 * stays smooth on phones.
 */
export default function Showreel() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return pinned ? <PinnedShowreel /> : <SimpleShowreel />;
}

/* Mobile / reduced-motion / SSR default: type-led, video framed below — composed, smooth. */
function SimpleShowreel() {
  return (
    <section aria-label="Showreel" className="px-6 py-[clamp(5rem,12vw,9rem)] sm:px-10 lg:px-16">
      <div className="mb-6 flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <span>( Showreel )</span>
        <span>NOVUM — 2026</span>
      </div>
      <h2 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-bone text-[clamp(2.5rem,13vw,7rem)]">
        <Reveal variant="rise">
          <span className="block">BUILD THE</span>
        </Reveal>
        <Reveal variant="rise" delay={0.07}>
          <span className="block">NEW MEDIUM</span>
        </Reveal>
      </h2>
      <Reveal variant="clip">
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-bone/15 bg-bone/[0.05]">
          <div className="reel-grain absolute inset-0 opacity-[0.05]" aria-hidden="true" />
          <ReelVideo
            className="absolute inset-0 h-full w-full object-cover"
            poster="/novum-reel-poster.jpg"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* Desktop: pinned, scroll-linked expand. */
function PinnedShowreel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Reel: small jewel (lower-right negative space) → near-full-bleed.
  const scale = useTransform(scrollYProgress, [0, 1], [0.46, 1]);
  const x = useTransform(scrollYProgress, [0, 1], ['24%', '0%']);
  const y = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);
  const radius = useTransform(scrollYProgress, [0, 1], [18, 0]);
  // Headline parallaxes at a different rate (depth); stays present via mix-blend.
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '-42%']);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.8]);
  // The jewel's caption fades as the reel grows past it.
  const labelOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

  return (
    <section ref={ref} aria-label="Showreel" className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Expanding reel */}
        <motion.div
          style={{ scale, x, y, borderRadius: radius }}
          className="absolute inset-0 overflow-hidden bg-bone/[0.05] will-change-transform"
        >
          <div className="reel-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
          <ReelVideo
            className="absolute inset-0 h-full w-full object-cover"
            poster="/novum-reel-poster.jpg"
          />
          <div className="absolute inset-0 bg-ink/10" />
        </motion.div>

        {/* Giant headline — the hero of the moment, parallaxing past the reel. */}
        <motion.h2
          style={{ y: typeY, opacity: typeOpacity }}
          className="pointer-events-none absolute left-6 top-[16%] z-10 max-w-[14ch] font-display font-medium uppercase leading-[0.9] tracking-[-0.04em] text-bone mix-blend-difference text-[clamp(3rem,11vw,10rem)] sm:left-10 lg:left-16"
        >
          BUILD THE
          <br />
          NEW MEDIUM
        </motion.h2>

        {/* Caption beside the jewel (outside it), fading as it expands. */}
        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute bottom-[14%] right-6 z-10 text-right text-[0.7rem] uppercase leading-relaxed tracking-label text-bone/70 mix-blend-difference sm:right-10 lg:right-16"
        >
          ( Showreel )
          <br />
          NOVUM — 2026
        </motion.div>
      </div>
    </section>
  );
}
