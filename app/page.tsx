'use client';

import { useEffect, useState } from 'react';
import { useLenis, getLenis } from '@/hooks/useLenis';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Marquee from '@/components/Marquee';
import About from '@/components/sections/About';
import Artists from '@/components/sections/Artists';
import Join from '@/components/sections/Join';
import Footer from '@/components/Footer';

export default function Page() {
  useLenis();
  const [ready, setReady] = useState(false);

  // Always start at the top on a fresh load so the preloader reveals the hero, not a
  // restored scroll position.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Lock scrolling (class + Lenis) until the preloader hands off.
  useEffect(() => {
    const root = document.documentElement;
    if (ready) {
      root.classList.remove('is-locked');
      getLenis()?.start();
    } else {
      root.classList.add('is-locked');
      getLenis()?.stop();
    }
  }, [ready]);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main>
        <About />
        <Marquee
          text="BUILD THE NEW MEDIUM · THE ARTIST IS THE STUDIO · TOOLS BECOME THE PLATFORM · CULTURE COMPOUNDS · "
          durationSec={28}
          className="border-y border-bone/15 py-5 font-display text-[clamp(1.75rem,6vw,4.5rem)] font-medium uppercase tracking-[-0.02em] text-bone"
        />
        <Artists />
        <Join />
      </main>
      <Footer />
    </>
  );
}
