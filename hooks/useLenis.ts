'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// A single shared Lenis instance. Nav links and the footer's back-to-top reach it
// through scrollToTarget() / scrollToTop() rather than threading a ref everywhere.
let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/** Smooth-scroll to a CSS selector (e.g. "#artists"). Falls back to native scroll
 *  when Lenis is absent (reduced-motion, or before init). */
export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: 0 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/** Initialise Lenis once, drive it with a single RAF loop, and tear it down on
 *  unmount. Call this from one always-mounted client component (the page root). */
export function useLenis() {
  useEffect(() => {
    // Respect reduced-motion, and use NATIVE scroll on touch devices — Lenis smoothing on
    // touch can stutter or trap mobile scroll. scrollToTarget/scrollToTop fall back to native
    // when there's no Lenis instance, so nav + back-to-top still work.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis = instance;

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);
}
