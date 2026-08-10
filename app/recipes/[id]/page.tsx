import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/recipes";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { RecipeTabs } from "@/components/recipe/RecipeTabs";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { ArrowLeftIcon, WalletIcon, ClockIcon, UsersIcon, SlidersIcon } from "@/components/icons";
import { StatRow } from "@/components/ui/StatRow";
import { IngredientThumb } from "@/components/ui/IngredientThumb";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  // DATABASE_SCHEMA.md stores instructions as a single Text field; the
  // pipeline joins steps with "\n" at seed time, so split back into an
  // ordered list for display per PRODUCT_BLUEPRINT.md's Recipe Rules.
  const steps = recipe.instructions.split("\n").filter(Boolean);

  const ingredientList = (
    <ul className="divide-y divide-border">
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-center gap-3 py-2.5 text-sm">
          <IngredientThumb name={ingredient.name} size={32} />
          <span className="flex-1 text-text">{ingredient.name}</span>
          <span className="font-semibold text-text-muted">
            {ingredient.quantity} {ingredient.unit}
          </span>
        </li>
      ))}
    </ul>
  );

  const stepList = (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3 text-sm text-text">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-primary-tint text-xs font-bold text-primary"
          >
            {index + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/recipes"
          aria-label="Back to Recipes"
          className="flex h-9 w-9 items-center justify-center rounded-pill border border-border text-text transition-[background-color,transform] duration-150 hover:bg-primary-tint active:scale-[0.97]"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <h1 className="flex-1 text-center text-xl font-extrabold text-text">{recipe.name}</h1>
        {/* The reference shows a kebab menu here, but there are no other
            actions to put in one — favoriting is the only thing it could
            hold, so it goes straight in the header instead. */}
        <FavoriteButton recipeId={recipe.id} compact />
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-muted shadow-sm">
        <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover" priority />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
          <CategoryIcon category={recipe.category} size={14} />
          {recipe.category}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-muted px-3 py-1 text-xs font-semibold text-text-muted">
          <WalletIcon size={14} />₱{recipe.estimatedCost.toFixed(0)}
        </span>
      </div>

      <p className="text-center text-text-muted">{recipe.description}</p>

      <StatRow
        items={[
          { icon: ClockIcon, label: "Prep Time", value: `${recipe.prepTime} mins` },
          { icon: ClockIcon, label: "Cook Time", value: `${recipe.cookTime} mins` },
          { icon: SlidersIcon, label: "Difficulty", value: recipe.difficulty },
          { icon: UsersIcon, label: "Servings", value: String(recipe.servings) },
        ]}
      />

      <RecipeTabs ingredients={ingredientList} steps={stepList} />

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* There's no "add this recipe to a specific day" flow yet, so this
            opens the planner rather than pretending to schedule it. */}
        <ButtonLink href="/weekly-planner" className="flex-1">
          Add to Planner
        </ButtonLink>
        <FavoriteButton recipeId={recipe.id} className="flex-1 justify-center" />
      </div>
    </article>
  );
}
