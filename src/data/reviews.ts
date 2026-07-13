export type Review = {
  /** Stable slug, e.g. "emily-jordan-2025" — used as the React key. */
  id: string;
  /** How the couple wants to be credited, e.g. "Emily & Jordan". */
  names: string;
  /** Display-only, e.g. "September 2025". Not used for sorting. */
  weddingDate?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Show in the homepage "Kind Words" strip. */
  featured?: boolean;
};

// Hard cap so this file (and the free Git-based "backend") never grows
// unbounded — moderate new reviews in from src/app/reviews/share before
// adding them here, and retire an old one if this limit is ever hit.
export const MAX_REVIEWS = 100;

// TODO(Tab): Add real couple reviews here as they come in — from the
// /reviews/share form submissions (check email) or copied over from Google.
// Never fabricate a quote or attribute one to a couple who didn't give it.
export const reviews: Review[] = [
  {
    id: "michaela-tews-2018",
    names: "Michaela Tews",
    weddingDate: "August 2018",
    quote:
      "Tabatha did a beautiful job with our flowers! I wanted something simple and classic, but with a PNW forward feeling and she executed perfectly on my vision. I highly recommend her to any bride looking for someone that will over deliver on their dream wedding flowers 🤍",
    rating: 5,
    featured: true,
  },
  {
    id: "mackenzie-mason-2023",
    names: "Mackenzie & Mason",
    weddingDate: "September 2023",
    quote:
      "Our flowers were absolutely perfect, we opted for a gem tone color palette and chose difficult flowers to work with. Tab listened to our vision and worked within our budget to create the perfect bouquets, and arrangements. 10 out of 10 would recommend to anyone!!",
    rating: 5,
    featured: true,
  },
];
