import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SunIcon, MoonIcon, WalletIcon } from "@/components/icons";

interface MealCardProps {
  label: string;
  recipeId: string;
  name: string;
  estimatedCost: number;
  onReplace: () => void;
  replacing: boolean;
}

// "Compact Recipe Card" variant per FRONTEND_SPEC.md §12.6 — name, cost,
// Replace only (no image/category/difficulty).
export function MealCard({
  label,
  recipeId,
  name,
  estimatedCost,
  onReplace,
  replacing,
}: MealCardProps) {
  const LabelIcon = label === "Lunch" ? SunIcon : MoonIcon;

  return (
    <div className="space-y-1.5 rounded-card border border-border bg-background p-2.5">
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
        <LabelIcon size={14} />
        {label}
      </p>
      <Link
        href={`/recipes/${recipeId}`}
        className="block text-sm font-semibold text-text transition-colors duration-150 hover:text-primary active:opacity-70"
      >
        {name}
      </Link>
      <p className="flex items-center gap-1 text-xs text-text-muted">
        <WalletIcon size={13} />₱{estimatedCost.toFixed(0)}
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={onReplace}
        loading={replacing}
        className="!px-3 !py-1 !text-xs"
      >
        Replace
      </Button>
    </div>
  );
}
