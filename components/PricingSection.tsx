import { siteConfig } from "@/site.config";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";

type PricingSectionProps = {
  /** Homepage preview shows a shortened feature list and a link to /pricing. */
  compact?: boolean;
  /** Use "h1" when this is the main heading of the page. */
  headingLevel?: "h1" | "h2";
};

export function PricingSection({ compact = false, headingLevel = "h2" }: PricingSectionProps) {
  const { heading, intro, packages, disclaimer } = siteConfig.pricing;
  return (
    <section aria-labelledby="pricing-title" className="section on-light relative bg-paper">
      <div className="container-x">
        {headingLevel === "h2" && <SectionHeading id="pricing-title" title={heading} intro={intro} />}
        {headingLevel === "h1" && <h2 id="pricing-title" className="sr-only">Packages</h2>}

        <div className={headingLevel === "h2" ? "mt-14 lg:mt-24" : ""}>
          <ul className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
            {packages.map((pkg) => (
              <li key={pkg.id}>
                <PricingCard pkg={pkg} compact={compact} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line-light pt-8 md:flex-row md:items-center md:justify-between lg:mt-16">
          <p className="max-w-xl text-sm text-slate">{disclaimer}</p>
          {compact ? (
            <Button href="/pricing" variant="outlineLight">
              Compare packages in full
            </Button>
          ) : (
            <Button href="/contact" variant="outlineLight">
              Get a Quote
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
