'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Reveal from '@/components/Reveal';
import Mark3D from '@/components/Mark3D';
import GlassIcon from '@/components/GlassIcon';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

type Member = {
  index: string;
  name: string;
  role: string;
  focus: string;
  glass: 'gem' | 'knot';
  mark: 'cube' | 'gyro';
};

const TEAM: Member[] = [
  {
    index: '01',
    name: 'JOSHUA KOO',
    role: 'Artist / Producer / Builder',
    focus: 'AI-assisted systems for recording, release strategy, and world-building.',
    glass: 'gem',
    mark: 'cube',
  },
  {
    index: '02',
    name: 'ANNA MATSUMOTO',
    role: 'Creative Technologist / HCI Researcher',
    focus: 'Interfaces across sound, movement, touch, and visual media.',
    glass: 'knot',
    mark: 'gyro',
  },
];

const ICON_SIZE = 'clamp(3.5rem,10vw,8rem)';

function MemberRow({
  member,
  open,
  onToggle,
  nameY,
  desktop,
}: {
  member: Member;
  open: boolean;
  onToggle: () => void;
  nameY?: MotionValue<number>;
  desktop: boolean;
}) {
  const panelId = `team-panel-${member.index}`;
  return (
    <li className="group border-t border-bone/15 last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="block w-full cursor-pointer py-[clamp(2rem,5vw,3.5rem)] text-left"
      >
        <div className="mb-5 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-label text-bone/45">
          <span>
            <span className="transition-colors duration-300 group-hover:text-accent">
              ( {member.index} )
            </span>
            <span className="mx-3 text-bone/25">/</span>
            {member.role}
          </span>
          <span className="shrink-0 transition-colors duration-300 group-hover:text-bone/70">
            {open ? '( Close )' : '( Expand )'}
          </span>
        </div>

        {/* Big editorial-serif name + the glass (desktop) / CSS-3D (mobile) icon. */}
        <div className="flex items-center justify-between gap-5">
          <motion.h3
            style={{ y: nameY }}
            className="team-name min-w-0 font-extended font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.85rem,8.5vw,5.75rem)]"
          >
            {member.name}
          </motion.h3>
          {desktop ? (
            <GlassIcon shape={member.glass} fallback={member.mark} size={ICON_SIZE} className="shrink-0" />
          ) : (
            <Mark3D shape={member.mark} size={ICON_SIZE} className="shrink-0" />
          )}
        </div>
      </button>

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
            <p className="max-w-[48ch] pb-8 text-xs uppercase leading-relaxed tracking-label text-bone/55">
              {member.focus}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Team() {
  const desktop = useDesktopMotion();
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallax = [y1, y2];

  return (
    <section id="team" ref={ref} className="px-6 py-[clamp(6rem,12vw,11rem)] sm:px-10 lg:px-16">
      <div className="mb-[clamp(2.5rem,6vw,5rem)] grid grid-cols-12 gap-y-6">
        <span className="col-span-12 text-[0.7rem] uppercase tracking-label text-bone/50 md:col-span-3">
          ( 02 / TEAM )
        </span>
        <div className="col-span-12 flex items-baseline justify-between gap-6 md:col-span-9">
          <h2 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-bone text-[clamp(1.5rem,4vw,2.75rem)]">
            <Reveal variant="mask">THE PEOPLE BUILDING IT.</Reveal>
          </h2>
          <span className="shrink-0 text-[0.7rem] uppercase tracking-label text-bone/40">( Click me )</span>
        </div>
      </div>

      <ul>
        {TEAM.map((m, i) => (
          <MemberRow
            key={m.index}
            member={m}
            open={open === m.index}
            onToggle={() => setOpen((cur) => (cur === m.index ? null : m.index))}
            nameY={desktop ? parallax[i] : undefined}
            desktop={desktop}
          />
        ))}
      </ul>
    </section>
  );
}
