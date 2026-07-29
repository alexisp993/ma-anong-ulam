import Image from "next/image";
import Link from "next/link";
import type { RecipeSummary } from "@/lib/recipes";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
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
    <div className="group relative overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/recipes/${recipe.id}`}
        className="block transition-transform duration-150 active:scale-[0.98]"
      >
        <div className="relative aspect-[4/3] w-full bg-border">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {isBudgetFriendly && <Badge variant="budget">Budget Friendly</Badge>}
            {isQuickMeal && <Badge variant="quick">Quick Meal</Badge>}
          </div>
        </div>
        <div className="space-y-2 p-3">
          <p className="pr-8 font-semibold text-text">{recipe.name}</p>
          <div className="flex items-center gap-1.5 text-sm text-text-muted">
            <CategoryIcon category={recipe.category} size={16} />
            {recipe.category}
          </div>
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <ClockIcon size={15} />
              {totalTime} min
            </span>
            <span className="flex items-center gap-1">
              <WalletIcon size={15} />₱{recipe.estimatedCost.toFixed(0)}
            </span>
            <Badge variant={difficultyBadgeVariant(recipe.difficulty)}>{recipe.difficulty}</Badge>
          </div>
        </div>
      </Link>
      <FavoriteButton
        recipeId={recipe.id}
        className="absolute right-2 top-2 !px-2 !py-1 !text-xs shadow-sm"
      />
    </div>
  );
}
