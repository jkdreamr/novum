'use client';

import type { CSSProperties } from 'react';

type MarqueeProps = {
  /** Text to scroll. Include a trailing separator (e.g. " · ") so repeats read seamlessly. */
  text: string;
  /** Seconds for one full loop. Lower = faster. */
  durationSec?: number;
  /** Scroll right-to-left (default) or reversed. */
  reverse?: boolean;
  className?: string;
};

// One half of the track: the phrase repeated enough times to exceed any viewport width.
function Half({ text }: { text: string }) {
  return (
    <span className="flex shrink-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="whitespace-nowrap">
          {text}
        </span>
      ))}
    </span>
  );
}

/**
 * Seamless infinite marquee. Two identical halves translate -50% on loop. Decorative, so the
 * whole band is aria-hidden. Under prefers-reduced-motion the global rule freezes the animation
 * (it renders as static text).
 */
export default function Marquee({
  text,
  durationSec = 32,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const style = {
    '--marquee-dur': `${durationSec}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as CSSProperties;

  return (
    <div aria-hidden="true" className={`w-full overflow-hidden ${className}`}>
      <div className="marquee-track" style={style}>
        <Half text={text} />
        <Half text={text} />
      </div>
    </div>
  );
}
