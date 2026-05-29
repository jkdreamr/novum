import type { Metadata, Viewport } from 'next';
import { instrumentSerif, spaceMono } from '@/lib/fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'NOVUM',
  description: 'A collective of artists who build the tools they create with.',
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
