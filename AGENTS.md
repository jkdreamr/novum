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

## Fonts (next/font/google — no external CSS @import) + art-directed type system
- Six faces, all in `lib/fonts.ts` (`fontVariables`) applied on `<html>`. Tailwind families:
  `font-display` **Space Grotesk** (var `--font-display`), `font-mono` **Space Mono**
  (`--font-mono`, body default), `font-serif` **Instrument Serif** (`--font-serif`),
  `font-extended` **Syne** (`--font-extended`), `font-condensed` **Oswald** (`--font-condensed`),
  + Playfair Display italic (`--font-contrast`).
- Per-section type — three display voices, art-directed for obvious contrast:
  • **Space Grotesk** (grotesque, `font-display`): About hero, Join "JOIN / THE FIRST / CIRCLE",
    APPLY, "THE PEOPLE BUILDING IT.", the Statement drift words.
  • **Instrument Serif** (editorial serif, `font-serif`): the Statement headline, Join's four
    columns (ARTISTS/BUILDERS/SPONSORS/INVESTORS), and the Join closing "BUILD THE NEW MEDIUM."
  • **Syne** (wide extended, `font-extended`): the Team names ONLY (uniquely distinctive; accent
    on hover via `.team-name`).
  • Mono for all small labels; the preloader additionally cycles condensed/italic faces.

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

## NO VIDEO — pure typography + motion
The site has no `<video>` / reel / showreel anywhere (removed in pass 8). The dramatic moment is
type-driven (see `Statement`).

## Mobile-visibility guarantees (why the page can't go blank)
- Preloader has an UNCONDITIONAL hard dismiss (`HARD_DISMISS_MS = 5500`): a mount timeout that
  always sets `phase='gone'` (unmounts overlay) + `finish()` (hands off), regardless of
  rAF/animation. `page.tsx` also force-sets `ready` after 6s as a second backstop, so the scroll
  lock can never persist. The wipe has a 700ms onAnimationComplete failsafe too.
- `Reveal` can never leave content invisible: plain visible text on SSR/no-JS/first
  paint/reduced-motion; once mounted it reveals immediately if already in view (rect check — the
  above-the-fold guarantee), via IntersectionObserver as it scrolls in, and a 2.5s catch-all.
- Pinned/scroll-linked effects (`Statement`) run on DESKTOP only (`min-width:768px` +
  no-preference); mobile/SSR get a static stacked block. Only `100svh` is used (no `100vh`).
  `html`/`body` are `overflow-x:hidden`; the lock is plain `overflow:hidden`.
- Lenis is desktop-only (bails on `pointer: coarse` and reduced-motion) → native touch scroll.

## Layout + sections
- Consistent page gutter everywhere: `px-6 sm:px-10 lg:px-16` (24/40/64px).
- EXACTLY three sections: `components/sections/{About,Team,Join}`. About = hero only (pure-type
  headline, clip-mask line reveals). Team = NAMES ONLY (no images) — big editorial-serif names
  (italic+accent on hover) + a 3D icon each (desktop: WebGL glass; mobile/reduced/error: CSS-3D
  mark), role in mono, optional click-to-expand focus; desktop names parallax at different rates.
  Join = statement + four ways in (Syne) + Apply (clip-mask reveal) + styled email + a scroll-
  linked closing ("BUILD THE NEW MEDIUM." scales from the gutter + tracks letter-spacing out on
  desktop, static on mobile). `Statement` is a transition (not a section) between About and Team.
- Components: `Preloader`, `Nav`, `HoverLink`, `Reveal`, `Statement`, `Mark3D` (CSS-3D fallback),
  `GlassIcon` (lazy WebGL wrapper), `GlassScene` (R3F glass), `ErrorBoundary`, `Footer`. Desktop
  gating via `hooks/useDesktopMotion.ts` (`min-width:768px` + no-preference).
- NO video. WebGL is used ONLY for the desktop Team glass icons: `GlassIcon` lazy-mounts
  `GlassScene` (three / @react-three/fiber / drei) when in view, wrapped in `ErrorBoundary` whose
  fallback is the CSS `Mark3D`. Three.js is a separate lazy chunk (NOT in the initial bundle);
  never loaded on mobile (which renders the CSS mark).
