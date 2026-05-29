import Reveal from '@/components/Reveal';
import ReelVideo from '@/components/ReelVideo';

/**
 * Clean, separated showreel: full-bleed footage with the mono caption sitting in the gutter
 * ABOVE the frame — NO text laid over the video. Clips into view on scroll.
 */
export default function Showreel() {
  return (
    <section aria-label="Showreel" className="py-[clamp(4rem,10vw,8rem)]">
      {/* Caption row — aligned to the page gutter, above the footage (never over it). */}
      <div className="mb-6 flex items-center justify-between px-6 text-[0.7rem] uppercase tracking-label text-bone/50 sm:px-10 lg:px-16">
        <span>( REEL )</span>
        <span>NOVUM — 2026</span>
      </div>

      {/* Full-bleed footage, no overlaid text. Solid bg + grain is the load fallback. */}
      <Reveal variant="clip">
        <div className="relative aspect-video max-h-[88svh] w-full overflow-hidden bg-bone/[0.05]">
          <div className="reel-grain absolute inset-0 opacity-[0.05]" aria-hidden="true" />
          <ReelVideo
            className="absolute inset-0 h-full w-full object-cover"
            poster="/novum-reel-poster.jpg"
          />
        </div>
      </Reveal>
    </section>
  );
}
