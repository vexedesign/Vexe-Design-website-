import Link from "next/link";
import type { Package } from "@/site.config";
import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { PointerField } from "@/components/PointerField";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  pkg: Package;
  /** Show only the first few features (homepage preview). */
  compact?: boolean;
};

const PREVIEW_COUNT = 6;

/** A single package, styled like a page from a proposal rather than a SaaS table. */
export function PricingCard({ pkg, compact = false }: PricingCardProps) {
  const featured = pkg.featured;
  const features = compact ? pkg.features.slice(0, PREVIEW_COUNT) : pkg.features;
  const hidden = pkg.features.length - features.length;

  return (
    <PointerField
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] sm:p-9",
        featured
          ? "grain bg-ink text-white shadow-[0_40px_80px_-30px_color-mix(in_oklab,var(--accent)_70%,transparent)] ring-1 ring-accent lg:-my-6 lg:py-14"
          : "on-light border border-line-light bg-white text-ink hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_30px_60px_-35px_rgba(20,21,26,0.35)]",
      )}
    >
      {/* Pointer spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--px, 50%) var(--py, 0%), ${
            featured ? "color-mix(in oklab, var(--accent) 35%, transparent)" : "color-mix(in oklab, var(--accent) 7%, transparent)"
          }, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[2rem] leading-none tracking-[-0.03em]">{pkg.name}</h3>
          {featured && (
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[0.8rem] font-semibold text-white">
              <span className="slash text-[0.7rem]" style={{ ["--slash-color" as string]: "var(--white)" }} aria-hidden="true" />
              {siteConfig.pricing.badge}
            </span>
          )}
        </div>
        <p className={cn("mt-4 min-h-[3.2em]", featured ? "text-fog" : "text-slate")}>{pkg.description}</p>

        <p className="mt-8 flex items-baseline gap-3 border-y py-7" style={{ borderColor: featured ? "var(--line-dark)" : "var(--line-light)" }}>
          <span className="font-display text-[3.75rem] font-semibold leading-none tracking-[-0.045em] sm:text-[4.25rem]">{pkg.price}</span>
        </p>

        {pkg.includesNote && (
          <p className={cn("mt-7 text-sm font-semibold", featured ? "text-accent-bright" : "text-accent")}>{pkg.includesNote}</p>
        )}
        <ul className={cn("grid gap-3", pkg.includesNote ? "mt-4" : "mt-7")}>
          {features.map((f) => (
            <li key={f} className="flex gap-3">
              <span
                className={cn(
                  "mt-[0.2rem] grid size-5 shrink-0 place-items-center rounded-full",
                  featured ? "bg-accent text-white" : "bg-accent-wash text-accent",
                )}
              >
                <Icon name="check" size={12} strokeWidth={2.6} />
              </span>
              <span className={featured ? "text-white/90" : "text-ink/85"}>{f}</span>
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <Link
            href="/pricing"
            className={cn("link-draw mt-5 self-start text-sm font-medium", featured ? "text-accent-bright" : "text-accent")}
          >
            + {hidden} more included
          </Link>
        )}

        <div className="mt-auto pt-10">
          <AddOn featured={featured} />
          <Button
            href={`/contact?package=${pkg.id}`}
            size="lg"
            variant={featured ? "primary" : "dark"}
            className="w-full"
            aria-label={`${pkg.cta}: ${pkg.name} package, ${pkg.price}`}
          >
            {pkg.cta}
          </Button>
        </div>
      </div>
    </PointerField>
  );
}

/** The monthly support add-on (site.config.ts → pricing.addOn), shown on every package. */
function AddOn({ featured }: { featured: boolean }) {
  const { label, name, price, period } = siteConfig.pricing.addOn;
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5",
        featured ? "border-line-dark bg-white/[0.04]" : "border-line-light bg-paper/70",
      )}
    >
      <p className="min-w-0 leading-tight">
        <span className={cn("block text-xs font-medium", featured ? "text-accent-bright" : "text-accent")}>{label}</span>
        <span className={cn("mt-1 block text-[0.95rem] font-semibold", featured ? "text-white" : "text-ink")}>{name}</span>
      </p>
      <p className="shrink-0 text-right leading-none">
        <span className="font-display text-[1.6rem] font-semibold tracking-[-0.03em]">{price}</span>
        <span className={cn("mt-1 block text-xs", featured ? "text-fog" : "text-slate")}>{period}</span>
      </p>
    </div>
  );
}
