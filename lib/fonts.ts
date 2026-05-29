import { Space_Grotesk, Space_Mono } from 'next/font/google';

// Display face for the oversized editorial headings — a tight modern grotesque
// (adcker / Helvetica-Now register). Loaded as a variable font so 400–700 are all available.
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
