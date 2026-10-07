import Image from "next/image";
import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Instagram call-out. There is no live Instagram connection: real posts are
 * added by hand in site.config.ts (instagramSection.posts). Until then the
 * grid shows brand compositions rather than pretending to be posts.
 */
export function InstagramSection() {
  const { instagramSection: ig, instagram, instagramUrl } = siteConfig;
  const hasPosts = ig.posts.length > 0;

  return (
    <section aria-labelledby="instagram-title" className="section grain relative isolate overflow-hidden bg-ink text-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h2 id="instagram-title" className="display-lg max-w-[11ch]">
            {ig.heading}
          </h2>
          <p className="lede mt-7 text-fog">{ig.text}</p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-4 font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-white min-[400px]:text-[2rem] sm:text-[2.6rem]"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-6 sm:size-14">
              <Icon name="instagram" size={26} />
            </span>
            <span className="link-draw whitespace-nowrap">Follow {instagram}</span>
          </a>
          <div className="mt-10">
            <Button href={instagramUrl} variant="light" size="lg" icon="arrowUpRight">
              {ig.cta}
            </Button>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {hasPosts
              ? ig.posts.slice(0, 6).map((post) => (
                  <li key={post.url}>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-square overflow-hidden rounded-2xl bg-ink-raised"
                    >
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                      />
                    </a>
                  </li>
                ))
              : tiles.map((Tile, i) => (
                  <li key={i}>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-square overflow-hidden rounded-2xl bg-ink-raised ring-1 ring-white/[0.06]"
                    >
                      <span className="sr-only">Visit {instagram} on Instagram</span>
                      <div aria-hidden="true" className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105">
                        <Tile />
                      </div>
                      <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Icon name="instagram" size={28} />
                      </span>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Brand compositions shown until real posts are added. Built from the logo's shapes and colours. */
const L = "M0 0H52.5L110 182H65.5Z";
const R = "M157 0H210L153 182H110Z";

const tiles = [
  () => (
    <div className="absolute inset-0 grid place-items-center bg-accent">
      <svg viewBox="0 0 210 182" className="w-[46%]" aria-hidden="true">
        <path d={L} fill="var(--ink)" />
        <path d={R} fill="var(--paper)" />
      </svg>
    </div>
  ),
  () => (
    <div className="absolute inset-0 bg-paper p-[12%] text-ink">
      <p className="font-display text-[clamp(1.4rem,3.2vw,2.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">Fill the diary.</p>
      <span className="absolute bottom-[12%] left-[12%] h-[8%] w-[46%] rounded-full bg-accent" />
    </div>
  ),
  () => (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <svg viewBox="0 0 210 182" className="absolute -right-[30%] -top-[10%] w-[150%] opacity-90" aria-hidden="true">
        <path d={R} fill="var(--accent)" />
      </svg>
    </div>
  ),
  () => (
    <div className="absolute inset-0 grid grid-cols-2 gap-[6%] bg-ink-raised p-[12%]">
      {["var(--accent)", "var(--paper)", "var(--accent-bright)", "#2b2d36"].map((c) => (
        <span key={c} className="rounded-full" style={{ background: c }} />
      ))}
    </div>
  ),
  () => (
    <div className="absolute inset-0 bg-paper">
      <div className="absolute inset-x-[14%] top-[16%] bottom-0 rounded-t-[1.2rem] border-[6px] border-b-0 border-ink bg-white p-[8%]">
        <span className="block h-[10%] w-[50%] rounded-full bg-ink" />
        <span className="mt-[12%] block h-[16%] w-[90%] rounded bg-ink/10" />
        <span className="mt-[8%] block h-[18%] w-full rounded-full bg-accent" />
      </div>
    </div>
  ),
  () => (
    <div className="absolute inset-0 grid place-items-center bg-ink">
      <span className="font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-white">
        Aa
      </span>
      <span className="slash absolute bottom-[14%] right-[16%] text-[1.6rem]" style={{ ["--slash-color" as string]: "var(--accent-bright)" }} />
    </div>
  ),
];
