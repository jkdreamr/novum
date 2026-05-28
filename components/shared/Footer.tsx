export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '4rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--bg-base)',
    }}
    className="footer-wrap"
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 200,
        fontSize: '1.5rem',
        letterSpacing: '0.2em',
        color: 'var(--text-primary)',
      }}>
        novum
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        color: 'var(--text-muted)',
      }}>
        © 2024 Novum. All rights reserved.
      </div>
      {/* Instagram icon */}
      <a
        href="#"
        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        aria-label="Instagram"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      </a>

      <style>{`
        @media (max-width: 560px) {
          .footer-wrap { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
