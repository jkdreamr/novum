'use client';

import Reveal from '@/components/Reveal';

/**
 * Inline media "chip" embedded mid-heading (adcker effect). PLACEHOLDER: a framed block with a
 * play glyph + accent hairline border — swap for a real <video>/<Image> sized in em.
 */
function MediaChip() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-[0.12em] inline-flex h-[0.68em] w-[1.1em] translate-y-[0.02em] items-center justify-center overflow-hidden border border-accent/60 align-middle"
    >
      <span className="absolute inset-0 bg-bone/[0.06]" />
      <span
        className="relative ml-[0.04em] block h-0 w-0 border-y-[0.14em] border-l-[0.24em] border-y-transparent border-l-accent/80"
        style={{ animation: 'chip-pulse 2.4s ease-in-out infinite' }}
      />
    </span>
  );
}

/**
 * Hero media / showreel. PLACEHOLDER: a drifting-grain panel. To use real footage, replace the
 * inner block with: <video src="/showreel.mp4" autoPlay muted loop playsInline
 * className="h-full w-full object-cover" />
 */
function Showreel() {
  return (
    <div className="border-t border-bone/15 pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <span>( Showreel )</span>
        <span>( 2026 / REEL 001 )</span>
      </div>
      <Reveal variant="clip">
        <div
          data-cursor="PLAY"
          className="group relative aspect-video w-full overflow-hidden border border-bone/15 bg-bone/[0.03]"
        >
          <div className="reel-grain absolute inset-0 opacity-[0.07]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[clamp(2.5rem,9vw,7rem)] font-medium uppercase tracking-[-0.03em] text-bone/[0.08] transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
              NOVUM
            </span>
          </div>
          <span className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-label text-bone/40">
            ( Placeholder — no signal )
          </span>
          <span className="absolute bottom-4 right-4 text-[0.65rem] uppercase tracking-label text-bone/40">
            00:00 / 01:30
          </span>
        </div>
      </Reveal>
    </div>
  );
}

const WHAT = [
  {
    i: '01',
    word: 'ARTISTS',
    desc: 'A small circle of musicians, visual artists, performers, and creative technologists.',
  },
  {
    i: '02',
    word: 'TOOLS',
    desc: 'Internal systems for sound, visuals, rollout, fan interaction, and live performance.',
  },
  {
    i: '03',
    word: 'SESSIONS',
    desc: 'Live experiences between concert, demo night, gallery, and party.',
  },
];

export default function About() {
  return (
    <section id="about" className="px-5 sm:px-8">
      {/* HERO */}
      <div className="flex min-h-[100svh] flex-col justify-between pb-8 pt-[clamp(7rem,14vw,11rem)]">
        <div className="flex items-start justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
          <Reveal variant="fade" as="span">
            ( 01 / ABOUT )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( KOREA ↔ SF )
          </Reveal>
        </div>

        <h1 className="py-[clamp(1.5rem,4vw,3rem)] font-display font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2rem,8.5vw,7.5rem)]">
          <Reveal variant="mask">
            <span className="block">ARTISTS BUILDING</span>
          </Reveal>
          <Reveal variant="mask" delay={0.08}>
            <span className="block">
              THE <MediaChip /> TOOLS BEHIND
            </span>
          </Reveal>
          <Reveal variant="mask" delay={0.16}>
            <span className="block">THEIR ART.</span>
          </Reveal>
        </h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-label text-bone/55">
            <Reveal variant="rise" as="span">
              MUSIC / VISUALS / PERFORMANCE / SYSTEMS
            </Reveal>
            <Reveal variant="rise" delay={0.06} as="span">
              ( LABEL · COLLECTIVE · CREATIVE LAB )
            </Reveal>
          </div>
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/45">
            <span>( EST. 2026 )</span>
            <span className="inline-flex items-center gap-2">
              ( scroll ) <span className="scroll-arrow">↓</span>
            </span>
          </div>
        </div>
      </div>

      {/* SHOWREEL */}
      <Showreel />

      {/* THESIS */}
      <div className="grid grid-cols-12 gap-y-8 py-[clamp(5rem,12vw,11rem)]">
        <div className="col-span-12 flex flex-col gap-2 text-[0.7rem] uppercase tracking-label text-bone/50 md:col-span-3">
          <Reveal variant="fade" as="span">
            ( 01 / THESIS )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( THE NEXT LABEL IS A LAB )
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.25rem,8.5vw,7rem)]">
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
          <Reveal variant="rise" delay={0.1}>
            <p className="mt-8 max-w-[48ch] text-xs uppercase leading-relaxed tracking-label text-bone/60">
              Not AI replacing artists. Artist-built technology extending art.
            </p>
          </Reveal>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div className="border-t border-bone/15 py-[clamp(4rem,10vw,9rem)]">
        <p className="text-[0.7rem] uppercase tracking-label text-bone/45">( Cultural shift )</p>
        <h3 className="mt-6 font-display font-medium uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(1.9rem,6.5vw,5.5rem)]">
          <Reveal variant="mask">
            <span className="block">THE ARTIST IS THE STUDIO.</span>
          </Reveal>
        </h3>
      </div>

      {/* WHAT WE ARE */}
      <div className="border-t border-bone/15 py-[clamp(4rem,10vw,9rem)]">
        <div className="mb-[clamp(2rem,5vw,4rem)] flex items-baseline justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
          <Reveal variant="fade" as="span">
            ( What we are )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( 03 )
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {WHAT.map((w, idx) => (
            <Reveal key={w.i} variant="rise" delay={idx * 0.06}>
              <div
                className="group flex h-full flex-col gap-5 border-t border-bone/20 pt-6"
                data-cursor
              >
                <span className="text-[0.7rem] uppercase tracking-label text-bone/45 transition-colors duration-500 group-hover:text-accent">
                  ( {w.i} )
                </span>
                <h4 className="font-display font-medium uppercase leading-none tracking-[-0.02em] text-[clamp(1.75rem,4vw,3rem)] transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                  {w.word}
                </h4>
                <p className="max-w-[34ch] text-xs uppercase leading-relaxed tracking-label text-bone/55">
                  {w.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
