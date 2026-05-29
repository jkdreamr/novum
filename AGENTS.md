# Novum — Project Notes

## Stack
- Next.js 14.2.5, TypeScript, Tailwind CSS
- Three.js 0.165.0 + @react-three/fiber 8.16.8 + @react-three/drei 9.105.0
- GSAP 3.12.5 (ScrollTrigger)
- lenis 1.1.14 (smooth scroll — NOTE: use `lenis` not `@studio-freight/lenis`)
- react-hook-form 7.52.1 + zod 3.23.8

## Package manager
Use `~/.local/bin/pnpm` (pnpm 9.15.0 installed locally — system pnpm is broken via corepack)

## Commands
- Dev: `~/.local/bin/pnpm dev`
- Build: `~/.local/bin/pnpm build`
- Install: `~/.local/bin/pnpm install`

## Font note
Cormorant Garamond via next/font/google supports weights: 300, 400, 500 (we load 300/400/500).
`next/font` only exposes the loaded face through the CSS variable `--font-cormorant`, so
`--font-display` in `globals.css` references `var(--font-cormorant)` (NOT the literal family name,
which would silently fall back to Georgia). Display headings use weight 300 (the lightest loaded).

## 3D assets / rendering notes
- `public/fonts/serif_regular.typeface.json` — Three.js typeface JSON (Droid Serif). `GlassTextScene`
  uses `Text3D` + `MeshTransmissionMaterial` for real extruded glass letterforms.
- `public/models/bust.glb` — optional. Drop a CC0 GLB bust here and set `BUST_MODEL_URL` in
  `PhilosopherScene.tsx` to `/models/bust.glb`. By default an elegant sculptural fallback renders
  (no network 404 for a missing file).
- drei `Environment preset="..."` is NOT used — its HDRI CDN is blocked by the network policy.
  All scenes build lighting from `<Environment><Lightformer/></Environment>` (no runtime fetch).
- All WebGL scenes are wrapped in `ErrorBoundary` so a GPU/context failure can never white-screen the page.

## Intro / scroll flow
- `app/page.tsx` runs a `boot → intro → ready` state machine. A server-rendered `.boot-cover`
  prevents content flash; scrolling is locked (`html.intro-lock` + Lenis `stop()`) until `ready`.
- `ScrollTrigger.refresh()` is called once the intro overlay unmounts so scroll positions are correct.
- Lenis instance is exposed via `useLenis()` from `SmoothScrollProvider`.

## Deployment
- `vercel.json` is at project root
- Add `RESEND_API_KEY` to Vercel env vars when wiring email in `app/api/join/route.ts`