- `GlassScene` glass: FULLY TRANSPARENT canvas (`gl={{ alpha:true }}` + `style background
  transparent` + `onCreated → gl.setClearColor(0x000000, 0)`; the container has no bg/rounded
  panel) so it floats on the ink page. `MeshTransmissionMaterial` (transmission 1, ior 1.45,
  thickness 1.4, roughness 0.12, chromaticAberration 0.04, clearcoat) lit by a LOCAL studio rig of
  drei `Lightformer`s inside `<Environment>` (NO `preset` — the HDRI CDN is network-blocked; with
  no env the glass renders black, which was the "black box" bug). Camera `fov 30 @ z 5.5` frames
  the gem/torus-knot with padding (not clipped); slow `useFrame` revolve. Tuned for fast first
  paint: `dpr={[1,2]}`, transmission `samples={6}`, `Environment resolution={128}`, lazy-mounted
  via IntersectionObserver `rootMargin: 300px` with the CSS `Mark3D` shown instantly as the
  placeholder while the canvas spins up.

## Preloader (`components/Preloader.tsx`) — timing
- Counter 0→100 over `COUNT_MS = 4000` (smoothstep, no sprint). The center word cycles every
  `WORD_MS = 580` through MUSIC/VISUALS/PERFORMANCE/SYSTEMS/SOUND, EACH in a different typeface
  (mono/serif/condensed/extended/italic-contrast), decoupled from the counter so each is readable.
  On 100 it lands on NOVUM (display face), holds `HOLD_MS = 550`, then wipes (0.55s). Once per
  session; reduced-motion skips; hard dismiss `HARD_DISMISS_MS = 5500`.

## Statement (`components/Statement.tsx`) — the bone "wash" beat
- The cream/white moment is back, made FLASH-PROOF. Instead of interpolating `backgroundColor`
  (which can overshoot to white and pops on fast scroll), a `bg-bone` overlay's OPACITY is eased
  by scrollYProgress (`useTransform [0,0.4,0.6,1]→[0,1,1,0]` with `ease: easeInOut`): opacity is
  clamped 0–1 (can't overshoot), bone is `#EDE8DF` (not white), and the long track spreads the
  in→hold→out over enough scroll to be gradual at any speed. The serif statement + ghost words use
  `mix-blend-difference` (inside an `isolate` stage) so they stay readable as the bg washes
  ink→bone→ink. Shared `WashStage`.
- Desktop + motion → PinnedStatement: pinned over `h-[185vh]` (the single dial — lengthen for an
  even gentler wash, shorten if it feels draggy) + the serif statement zooms. Mobile + motion →
  FlowStatement: NOT pinned; the wash maps to the section passing through the viewport (cheap,
  smooth on touch). Reduced-motion → StaticStatement (plain ink, serif headline, no wash).

## Mark3D (`components/Mark3D.tsx`) — the Team 3D icons
- Pure CSS 3D (no WebGL): a wireframe `cube` or a `gyro` of rings, `transform-style: preserve-3d`,
  auto-rotating via CSS keyframes; one accent edge. Sized via `--s`. Performant on every device;
  reduced-motion freezes it to a static wireframe. (Chose CSS-3D over react-three-fiber to avoid
  shipping untestable WebGL/bundle weight on mobile — swap-in R3F later if a heavier look is wanted.)

## Reveal (`components/Reveal.tsx`)
- `mask` = clip-mask line rise: an overflow-hidden outer frame (which carries the ref/observer, so
  it's never clipped out of view) with the content riding up inside it. `rise`/`clip`/`fade` are
  flat opacity + offset/scale. All reveal via the rect-check + observer + 2.5s catch-all, so they
  animate on scroll yet can never stay hidden.
- Motion CSS in `globals.css`: `.mark3d` (3D marks), `.outline-name` (Team hover outline), and the
  `.hover-link` doubled-text mask. All motion respects `prefers-reduced-motion` (static, visible).

## Placeholders to replace (search "PLACEHOLDER")
- Join email capture is styled-only (non-functional) — wire to an endpoint to enable.
- Address: `hello@novum.example` (Join Apply + Footer Email); Instagram `#` (Footer).

## Deployment
- `vercel.json` at repo root (framework nextjs, pnpm build/dev/install). No env vars required.
