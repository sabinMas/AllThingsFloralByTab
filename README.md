# All Things Floral by Tab

Mobile-first wedding florist website for Tab (Buckley, WA), built with Next.js
(App Router) + Tailwind CSS.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the real Formspree endpoint
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Yes, for the Inquire form to send | Formspree form endpoint (e.g. `https://formspree.io/f/xxxxxxx`) from a free [Formspree](https://formspree.io) account. Without it, the Inquire form shows a friendly error instead of sending. |

Set this in `.env.local` for local dev, and in the Vercel project's
Environment Variables (Production + Preview) for deployment.

## Adding Real Wedding Photos

The portfolio/home gallery reads whatever is in `public/images/gallery/`
(`src/lib/gallery.ts`), falling back to placeholder art if that folder is
empty. To add curated photos:

1. Drop final, web-ready `.jpg`/`.png`/`.webp` files into `public/images/gallery/`.
2. That's it — no code changes needed, the gallery picks them up automatically.

A one-off processing pipeline (`scripts/process-photos.mjs`) exists for
turning a raw camera-roll export into web-ready files: it extracts a zip into
`_photo-staging/raw/`, converts HEIC to JPEG, resizes/compresses everything,
and builds `_photo-staging/contact-sheet.html` so photos can be reviewed
before picking the final set for `public/images/gallery/`. `_photo-staging/`
is gitignored — it's a local working directory, not a repo asset.

## Adding the Real Logo

Two brand logo files (square mark + wide banner) still need to be saved to:
- `public/images/logo/logo-square.png`
- `public/images/logo/logo-banner.png`

Once present, the Hero component automatically switches from the text
wordmark to the real banner logo. After adding them, re-sample the brand
colors in `src/app/globals.css` (`--color-blush`, `--color-sage`,
`--color-lavender`, etc.) from the actual artwork.

## Content TODOs

- About page bio copy (`src/app/about/page.tsx`)
- Services page package names/pricing (`src/data/services.ts`)
- Facebook page URL (`src/lib/site.ts` — `facebookUrl`)
- A real portrait photo at `public/images/about/tab-portrait.jpg`

## Manual Follow-Ups (not buildable by an agent)

- Formspree account + form creation (free tier caps at 50 submissions/month)
- Custom domain purchase
- Google Workspace business email signup

## Deploy

Deployed via Vercel. Push to `main`, then connect/deploy the project through
Vercel and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in its environment variables.
