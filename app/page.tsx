'use client';

import { useEffect, useState } from 'react';
import { useLenis, getLenis } from '@/hooks/useLenis';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import About from '@/components/sections/About';
import ScrollExpand from '@/components/ScrollExpand';
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
        {/* Scroll-linked expand showreel — the dramatic transition into Team. */}
        <ScrollExpand />
        <Team />
        <Join />
      </main>
      <Footer />
    </>
  );
}
