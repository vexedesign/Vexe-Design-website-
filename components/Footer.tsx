import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { links, legal } = siteConfig.nav;
  const columnTitle = "mb-5 text-sm font-medium text-fog";
  const linkClass = "link-draw text-white/90 hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-x grid gap-14 pb-14 pt-20 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo width={siteConfig.assets.logoWidth + 12} />
          <p className="mt-6 max-w-sm font-display text-2xl leading-tight tracking-[-0.02em] text-white">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className={columnTitle}>Pages</h2>
          <ul className="grid gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Instagram
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={columnTitle}>Contact</h2>
          <ul className="grid gap-3">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.phoneHref} className={linkClass}>
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {siteConfig.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className={columnTitle}>Legal</h2>
          <ul className="grid gap-3">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x">
        <div className="slash-rule w-full opacity-40" aria-hidden="true" />
        <div className="flex flex-col gap-3 py-7 text-sm text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <a href="#main" className="link-draw self-start text-white/80 hover:text-white sm:self-auto">
            Back to top
          </a>
        </div>
      </div>

      {/* Oversized, cropped logo as a quiet sign-off. Decorative. */}
      <div aria-hidden="true" className="container-x pointer-events-none mt-6 select-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative, lazy, sized by CSS */}
        <img
          src={siteConfig.assets.logo}
          alt=""
          loading="lazy"
          decoding="async"
          className="-mb-[6%] block h-auto w-full opacity-[0.06]"
        />
      </div>
    </footer>
  );
}
