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
    names: "Michaela",
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
  {
    id: "kaylee-logan-2022",
    names: "Kaylee & Logan",
    weddingDate: "August 2022",
    quote:
      "Tabatha made my wedding floral visions a reality. She's so easy and nice to work with and listens to all of your ideas to help create the perfect bouquet/floral arrangements! I would recommend her to any bride looking for beautiful flowers for their special day!",
    rating: 5,
    featured: true,
  },
  {
    id: "emily-2019",
    names: "Emily",
    weddingDate: "June 2019",
    quote:
      "Tab is the best in the business! She was kind, patient, and understanding. She understands the vision and executes to absolute perfection. I never had to micro manage or any worries about how the florals would turn out. There were some hiccups along the way, but I NEVER knew they happened until way later time. Some things I did not have an opinion about or felt too overwhelmed to make decisions on and Tab just handled it and made executive decisions. If you need stunning florals and a seamless process, Tab is your woman! Couldn’t recommend enough.",
    rating: 5,
    featured: true,
  },
  {
    id: "dane-lisa-2025",
    names: "Dane & Lisa",
    weddingDate: "June 2025",
    quote:
      "Tabatha went above and beyond to bring our floral vision to life! She met with me in person several times to go over every detail and made the entire process so easy. She communicated with me throughout the planning process and was wonderful to work with. I highly recommend her! 😊",
    rating: 5,
    featured: true,
  },
  {
    id: "kennan-tristan-2021",
    names: "Kennan & Tristan",
    weddingDate: "May 2021",
    quote:
      "We couldn’t have been happier with our wedding flowers! From the very beginning, our florist Tab was kind, professional, and so easy to work with. Even with the challenges of planning around Mother’s Day and the flower shortages that come with one of the busiest floral weekends of the year, she went above and beyond to make everything absolutely beautiful. If you’re looking for a florist who is talented, creative, reliable, and genuinely cares about making your day special, I can’t recommend Tab enough. Thank you for making our wedding so beautiful despite all the challenges—we are so grateful!",
    rating: 5,
  },
];
