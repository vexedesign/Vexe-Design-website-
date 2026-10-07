import { siteConfig } from "@/site.config";
import { SectionHeading } from "@/components/SectionHeading";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Reveal } from "@/components/ui/Reveal";

/** Portfolio projects, driven entirely by site.config.ts. */
export function WorkSection() {
  const { portfolio } = siteConfig;
  return (
    <section aria-labelledby="work-title" className="section on-light bg-white">
      <div className="container-x">
        <SectionHeading id="work-title" title={portfolio.heading} intro={portfolio.intro} />

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {portfolio.projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08}>
              <PortfolioCard project={p} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
