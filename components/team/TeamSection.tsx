'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard from './TeamCard';
import SectionLabel from '@/components/shared/SectionLabel';

const MEMBERS = [
  {
    name: 'Joshua Koo',
    role: 'Artist',
    bio: 'Working at the boundary of form and concept, Joshua\'s practice spans installation, photography, and digital media.',
  },
  {
    name: 'Anna Matsumoto',
    role: 'Artist',
    bio: 'Anna\'s work investigates memory and material, drawing from both Eastern and Western visual traditions.',
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.team-card');
      if (!cards) return;
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-raised)',
        padding: '10rem 3rem',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel number="02" label="the team" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2.2rem, 4vw, 4rem)',
          color: 'var(--text-primary)',
          margin: '1.5rem 0 4rem',
          letterSpacing: '0.02em',
        }}>
          artists &amp; collaborators
        </h2>

        {/* Card grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}
          className="team-grid"
        >
          {MEMBERS.map(m => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
