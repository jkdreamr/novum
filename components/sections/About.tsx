import Reveal from '@/components/Reveal';
import ReelVideo from '@/components/ReelVideo';

/**
 * Inline media chip embedded mid-headline (adcker "FOR BEAUTY ( [img] )" move): the NOVUM reel
 * playing muted/looping right after the word TOOLS. Solid bg sits behind as the load fallback.
 */
function HeadlineChip() {
  return (
    <span className="relative mx-[0.16em] inline-flex aspect-video h-[clamp(3rem,6.5vw,7rem)] translate-y-[0.04em] items-center justify-center overflow-hidden rounded-[6px] border border-bone/40 bg-bone/[0.06] align-middle">
      <span className="reel-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <ReelVideo className="absolute inset-0 h-full w-full object-cover" />
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="px-5 sm:px-8">
      <div className="flex min-h-[100svh] flex-col justify-between pb-10 pt-[clamp(7rem,14vw,11rem)]">
        {/* Top frame labels */}
        <div className="flex items-start justify-between gap-6 text-[0.7rem] uppercase tracking-label text-bone/50">
          <Reveal variant="fade" as="span">
            ( 01 / ABOUT )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( LABEL · COLLECTIVE · CREATIVE LAB )
          </Reveal>
        </div>

        {/* HERO HEADLINE — solid block flush left, with the reel chip after TOOLS. */}
        <h1 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.035em] text-bone text-[clamp(2.5rem,10vw,11rem)]">
          <Reveal variant="rise" duration={0.7}>
            <span className="block">ARTISTS BUILDING</span>
          </Reveal>
          <Reveal variant="rise" delay={0.07} duration={0.7}>
            <span className="block">
              THE TOOLS <HeadlineChip /> BEHIND
            </span>
          </Reveal>
          <Reveal variant="rise" delay={0.14} duration={0.7}>
            <span className="block">THEIR ART.</span>
          </Reveal>
        </h1>

        {/* Sub-line, supporting line, and scroll cue. */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 text-[0.7rem] uppercase tracking-label text-bone/55">
            <Reveal variant="rise" as="span">
              MUSIC / VISUALS / PERFORMANCE / SYSTEMS
            </Reveal>
            <Reveal variant="rise" delay={0.05} as="span">
              <span className="text-bone/45">A label, a collective, a creative lab — the next label is a lab.</span>
            </Reveal>
          </div>
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/45">
            <span>( EST. 2026 )</span>
            <span className="inline-flex items-center gap-2">
              ( SCROLL <span className="scroll-arrow">↓</span> )
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
