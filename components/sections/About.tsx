import Reveal from '@/components/Reveal';

export default function About() {
  return (
    <section id="about" className="px-5 sm:px-8">
      <div className="flex min-h-[100svh] flex-col justify-between pb-10 pt-[clamp(7rem,14vw,11rem)]">
        {/* Top frame labels */}
        <div className="flex items-start justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
          <Reveal variant="fade" as="span">
            ( 01 / ABOUT )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( KOREA ↔ SF )
          </Reveal>
        </div>

        {/* HERO HEADLINE — huge, bone, left-aligned, three deliberate lines. */}
        <h1 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.03em] text-bone text-[clamp(2.5rem,10vw,11rem)]">
          <Reveal variant="rise">
            <span className="block">ARTISTS BUILDING</span>
          </Reveal>
          <Reveal variant="rise" delay={0.07}>
            <span className="block">THE TOOLS BEHIND</span>
          </Reveal>
          <Reveal variant="rise" delay={0.14}>
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
              ( LABEL · COLLECTIVE · CREATIVE LAB )
            </Reveal>
          </div>
          <Reveal variant="rise" delay={0.1}>
            <p className="max-w-[60ch] text-xs uppercase leading-relaxed tracking-label text-bone/60">
              A label, a collective, a creative lab — the next label is a lab.
            </p>
          </Reveal>
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/45">
            <span>( EST. 2026 )</span>
            <span className="inline-flex items-center gap-2">
              ( scroll <span className="scroll-arrow">↓</span> )
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
