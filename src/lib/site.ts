export const siteConfig = {
  name: "All Things Floral by Tab",
  location: "Buckley, WA",
  serviceArea: "serving the Pacific Northwest",
  instagramUrl: "https://www.instagram.com/allthingsfloralbytab/",
  instagramHandle: "@allthingsfloralbytab",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591190619034",
  // TODO(Tab): once the Google Business Profile is live, paste its short
  // review link here (Business Profile > Ask for reviews > Get more reviews).
  googleReviewUrl: "",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
] as const;
