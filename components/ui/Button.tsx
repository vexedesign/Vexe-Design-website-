import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "outlineLight" | "dark";
type Size = "md" | "lg";

const variants: Record<Variant, { base: string; chip: string }> = {
  primary: {
    base: "bg-accent text-white hover:bg-accent-deep shadow-[0_10px_30px_-12px_var(--accent)]",
    chip: "bg-white/15 group-hover:bg-white/25",
  },
  light: {
    base: "bg-white text-ink hover:bg-paper",
    chip: "bg-ink text-white",
  },
  outline: {
    base: "border border-white/22 text-white hover:border-white/60 hover:bg-white/[0.04]",
    chip: "bg-white/10 group-hover:bg-white group-hover:text-ink",
  },
  outlineLight: {
    base: "on-light border border-ink/15 text-ink hover:border-ink/50",
    chip: "bg-ink/[0.06] group-hover:bg-ink group-hover:text-white",
  },
  dark: {
    base: "on-light bg-ink text-white hover:bg-ink-raised",
    chip: "bg-white/12 group-hover:bg-accent",
  },
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-5 pr-1.5 text-[0.95rem] gap-3",
  lg: "h-14 pl-6 pr-2 text-base gap-4",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

function Inner({ children, icon, variant, size }: Required<Pick<CommonProps, "variant" | "size">> & Pick<CommonProps, "children" | "icon">) {
  return (
    <>
      <span className="relative whitespace-nowrap font-semibold tracking-[-0.01em]">{children}</span>
      {icon !== null && (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-300",
            size === "lg" ? "size-10" : "size-9",
            variants[variant].chip,
          )}
        >
          <Icon
            name={icon ?? "arrow"}
            size={16}
            strokeWidth={2}
            className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  );
}

/**
 * The one button used everywhere. Pass `href` for a link (internal routes,
 * mailto:, tel: and external URLs are all handled), or omit it for a <button>.
 */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = "primary", size = "md", icon, className, ...rest } = props;
  const classes = cn(
    "group relative inline-flex items-center justify-between rounded-full select-none",
    "transition-[background-color,border-color,box-shadow,transform] duration-300 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    sizes[size],
    variants[variant].base,
    icon === null && "pr-6",
    className,
  );
  const inner = <Inner variant={variant} size={size} icon={icon}>{children}</Inner>;

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as LinkButtonProps;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {inner}
        </Link>
      );
    }
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {inner}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
