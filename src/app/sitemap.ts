import type { MetadataRoute } from "next";
import { navLinks } from "@/lib/site";

const BASE_URL = "https://allthingsfloralbytab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = navLinks
    .filter((link) => link.href !== "/reviews")
    .map((link) => ({
      url: `${BASE_URL}${link.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: link.href === "/" ? 1 : 0.8,
    }));

  return [
    ...staticRoutes,
    {
      url: `${BASE_URL}/inquire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
