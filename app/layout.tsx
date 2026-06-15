import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { fontVariables } from '@/lib/fonts';
import '@/app/globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novum-mu.vercel.app';
const DESCRIPTION =
  'NOVUM is an artist-founded creative technology company building the tools, releases, and systems for the next generation of music, visuals, and performance. The next label is a lab.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NOVUM — Artists building the tools behind their art',
    template: '%s — NOVUM',
  },
  description: DESCRIPTION,
  applicationName: 'NOVUM',
  keywords: [
    'NOVUM',
    'creative technology',
    'artist tools',
    'music technology',
    'creative lab',
    'record label',
    'rights',
    'AI for artists',
    'world-building',
  ],
  authors: [{ name: 'NOVUM' }],
  creator: 'NOVUM',
  publisher: 'NOVUM',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'NOVUM',
    title: 'NOVUM — Artists building the tools behind their art',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVUM — Artists building the tools behind their art',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        {/* Analytics-ready: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in env to enable. */}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
