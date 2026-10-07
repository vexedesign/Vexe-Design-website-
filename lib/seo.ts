import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

type PageMeta = {
  title: string;
  description: string;
  /** Path of the page, e.g. "/services". Used for the canonical URL. */
  path: string;
  /** Hide placeholder pages (e.g. unfinished legal pages) from search engines. */
  noIndex?: boolean;
};

/** Consistent metadata (canonical, Open Graph, X/Twitter) for every page. */
export function pageMetadata({ title, description, path, noIndex }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: path,
      siteName: siteConfig.businessName,
      title,
      description,
      images: [{ url: siteConfig.assets.ogImage, width: 1200, height: 630, alt: siteConfig.businessName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.assets.ogImage],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
