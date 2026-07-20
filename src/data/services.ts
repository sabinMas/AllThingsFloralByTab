export type Service = {
  title: string;
  description: string;
};

// TODO(Tab): confirm final package names, descriptions, and whether pricing
// should be shown publicly. Placeholder copy below until real content lands.
export const pricingHighlights: Service[] = [
  { title: "Bridal Bouquets", description: "Starts at $225.00" },
  { title: "Bridesmaid Bouquets", description: "Starts at $100.00" },
  { title: "Centerpieces", description: "Starts at $75.00" },
];

export const services: Service[] = [
  {
    title: "Full-Service Wedding Florals",
    description:
      "End-to-end design for your entire day — bridal party bouquets, boutonnieres and corsages, ceremony arch and aisle decor, and reception centerpieces, all tailored to your color palette and vision.",
  },
  {
    title: "Elopement & Micro-Wedding",
    description:
      "A scaled-down floral experience for intimate celebrations — perfect for smaller guest counts, courthouse ceremonies, or destination elopements around the Pacific Northwest.",
  },
  {
    title: "Consultation & Design",
    description:
      "Not sure where to start? A one-on-one consultation to talk through your style, budget, and venue, with a custom floral proposal to match.",
  },
];
