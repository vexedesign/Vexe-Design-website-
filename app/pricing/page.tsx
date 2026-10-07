import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { PricingSection } from "@/components/PricingSection";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = pageMetadata({ ...siteConfig.seo.pricing, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <PageHeader label="Pricing" title={siteConfig.pricing.heading} intro={siteConfig.pricing.intro} />
      <div className="relative">
        <PricingSection headingLevel="h1" />
      </div>
      <FAQ />
      <CTASection heading="Found the right package?" text="Send an enquiry with the package you have in mind. We'll confirm exactly what's included before any work begins." cta="Choose Your Package" />
    </>
  );
}
