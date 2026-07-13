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
| `NEXT_PUBLIC_FORMSPREE_REVIEWS_ENDPOINT` | Yes, for the Reviews form to send | A second, separate Formspree form endpoint for `/reviews/share` submissions. Without it, that form shows a friendly error instead of sending. |

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

## Reviews

`/reviews` displays wedding reviews and `/reviews/share` lets couples submit
new ones via a second Formspree form. Reviews are **not** auto-published —
submissions land in Tab's inbox, and approved ones get added by hand to
`src/data/reviews.ts` (capped at `MAX_REVIEWS = 100`). This keeps the whole
thing free (no database) and moderated (nothing goes live without review).

To add a review after Tab approves one, add an entry to the `reviews` array
in `src/data/reviews.ts`:

```ts
{
  id: "emily-jordan-2025",
  names: "Emily & Jordan",
  weddingDate: "September 2025",
  quote: "Working with Tab was the easiest part of wedding planning...",
  rating: 5,
  featured: true, // shows on the homepage strip (max 3 featured shown)
}
```

Never fabricate a quote — only add reviews couples actually submitted.

## Content TODOs

- About page bio copy (`src/app/about/page.tsx`)
- Services page package names/pricing (`src/data/services.ts`)
- Facebook page URL (`src/lib/site.ts` — `facebookUrl`)
- A real portrait photo at `public/images/about/tab-portrait.jpg`
- Google review link once the Business Profile is live (`src/lib/site.ts` — `googleReviewUrl`)
- First real reviews in `src/data/reviews.ts` (see [Reviews](#reviews) above)

## Manual Follow-Ups (not buildable by an agent)

- Second Formspree form for `/reviews/share` (free tier caps at 50 submissions/month — shared across all forms on the account, so keep an eye on volume once both forms are live)
- Google Business Profile setup + short review link
- DMARC DNS record for the domain (SPF/DKIM/MX are already set; add a `_dmarc` TXT record: `v=DMARC1; p=quarantine; rua=mailto:tab@allthingsfloralbytab.com`)
- Google Search Console verification + sitemap submission (`/sitemap.xml` is auto-generated)

## Deploy

Deployed via Vercel. Push to `main`, then connect/deploy the project through
Vercel and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in its environment variables.
