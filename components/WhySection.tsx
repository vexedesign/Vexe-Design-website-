import { siteConfig } from "@/site.config";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/Logo";

/** Honest comparison between a template builder and a Vexe site. */
export function WhySection() {
  const { heading, intro, leftTitle, rightTitle, rows } = siteConfig.why;
  return (
    <section aria-labelledby="why-title" className="section on-light bg-paper">
      <div className="container-x">
        <SectionHeading id="why-title" title={heading} intro={intro} />

        <Reveal className="mt-14 lg:mt-20">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">
              Comparison of a template website builder with a website from {siteConfig.businessName}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[46%] pb-5 pr-4 align-bottom text-sm font-medium text-slate md:text-base">
                  {leftTitle}
                </th>
                <th scope="col" className="rounded-t-[1.5rem] bg-ink px-5 pb-5 pt-7 align-bottom md:px-9">
                  <span className="sr-only">{rightTitle}</span>
                  <Logo width={104} alt="" className="pointer-events-none" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const last = i === rows.length - 1;
                return (
                  <tr key={row.right}>
                    <td className="border-t border-line-light py-6 pr-4 align-top text-[0.95rem] text-slate md:py-8 md:pr-10 md:text-lg">
                      <span className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-slate/50" />
                        {row.left}
                      </span>
                    </td>
                    <td
                      className={`border-t border-white/10 bg-ink px-5 py-6 align-top text-[0.95rem] text-white md:px-9 md:py-8 md:text-lg ${
                        last ? "rounded-b-[1.5rem]" : ""
                      }`}
                    >
                      <span className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="slash mt-[0.3em] text-[0.85em]"
                          style={{ ["--slash-color" as string]: "var(--accent-bright)" }}
                        />
                        {row.right}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
