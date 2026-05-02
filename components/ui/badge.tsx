import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-colors",
  {
    variants: {
      tone: {
        neutral:
          "bg-[var(--color-surface)] border-[var(--color-line-2)] text-[var(--color-ink-2)]",
        accent:
          "bg-[var(--color-accent-soft)] border-transparent text-[var(--color-accent)]",
        active:
          "bg-[oklch(48%_0.10_145/0.10)] border-transparent text-[oklch(48%_0.10_145)]",
        warn:
          "bg-[oklch(68%_0.13_80/0.10)] border-transparent text-[oklch(58%_0.13_80)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, tone, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {children}
    </div>
  );
}

export { badgeVariants };
