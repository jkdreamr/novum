import type { Metadata } from 'next';
import { cormorant } from '@/lib/fonts';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { GSAPProvider } from '@/components/providers/GSAPProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Novum — A Creative Collective',
  description: 'A collective for art, thought, and vision.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=neue-montreal@300,400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GSAPProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
