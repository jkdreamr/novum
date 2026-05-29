import Reveal from '@/components/Reveal';

export default function About() {
  return (
    <section id="about" className="px-6 sm:px-10 lg:px-16">
      <div className="flex min-h-[100svh] flex-col justify-between py-[clamp(7rem,12vw,10rem)]">
        {/* Top frame labels — small, quiet, aligned to the gutter. */}
        <div className="flex items-start justify-between gap-6 text-[0.7rem] uppercase tracking-label text-bone/50">
          <Reveal variant="fade" as="span">
            ( 01 / ABOUT )
          </Reveal>
          <Reveal variant="fade" delay={0.05} as="span">
            ( LABEL · COLLECTIVE · CREATIVE LAB )
          </Reveal>
        </div>

        {/* HERO HEADLINE — pure type, flush left, three deliberate lines. */}
        <h1 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.04em] text-bone text-[clamp(2rem,8.5vw,8rem)]">
          <Reveal variant="rise" duration={0.7}>
            <span className="block">ARTISTS BUILDING</span>
          </Reveal>
          <Reveal variant="rise" delay={0.07} duration={0.7}>
            <span className="block">THE TOOLS BEHIND</span>
          </Reveal>
          <Reveal variant="rise" delay={0.14} duration={0.7}>
            <span className="block">THEIR ART.</span>
          </Reveal>
        </h1>

        {/* Bottom frame labels — sub-line left, positioning line right. */}
        <div className="flex flex-col gap-4 text-[0.7rem] uppercase tracking-label sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <Reveal variant="rise" as="span">
            <span className="text-bone/55">MUSIC / VISUALS / PERFORMANCE / SYSTEMS</span>
          </Reveal>
          <Reveal variant="rise" delay={0.05} as="span">
            <span className="block max-w-[42ch] text-bone/45 sm:text-right">
              A label, a collective, a creative lab — the next label is a lab.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
