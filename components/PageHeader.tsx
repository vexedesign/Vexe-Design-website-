import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** Short sentence-case label for the page, shown above the heading. */
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Dark page header used on inner pages. Carries the cropped V from the logo. */
export function PageHeader({ label, title, intro, children, className }: PageHeaderProps) {
  return (
    <section className={cn("grain relative isolate overflow-hidden bg-ink text-white", className)}>
      <div className="grid-guides absolute inset-0 -z-10" aria-hidden="true" />
      <svg
        aria-hidden="true"
        viewBox="0 0 210 182"
        className="fade-up absolute -right-[30%] top-[10%] -z-10 w-[110vw] [--d:150ms] sm:-right-[12%] sm:top-[-10%] sm:w-[70vw] lg:w-[52vw]"
      >
        <defs>
          <linearGradient id="ph-violet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0H52.5L110 182H65.5Z" fill="#fff" opacity="0.04" />
        <path d="M157 0H210L153 182H110Z" fill="url(#ph-violet)" />
      </svg>

      <div className="container-x pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+6rem)]">
        <p className="caption fade-up mb-7 flex items-center gap-3 text-fog">
          <span className="slash" style={{ ["--slash-color" as string]: "var(--accent-bright)" }} aria-hidden="true" />
          {label}
        </p>
        <h1 className="fade-up max-w-[15ch] text-[clamp(2.75rem,7.6vw,6.75rem)] leading-[0.92] tracking-[-0.032em] [--d:80ms]">
          {title}
        </h1>
        {intro && <p className="lede fade-up mt-8 text-fog [--d:180ms]">{intro}</p>}
        {children && <div className="fade-up mt-10 [--d:260ms]">{children}</div>}
      </div>
    </section>
  );
}
