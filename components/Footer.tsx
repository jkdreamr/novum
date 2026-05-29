'use client';

import { type MouseEvent } from 'react';
import HoverLink from '@/components/HoverLink';
import { scrollToTarget, scrollToTop } from '@/hooks/useLenis';

const INDEX = [
  { label: 'About', target: '#about' },
  { label: 'Artists', target: '#artists' },
  { label: 'Join', target: '#join' },
];

export default function Footer() {
  const go = (target: string) => (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <footer className="px-5 pb-8 pt-[clamp(4rem,10vw,8rem)] sm:px-8">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
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
          {/* PLACEHOLDER contacts — replace with the real address + handle. */}
          <HoverLink href="mailto:hello@novum.studio" className="text-sm uppercase tracking-label">
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
      </div>

      {/* Oversized editorial sign-off wordmark */}
      <div className="mt-[clamp(3rem,8vw,6rem)] select-none">
        <span className="block font-display uppercase leading-[0.8] tracking-[-0.02em] text-[clamp(4rem,21vw,17rem)] text-bone">
          NOVUM
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-8 flex items-center justify-between border-t border-bone/15 pt-6 text-[0.7rem] uppercase tracking-label text-bone/50">
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
