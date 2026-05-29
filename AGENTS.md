# NOVUM — Project Notes

NOVUM is a single-page editorial site for a label/collective/creative-lab of artists building
the tools behind their art. Dense, mono-flavored, oversized grotesque typography; adcker-style
preloader, doubled-text hover links, contextual custom cursor, marquees, and smooth scroll.
Tagline: "Artists building the tools behind their art." Copy is sourced from the official deck.

## Stack
- Next.js 14.2.5 (App Router), TypeScript, Tailwind CSS
- `lenis` 1.1.14 — smooth scroll (NOTE: package is `lenis`, not `@studio-freight/lenis`)
- `framer-motion` 11.3.19 — reveal/mask animations + custom cursor spring
- No backend, no 3D, no GSAP. The page is static / SSG-friendly.

## Package manager
`pnpm` (v10.x) is on PATH at `/opt/node22/bin/pnpm`.

## Commands
- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`

## Fonts (next/font/google — no external CSS @import)
- Display: **Space Grotesk** (variable) → `--font-display`, Tailwind `font-display`. Headings
  use `font-medium`. Mono: **Space Mono** → `--font-mono`, Tailwind `font-mono` (also the body
  default).
- Four extra faces, loaded ONLY for the preloader's per-word font cycling: **Instrument Serif**
  (`--font-serif`), **Oswald** (`--font-condensed`), **Syne** (`--font-extended`), **Playfair
  Display** italic (`--font-contrast`).
- All six are wired in `lib/fonts.ts` (exported as `fontVariables`) and applied together on
  `<html>` in `app/layout.tsx`. `next/font` fetches + self-hosts at build time (needs network).

## Design tokens (`tailwind.config.ts`)
- Colors: `ink` #0A0A0A (bg), `bone` #EDE8DF (text), `accent` #C8FF5E (faded acid-lime, used
  sparingly — hover ticks + the inline media chip border).
- `tracking-label` = 0.18em for small uppercase labels; `ease-editorial` shared easing.

## Architecture
- `app/page.tsx` (client) is the orchestrator: renders Preloader / Nav / sections / Footer and
  locks scroll (`html.is-locked`) until the preloader hands off. No custom cursor — native
  cursor everywhere.
- `hooks/useLenis.ts` keeps a single shared Lenis instance for SMOOTH scroll on desktop only —
  it bails out under reduced-motion AND on touch devices (`pointer: coarse`), so phones use
  native scroll (no smoothing to stutter or trap). `scrollToTarget()` / `scrollToTop()` fall
  back to native `scrollIntoView` / `scrollTo` when there's no Lenis instance.

## Mobile-visibility guarantees (why the page can't go blank)
- Preloader has an UNCONDITIONAL hard dismiss (`HARD_DISMISS_MS = 3500`): a mount timeout that
  always sets `phase='gone'` (unmounts the overlay) + `finish()` (hands off), regardless of
  rAF/animation. Plus `page.tsx` force-sets `ready` after 4s as a second backstop, so the scroll
  lock can never persist. The wipe also has a 700ms onAnimationComplete failsafe.
- `Reveal` can never leave content invisible: it renders plain visible text on SSR/no-JS/first
  paint/reduced-motion; once mounted it reveals immediately if the element is already in view
  (rect check — the above-the-fold guarantee), via IntersectionObserver as it scrolls in, and a
  2.5s catch-all otherwise.
- `Showreel` only pins/scroll-links on desktop (`min-width:768px` + no-preference); mobile gets a
  stacked, non-pinned composition. About uses `min-h-[100svh]` (not `vh`). `html`/`body` are
  `overflow-x:hidden`; the lock is plain `overflow:hidden` (no iOS-finicky height pinning).
- Consistent page gutter everywhere: `px-6 sm:px-10 lg:px-16` (24/40/64px). Nav, all sections,
  and the footer share it so headlines + labels align to one left margin.
- EXACTLY three sections: `components/sections/{About,Team,Join}`. About = hero only — a PURE
  TYPE headline (no media embedded), flush left, framed by small mono labels. Team = condensed
  Joshua + Anna rows with a click-to-expand accordion (one open at a time, keyboard-accessible
  buttons w/ aria-expanded/aria-controls). Join = statement + four ways in + Apply + styled email
  + closing line. `Showreel` is a transition (not a section) between About and Team.
- Components: `Preloader`, `Nav`, `HoverLink` (doubled-text reveal; a/button/span), `Reveal`,
  `ReelVideo` (shared reel element), `Showreel` (type+video composition), `Footer`.
- `Preloader`: oversized mono counter pinned bottom-left ticking 00→100; a center word that
  cycles MUSIC → VISUALS → PERFORMANCE → SYSTEMS → SOUND → NOVUM with EACH word in a DIFFERENT
  typeface (mono / serif / condensed / extended / italic-contrast), landing on NOVUM in the
  display face; then a fast wipe-up (~2s, once per session). Reduced-motion skips it;
  onAnimationComplete + 1s failsafe always lift the overlay.
- `Showreel` (the video moment) is composed WITH big type, never a bare screen. Desktop +
  motion-OK → a pinned, scroll-LINKED expand (`useScroll`/`useTransform`, raw): the reel grows
  from a small jewel toward full-bleed while the "BUILD THE NEW MEDIUM" headline parallaxes past
  via mix-blend-difference. Mobile / reduced-motion / SSR → a stacked composition (headline +
  framed reel) that reveals on scroll, no pinning (smooth on phones). Switch is mount-detected
  via matchMedia `(min-width:768px) and (prefers-reduced-motion:no-preference)`.
- Video: `public/novum-reel.mp4` (~1.4MB), via `ReelVideo` in `Showreel` only. muted / loop /
  playsInline / autoPlay / `preload="metadata"` (iOS inline) / no controls; autoplay off under
  reduced-motion. `poster="/novum-reel-poster.jpg"` is referenced — ADD that file (not in repo
  yet); meanwhile the first frame + solid bg are the fallback.
- `Reveal` is safe by construction: plain VISIBLE text on server / no-JS / first paint /
  reduced-motion, then (after mount, before paint) an animated version that starts hidden and
  reveals when its OWN element enters view (IntersectionObserver, `rootMargin -10%` so it fires
  as it scrolls in). Hidden state is opacity + a small offset only (never clipped out of view).
  NOTE: no time-based failsafe — that pre-revealed off-screen content and killed the scroll
  reveal; the observer is reliable because the element is never clipped.
- Motion CSS lives in `globals.css`: `.reel-grain` (placeholder media grain) and the
  `.hover-link` doubled-text mask.
- All motion respects `prefers-reduced-motion`: no preloader animation, no video autoplay, and
  `Reveal` renders content statically.

## Placeholders to replace (search "PLACEHOLDER")
- `public/novum-reel-poster.jpg` — NOT in the repo yet; `Showreel` references it as the video
  poster. Add a still (e.g. a frame of the reel) so the poster/fallback shows before play.
- Team thumbnails + expanded images (`components/sections/Team.tsx`) — swap grain blocks for
  real photos.
- Join email capture is styled-only (non-functional) — wire to an endpoint to enable.
- Address: `hello@novum.example` (Join Apply + Footer Email); Instagram `#` (Footer).

## Deployment
- `vercel.json` at repo root (framework nextjs, pnpm build/dev/install). No env vars required.
