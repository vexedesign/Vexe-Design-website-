import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";

export type LegalSection = {
  /** Used for the contents links, e.g. "your-rights". */
  id: string;
  title: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  /** Shown under the heading, e.g. "9 October 2026". */
  lastUpdated: string;
  sections: LegalSection[];
  /**
   * While true, a notice explains the page is awaiting review and highlighted
   * [placeholders] still need filling in. Set to false once finalised.
   */
  draft?: boolean;
};

/** A long-form legal page with a sticky contents list on large screens. */
export function LegalDocument({ title, intro, lastUpdated, sections, draft = false }: LegalDocumentProps) {
  return (
    <>
      <PageHeader label="Legal" title={title} intro={intro} />
      <section className="section on-light bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <nav aria-label={`${title} contents`} className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <p className="text-sm font-semibold text-ink">Contents</p>
              <ol className="mt-4 grid gap-2.5 text-[0.95rem]">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="w-5 shrink-0 tabular-nums text-slate">{i + 1}.</span>
                    <a href={`#${s.id}`} className="link-draw text-slate hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="legal-prose lg:col-span-8 lg:col-start-5">
            <p className="text-sm text-slate">Last updated: {lastUpdated}</p>

            {draft && (
              <div role="note" className="mt-6 flex gap-4 rounded-2xl border border-accent/30 bg-accent-wash p-5 text-ink">
                <span className="slash mt-1" aria-hidden="true" />
                <p className="!mt-0">
                  <strong className="font-semibold">Draft for review.</strong> Highlighted items in{" "}
                  <mark className="fill">[square brackets]</mark> still need filling in. Have this page checked before
                  relying on it.
                </p>
              </div>
            )}

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                <h2 id={`${s.id}-title`}>
                  <span className="mr-3 text-accent">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}

/** A highlighted gap to fill in before the policy is finalised. */
export function Fill({ children }: { children: ReactNode }) {
  return <mark className="fill">[{children}]</mark>;
}
