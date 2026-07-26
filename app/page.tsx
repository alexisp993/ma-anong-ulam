import Link from "next/link";
import { JarIcon, CalendarIcon, CartIcon, DiceIcon, type IconProps } from "@/components/icons";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { getRecipes } from "@/lib/recipes";
import { BUDGET_FRIENDLY_MAX_COST, QUICK_MEAL_MAX_MINUTES } from "@/lib/constants";

const SHORTCUTS: {
  label: string;
  href: string;
  description: string;
  icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { label: "Pantry", href: "/pantry", description: "Cook with what you already have.", icon: JarIcon },
  {
    label: "Weekly Planner",
    href: "/weekly-planner",
    description: "Plan lunch and dinner for the week.",
    icon: CalendarIcon,
  },
  {
    label: "Grocery List",
    href: "/grocery-list",
    description: "Get a shopping list from your plan.",
    icon: CartIcon,
  },
];

export default async function HomePage() {
  const recipes = await getRecipes({});
  const tryThese = recipes
    .filter((recipe) => {
      const totalTime = recipe.prepTime + recipe.cookTime;
      return recipe.estimatedCost <= BUDGET_FRIENDLY_MAX_COST || totalTime <= QUICK_MEAL_MAX_MINUTES;
    })
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-card border border-border bg-surface px-6 py-10 text-center shadow-sm">
        <div className="flex justify-center text-primary">
          <DiceIcon size={40} />
        </div>
        <h1 className="text-2xl font-bold text-text sm:text-3xl">Ma, anong ulam?</h1>
        <p className="mx-auto max-w-md text-text-muted">
          Tell us your budget and family size — we&apos;ll suggest a few practical
          Filipino meals in under a minute.
        </p>
        <Link
          href="/kahit-ano"
          className="inline-block rounded-card bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Kahit Ano
        </Link>
      </section>

      <section aria-label="Shortcuts" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SHORTCUTS.map((shortcut) => {
          const ShortcutIcon = shortcut.icon;
          return (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="rounded-card border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-card bg-accent/15 text-accent-dark">
                <ShortcutIcon size={20} />
              </div>
              <p className="font-semibold text-text">{shortcut.label}</p>
              <p className="mt-1 text-sm text-text-muted">{shortcut.description}</p>
            </Link>
          );
        })}
      </section>

      <section aria-label="Try these recipes" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text">Try These</h2>
            <p className="text-sm text-text-muted">Budget-friendly, quick Filipino meals.</p>
          </div>
          <Link href="/recipes" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {tryThese.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {tryThese.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="rounded-card border border-border bg-surface p-4 text-sm text-text-muted">
            No recipes to show right now.
          </p>
        )}
      </section>
    </div>
  );
}
