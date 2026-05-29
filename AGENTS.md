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
  Preloader/Cursor/Nav/sections/Footer, and locks scroll (`html.is-locked` + Lenis stop)
  until the preloader hands off.
- `hooks/useLenis.ts` keeps a single shared Lenis instance; `scrollToTarget()` / `scrollToTop()`
  let nav + back-to-top drive it (with a native-scroll fallback under reduced motion).
- EXACTLY three sections: `components/sections/{About,Team,Join}` (About = hero only; Team =
  Joshua + Anna rows; Join = statement + four ways in + Apply + styled email + closing line).
- Components: `Preloader` (counter + cross-fading words + wipe), `Cursor` (small fast-tracking
  ring, stiff spring, no label bubble), `Nav`, `HoverLink` (doubled-text reveal; renders
  a/button/span), `Reveal`, `Marquee` (one thin divider between About/Team), `Footer`.
- `Reveal` is safe by construction: it renders plain VISIBLE text on the server / no-JS / first
  paint / reduced-motion, then (after mount, before paint) switches to an animated version that
  starts hidden and reveals when its OWN element scrolls into view. The hidden state is only
  opacity + a small offset/scale — it NEVER clips itself out of an overflow-hidden ancestor (the
  old `mask` variant did, which broke the IntersectionObserver and left every heading invisible).
  A 900ms failsafe guarantees content is shown even if the observer never fires.
- Motion CSS lives in `globals.css`: `.marquee-track`, `.reel-grain` (placeholder media grain),
  `.scroll-arrow`, and the `.hover-link` doubled-text mask.
- All motion respects `prefers-reduced-motion`: no custom cursor, no preloader animation,
  marquee freezes, and `Reveal` renders content statically.

## Placeholders to replace (search "PLACEHOLDER")
- Team images (`components/sections/Team.tsx`) — swap framed grain blocks for real `<Image>`.
- Join email capture is styled-only (non-functional) — wire to an endpoint to enable.
- Address: `hello@novum.example` (Join Apply + Footer Email); Instagram `#` (Footer).

## Deployment
- `vercel.json` at repo root (framework nextjs, pnpm build/dev/install). No env vars required.
