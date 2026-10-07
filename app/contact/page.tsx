import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { budgetForPackage } from "@/lib/enquiry";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({ ...siteConfig.seo.contact, path: "/contact" });

type ContactPageProps = {
  searchParams: Promise<{ package?: string; service?: string }>;
};

const nextSteps = [
  { title: "We read your enquiry", text: "and come back to you using the contact method you choose." },
  { title: "A short call", text: "to understand your business, your customers and what the site needs to do." },
  { title: "A clear proposal", text: "with the package, what's included and the price, before any work starts." },
];

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultBudget = budgetForPackage(params.package);
  const defaultService = params.service ?? (params.package ? "Website Design" : "");

  const channels: { label: string; value: string; href: string; icon: IconName; external?: boolean }[] = [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: "mail" },
    { label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref, icon: "phone" },
    { label: "Instagram", value: siteConfig.instagram, href: siteConfig.instagramUrl, icon: "instagram", external: true },
  ];

  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-ink pb-40 text-white md:pb-48">
        <div className="grid-guides absolute inset-0 -z-10" aria-hidden="true" />
        <svg
          aria-hidden="true"
          viewBox="0 0 210 182"
          className="fade-up absolute -right-[30%] top-[6%] -z-10 w-[110vw] [--d:150ms] sm:-right-[10%] sm:top-[-14%] sm:w-[62vw] lg:w-[46vw]"
        >
          <defs>
            <linearGradient id="contact-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.85" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 0H52.5L110 182H65.5Z" fill="#fff" opacity="0.04" />
          <path d="M157 0H210L153 182H110Z" fill="url(#contact-violet)" />
        </svg>

        <div className="container-x pt-[calc(var(--nav-h)+4rem)] md:pt-[calc(var(--nav-h)+6rem)]">
          <p className="caption fade-up mb-7 flex items-center gap-3 text-fog">
            <span className="slash" style={{ ["--slash-color" as string]: "var(--accent-bright)" }} aria-hidden="true" />
            Contact
          </p>
          <h1 className="fade-up max-w-[12ch] text-[clamp(2.75rem,8vw,7rem)] leading-[0.9] tracking-[-0.032em] [--d:80ms]">
            Let&apos;s build something great.
          </h1>
          <p className="lede fade-up mt-8 text-fog [--d:180ms]">
            Tell us about your business, your goals and what you need from your new website.
          </p>
        </div>
      </section>

      <section aria-label="Enquiry form and contact details" className="on-light relative bg-paper pb-24 md:pb-32">
        <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Form card, overlapping the header */}
          <div className="relative z-10 -mt-28 rounded-[2rem] bg-white p-6 shadow-[0_50px_100px_-50px_rgba(20,21,26,0.45)] ring-1 ring-ink/[0.04] sm:p-10 md:-mt-36 lg:order-2 lg:col-span-8 lg:p-12">
            <h2 className="font-display text-[2rem] leading-none tracking-[-0.03em] text-ink">Send an enquiry</h2>
            <p className="mb-8 mt-3 text-slate">A few details and we&apos;ll take it from there.</p>
            <ContactForm defaultService={defaultService} defaultBudget={defaultBudget} />
          </div>

          {/* Direct contact */}
          <aside className="lg:order-1 lg:col-span-4 lg:pt-16" aria-labelledby="direct-title">
            <h2 id="direct-title" className="font-display text-[1.6rem] leading-none tracking-[-0.025em] text-ink">
              Prefer to talk?
            </h2>
            <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-line-light bg-white/60 p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors duration-300 group-hover:bg-accent">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate">{c.label}</span>
                      <span className="block truncate text-[1.05rem] font-semibold text-ink">{c.value}</span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      size={18}
                      className="ml-auto shrink-0 text-ink/40 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-[1.6rem] leading-none tracking-[-0.025em] text-ink">What happens next</h2>
            <ol className="mt-6 grid gap-6">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="font-display text-[1.4rem] font-semibold leading-none tracking-[-0.03em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate">
                    <span className="font-semibold text-ink">{s.title}</span> {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
