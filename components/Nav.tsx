'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HoverLink from '@/components/HoverLink';
import { scrollToTop } from '@/hooks/useLenis';

const LINKS = [
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16" aria-label="Primary">
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

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-label text-bone/60 transition-colors hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
        </div>

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

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-2 bg-ink px-6 sm:px-10 md:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-[clamp(2.5rem,13vw,4.5rem)] uppercase leading-none transition-colors hover:text-bone/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
