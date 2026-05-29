'use client';

import { useEffect, useRef, useState } from 'react';

type ReelVideoProps = {
  className?: string;
  /** Optional poster image path (a still). Falls back to the video's first frame if omitted. */
  poster?: string;
};

/**
 * The NOVUM reel at /public/novum-reel.mp4 — muted, looping, inline, no controls.
 * Autoplays unless prefers-reduced-motion (then it shows the still first frame / poster).
 * A solid fallback sits behind it (provided by the parent container's bg) so a failed load
 * still shows a clean block rather than nothing.
 */
export default function ReelVideo({ className = '', poster }: ReelVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches && ref.current) ref.current.pause();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src="/novum-reel.mp4"
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
