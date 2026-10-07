import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type CTASectionProps = {
  heading?: string;
  text?: string;
  cta?: string;
};

/** The closing call to action used at the foot of each page. */
export function CTASection({
  heading = siteConfig.finalCta.heading,
  text = siteConfig.finalCta.text,
  cta = siteConfig.finalCta.cta,
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-ink px-[var(--gutter)] pb-[var(--gutter)] pt-[var(--gutter)]">
      <Reveal className="grain relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] bg-accent px-6 py-20 text-white sm:px-12 md:py-28 lg:px-20">
        {/* The V mark, oversized and cropped */}
        <svg
          aria-hidden="true"
          viewBox="0 0 210 182"
          className="absolute -bottom-[18%] -right-[8%] -z-10 w-[min(42rem,85%)] opacity-100"
        >
          <path d="M0 0H52.5L110 182H65.5Z" fill="var(--ink)" opacity="0.18" />
          <path d="M157 0H210L153 182H110Z" fill="var(--white)" opacity="0.12" />
        </svg>

        <div className="max-w-3xl">
          <h2 id="cta-title" className="display-lg">
            {heading}
          </h2>
          <p className="lede mt-7 text-white/80">{text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" variant="light" size="lg">
              {cta}
            </Button>
            <Button href={siteConfig.phoneHref} variant="outline" size="lg" icon="phone" className="border-white/40">
              {siteConfig.phone}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
