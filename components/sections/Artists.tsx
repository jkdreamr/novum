import Reveal from '@/components/Reveal';

type Artist = {
  index: string;
  name: string;
  discipline: string;
  tool: string;
};

const ARTISTS: Artist[] = [
  {
    index: '01',
    name: 'JOSHUA KOO',
    discipline: 'Generative systems & sound',
    tool: 'Builds his own synthesis engine and live-coding environment.',
  },
  {
    index: '02',
    name: 'ANNA MATSUMOTO',
    discipline: 'Computational image & type',
    tool: 'Designs the shader pipelines and tools behind her visual work.',
  },
];

function ArtistRow({ artist }: { artist: Artist }) {
  return (
    <li
      className="group border-t border-bone/15 last:border-b"
      data-cursor="view"
    >
      <div className="grid grid-cols-1 gap-6 py-[clamp(2rem,4vw,3.5rem)] md:grid-cols-12 md:items-center md:gap-8">
        {/* Row index */}
        <div className="text-xs uppercase tracking-label text-bone/50 transition-colors duration-500 group-hover:text-accent md:col-span-1">
          ( {artist.index} )
        </div>

        {/* Name + tool line */}
        <div className="md:col-span-7">
          <h3 className="font-display uppercase leading-[0.95] text-[clamp(2.4rem,8vw,6.5rem)] transition-transform duration-500 ease-editorial group-hover:translate-x-2 md:group-hover:translate-x-4">
            <Reveal variant="mask">{artist.name}</Reveal>
          </h3>
          <Reveal variant="rise" delay={0.05}>
            <p className="mt-4 max-w-[44ch] text-xs uppercase tracking-label text-bone/55">
              {artist.tool}
            </p>
          </Reveal>
        </div>

        {/* Placeholder image (clips into view on scroll, nudges on hover) + discipline */}
        <div className="md:col-span-4">
          <Reveal variant="clip">
            {/* PLACEHOLDER artist image — swap for a real <Image src=... />. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-bone/15 bg-bone/[0.04] transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[0.65rem] uppercase tracking-label text-bone/30">
                  ( {artist.index} / Image )
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={0.1} as="span">
            <span className="mt-3 block text-[0.7rem] uppercase tracking-label text-bone/55">
              {artist.discipline}
            </span>
          </Reveal>
        </div>
      </div>
    </li>
  );
}

export default function Artists() {
  return (
    <section id="artists" className="px-5 py-[clamp(6rem,12vw,12rem)] sm:px-8">
      {/* Section header */}
      <div className="mb-[clamp(2.5rem,6vw,5rem)] flex items-baseline justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <Reveal variant="fade" as="span">
          ( Artists )
        </Reveal>
        <Reveal variant="fade" delay={0.05} as="span">
          The people building it.
        </Reveal>
      </div>

      <ul>
        {ARTISTS.map((a) => (
          <ArtistRow key={a.index} artist={a} />
        ))}
      </ul>
    </section>
  );
}
