import Image from "next/image";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  width?: number;
  /** Load early with high priority. Use only for the header logo. */
  eager?: boolean;
  /** Override the alt text, e.g. "" when the logo is purely decorative next to a text label. */
  alt?: string;
};

/**
 * Renders the logo file set in site.config.ts (`assets.logo`).
 * To change the logo, replace /public/images/logo.svg. Width is `assets.logoWidth`.
 */
export function Logo({ className, width = siteConfig.assets.logoWidth, eager = false, alt = siteConfig.businessName }: LogoProps) {
  return (
    <Image
      src={siteConfig.assets.logo}
      alt={alt}
      width={width}
      height={Math.round(width / 3.4)}
      fetchPriority={eager ? "high" : undefined}
      loading={eager ? "eager" : "lazy"}
      className={cn("block h-auto", className)}
      style={{ width, height: "auto" }}
    />
  );
}
