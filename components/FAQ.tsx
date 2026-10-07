import { siteConfig } from "@/site.config";
import { Icon } from "@/components/Icon";

/** Questions and answers using native <details>, so it's keyboard and screen-reader friendly with no JavaScript. */
export function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="section on-light bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="display-md text-ink">
            Questions, answered.
          </h2>
          <p className="mt-6 max-w-sm text-slate">
            Anything else? Call{" "}
            <a href={siteConfig.phoneHref} className="link-draw font-medium text-ink">
              {siteConfig.phone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${siteConfig.email}`} className="link-draw font-medium text-ink">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          {siteConfig.faq.map((item) => (
            <details key={item.q} className="faq group border-t border-line-light last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-[1.3rem] leading-snug tracking-[-0.02em] text-ink md:py-7 md:text-[1.5rem] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-light text-ink transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-out)] group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white">
                  <Icon name="plus" size={16} strokeWidth={2} />
                </span>
              </summary>
              <div className="faq-body">
                <p className="max-w-2xl pb-8 pr-14 text-slate">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
