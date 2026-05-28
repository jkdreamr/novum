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
Cormorant Garamond via next/font/google supports weights: 300, 400, 500, 600, 700 (not 200).
CSS variable `--font-display` is set to Cormorant Garamond; the `fontWeight: 200` style values
in components are kept for editorial effect — they gracefully fall back to 300.

## 3D assets
- `public/models/bust.glb` — place a CC0 GLB bust here; procedural fallback renders automatically if missing.
- `public/fonts/cormorant_regular.json` — Three.js typeface JSON; GlassTextScene uses box geometry fallback since Text3D requires this.

## Deployment
- `vercel.json` is at project root
- Add `RESEND_API_KEY` to Vercel env vars when wiring email in `app/api/join/route.ts`
