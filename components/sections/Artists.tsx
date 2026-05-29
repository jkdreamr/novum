import Reveal from '@/components/Reveal';

type Artist = {
  index: string;
  name: string;
  role: string;
  focus: string;
};

const ARTISTS: Artist[] = [
  {
    index: '01',
    name: 'JOSHUA KOO',
    role: 'Artist / Producer / Builder',
    focus: 'AI-assisted systems for recording, release strategy, and world-building.',
  },
  {
    index: '02',
    name: 'ANNA MATSUMOTO',
    role: 'Creative Technologist / HCI Researcher',
    focus: 'Interfaces across sound, movement, touch, and visual media.',
  },
];

// Deck's internal tooling — quiet captions, not headline items.
const TOOLS = ['VOICE MEMO TO WORLD', 'REACTIVE STAGE', 'SONG WORLD BUILDER'];

function ArtistRow({ artist }: { artist: Artist }) {
  return (
    <li className="group border-t border-bone/15">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 py-[clamp(2.5rem,6vw,5rem)] md:items-end">
        {/* Text side */}
        <div className="col-span-12 md:col-span-8">
          <div className="mb-6 flex items-center gap-5 text-[0.7rem] uppercase tracking-label text-bone/45">
            <span className="transition-colors duration-500 group-hover:text-accent">
              ( {artist.index} )
            </span>
            <span className="h-px w-10 bg-bone/20" aria-hidden="true" />
            <span>{artist.role}</span>
          </div>
          <h3 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.25rem,7.5vw,6rem)] transition-transform duration-500 ease-editorial group-hover:translate-x-2 md:group-hover:translate-x-5">
            <Reveal variant="mask">{artist.name}</Reveal>
          </h3>
          <Reveal variant="rise" delay={0.05}>
            <p className="mt-6 max-w-[46ch] text-xs uppercase leading-relaxed tracking-label text-bone/55">
              {artist.focus}
            </p>
          </Reveal>
        </div>

        {/* Image side (opposite the text). PLACEHOLDER — swap for a real <Image />. */}
        <div className="col-span-12 md:col-span-4">
          <Reveal variant="clip">
            <div
              data-cursor="VIEW"
              className="relative aspect-[4/3] w-full overflow-hidden border border-bone/15 bg-bone/[0.04]"
            >
              <div className="reel-grain absolute inset-0 opacity-[0.05]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-70 transition-all duration-700 ease-editorial group-hover:scale-[1.03] group-hover:opacity-100">
                <span className="text-[0.65rem] uppercase tracking-label text-bone/30">
                  ( {artist.index} / Image )
                </span>
              </div>
              <span className="absolute bottom-3 left-3 text-[0.6rem] uppercase tracking-label text-bone/0 transition-colors duration-500 group-hover:text-bone/60">
                ( View )
              </span>
            </div>
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
      <div className="mb-[clamp(3rem,7vw,6rem)] grid grid-cols-12 gap-y-6">
        <span className="col-span-12 text-[0.7rem] uppercase tracking-label text-bone/50 md:col-span-3">
          ( 02 / FOUNDING ARTISTS )
        </span>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.5rem,4vw,2.75rem)]">
            <Reveal variant="mask">THE PEOPLE BUILDING IT.</Reveal>
          </h2>
        </div>
      </div>

      {/* Artist rows */}
      <ul className="border-b border-bone/15">
        {ARTISTS.map((a) => (
          <ArtistRow key={a.index} artist={a} />
        ))}
      </ul>

      {/* Internal tools aside */}
      <div className="mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-12 gap-y-4">
        <span className="col-span-12 text-[0.7rem] uppercase tracking-label text-bone/40 md:col-span-3">
          ( Internal tools )
        </span>
        <ul className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] uppercase tracking-label text-bone/55 md:col-span-9">
          {TOOLS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
