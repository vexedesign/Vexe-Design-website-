"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { siteConfig } from "@/site.config";
import { SectionHeading } from "@/components/SectionHeading";

/** Four-step process. The stroke line fills as the section scrolls through view. */
export function ProcessSection() {
  const { heading, intro, steps } = siteConfig.process;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section aria-labelledby="process-title" className="section grain relative isolate overflow-hidden bg-ink text-white">
      <div className="container-x">
        <SectionHeading id="process-title" title={heading} intro={intro} tone="dark" />

        <ol ref={ref} className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
          {/* Track (desktop: horizontal, mobile: vertical) */}
          <div aria-hidden="true" className="absolute left-[11px] top-2 bottom-2 w-px bg-line-dark md:inset-x-0 md:bottom-auto md:left-0 md:top-[11px] md:h-px md:w-auto" />
          <m.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-accent-bright md:hidden"
          />
          <m.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-[11px] hidden h-px origin-left bg-accent-bright md:block"
          />

          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-12 md:pl-0 md:pt-14">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid size-6 place-items-center rounded-full border border-accent-bright bg-ink"
              >
                <span className="slash text-[0.7rem]" style={{ ["--slash-color" as string]: "var(--accent-bright)" }} />
              </span>
              <p className="font-display text-[3.25rem] font-semibold leading-none tracking-[-0.04em] text-accent-bright md:text-[4rem]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-[1.6rem] tracking-[-0.02em] text-white">{step.title}</h3>
              <p className="mt-3 max-w-[22rem] text-fog">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
