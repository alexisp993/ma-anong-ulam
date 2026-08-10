import Image from "next/image";
import Link from "next/link";
import type { RecipeSummary } from "@/lib/recipes";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { ClockIcon, WalletIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import {
  BUDGET_FRIENDLY_MAX_COST,
  QUICK_MEAL_MAX_MINUTES,
  difficultyBadgeVariant,
} from "@/lib/constants";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const isBudgetFriendly = recipe.estimatedCost <= BUDGET_FRIENDLY_MAX_COST;
  const isQuickMeal = totalTime <= QUICK_MEAL_MAX_MINUTES;

  return (
    <div className="group relative overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow duration-150 hover:shadow-md">
      <Link
        href={`/recipes/${recipe.id}`}
        className="block transition-transform duration-150 active:scale-[0.98]"
      >
        <div className="relative aspect-[4/3] w-full bg-surface-muted">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-2 p-3">
          <p className="pr-9 font-bold leading-snug text-text line-clamp-2">{recipe.name}</p>

          {/* Time reads as the primary at-a-glance fact in the reference
              design, so it gets a pill of its own rather than a plain row. */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-pill bg-surface-muted px-2 py-0.5 text-xs font-semibold text-text-muted">
              <ClockIcon size={12} />
              {totalTime} mins
            </span>
            <span className="inline-flex items-center gap-1 rounded-pill bg-surface-muted px-2 py-0.5 text-xs font-semibold text-text-muted">
              <WalletIcon size={12} />₱{recipe.estimatedCost.toFixed(0)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={difficultyBadgeVariant(recipe.difficulty)}>{recipe.difficulty}</Badge>
            {isBudgetFriendly && <Badge variant="budget">Budget</Badge>}
            {isQuickMeal && <Badge variant="quick">Quick</Badge>}
          </div>
        </div>
      </Link>
      <FavoriteButton recipeId={recipe.id} compact className="absolute right-2 top-2" />
    </div>
  );
}
