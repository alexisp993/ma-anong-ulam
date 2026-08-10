import Image from "next/image";
import Link from "next/link";
import type { PantryRecommendation } from "@/lib/pantry";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { ClockIcon, WalletIcon, CheckCircleIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { difficultyBadgeVariant } from "@/lib/constants";

export function PantryMatchCard({ recipe }: { recipe: PantryRecommendation }) {
  const ready = recipe.missingIngredients.length === 0;

  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
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
          {ready && (
            <div className="absolute left-2 top-2">
              <Badge variant="pantry">Ready to Cook</Badge>
            </div>
          )}
        </div>
        <div className="space-y-2 p-3">
          <p className="pr-8 font-semibold text-text">{recipe.name}</p>
          <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <CheckCircleIcon size={16} />
            {recipe.matchedCount} / {recipe.totalCount} Ingredients
          </p>
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <ClockIcon size={15} />
              {recipe.prepTime + recipe.cookTime} min
            </span>
            <span className="flex items-center gap-1">
              <WalletIcon size={15} />₱{recipe.estimatedCost.toFixed(0)}
            </span>
            <Badge variant={difficultyBadgeVariant(recipe.difficulty)}>{recipe.difficulty}</Badge>
          </div>
          {!ready && (
            <p className="text-xs text-text-muted">
              Missing: {recipe.missingIngredients.join(", ")}
            </p>
          )}
        </div>
      </Link>
      <FavoriteButton
        recipeId={recipe.id}
        className="absolute right-2 top-2 !px-2 !py-1 !text-xs shadow-sm"
      />
    </div>
  );
}
