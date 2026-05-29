'use client';

import { type MouseEvent } from 'react';
import HoverLink from '@/components/HoverLink';
import { scrollToTarget, scrollToTop } from '@/hooks/useLenis';

const INDEX = [
  { label: 'About', target: '#about' },
  { label: 'Team', target: '#team' },
  { label: 'Join', target: '#join' },
];

export default function Footer() {
  const go = (target: string) => (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <footer className="px-5 pb-8 pt-[clamp(3.5rem,8vw,6rem)] sm:px-8">
      <div className="flex flex-col gap-10 border-t border-bone/15 pt-10 sm:flex-row sm:justify-between">
        {/* Index */}
        <nav aria-label="Sections" className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[0.7rem] uppercase tracking-label text-bone/40">( Index )</span>
          {INDEX.map((l) => (
            <HoverLink
              key={l.target}
              href={l.target}
              onClick={go(l.target)}
              className="text-sm uppercase tracking-label"
            >
              {l.label}
            </HoverLink>
          ))}
        </nav>

        {/* Reach out */}
        <div className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[0.7rem] uppercase tracking-label text-bone/40">( Reach out )</span>
          {/* PLACEHOLDER contacts — confirm/replace the address + handle. */}
          <HoverLink href="mailto:hello@novum.example" className="text-sm uppercase tracking-label">
            Email
          </HoverLink>
          <HoverLink
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm uppercase tracking-label"
          >
            Instagram
          </HoverLink>
        </div>

        {/* Identity */}
        <div className="flex flex-col items-start gap-2 text-[0.7rem] uppercase tracking-label text-bone/45 sm:items-end sm:text-right">
          <span>NOVUM — Artists building the tools behind their art.</span>
          <span>( EST. 2026 · KOREA ↔ SF )</span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-10 flex items-center justify-between border-t border-bone/15 pt-6 text-[0.7rem] uppercase tracking-label text-bone/50">
        <span>© 2026 NOVUM</span>
        <HoverLink
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          ariaLabel="Back to top"
          className="text-base"
        >
          ( ↑ )
        </HoverLink>
      </div>
    </footer>
  );
}
