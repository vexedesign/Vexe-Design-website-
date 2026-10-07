"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { siteConfig } from "@/site.config";
import { ServiceVisual, type VisualKind } from "@/components/ServiceVisual";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

/**
 * Homepage services: an index of services. Hovering or focusing a row swaps
 * the illustration in the sticky panel (desktop). On mobile, each row stands alone.
 */
export function ServicesPreview() {
  const services = siteConfig.services;
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section aria-labelledby="services-title" className="section on-light bg-white">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          title="What we do."
          intro="Five ways we help businesses look the part online and turn visitors into enquiries."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <ul className="lg:col-span-7">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-t border-line-light last:border-b">
                  <Link
                    href={`/services#${s.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 py-7 md:py-8"
                  >
                    <h3
                      className={cn(
                        "flex items-center font-display text-[1.75rem] leading-none tracking-[-0.03em] transition-colors duration-300 md:text-[2.4rem]",
                        isActive ? "text-ink" : "text-ink lg:text-ink/55",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "slash hidden transition-[width,margin] duration-500 ease-[var(--ease-out)] lg:inline-block",
                          isActive ? "mr-4 !w-[0.28em]" : "mr-0 !w-0",
                        )}
                      />
                      {s.title}
                    </h3>
                    <span
                      className={cn(
                        "mt-1 grid size-10 place-items-center rounded-full border transition-all duration-300",
                        isActive ? "border-accent bg-accent text-white" : "border-line-light text-ink group-hover:border-ink",
                      )}
                      aria-hidden="true"
                    >
                      <Icon name="arrowUpRight" size={16} strokeWidth={2} />
                    </span>
                    <p className="col-span-2 max-w-[36rem] text-slate">
                      {s.short}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServiceVisual kind={current.visual as VisualKind} />
                </m.div>
              </AnimatePresence>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm text-slate">{current.title}</p>
                <Button href="/services" variant="outlineLight">
                  All services
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:hidden">
          <Button href="/services" variant="dark" size="lg">
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
