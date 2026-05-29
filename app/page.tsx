'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import TeamSection from '@/components/team/TeamSection';
import JoinSection from '@/components/join/JoinSection';
import Footer from '@/components/shared/Footer';

const IntroSequence = dynamic(() => import('@/components/intro/IntroSequence'), { ssr: false });

type Stage = 'boot' | 'intro' | 'ready';

export default function Home() {
  const [stage, setStage] = useState<Stage>('boot');
  const [showCover, setShowCover] = useState(true);
  const coverRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Decide — once per session — whether to play the intro.
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const seen = sessionStorage.getItem('novum_intro_seen');
    if (seen) {
      const cover = coverRef.current;
      if (cover) {
        gsap.to(cover, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            setShowCover(false);
            setStage('ready');
            ScrollTrigger.refresh();
          },
        });
      } else {
        setShowCover(false);
        setStage('ready');
      }
    } else {
      setStage('intro');
    }
  }, []);

  // Safety net: never let a stalled intro trap the page behind the cover.
  useEffect(() => {
    if (stage !== 'intro') return;
    const id = setTimeout(() => {
      setShowCover(false);
      setStage('ready');
      ScrollTrigger.refresh();
    }, 9000);
    return () => clearTimeout(id);
  }, [stage]);

  // Lock scrolling until the page is ready to explore.
  useEffect(() => {
    const locked = stage !== 'ready';
    document.documentElement.classList.toggle('intro-lock', locked);
    if (locked) lenis?.stop();
    else lenis?.start();
    return () => { document.documentElement.classList.remove('intro-lock'); };
  }, [stage, lenis]);

  const handleIntroComplete = () => {
    setStage('ready');
    // Recompute scroll positions once the layout has settled (intro overlay gone).
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
  };

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <JoinSection />
        <Footer />
      </main>

      {/* Server-rendered black cover prevents any flash of content before the intro decides. */}
      {showCover && <div ref={coverRef} className="boot-cover" aria-hidden />}

      {stage === 'intro' && (
        <IntroSequence onReady={() => setShowCover(false)} onComplete={handleIntroComplete} />
      )}
    </>
  );
}
