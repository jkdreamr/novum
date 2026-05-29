'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

type Member = {
  index: string;
  name: string;
  role: string;
  focus: string;
};

const TEAM: Member[] = [
  {
    index: '01',
    name: 'JOSHUA KOO',
    role: 'Artist / Producer / Builder',
    focus: 'AI-assisted systems for recording, release strategy, and world-building.',
  },
  {
    index: '02',
    name: 'ANNA MATSUMOTO',
    role: 'Creative Technologist / HCI Researcher',
    focus: 'Interfaces across sound, movement, touch, and visual media.',
  },
];

function MemberRow({
  member,
  open,
  onToggle,
}: {
  member: Member;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `team-panel-${member.index}`;
  return (
    <li className="border-t border-bone/15 last:border-b">
      {/* Resting header — compact, click to expand. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full cursor-pointer items-center gap-5 py-6 text-left"
      >
        <span className="shrink-0 text-[0.7rem] uppercase tracking-label text-bone/45 transition-colors duration-300 group-hover:text-accent">
          ( {member.index} )
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="truncate font-display font-medium uppercase leading-none tracking-[-0.03em] text-bone text-[clamp(1.6rem,5vw,3.25rem)]">
            {member.name}
          </span>
          <span className="text-[0.7rem] uppercase tracking-label text-bone/55">{member.role}</span>
        </span>

        {/* Thumbnail (PLACEHOLDER — swap for a real photo). */}
        <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden border border-bone/15 bg-bone/[0.05] sm:block">
          <span className="reel-grain absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        </span>

        <span className="shrink-0 text-[0.7rem] uppercase tracking-label text-bone/40 transition-colors duration-300 group-hover:text-bone/70">
          {open ? '( Close )' : '( Expand )'}
        </span>
      </button>

      {/* Expanding panel — one open at a time. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-12 md:gap-8">
              {/* Larger image (PLACEHOLDER). */}
              <div className="relative col-span-1 aspect-[4/3] overflow-hidden border border-bone/15 bg-bone/[0.04] md:col-span-5">
                <div className="reel-grain absolute inset-0 opacity-[0.05]" />
                <span className="absolute bottom-3 left-3 text-[0.6rem] uppercase tracking-label text-bone/40">
                  ( {member.index} / Image )
                </span>
              </div>
              {/* Focus blurb */}
              <div className="col-span-1 md:col-span-7">
                <p className="max-w-[44ch] text-xs uppercase leading-relaxed tracking-label text-bone/60">
                  {member.focus}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Team() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="team" className="px-6 py-[clamp(6rem,12vw,11rem)] sm:px-10 lg:px-16">
      {/* Section header */}
      <div className="mb-[clamp(2.5rem,6vw,5rem)] grid grid-cols-12 gap-y-6">
        <span className="col-span-12 text-[0.7rem] uppercase tracking-label text-bone/50 md:col-span-3">
          ( 02 / TEAM )
        </span>
        <div className="col-span-12 flex items-baseline justify-between gap-6 md:col-span-9">
          <h2 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-bone text-[clamp(1.5rem,4vw,2.75rem)]">
            <Reveal variant="rise">THE PEOPLE BUILDING IT.</Reveal>
          </h2>
          <span className="shrink-0 text-[0.7rem] uppercase tracking-label text-bone/40">( Click me )</span>
        </div>
      </div>

      <ul>
        {TEAM.map((m) => (
          <MemberRow
            key={m.index}
            member={m}
            open={open === m.index}
            onToggle={() => setOpen((cur) => (cur === m.index ? null : m.index))}
          />
        ))}
      </ul>
    </section>
  );
}
