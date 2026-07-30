import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SunIcon, MoonIcon, WalletIcon } from "@/components/icons";

interface MealCardProps {
  label: string;
  recipeId: string;
  name: string;
  estimatedCost: number;
  imageUrl: string;
  onReplace: () => void;
  replacing: boolean;
}

// "Compact Recipe Card" variant per FRONTEND_SPEC.md §12.6, extended with a
// small leading thumbnail so the dish is recognizable at a glance in the
// dense 14-card weekly grid (full recipe-card proportions would double each
// card's height here).
export function MealCard({
  label,
  recipeId,
  name,
  estimatedCost,
  imageUrl,
  onReplace,
  replacing,
}: MealCardProps) {
  const LabelIcon = label === "Lunch" ? SunIcon : MoonIcon;

  return (
    <div className="space-y-1.5 rounded-card border border-border bg-background p-2.5">
      <Link
        href={`/recipes/${recipeId}`}
        className="flex items-center gap-2.5 transition-transform duration-150 active:scale-[0.98]"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-card bg-border">
          <Image src={imageUrl} alt={name} fill sizes="56px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
            <LabelIcon size={14} />
            {label}
          </p>
          <p className="truncate text-sm font-semibold text-text">{name}</p>
          <p className="flex items-center gap-1 text-xs text-text-muted">
            <WalletIcon size={13} />₱{estimatedCost.toFixed(0)}
          </p>
        </div>
      </Link>
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
