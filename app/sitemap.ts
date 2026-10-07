import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

/** Served at /sitemap.xml. Legal placeholder pages are left out until they're written. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: new URL(r.path, siteConfig.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
