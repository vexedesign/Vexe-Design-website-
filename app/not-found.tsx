import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[85svh] items-center overflow-hidden bg-ink text-white">
      <svg aria-hidden="true" viewBox="0 0 210 182" className="absolute -right-[12%] top-[8%] -z-10 w-[80vw] max-w-[56rem] opacity-80">
        <path d="M0 0H52.5L110 182H65.5Z" fill="#fff" opacity="0.04" />
        <path d="M157 0H210L153 182H110Z" fill="var(--accent)" opacity="0.5" />
      </svg>
      <div className="container-x pt-[var(--nav-h)]">
        <p className="caption text-fog">Error 404</p>
        <h1 className="mt-5 max-w-[12ch] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.032em]">
          This page has moved on.
        </h1>
        <p className="lede mt-7 text-fog">The link may be old, or the address may have a typo. Try one of these instead.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">Back to the homepage</Button>
          <Button href="/contact" size="lg" variant="outline">Start Your Project</Button>
        </div>
      </div>
    </section>
  );
}
