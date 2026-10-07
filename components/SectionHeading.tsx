import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  /** Small sentence-case marker shown beside the heading, e.g. a section index. */
  marker?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  /** "split" puts the intro beside the title on large screens. */
  layout?: "stack" | "split";
  as?: "h1" | "h2";
  /** id for the heading, so the section can reference it with aria-labelledby. */
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  marker,
  title,
  intro,
  tone = "light",
  layout = "split",
  as: Tag = "h2",
  id,
  className,
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "grid gap-6",
        layout === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        className,
      )}
    >
      <div className={cn(layout === "split" && "lg:col-span-7")}>
        {marker && (
          <p className={cn("caption mb-5 flex items-center gap-3", dark ? "text-fog" : "text-slate")}>
            <span
              className="slash"
              style={{ ["--slash-color" as string]: dark ? "var(--accent-bright)" : "var(--accent)" }}
              aria-hidden="true"
            />
            {marker}
          </p>
        )}
        <Tag id={id} className={cn("display-lg", dark ? "text-white" : "text-ink")}>{title}</Tag>
      </div>
      {(intro || children) && (
        <div className={cn(layout === "split" && "lg:col-span-5 lg:pb-2")}>
          {intro && <p className={cn("lede", dark ? "text-fog" : "text-slate")}>{intro}</p>}
          {children}
        </div>
      )}
    </Reveal>
  );
}
