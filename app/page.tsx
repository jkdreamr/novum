'use client';

import { useEffect, useState } from 'react';
import { useLenis, getLenis } from '@/hooks/useLenis';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import About from '@/components/sections/About';
import Showreel from '@/components/Showreel';
import Team from '@/components/sections/Team';
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

  // Hard safety net: the scroll lock can NEVER outlive this, even if the preloader's
  // onComplete somehow doesn't fire. Guarantees the page is scrollable on mobile.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 4000);
    return () => window.clearTimeout(t);
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
      <Nav />
      <main>
        <About />
        {/* Clean full-bleed reel — no text over the footage. */}
        <Showreel />
        <Team />
        <Join />
      </main>
      <Footer />
    </>
  );
}
