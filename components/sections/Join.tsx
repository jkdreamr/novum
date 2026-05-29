'use client';

import type { FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import HoverLink from '@/components/HoverLink';

const PATHS = [
  { word: 'ARTISTS', desc: 'build with us' },
  { word: 'BUILDERS', desc: 'make the systems' },
  { word: 'SPONSORS', desc: 'fund the sessions' },
  { word: 'INVESTORS', desc: 'back the lab' },
];

export default function Join() {
  // STYLED-ONLY: this capture does not submit anywhere. preventDefault stops the browser from
  // navigating; wire it to a real endpoint/provider later to make it functional.
  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <section id="join" className="px-6 py-[clamp(6rem,12vw,12rem)] sm:px-10 lg:px-16">
      {/* Section header */}
      <div className="mb-[clamp(2.5rem,6vw,5rem)] flex items-baseline justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <Reveal variant="fade" as="span">
          ( 03 / JOIN )
        </Reveal>
        <Reveal variant="fade" delay={0.05} as="span">
          ( OPEN CALL )
        </Reveal>
      </div>

      {/* Giant statement */}
      <h2 className="font-display font-medium uppercase leading-[0.88] tracking-[-0.03em] text-[clamp(2.5rem,12vw,10rem)]">
        <Reveal variant="mask">
          <span className="block">JOIN</span>
        </Reveal>
        <Reveal variant="mask" delay={0.08}>
          <span className="block">THE FIRST</span>
        </Reveal>
        <Reveal variant="mask" delay={0.16}>
          <span className="block">CIRCLE.</span>
        </Reveal>
      </h2>

      {/* Four ways in */}
      <div className="mt-[clamp(3rem,8vw,6rem)] grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {PATHS.map((p, idx) => (
          <Reveal key={p.word} variant="rise" delay={idx * 0.05}>
            <div className="flex flex-col gap-3 border-t border-bone/20 pt-5">
              <HoverLink className="font-display text-[clamp(1.4rem,3.4vw,2.25rem)] font-medium uppercase leading-none">
                {p.word}
              </HoverLink>
              <span className="text-[0.7rem] uppercase tracking-label text-bone/50">— {p.desc}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Apply + email capture */}
      <div className="mt-[clamp(3.5rem,9vw,7rem)] grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <Reveal variant="rise">
          <div className="flex flex-col gap-4">
            <span className="text-[0.7rem] uppercase tracking-label text-bone/50">( Apply )</span>
            {/* PLACEHOLDER address — confirm/replace hello@novum.example. */}
            <HoverLink
              href="mailto:hello@novum.example"
              className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-medium uppercase leading-none"
            >
              APPLY
            </HoverLink>
            <span className="text-[0.7rem] uppercase tracking-label text-bone/50">hello@novum.example</span>
          </div>
        </Reveal>

        {/* Email capture — styled-only */}
        <Reveal variant="rise" delay={0.08}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-[0.7rem] uppercase tracking-label text-bone/50">
              ( Email )
            </label>
            <div className="flex items-center gap-4 border-b border-bone/30 pb-3 transition-colors focus-within:border-bone">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="YOUR EMAIL"
                autoComplete="email"
                className="w-full bg-transparent text-sm uppercase tracking-label text-bone placeholder:text-bone/35 focus:outline-none"
              />
              <HoverLink className="shrink-0 text-xs uppercase tracking-label">
                ( Submit )
              </HoverLink>
            </div>
            <p className="text-[0.65rem] uppercase tracking-label text-bone/30">
              ( Non-functional — wire to an endpoint to enable )
            </p>
          </form>
        </Reveal>
      </div>

      {/* Closing line */}
      <div className="mt-[clamp(4rem,10vw,9rem)] border-t border-bone/15 pt-[clamp(2.5rem,6vw,5rem)]">
        <h3 className="font-display font-medium uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(2rem,8vw,7rem)]">
          <Reveal variant="mask">
            <span className="block">BUILD THE NEW MEDIUM.</span>
          </Reveal>
        </h3>
      </div>
    </section>
  );
}
