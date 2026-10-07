import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

/** Served at /manifest.webmanifest (used when the site is saved to a phone's home screen). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: siteConfig.businessName,
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.colors.ink,
    theme_color: siteConfig.colors.ink,
    icons: [
      { src: siteConfig.assets.favicon, sizes: "any", type: "image/svg+xml" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
