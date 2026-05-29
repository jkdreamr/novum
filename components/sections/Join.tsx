'use client';

import type { FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import HoverLink from '@/components/HoverLink';

export default function Join() {
  // STYLED-ONLY: this capture does not submit anywhere. preventDefault stops the browser
  // from navigating; wire it to a real endpoint/provider later to make it functional.
  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <section id="join" className="px-5 py-[clamp(6rem,12vw,12rem)] sm:px-8">
      {/* Section header */}
      <div className="mb-[clamp(2.5rem,6vw,5rem)] flex items-baseline justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <Reveal variant="fade" as="span">
          ( Join )
        </Reveal>
        <Reveal variant="fade" delay={0.05} as="span">
          ( 03 )
        </Reveal>
      </div>

      {/* Closing manifesto statement */}
      <h2 className="max-w-[1100px] font-display uppercase leading-[0.98] tracking-[-0.01em] text-[clamp(1.9rem,4.8vw,4.5rem)]">
        <Reveal variant="mask">
          <span>
            WE&apos;RE NOT LOOKING FOR USERS. WE&apos;RE LOOKING FOR BUILDERS — ARTISTS WHO
            WOULD RATHER MAKE THE TOOL THAN WAIT FOR IT. IF THAT&apos;S YOU, THE DOOR IS OPEN.
          </span>
        </Reveal>
      </h2>

      <div className="mt-[clamp(3rem,8vw,6rem)] grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Apply CTA */}
        <Reveal variant="rise">
          <div className="flex flex-col gap-4">
            <span className="text-[0.7rem] uppercase tracking-label text-bone/50">( Apply )</span>
            {/* PLACEHOLDER address — replace join@novum.studio with the real inbox. */}
            <HoverLink
              href="mailto:join@novum.studio"
              className="font-display lowercase leading-none text-[clamp(2rem,5.5vw,3.75rem)]"
            >
              join@novum.studio
            </HoverLink>
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
    </section>
  );
}
