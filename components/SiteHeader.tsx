'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-label transition-colors hover:text-bone/70"
        >
          NOVUM
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`text-xs uppercase tracking-label transition-colors hover:text-bone ${
                  active ? 'text-bone' : 'text-bone/55'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="-m-2 p-2 text-xs uppercase tracking-label md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
        >
          {open ? '( Close )' : '( Menu )'}
        </button>
      </nav>

      {open && (
        <div
          id="site-mobile-menu"
          className="fixed inset-0 top-[57px] z-40 flex flex-col items-start justify-start gap-1 bg-ink px-6 pt-8 sm:px-10 md:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-[clamp(2.25rem,11vw,3.5rem)] uppercase leading-none transition-colors hover:text-bone/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
