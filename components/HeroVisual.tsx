import { Icon, type IconName } from "@/components/Icon";
import { siteConfig } from "@/site.config";

/**
 * The hero illustration: a generic garage website on desktop and mobile,
 * drawn entirely in HTML/CSS (no stock images). Internals use container
 * query units (cqw) so the mock-up scales perfectly at every size.
 * Layers drift with the pointer via the CSS variables from <PointerField>.
 */
const tiles: { label: string; icon: IconName }[] = [
  { label: "MOT", icon: "shield" },
  { label: "Servicing", icon: "wrench" },
  { label: "Tyres", icon: "tyre" },
  { label: "Diagnostics", icon: "gauge" },
];

const depth = (n: number) =>
  ({ translate: `calc(var(--mx) * ${n}px) calc(var(--my) * ${n}px)` }) as React.CSSProperties;

export function HeroVisual() {
  const name = `Your ${siteConfig.audience.singular.charAt(0).toUpperCase()}${siteConfig.audience.singular.slice(1)}`;

  return (
    <div
      role="img"
      aria-label={`Illustration of a ${siteConfig.audience.singular} website shown on a laptop and a phone`}
      className="relative mx-auto w-full max-w-[46rem] pb-[14%] pl-[9%] lg:mr-0"
    >
      {/* Desktop browser */}
      <div className="fade-up [--d:650ms]" aria-hidden="true">
        <div style={depth(-14)} className="@container transition-[translate] duration-700 ease-[var(--ease-out)]">
        <div className="overflow-hidden rounded-[clamp(10px,1.6cqw,18px)] bg-white text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)]">
          {/* chrome */}
          <div className="flex items-center gap-[1cqw] border-b border-ink/[0.07] bg-paper px-[2cqw] py-[1.4cqw]">
            <span className="size-[1.1cqw] rounded-full bg-ink/15" />
            <span className="size-[1.1cqw] rounded-full bg-ink/15" />
            <span className="size-[1.1cqw] rounded-full bg-ink/15" />
            <span className="ml-[3cqw] flex h-[3.2cqw] w-[40%] items-center gap-[0.8cqw] rounded-full bg-white px-[1.4cqw] text-[1.35cqw] text-slate">
              <svg viewBox="0 0 10 12" className="h-[1.3cqw] w-auto" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="1" y="5" width="8" height="6" rx="1" />
                <path d="M3 5V3.5a2 2 0 0 1 4 0V5" />
              </svg>
              yourdomain.co.uk
            </span>
          </div>

          {/* site nav */}
          <div className="flex items-center justify-between px-[3.5cqw] py-[2.2cqw]">
            <span className="flex items-center gap-[1cqw] text-[1.8cqw] font-bold tracking-[-0.02em]">
              <span className="grid size-[2.8cqw] place-items-center rounded-[0.6cqw] bg-ink text-white">
                <Icon name="wrench" className="size-[1.8cqw]" strokeWidth={2} />
              </span>
              {name}
            </span>
            <span className="hidden items-center gap-[2.4cqw] text-[1.4cqw] text-slate @[280px]:flex">
              <span>Services</span>
              <span>MOT</span>
              <span>About</span>
              <span className="flex items-center gap-[0.6cqw] rounded-full bg-accent px-[1.6cqw] py-[0.8cqw] font-semibold text-white">
                <Icon name="phone" className="size-[1.4cqw]" strokeWidth={2} />
                Call us
              </span>
            </span>
          </div>

          {/* site hero */}
          <div className="grid grid-cols-[1.15fr_1fr] gap-[3cqw] px-[3.5cqw] pb-[3cqw] pt-[1.5cqw]">
            <div className="flex flex-col justify-center">
              <p className="font-display text-[4.6cqw] font-semibold leading-[0.98] tracking-[-0.04em]">
                MOT, servicing and repairs, done properly.
              </p>
              <span className="mt-[2cqw] block h-[1cqw] w-[88%] rounded-full bg-ink/10" />
              <span className="mt-[1cqw] block h-[1cqw] w-[64%] rounded-full bg-ink/10" />
              <span className="mt-[2.8cqw] flex gap-[1.2cqw] text-[1.45cqw] font-semibold">
                <span className="rounded-full bg-ink px-[2.2cqw] py-[1.2cqw] text-white">Book an MOT</span>
                <span className="rounded-full border border-ink/20 px-[2.2cqw] py-[1.2cqw]">Call now</span>
              </span>
            </div>
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.4cqw] bg-ink">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--accent)_0%,transparent_60%)] opacity-70" />
              <div className="absolute -bottom-[18%] -right-[18%] aspect-square w-[95%] rounded-full border-[1.6cqw] border-white/10" />
              <div className="absolute -bottom-[4%] -right-[4%] aspect-square w-[62%] rounded-full border-[1.2cqw] border-white/15" />
              <div className="absolute bottom-[14%] right-[14%] aspect-square w-[30%] rounded-full bg-white/10" />
              <span className="absolute left-[7%] top-[7%] flex items-center gap-[0.8cqw] rounded-full bg-white/95 px-[1.4cqw] py-[0.8cqw] text-[1.3cqw] font-semibold">
                <span className="size-[1cqw] rounded-full bg-emerald-500" />
                Open today
              </span>
            </div>
          </div>

          {/* service tiles */}
          <div className="grid grid-cols-4 gap-[1.4cqw] border-t border-ink/[0.07] bg-paper/60 px-[3.5cqw] py-[2.6cqw]">
            {tiles.map((t) => (
              <span key={t.label} className="flex flex-col gap-[1.2cqw] rounded-[1cqw] bg-white p-[1.6cqw] shadow-[0_1px_0_rgba(12,14,19,0.06)]">
                <Icon name={t.icon} className="size-[2.6cqw] text-accent" strokeWidth={1.8} />
                <span className="text-[1.45cqw] font-semibold">{t.label}</span>
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Phone */}
      <div className="fade-up absolute bottom-0 left-0 w-[30%] min-w-[7.5rem] [--d:900ms]" aria-hidden="true">
        <div style={depth(26)} className="@container transition-[translate] duration-700 ease-[var(--ease-out)]">
        <div className="rounded-[13cqw] bg-[#1d212b] p-[3.5cqw] shadow-[0_40px_70px_-25px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)]">
          <div className="overflow-hidden rounded-[10cqw] bg-white text-ink">
            <div className="flex items-center justify-between px-[7cqw] pb-[4cqw] pt-[8cqw]">
              <span className="text-[6cqw] font-bold tracking-[-0.02em]">{name}</span>
              <span className="flex flex-col gap-[1.6cqw]">
                <span className="block h-[1.2cqw] w-[7cqw] rounded-full bg-ink" />
                <span className="block h-[1.2cqw] w-[5cqw] rounded-full bg-ink" />
              </span>
            </div>
            <div className="px-[7cqw] pb-[8cqw]">
              <p className="font-display text-[11cqw] font-semibold leading-[0.95] tracking-[-0.04em]">MOT and servicing</p>
              <span className="mt-[5cqw] block h-[2.6cqw] w-[90%] rounded-full bg-ink/10" />
              <span className="mt-[2.4cqw] block h-[2.6cqw] w-[60%] rounded-full bg-ink/10" />
              <span className="relative mt-[7cqw] flex items-center justify-center gap-[2cqw] rounded-full bg-accent py-[5cqw] text-[5.6cqw] font-semibold text-white">
                <span className="pulse-ring absolute inset-0 rounded-full border-2 border-accent" />
                <Icon name="phone" className="size-[5.5cqw]" strokeWidth={2} />
                Call now
              </span>
              <span className="mt-[3cqw] flex items-center justify-center rounded-full border border-ink/20 py-[4.6cqw] text-[5.6cqw] font-semibold">
                Book an MOT
              </span>
              <span className="mt-[6cqw] grid grid-cols-2 gap-[3cqw]">
                {tiles.slice(0, 2).map((t) => (
                  <span key={t.label} className="rounded-[4cqw] bg-paper p-[4cqw]">
                    <Icon name={t.icon} className="size-[8cqw] text-accent" strokeWidth={1.8} />
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Enquiry notification */}
      <div className="fade-up absolute right-[-2%] top-[-3%] w-[min(17rem,46%)] [--d:1250ms]" aria-hidden="true">
        <div
          style={depth(38)}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-raised/95 p-3 text-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-[translate] duration-700 ease-[var(--ease-out)] sm:p-3.5"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent sm:size-10">
            <Icon name="mail" size={18} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[0.8rem] font-semibold sm:text-sm">New enquiry</span>
            <span className="block truncate text-[0.72rem] text-fog sm:text-[0.8rem]">Full service and MOT</span>
          </span>
          <span className="ml-auto hidden self-start text-[0.7rem] text-fog sm:block">now</span>
        </div>
      </div>
    </div>
  );
}
