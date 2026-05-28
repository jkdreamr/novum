'use client';

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '14px',
        padding: '2.2rem',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 48px var(--glass-glow), inset 0 0 0 1px rgba(255,255,255,0.1)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--glass-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}
