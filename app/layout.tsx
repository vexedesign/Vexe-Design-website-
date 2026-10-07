import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { siteConfig } from "@/site.config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.seo.home.title,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.seo.home.description,
  applicationName: siteConfig.businessName,
  icons: { icon: siteConfig.assets.favicon, apple: siteConfig.assets.appleTouchIcon },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.ink,
  colorScheme: "light",
};

/** Colours from site.config.ts become CSS variables used by every component. */
const themeVars = {
  "--accent": siteConfig.colors.accent,
  "--accent-bright": siteConfig.colors.accentBright,
  "--ink": siteConfig.colors.ink,
  "--ink-raised": siteConfig.colors.inkRaised,
  "--paper": siteConfig.colors.paper,
  "--white": siteConfig.colors.white,
  "--mist": siteConfig.colors.mist,
} as CSSProperties;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.businessName,
  description: siteConfig.seo.home.description,
  url: siteConfig.siteUrl,
  email: siteConfig.email,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  image: new URL(siteConfig.assets.ogImage, siteConfig.siteUrl).toString(),
  logo: new URL(siteConfig.assets.logo, siteConfig.siteUrl).toString(),
  areaServed: { "@type": "Country", name: "United Kingdom" },
  sameAs: [siteConfig.instagramUrl],
  makesOffer: siteConfig.pricing.packages.map((p) => ({
    "@type": "Offer",
    name: `${p.name} website package`,
    description: p.description,
    price: p.price.replace(/[^0-9.]/g, ""),
    priceCurrency: "GBP",
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
      style={themeVars}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
