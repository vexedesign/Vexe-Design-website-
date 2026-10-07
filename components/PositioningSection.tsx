import { siteConfig } from "@/site.config";
import { Reveal } from "@/components/ui/Reveal";

/** "Not just another website." An editorial, asymmetric statement of what every site is built around. */
export function PositioningSection() {
  const { heading, intro, pillars } = siteConfig.positioning;
  return (
    <section aria-labelledby="positioning-title" className="section on-light bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Reveal>
              <h2 id="positioning-title" className="display-lg max-w-[12ch] text-ink">
                {heading}
              </h2>
              <p className="lede mt-7 text-slate">{intro}</p>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6 lg:pl-10">
          {pillars.map((p) => (
            <li key={p.title} className="group border-t border-line-light last:border-b">
              <Reveal className="grid gap-3 py-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10 md:py-10">
                <h3 className="flex items-center font-display text-[1.75rem] leading-none tracking-[-0.03em] text-ink md:text-[2.1rem]">
                  <span className="slash mr-0 !w-0 transition-[width,margin] duration-500 ease-[var(--ease-out)] group-hover:mr-4 group-hover:!w-[0.3em]" aria-hidden="true" />
                  {p.title}
                </h3>
                <p className="max-w-[34rem] text-slate">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
