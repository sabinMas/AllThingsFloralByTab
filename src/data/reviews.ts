import reviewsData from "./reviews.json";

export type Review = {
  /** Stable slug, e.g. "emily-jordan-2025" — used as the React key. */
  id: string;
  /** How the couple wants to be credited, e.g. "Emily & Jordan". */
  names: string;
  /** Display-only, e.g. "September 2025". Not used for sorting. */
  weddingDate?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

// Hard cap so this file (and the free Git-based "backend") never grows
// unbounded — moderate new reviews in from src/app/reviews/share before
// adding them here, and retire an old one if this limit is ever hit.
export const MAX_REVIEWS = 100;

// TODO(Tab): Add real couple reviews here as they come in — from the
// /reviews/share form submissions (check email) or copied over from Google.
// Never fabricate a quote or attribute one to a couple who didn't give it.
export const reviews: Review[] = reviewsData as Review[];
