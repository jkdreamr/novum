'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import HoverLink from '@/components/HoverLink';
import { getLenis, scrollToTarget, scrollToTop } from '@/hooks/useLenis';

const LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Team', target: '#team' },
  { label: 'Join', target: '#join' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // While the mobile overlay is open: freeze scrolling and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    getLenis()?.stop();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      getLenis()?.start();
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const go = (target: string) => (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(target);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16"
        aria-label="Primary"
      >
        {/* Wordmark → back to top */}
        <HoverLink
          className="text-sm font-bold uppercase tracking-label"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          ariaLabel="NOVUM — back to top"
        >
          NOVUM
        </HoverLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <HoverLink
              key={l.target}
              href={l.target}
              onClick={go(l.target)}
              className="text-xs uppercase tracking-label"
            >
              {`( ${l.label} )`}
            </HoverLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-m-2 p-2 text-xs uppercase tracking-label md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? '( Close )' : '( Menu )'}
        </button>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-3 bg-ink px-6 sm:px-10 md:hidden"
        >
          {LINKS.map((l) => (
            <HoverLink
              key={l.target}
              href={l.target}
              onClick={go(l.target)}
              className="font-display text-[clamp(3rem,16vw,5rem)] uppercase leading-none"
            >
              {l.label}
            </HoverLink>
          ))}
        </div>
      )}
    </header>
  );
}
