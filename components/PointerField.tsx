"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tracks the pointer over its area and exposes it as CSS variables:
 *   --mx / --my  range -0.5 … 0.5 (for parallax transforms)
 *   --px / --py  pixel position (for spotlight gradients)
 * No React re-renders; disabled for touch devices and reduced motion.
 */
export function PointerField({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--px", `${x}px`);
        el.style.setProperty("--py", `${y}px`);
        el.style.setProperty("--mx", (x / r.width - 0.5).toFixed(3));
        el.style.setProperty("--my", (y / r.height - 0.5).toFixed(3));
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}>
      {children}
    </div>
  );
}
