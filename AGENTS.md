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
- Components: `Preloader` (counter + cross-fading words + wipe), `Cursor` (spring dot +
  contextual label bubble from `data-cursor` value, e.g. "VIEW"/"APPLY"/"PLAY"), `Nav`,
  `HoverLink` (doubled-text reveal; renders a/button/span), `Reveal` (whileInView
  mask/clip/rise), `Marquee` (seamless infinite loop), `Footer`, and
  `components/sections/{About,Artists,Join}`.
- Motion CSS lives in `globals.css`: `.marquee-track`, `.reel-grain` (drifting showreel grain),
  `.scroll-arrow`, `chip-pulse`, and the `.hover-link` doubled-text mask.
- All motion respects `prefers-reduced-motion`: no custom cursor, no preloader animation,
  marquees freeze, and `Reveal` renders content statically.

## Placeholders to replace (search "PLACEHOLDER")
- About inline media chip (`components/sections/About.tsx`) — swap for real video/image.
- Showreel panel (`components/sections/About.tsx`) — drifting-grain block; drop in a muted
  looping `<video autoPlay muted loop playsInline>` (snippet in a comment there).
- Artist images (`components/sections/Artists.tsx`) — swap framed blocks for real `<Image>`.
- Join email capture is styled-only (non-functional) — wire to an endpoint to enable.
- Address: `hello@novum.example` (Join Apply + Footer Email); Instagram `#` (Footer).

## Deployment
- `vercel.json` at repo root (framework nextjs, pnpm build/dev/install). No env vars required.
