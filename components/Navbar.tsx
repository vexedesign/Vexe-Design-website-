"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { links, cta } = siteConfig.nav;

  // Solid background once scrolled; tuck away on scroll down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Keep keyboard and screen-reader focus inside the menu.
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    behind.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)]",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-line-dark bg-ink/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
        aria-hidden="true"
      />
      <nav aria-label="Main" className="container-x relative z-10 flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" className="relative z-10 -m-2 p-2" aria-label={`${siteConfig.businessName}, home`}>
          <Logo eager />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                  isActive(link.href) ? "text-white" : "text-fog hover:text-white",
                )}
              >
                {isActive(link.href) && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 text-[0.95rem] font-medium text-fog transition-colors hover:text-white lg:flex"
          >
            <Icon name="phone" size={16} />
            {siteConfig.phone}
          </a>
          <Button href={cta.href} size="md">
            {cta.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 -mr-2 grid size-12 place-items-center rounded-full text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-500 ease-[var(--ease-out)]",
                open ? "top-[5px] rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[2px] rounded-full bg-current transition-all duration-500 ease-[var(--ease-out)]",
                open ? "top-[5px] w-6 -rotate-45" : "top-[10px] w-4",
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 top-0 z-0 flex flex-col overflow-y-auto bg-ink px-[var(--gutter)] pb-8 pt-[calc(var(--nav-h)+2rem)] md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="flex flex-col">
              {links.map((link, i) => (
                <m.li
                  key={link.href}
                  className="border-b border-line-dark"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-display text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white"
                  >
                    {link.label}
                    <span
                      className={cn(
                        "size-2.5 rounded-full transition-colors",
                        isActive(link.href) ? "bg-accent-bright" : "bg-transparent",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </m.li>
              ))}
            </ul>
            <m.div
              className="mt-auto flex flex-col gap-6 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button href={cta.href} size="lg" className="w-full">
                {cta.label}
              </Button>
              <div className="grid gap-3 text-fog">
                <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-lg text-white">
                  <Icon name="phone" size={18} /> {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3">
                  <Icon name="mail" size={18} /> {siteConfig.email}
                </a>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <Icon name="instagram" size={18} /> {siteConfig.instagram}
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
