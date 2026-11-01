import type { MetadataRoute } from "next";
import { ALL_SERVICE_DETAILS } from "@/data/serviceDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tadiks-cleaning.de";
  const lastModified = new Date("2026-11-01T12:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/bau`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = ALL_SERVICE_DETAILS.map(
    (service) => ({
      url: `${baseUrl}/${service.category === "bau" ? "bau" : "services"}/${service.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  return [...staticRoutes, ...serviceRoutes];
}

