import type { ReactNode } from "react";

type BadgeVariant = "easy" | "medium" | "hard" | "budget" | "quick" | "pantry";

// Olive for easy/budget, amber for medium/quick, clay for hard. Every pair
// is a dark foreground on a light tint, so all clear WCAG AA.
const VARIANT_STYLES: Record<BadgeVariant, string> = {
  easy: "bg-primary-tint text-primary",
  medium: "bg-secondary/30 text-text",
  hard: "bg-brand/15 text-danger",
  budget: "bg-primary-tint text-primary",
  quick: "bg-secondary/30 text-text",
  pantry: "bg-primary text-white",
};

// Matches "Status Badges" from icon pack.png — plain colored pills, no icon
// glyph inside.
export function Badge({ variant, children }: { variant: BadgeVariant; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-semibold ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
