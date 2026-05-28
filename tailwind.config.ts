import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['Neue Montreal', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
