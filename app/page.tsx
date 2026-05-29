'use client';

import { useEffect, useState } from 'react';
import { useLenis, getLenis } from '@/hooks/useLenis';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import About from '@/components/sections/About';
import Statement from '@/components/Statement';
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

  // Hard safety net beyond the preloader's own 5.5s dismiss: the scroll lock can NEVER outlive
  // this, even if the preloader's onComplete somehow doesn't fire. Guarantees mobile scrolls.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 6000);
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
        {/* Dramatic type beat — pinned invert/zoom on desktop, static contrast block on mobile. */}
        <Statement />
        <Team />
        <Join />
      </main>
      <Footer />
    </>
  );
}
