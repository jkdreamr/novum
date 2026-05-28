'use client';
import GlassCard from '@/components/shared/GlassCard';

interface Props {
  name: string;
  role: string;
  bio: string;
}

export default function TeamCard({ name, role, bio }: Props) {
  return (
    <div className="team-card">
      <GlassCard>
        {/* Photo placeholder — circle with dashed border */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            photo<br />coming
          </span>
        </div>

        {/* Role badge */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'var(--accent-gold-dim)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.6rem',
        }}>
          {role}
        </span>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: '1.8rem',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          letterSpacing: '0.01em',
        }}>
          {name}
        </h3>

        {/* Bio */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '0.9rem',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
        }}>
          {bio}
        </p>
      </GlassCard>
    </div>
  );
}
