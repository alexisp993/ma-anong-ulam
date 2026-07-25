import type { ReactNode } from "react";

type BadgeVariant = "easy" | "medium" | "hard" | "budget" | "quick" | "pantry";

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  easy: "bg-accent/15 text-accent-dark",
  medium: "bg-secondary/30 text-text",
  hard: "bg-primary/15 text-primary-dark",
  budget: "bg-accent/15 text-accent-dark",
  quick: "bg-secondary/30 text-text",
  pantry: "bg-accent text-white",
};

// Matches "Status Badges" from icon pack.png — plain colored pills, no icon
// glyph inside.
export function Badge({ variant, children }: { variant: BadgeVariant; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
