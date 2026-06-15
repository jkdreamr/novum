import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export function PageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-screen pt-[clamp(7rem,14vw,10rem)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <header className="border-b border-bone/15 pb-[clamp(2.5rem,6vw,4.5rem)]">
            <p className="mb-6 text-[0.7rem] uppercase tracking-label text-muted">{eyebrow}</p>
            <h1 className="max-w-5xl font-display text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-tight">
              {title}
            </h1>
            {lede ? (
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">{lede}</p>
            ) : null}
          </header>
          <div className="py-[clamp(2.5rem,6vw,4.5rem)]">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function Section({
  label,
  title,
  children,
}: {
  label: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-x-12 gap-y-6 border-t border-bone/12 py-[clamp(2rem,4vw,3.25rem)] md:grid-cols-[200px_1fr]">
      <div className="flex items-start">
        <span className="text-[0.7rem] uppercase tracking-label text-muted">{label}</span>
      </div>
      <div className="max-w-3xl">
        {title ? (
          <h2 className="mb-5 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {title}
          </h2>
        ) : null}
        <div className="space-y-4 text-bone/75 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-bone/12 sm:grid-cols-2">{children}</div>;
}

export function Cell({ k, title, children }: { k?: string; title: string; children?: ReactNode }) {
  return (
    <div className="bg-ink p-6 sm:p-7">
      {k ? <span className="block text-[0.7rem] uppercase tracking-label text-muted">{k}</span> : null}
      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{title}</h3>
      {children ? <p className="mt-2 text-sm leading-relaxed text-bone/65">{children}</p> : null}
    </div>
  );
}
