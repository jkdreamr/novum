import Link from 'next/link';

const PAGES = [
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Investors & Partners', href: '/investors' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];

// Role-based inboxes. Until novumhq.com aliases are live, all route to the primary inbox.
const CONTACTS = [
  { label: 'General', email: 'novumcreate@gmail.com' },
  { label: 'Artists & builders', email: 'novumcreate@gmail.com' },
  { label: 'Investors & partners', email: 'novumcreate@gmail.com' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-bone/15 px-6 pb-10 pt-[clamp(3.5rem,8vw,6rem)] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
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
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={`mailto:${c.email}`}
                className="text-sm uppercase tracking-label text-bone/80 transition-colors hover:text-bone"
              >
                {c.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2 text-[0.7rem] uppercase tracking-label text-bone/45 sm:items-end sm:text-right">
            <span>NOVUM</span>
            <span>Artists building the tools behind their art.</span>
            <span>music · visuals · performance · systems</span>
            <span>( EST. 2026 )</span>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-bone/15 pt-6 text-[0.7rem] uppercase tracking-label text-bone/50">
          <span>© 2026 NOVUM</span>
          <span>The next label is a lab.</span>
        </div>
      </div>
    </footer>
  );
}
