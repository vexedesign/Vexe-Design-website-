import Image from "next/image";
import type { SiteConfig } from "@/site.config";

type Project = SiteConfig["portfolio"]["projects"][number];

/**
 * A portfolio project. While `comingSoon` is true it renders a designed
 * placeholder; add an image, summary and url in site.config.ts to show a real project.
 */
export function PortfolioCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const isPlaceholder = project.comingSoon || !project.image;

  const frame = isPlaceholder ? (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-dashed border-ink/20 bg-paper">
      <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-[6%] p-[9%] opacity-60">
        <span className="flex items-center justify-between">
          <span className="h-3 w-[26%] rounded-full bg-mist" />
          <span className="h-5 w-[16%] rounded-full bg-mist" />
        </span>
        <span className="mt-[6%] h-6 w-[70%] rounded-md bg-mist" />
        <span className="h-6 w-[48%] rounded-md bg-mist" />
        <span className="mt-auto grid grid-cols-3 gap-3">
          <span className="aspect-[4/3] rounded-lg bg-mist/80" />
          <span className="aspect-[4/3] rounded-lg bg-mist/80" />
          <span className="aspect-[4/3] rounded-lg bg-mist/80" />
        </span>
      </div>
      <span
        aria-hidden="true"
        className="absolute -bottom-[0.18em] right-[0.05em] font-display text-[9rem] font-semibold leading-none tracking-[-0.06em] text-ink/[0.06] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-3"
      >
        {number}
      </span>
      <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-sm">
        <span className="slash text-[0.65rem]" aria-hidden="true" />
        Coming soon
      </span>
    </div>
  ) : (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-paper">
      <Image
        src={project.image}
        alt={`${project.title} website`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />
    </div>
  );

  const body = (
    <>
      {frame}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-[1.4rem] tracking-[-0.02em] text-ink">{project.title}</h3>
        {!isPlaceholder && <span className="text-sm text-slate">{project.category}</span>}
      </div>
      {project.summary && <p className="mt-2 text-slate">{project.summary}</p>}
    </>
  );

  return project.url && !isPlaceholder ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <div className="group">{body}</div>
  );
}
