import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/recipes";
import { FavoriteButton } from "@/components/recipe/FavoriteButton";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { ArrowLeftIcon, WalletIcon, ClockIcon, UsersIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { difficultyBadgeVariant } from "@/lib/constants";

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

  return (
    <article className="space-y-6">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary"
      >
        <ArrowLeftIcon size={16} />
        Back to Recipes
      </Link>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-text">{recipe.name}</h1>
        <FavoriteButton recipeId={recipe.id} />
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-border shadow-sm">
        <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover" />
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-card border border-border bg-surface p-4 text-sm shadow-sm sm:grid-cols-3">
        <div className="space-y-1">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <CategoryIcon category={recipe.category} size={15} />
            Category
          </dt>
          <dd className="font-medium text-text">{recipe.category}</dd>
        </div>
        <div className="space-y-1">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <WalletIcon size={15} />
            Estimated Cost
          </dt>
          <dd className="font-medium text-text">₱{recipe.estimatedCost.toFixed(0)}</dd>
        </div>
        <div className="space-y-1">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <ClockIcon size={15} />
            Prep Time
          </dt>
          <dd className="font-medium text-text">{recipe.prepTime} min</dd>
        </div>
        <div className="space-y-1">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <ClockIcon size={15} />
            Cook Time
          </dt>
          <dd className="font-medium text-text">{recipe.cookTime} min</dd>
        </div>
        <div className="space-y-1">
          <dt className="flex items-center gap-1.5 text-text-muted">
            <UsersIcon size={15} />
            Servings
          </dt>
          <dd className="font-medium text-text">{recipe.servings}</dd>
        </div>
        <div className="space-y-1">
          <dt className="text-text-muted">Difficulty</dt>
          <dd>
            <Badge variant={difficultyBadgeVariant(recipe.difficulty)}>{recipe.difficulty}</Badge>
          </dd>
        </div>
      </dl>

      <p className="text-text">{recipe.description}</p>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-text">Ingredients</h2>
        <ul className="space-y-1 text-text">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex justify-between border-b border-border py-1.5 text-sm">
              <span>{ingredient.name}</span>
              <span className="text-text-muted">
                {ingredient.quantity} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-text">Instructions</h2>
        <ol className="list-decimal space-y-2 pl-5 text-text">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
