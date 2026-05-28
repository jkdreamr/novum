export default function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>
        {number} —
      </span>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'var(--accent-gold-dim)',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}
