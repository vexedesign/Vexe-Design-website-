import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { PositioningSection } from "@/components/PositioningSection";
import { ServicesPreview } from "@/components/ServicesPreview";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { WhySection } from "@/components/WhySection";
import { WorkSection } from "@/components/WorkSection";
import { InstagramSection } from "@/components/InstagramSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  ...pageMetadata({ ...siteConfig.seo.home, path: "/" }),
  // The homepage uses the full title, without the "| Vexe Design" suffix.
  title: { absolute: siteConfig.seo.home.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PositioningSection />
      <ServicesPreview />
      <ProcessSection />
      <PricingSection compact />
      <WhySection />
      <WorkSection />
      <InstagramSection />
      <CTASection />
    </>
  );
}
