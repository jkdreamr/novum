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
- Display: **Space Grotesk** (variable, weights 300–700) → CSS var `--font-display`, Tailwind
  `font-display`. Big headings use `font-medium` (500).
- Mono: **Space Mono** (400/700 + italic) → CSS var `--font-mono`, Tailwind `font-mono`.
- Body default font is the mono; big editorial headings use `font-display`.
- Wired in `lib/fonts.ts`, applied on `<html>` in `app/layout.tsx`.
- `next/font` fetches the faces at build time and self-hosts them (needs network during build).

## Design tokens (`tailwind.config.ts`)
- Colors: `ink` #0A0A0A (bg), `bone` #EDE8DF (text), `accent` #C8FF5E (faded acid-lime, used
  sparingly — hover ticks + the inline media chip border).
- `tracking-label` = 0.18em for small uppercase labels; `ease-editorial` shared easing.

## Architecture
- `app/page.tsx` (client) is the orchestrator: inits Lenis via `useLenis()`, renders the
  Preloader / Nav / sections / Footer, and locks scroll (`html.is-locked` + Lenis stop) until
  the preloader hands off. No custom cursor — the native cursor is used everywhere.
- `hooks/useLenis.ts` keeps a single shared Lenis instance; `scrollToTarget()` / `scrollToTop()`
  let nav + back-to-top drive it (with a native-scroll fallback under reduced motion).
- Consistent page gutter everywhere: `px-6 sm:px-10 lg:px-16` (24/40/64px). Nav, all sections,
  and the footer share it so headlines + labels align to one left margin. The `Showreel` video
  is a deliberate full-bleed exception (its caption row keeps the gutter).
- EXACTLY three sections: `components/sections/{About,Team,Join}`. About = hero only — a PURE
  TYPE headline (no media embedded), flush left, framed by small mono labels. Team = condensed
  Joshua + Anna rows with a click-to-expand accordion (one open at a time, keyboard-accessible
  buttons w/ aria-expanded/aria-controls). Join = statement + four ways in + Apply + styled email
  + closing line. `Showreel` is a transition (not a section) between About and Team.
- Components: `Preloader`, `Nav`, `HoverLink` (doubled-text reveal; a/button/span), `Reveal`,
  `ReelVideo` (shared reel element), `Showreel` (clean full-bleed reel), `Footer`.
- `Preloader`: oversized mono counter pinned bottom-left ticking 00→100, a center word sequence
  (MUSIC → VISUALS → PERFORMANCE → SYSTEMS in mono, then a big display-face NOVUM as the finale),
  then a fast wipe-up reveal (~2s total, once per session). Reduced-motion skips it. An
  onAnimationComplete + 1s failsafe guarantee the overlay always lifts.
- Video: `public/novum-reel.mp4` (~1.4MB, 1280×720), played via `ReelVideo` ONLY in `Showreel` —
  a clean full-bleed band with the caption ABOVE it (never text over the footage). Always
  muted/loop/playsInline/autoPlay/preload, no controls; autoplay disabled under reduced-motion.
  `poster="/novum-reel-poster.jpg"` is referenced — ADD that file (not yet in repo); until then
  the video's first frame + the solid bg behind act as the fallback.
- `Reveal` is safe by construction: it renders plain VISIBLE text on the server / no-JS / first
  paint / reduced-motion, then (after mount, before paint) switches to an animated version that
  starts hidden and reveals when its OWN element scrolls into view. The hidden state is only
  opacity + a small offset/scale — it NEVER clips itself out of an overflow-hidden ancestor (the
  old `mask` variant did, which broke the IntersectionObserver and left every heading invisible).
  A 900ms failsafe guarantees content is shown even if the observer never fires.
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
