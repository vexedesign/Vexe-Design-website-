import Image from "next/image";
import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/HeroVisual";
import { PointerField } from "@/components/PointerField";

export function Hero() {
  const { hero, assets } = siteConfig;
  const lines = hero.headline.split("|");

  return (
    <section aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-ink text-white">
      <PointerField className="relative">
        {/* Background system: optional photo, column guides, accent glow, pointer spotlight */}
        {assets.heroImage && (
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Image src={assets.heroImage} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
          </div>
        )}
        <div className="grid-guides absolute inset-0 -z-10" aria-hidden="true" />
        {/* The V from the logo, enlarged and cropped: the brand's signature in the hero */}
        <svg
          aria-hidden="true"
          viewBox="0 0 210 182"
          className="fade-up absolute -right-[22%] top-[6%] -z-10 w-[120vw] max-w-none opacity-90 [--d:200ms] sm:-right-[14%] sm:w-[88vw] lg:-right-[6%] lg:top-[-4%] lg:w-[64vw]"
        >
          <defs>
            <linearGradient id="hero-v-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.95" />
              <stop offset="0.75" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-v-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.07" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 0H52.5L110 182H65.5Z" fill="url(#hero-v-light)" />
          <path d="M157 0H210L153 182H110Z" fill="url(#hero-v-violet)" />
        </svg>
        <div
          aria-hidden="true"
          className="absolute -right-[10%] -top-[20%] -z-10 aspect-square w-[60vw] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_40%,transparent)_0%,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(520px_circle_at_var(--px,70%)_var(--py,20%),color-mix(in_oklab,var(--accent-bright)_14%,transparent),transparent_70%)]"
        />

        <div className="container-x pb-20 pt-[calc(var(--nav-h)+3.5rem)] sm:pt-[calc(var(--nav-h)+5rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+6.5rem)]">
          <h1 id="hero-title" className="display-xl max-w-[16ch] sm:max-w-none">
            {lines.map((line, i) => (
              <span key={line} className="line-mask" style={{ ["--i" as string]: i }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid gap-14 lg:mt-0 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col lg:col-span-5 lg:pt-12">
              <p className="lede fade-up text-fog [--d:450ms]">{hero.intro}</p>
              <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap [--d:560ms]">
                <Button href="/contact" size="lg">
                  {hero.primaryCta}
                </Button>
                <Button href="/services" size="lg" variant="outline">
                  {hero.secondaryCta}
                </Button>
              </div>
              <p className="fade-up mt-8 flex max-w-md items-start gap-3 text-sm leading-relaxed text-fog [--d:700ms]">
                <span className="relative mt-[0.45em] flex size-2 shrink-0">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-accent-bright" />
                  <span className="relative size-2 rounded-full bg-accent-bright" />
                </span>
                {hero.note}
              </p>
            </div>

            <div className="lg:col-span-7 lg:-mt-[clamp(2.5rem,5.6vw,6rem)]">
              <HeroVisual />
            </div>
          </div>
        </div>
      </PointerField>
    </section>
  );
}
