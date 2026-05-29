import type { Metadata, Viewport } from 'next';
import { spaceGrotesk, spaceMono } from '@/lib/fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'NOVUM',
  description: 'Artists building the tools behind their art.',
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
