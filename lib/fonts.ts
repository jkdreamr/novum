import {
  Space_Grotesk,
  Space_Mono,
  Instrument_Serif,
  Oswald,
  Syne,
  Playfair_Display,
} from 'next/font/google';

// Primary display face — the tight modern grotesque used for all big editorial headings.
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Monospace for all labels, UI, parenthetical micro-copy and subtext.
export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});

// --- Extra faces, used only by the preloader's per-word font cycling ---
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-condensed',
  display: 'swap',
});

export const syne = Syne({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-extended',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  style: ['italic'],
  variable: '--font-contrast',
  display: 'swap',
});

// All font CSS variables, applied together on <html>.
export const fontVariables = [
  spaceGrotesk.variable,
  spaceMono.variable,
  instrumentSerif.variable,
  oswald.variable,
  syne.variable,
  playfair.variable,
].join(' ');
