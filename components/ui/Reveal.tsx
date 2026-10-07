import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger amount (0–0.3 works well). Shifts when the reveal starts as the element scrolls in. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Fades content up as it scrolls into view, using CSS scroll-driven
 * animations (see .reveal in globals.css). Zero JavaScript: browsers without
 * support, and visitors who prefer reduced motion, simply see the content.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-shift": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
