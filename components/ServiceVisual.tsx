"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export type VisualKind = "design" | "development" | "redesign" | "responsive" | "conversion";

/**
 * Bespoke illustrations for each service, drawn in HTML/CSS so they stay
 * crisp, light and on-brand. Internals use container query units (cqw).
 */
export function ServiceVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  return (
    <div className={cn("@container relative aspect-[5/4] w-full", className)}>
      <div className="grain absolute inset-0 overflow-hidden rounded-[clamp(14px,3cqw,28px)] bg-ink text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,color-mix(in_oklab,var(--accent)_45%,transparent),transparent)]"
        />
        {kind === "design" && <DesignArt />}
        {kind === "development" && <DevelopmentArt />}
        {kind === "redesign" && <RedesignArt />}
        {kind === "responsive" && <ResponsiveArt />}
        {kind === "conversion" && <ConversionArt />}
      </div>
    </div>
  );
}

const bar = "block rounded-full bg-current";

function DesignArt() {
  const swatches = [
    { c: "var(--accent)", n: "Violet" },
    { c: "var(--paper)", n: "Paper" },
    { c: "var(--accent-bright)", n: "Lilac" },
    { c: "#2b2d36", n: "Graphite" },
  ];
  return (
    <div aria-hidden="true" className="absolute inset-0 p-[7cqw]">
      {/* layout grid */}
      <div className="absolute inset-[7cqw] grid grid-cols-6 gap-[2cqw] opacity-[0.07]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="bg-white" />
        ))}
      </div>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-display text-[26cqw] font-semibold leading-[0.8] tracking-[-0.05em]">Aa</span>
          <span className="flex flex-col gap-[2cqw] pt-[2cqw]">
            {swatches.map((s) => (
              <span key={s.n} className="flex items-center gap-[2cqw] text-[2.6cqw] text-fog">
                <span className="size-[6cqw] rounded-full ring-1 ring-white/15" style={{ background: s.c }} />
                {s.n}
              </span>
            ))}
          </span>
        </div>
        <div className="grid gap-[2.2cqw] text-white">
          <span className={cn(bar, "h-[3.4cqw] w-[78%]")} />
          <span className={cn(bar, "h-[2cqw] w-[56%] opacity-50")} />
          <span className={cn(bar, "h-[1.4cqw] w-[66%] opacity-25")} />
          <span className={cn(bar, "h-[1.4cqw] w-[48%] opacity-25")} />
        </div>
      </div>
    </div>
  );
}

