'use client';

import Link from 'next/link';

const PAGES = [
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-8 pt-[clamp(3.5rem,8vw,6rem)] sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-10 border-t border-bone/15 pt-10 sm:grid-cols-3">
        <nav aria-label="Pages" className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[0.7rem] uppercase tracking-label text-bone/40">( Index )</span>
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="text-sm uppercase tracking-label text-bone/80 transition-colors hover:text-bone"
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[0.7rem] uppercase tracking-label text-bone/40">( Reach out )</span>
          <a
            href="mailto:novumcreate@gmail.com"
            className="text-sm uppercase tracking-label text-bone/80 transition-colors hover:text-bone"
          >
            novumcreate@gmail.com
          </a>
          <Link
            href="/apply"
            className="text-sm uppercase tracking-label text-bone/80 transition-colors hover:text-bone"
          >
            Apply as artist / builder
          </Link>
        </div>

        <div className="flex flex-col items-start gap-2 text-[0.7rem] uppercase tracking-label text-bone/45 sm:items-end sm:text-right">
          <span>NOVUM — Artists building the tools behind their art.</span>
          <span>music · visuals · performance · systems</span>
          <span>( EST. 2026 )</span>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-bone/15 pt-6 text-[0.7rem] uppercase tracking-label text-bone/50">
        <span>© 2026 NOVUM</span>
        <span>The next label is a lab.</span>
      </div>
    </footer>
  );
}
