# NOVUM — Website implementation notes

Dark-monochrome startup site built on the existing Next.js 14 (App Router) + Tailwind + Framer Motion + Lenis + R3F stack. Type-checked clean and `next build` passes (all 13 routes prerender). The only step that needs network is Google Fonts at build time, which Vercel reaches normally.

## What's in this build
- **Brand → dark monochrome.** Removed the acid-lime accent. Tokens: `ink #0A0A0A`, `surface #111317`, `graphite #2A2D34`, `steel #4A5159`, `muted #8A857B`, `bone #EDE8DF`. Focus rings / selection use bone for AA contrast.
- **Routes:** `/` (landing), `/manifesto`, `/about`, `/lab`, `/apply`, `/investors`, `/contact`.
- **Working contact + applications:** `ContactForm` (general / artist / investor) → `POST /api/contact`. The landing email-capture is wired too. Accessible labels, loading + error states, honeypot, and a guaranteed `mailto:novumcreate@gmail.com` fallback so nothing is ever a dead form.
- **SEO:** full metadata + title template, Open Graph + Twitter, `app/opengraph-image.tsx` (dynamic dark OG image — no asset needed), `sitemap.xml`, `robots.txt`, `app/icon.svg` favicon, theme color, skip-link.
- **Analytics-ready:** set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable Plausible (no dependency added). Swap for GA/Vercel Analytics if preferred.
- **Consistent nav/footer** across all pages; no placeholder emails or dead links (old `hello@novum.example` + dead Instagram removed).

## Environment variables (set in Vercel → Project → Settings → Environment Variables)
| Var | Required | Purpose | Example |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | for live email | Enables the form to send mail via Resend. Without it the form shows the mailto fallback. | `re_xxx` |
| `RESEND_FROM` | with Resend | Verified sender. Use Resend's test sender until your domain is verified. | `NOVUM <onboarding@resend.dev>` |
| `CONTACT_TO` | optional | Where submissions are delivered. | `novumcreate@gmail.com` (default) |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata/sitemap. | `https://novum-mu.vercel.app` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | Turns on Plausible analytics. | `novum-mu.vercel.app` |

To make the form send real email: create a free Resend account, add `RESEND_API_KEY` (+ `RESEND_FROM`), redeploy. Until then the form gracefully points people to `novumcreate@gmail.com`.

## Push + deploy
This repo is already connected to Vercel (`vercel.json` present), so a push to the default branch auto-deploys.

```bash
# from the project root
git add -A
git commit -m "Dark-monochrome site: full route set, working contact form, SEO, OG, sitemap"
git push origin main      # Vercel auto-deploys
```

If you prefer a manual deploy: `npm i -g vercel && vercel --prod`.

## Local development
```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (needs network for Google Fonts)
```
