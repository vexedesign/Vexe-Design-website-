import { siteConfig } from "@/site.config";
import { PageHeader } from "@/components/PageHeader";

type LegalSection = { heading: string; prompt: string };

type LegalPageProps = {
  label: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * Placeholder legal page. Each section describes WHAT belongs there, not
 * legal wording. Replace with professionally reviewed text before launch.
 */
export function LegalPage({ label, title, intro, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader label={label} title={title} intro={intro} />
      <section className="section on-light bg-paper">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div role="note" className="flex gap-4 rounded-2xl border border-accent/30 bg-accent-wash p-5 text-ink">
              <span className="slash mt-1" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Placeholder page.</strong> This page has not yet been written. The
                headings below show what it should cover. Replace them with professionally reviewed legal text before the
                site goes live.
              </p>
            </div>

            <div className="mt-14 grid gap-12">
              {sections.map((s) => (
                <section key={s.heading} aria-labelledby={slug(s.heading)}>
                  <h2 id={slug(s.heading)} className="font-display text-[1.6rem] leading-tight tracking-[-0.02em] text-ink">
                    {s.heading}
                  </h2>
                  <p className="mt-3 rounded-xl border border-dashed border-ink/20 p-4 text-slate">
                    <span className="font-medium text-ink/70">To be written: </span>
                    {s.prompt}
                  </p>
                </section>
              ))}
            </div>

            <p className="mt-16 border-t border-line-light pt-8 text-sm text-slate">
              Questions about this policy? Email{" "}
              <a href={`mailto:${siteConfig.email}`} className="link-draw font-medium text-ink">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