function DevelopmentArt() {
  const lines: [number, number, string][] = [
    [0, 34, "text-accent-bright"],
    [1, 52, "text-white/70"],
    [2, 40, "text-white/35"],
    [2, 58, "text-accent-bright/70"],
    [1, 30, "text-white/70"],
    [1, 46, "text-white/35"],
    [2, 36, "text-accent-bright/70"],
    [0, 20, "text-accent-bright"],
  ];
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-[7cqw]">
      <div className="w-full overflow-hidden rounded-[2.4cqw] border border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-[1.4cqw] border-b border-white/10 px-[3cqw] py-[2.2cqw]">
          <span className="size-[1.6cqw] rounded-full bg-white/20" />
          <span className="size-[1.6cqw] rounded-full bg-white/20" />
          <span className="size-[1.6cqw] rounded-full bg-white/20" />
          <span className="ml-[2cqw] text-[2.6cqw] text-fog">page.tsx</span>
        </div>
        <div className="grid gap-[2.4cqw] px-[3cqw] py-[3.4cqw]">
          {lines.map(([indent, w, color], i) => (
            <span key={i} className="flex items-center gap-[3cqw]">
              <span className="w-[3cqw] text-right text-[2.4cqw] tabular-nums text-white/25">{i + 1}</span>
              <span className={cn(bar, "h-[1.7cqw]", color)} style={{ width: `${w}%`, marginLeft: `${indent * 5}cqw` }} />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-[2cqw] border-t border-white/10 px-[3cqw] py-[2.4cqw] text-[2.8cqw]">
          <span className="grid size-[4.4cqw] place-items-center rounded-full bg-emerald-500/90 text-ink">
            <Icon name="check" className="size-[3cqw]" strokeWidth={3} />
          </span>
          <span className="text-white/80">Build complete</span>
          <span className="ml-auto h-[1.2cqw] w-[30%] overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-full rounded-full bg-emerald-500/90" />
          </span>
        </div>
      </div>
    </div>
  );
}

function RedesignArt() {
  const [split, setSplit] = useState(52);
  const id = useId();
  return (
    <div className="absolute inset-0 p-[7cqw]">
      <div className="relative h-full overflow-hidden rounded-[2.4cqw]" aria-hidden="true">
        {/* After */}
        <div className="absolute inset-0 flex flex-col gap-[3cqw] bg-paper p-[5cqw] text-ink">
          <div className="flex items-center justify-between">
            <span className="h-[3cqw] w-[18cqw] rounded-full bg-ink" />
            <span className="h-[4.4cqw] w-[14cqw] rounded-full bg-accent" />
          </div>
          <span className="mt-[3cqw] font-display text-[6.4cqw] font-semibold leading-[0.95] tracking-[-0.04em]">
            Clear, fast and easy to use.
          </span>
          <span className="h-[1.6cqw] w-[70%] rounded-full bg-ink/10" />
          <span className="mt-auto grid grid-cols-3 gap-[2cqw]">
            <span className="h-[12cqw] rounded-[1.6cqw] bg-white" />
            <span className="h-[12cqw] rounded-[1.6cqw] bg-white" />
            <span className="h-[12cqw] rounded-[1.6cqw] bg-white" />
          </span>
        </div>
        {/* Before */}
        <div
          className="absolute inset-0 flex flex-col gap-[1.6cqw] bg-[#c9c6bd] p-[3cqw] text-[#55524a]"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <div className="flex gap-[1cqw]">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="h-[2.4cqw] flex-1 bg-[#8a867c]" />
            ))}
          </div>
          <span className="h-[9cqw] bg-[#a8a499]" />
          <span className="font-serif text-[3.4cqw] leading-tight">WELCOME TO OUR WEBSITE!!! Click here for more info</span>
          <div className="grid grid-cols-4 gap-[1cqw]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-[6cqw] bg-[#b4b0a5]" />
            ))}
          </div>
          <span className="h-[1.2cqw] w-[90%] bg-[#8a867c]" />
          <span className="h-[1.2cqw] w-[80%] bg-[#8a867c]" />
          <span className="h-[1.2cqw] w-[85%] bg-[#8a867c]" />
        </div>
        {/* Divider */}
        <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-white" style={{ left: `${split}%` }}>
          <span className="absolute left-1/2 top-1/2 grid size-[9cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
            <svg viewBox="0 0 24 24" className="size-[4.4cqw]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <span className="absolute bottom-[3cqw] left-[3cqw] rounded-full bg-ink/85 px-[2.4cqw] py-[1cqw] text-[2.6cqw] text-white">Before</span>
        <span className="absolute bottom-[3cqw] right-[3cqw] rounded-full bg-accent px-[2.4cqw] py-[1cqw] text-[2.6cqw] text-white">After</span>
      </div>
      <label htmlFor={id} className="sr-only">
        Compare the website before and after a redesign
      </label>
      <input
        id={id}
        type="range"
        min={8}
        max={92}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        className="absolute inset-[7cqw] cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function MiniPage({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-[6%] p-[8%]">
      <span className="flex items-center justify-between">
        <span className="h-[0.7em] w-[34%] rounded-full bg-ink" />
        {compact ? (
          <span className="flex flex-col gap-[0.18em]">
            <span className="block h-[0.14em] w-[1em] bg-ink" />
            <span className="block h-[0.14em] w-[0.7em] bg-ink" />
          </span>
        ) : (
          <span className="h-[0.9em] w-[18%] rounded-full bg-accent" />
        )}
      </span>
      <span className="h-[1.3em] w-[85%] rounded-[0.2em] bg-ink" />
      <span className="h-[0.5em] w-[70%] rounded-full bg-ink/15" />
      <span className="h-[1.3em] w-[50%] rounded-full bg-accent" />
      <span className={cn("mt-auto grid gap-[0.4em]", compact ? "grid-cols-1" : "grid-cols-3")}>
        <span className="h-[2.2em] rounded-[0.3em] bg-white" />
        {!compact && <span className="h-[2.2em] rounded-[0.3em] bg-white" />}
        {!compact && <span className="h-[2.2em] rounded-[0.3em] bg-white" />}
      </span>
    </div>
  );
}

function ResponsiveArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 p-[7cqw]">
      <div className="absolute left-[7cqw] top-[10cqw] w-[66%] rounded-[2cqw] border border-white/10 bg-paper text-[2.4cqw] text-ink shadow-2xl">
        <div className="flex gap-[1cqw] border-b border-ink/10 px-[2cqw] py-[1.4cqw]">
          <span className="size-[1.2cqw] rounded-full bg-ink/20" />
          <span className="size-[1.2cqw] rounded-full bg-ink/20" />
          <span className="size-[1.2cqw] rounded-full bg-ink/20" />
        </div>
        <div className="aspect-[16/10]">
          <MiniPage />
        </div>
      </div>
      <div className="absolute right-[18cqw] top-[30cqw] w-[30%] rounded-[3cqw] border-[1.2cqw] border-[#2b2d36] bg-paper text-[1.9cqw] text-ink shadow-2xl">
        <div className="aspect-[3/4]">
          <MiniPage />
        </div>
      </div>
      <div className="absolute bottom-[7cqw] right-[7cqw] w-[17%] rounded-[3cqw] border-[1cqw] border-[#2b2d36] bg-paper text-[1.6cqw] text-ink shadow-2xl">
        <div className="aspect-[9/19]">
          <MiniPage compact />
        </div>
      </div>
    </div>
  );
}

function ConversionArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-[7cqw]">
      <div className="relative w-[78%] rounded-[2.6cqw] bg-paper p-[5cqw] text-ink">
        <div className="flex items-center justify-between">
          <span className="h-[2.4cqw] w-[22%] rounded-full bg-ink" />
          <span className="relative h-[4.4cqw] w-[20%] rounded-full bg-accent">
            <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
          </span>
        </div>
        <span className="mt-[5cqw] block h-[4.6cqw] w-[80%] rounded-[0.8cqw] bg-ink" />
        <span className="mt-[2cqw] block h-[4.6cqw] w-[55%] rounded-[0.8cqw] bg-ink" />
        <span className="mt-[3cqw] block h-[1.4cqw] w-[70%] rounded-full bg-ink/10" />
        <span className="mt-[4cqw] flex gap-[2cqw]">
          <span className="relative h-[6cqw] w-[34%] rounded-full bg-accent">
            <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent [animation-delay:600ms]" />
          </span>
          <span className="h-[6cqw] w-[26%] rounded-full border border-ink/20" />
        </span>
        <span className="mt-[5cqw] grid grid-cols-3 gap-[2cqw]">
          {["star", "shield", "check"].map((n) => (
            <span key={n} className="flex items-center gap-[1.4cqw] rounded-[1.4cqw] bg-white p-[2cqw]">
              <Icon name={n as "star"} className="size-[3cqw] text-accent" strokeWidth={2} />
              <span className="h-[1.2cqw] flex-1 rounded-full bg-ink/10" />
            </span>
          ))}
        </span>
        {/* cursor */}
        <svg
          viewBox="0 0 24 24"
          className="absolute bottom-[34%] left-[30%] size-[6cqw] drop-shadow-lg"
          fill="var(--white)"
          stroke="var(--ink)"
          strokeWidth="1.5"
        >
          <path d="M5 3l14 7-6 2-2 6L5 3Z" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
