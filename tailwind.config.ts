import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark monochrome system: near-black ground, bone text, graphite/steel dark tones.
        // No chromatic accent — emphasis is carried by contrast (bone) and weight.
        ink: '#0A0A0A',
        surface: '#111317',
        graphite: '#2A2D34',
        steel: '#4A5159',
        muted: '#8A857B',
        bone: '#EDE8DF',
        // "accent" kept as a token name for back-compat; mapped to bone (monochrome emphasis).
        accent: '#EDE8DF',
      },
      fontFamily: {
        // Art-directed type system: a grotesque (brand voice), an editorial serif (Team names),
        // and a wide/extended display (Join columns) — plus mono for all small labels.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        extended: ['var(--font-extended)', 'var(--font-display)', 'sans-serif'],
        condensed: ['var(--font-condensed)', 'var(--font-display)', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      transitionTimingFunction: {
        // Shared editorial ease used by reveals and the doubled-link slide.
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
