import { Instrument_Serif, Space_Mono } from 'next/font/google';

// Display face for the oversized editorial headings (high-fashion editorial serif).
// Instrument Serif ships a single weight (400) + italic — exactly what display use wants.
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
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
