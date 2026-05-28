'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

const IntroSequence = dynamic(() => import('@/components/intro/IntroSequence'), { ssr: false });
import HeroSection  from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import TeamSection  from '@/components/team/TeamSection';
import JoinSection  from '@/components/join/JoinSection';
import Footer       from '@/components/shared/Footer';

export default function Home() {
  const [showIntro, setShowIntro]   = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('novum_intro_seen');
    if (seen) {
      setShowIntro(false);
      // Page is immediately visible
      if (mainRef.current) gsap.set(mainRef.current, { opacity: 1 });
    } else {
      setShowIntro(true);
      if (mainRef.current) gsap.set(mainRef.current, { opacity: 0 });
    }
    setIntroReady(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Fade in main content
    gsap.to(mainRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  };

  if (!introReady) return null;

  return (
    <>
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      <div ref={mainRef}>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <JoinSection />
        <Footer />
      </div>
    </>
  );
}
