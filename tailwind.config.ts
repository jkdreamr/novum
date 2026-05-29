import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // The whole palette: near-black ground, bone text, one restrained accent.
        ink: '#0A0A0A',
        bone: '#EDE8DF',
        // Faded acid-lime — used sparingly (hover ticks, the inline media chip border).
        accent: '#C8FF5E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
