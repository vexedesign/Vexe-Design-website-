import { siteConfig } from "@/site.config";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Build an absolute URL on the configured domain. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}
