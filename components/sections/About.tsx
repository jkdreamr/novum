'use client';

import Reveal from '@/components/Reveal';
import HoverLink from '@/components/HoverLink';
import { scrollToTarget } from '@/hooks/useLenis';

/**
 * Inline media "chip" embedded mid-heading (adcker effect). PLACEHOLDER: a framed block
 * with a play glyph + accent hairline border — swap for a real <video>/<Image>.
 */
function MediaChip() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-[0.15em] inline-flex h-[0.72em] w-[1.15em] translate-y-[0.05em] items-center justify-center overflow-hidden border border-accent/60 align-middle"
    >
      <span className="absolute inset-0 bg-bone/[0.06]" />
      <span
        className="relative ml-[0.04em] block h-0 w-0 border-y-[0.16em] border-l-[0.26em] border-y-transparent border-l-accent/80"
        style={{ animation: 'chip-pulse 2.4s ease-in-out infinite' }}
      />
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-[clamp(6rem,12vw,12rem)] pt-[clamp(8rem,16vw,13rem)] sm:px-8"
    >
      {/* Section label */}
      <div className="mb-[clamp(2.5rem,6vw,5rem)] flex items-center justify-between text-[0.7rem] uppercase tracking-label text-bone/50">
        <Reveal variant="fade" as="span">
          ( About )
        </Reveal>
        <Reveal variant="fade" delay={0.05} as="span">
          ( 01 )
        </Reveal>
      </div>

      {/* The centerpiece — one declarative statement, ALL CAPS, with an inline media chip. */}
      <h1 className="max-w-[1200px] font-display uppercase leading-[0.98] tracking-[-0.01em] text-[clamp(1.75rem,4.7vw,4.25rem)]">
        <Reveal variant="mask">
          <span>
            NOVUM IS A COLLECTIVE OF ARTISTS WHO BUILD THE TOOLS THEY CREATE WITH. WE TREAT
            CODE AS A MEDIUM AND THE STUDIO AS A LABORATORY — DESIGNING OUR OWN <MediaChip />{' '}
            INSTRUMENTS, ENGINES, AND SYSTEMS RATHER THAN BORROWING SOMEONE ELSE&apos;S. EVERY
            WORK CARRIES THE MARK OF THE MACHINE THAT MADE IT, AND EVERY MACHINE IS A WORK IN
            ITSELF.
          </span>
        </Reveal>
      </h1>

      {/* Secondary line + read-more */}
      <div className="mt-[clamp(2.5rem,6vw,4.5rem)] flex flex-col gap-5 text-xs uppercase tracking-label text-bone/70 sm:flex-row sm:items-center sm:justify-between">
        <Reveal variant="rise" delay={0.1} as="span">
          ( EST. 2026 )&nbsp;&nbsp;—&nbsp;&nbsp;A LABEL FOR ARTIST-ENGINEERS.
        </Reveal>
        <Reveal variant="rise" delay={0.15}>
          <HoverLink
            href="#artists"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#artists');
            }}
            className="text-xs uppercase tracking-label"
          >
            ( Read more )
          </HoverLink>
        </Reveal>
      </div>
    </section>
  );
}
