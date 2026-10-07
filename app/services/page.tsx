import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ServiceVisual, type VisualKind } from "@/components/ServiceVisual";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({ ...siteConfig.seo.services, path: "/services" });

export default function ServicesPage() {
  const { services } = siteConfig;

  return (
    <>
      <PageHeader
        label="Services"
        title="Websites built around how your customers choose."
        intro="We specialise in websites for garages and service stations, and bring the same approach to trades and businesses of every kind. Everything we do aims at one outcome: more of the right people getting in touch."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition-colors hover:border-white/50 hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn("section on-light", i % 2 === 0 ? "bg-paper" : "bg-white")}
          >
            <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn("lg:col-span-6", flip && "lg:order-2")}>
                <h2 id={`${s.id}-title`} className="display-md text-ink">
                  {s.title}
                </h2>
                <p className="lede mt-6 text-slate">{s.description}</p>
                <ul className="mt-9 grid gap-3.5 border-t border-line-light pt-8 sm:grid-cols-2 sm:gap-x-8">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-ink/85">
                      <span className="slash mt-[0.3em] text-[0.8em]" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button href={`/contact?service=${encodeURIComponent(s.formOption)}`} variant="dark" size="lg">
                    {s.cta}
                  </Button>
                </div>
              </Reveal>
              <Reveal className={cn("lg:col-span-6", flip && "lg:order-1")} delay={0.08}>
                <ServiceVisual kind={s.visual as VisualKind} />
                {s.visual === "redesign" && (
                  <p className="mt-3 text-sm text-slate">Drag across the image to compare before and after.</p>
                )}
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTASection heading="Not sure which service you need?" text="Tell us what you're trying to achieve. We'll recommend the right approach and give you a clear quote." cta="Get a Quote" />
    </>
  );
}
