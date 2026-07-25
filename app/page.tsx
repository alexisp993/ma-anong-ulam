import Link from "next/link";
import { SearchIcon, JarIcon, CalendarIcon, CartIcon, HeartIcon, DiceIcon, type IconProps } from "@/components/icons";

const FEATURES: {
  label: string;
  href: string;
  description: string;
  icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { label: "Recipes", href: "/recipes", description: "Browse the recipe collection.", icon: SearchIcon },
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
  { label: "Favorites", href: "/favorites", description: "Revisit the meals you saved.", icon: HeartIcon },
];

export default function HomePage() {
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

      <section aria-label="Other features" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FEATURES.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="rounded-card border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-card bg-accent/15 text-accent-dark">
                <FeatureIcon size={20} />
              </div>
              <p className="font-semibold text-text">{feature.label}</p>
              <p className="mt-1 text-sm text-text-muted">{feature.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
