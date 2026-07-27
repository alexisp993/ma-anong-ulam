import { JarIcon, CalendarIcon, CartIcon, DiceIcon, type IconProps } from "@/components/icons";
import { ShortcutCard } from "@/components/home/ShortcutCard";
import { RecommendedForYou } from "@/components/home/RecommendedForYou";
import { DinnerPlanCard } from "@/components/home/DinnerPlanCard";
import { PantryOverviewCard } from "@/components/home/PantryOverviewCard";

const SHORTCUTS: {
  label: string;
  href: string;
  description: string;
  actionLabel: string;
  icon: (props: IconProps) => React.JSX.Element;
}[] = [
  {
    label: "Kahit Ano",
    href: "/kahit-ano",
    description: "Not sure what to cook? Let us suggest something.",
    actionLabel: "Kahit Ano",
    icon: DiceIcon,
  },
  {
    label: "Weekly Planner",
    href: "/weekly-planner",
    description: "Plan lunch and dinner for the week ahead.",
    actionLabel: "Plan Meals",
    icon: CalendarIcon,
  },
  {
    label: "Pantry",
    href: "/pantry",
    description: "See what you can cook with what you have.",
    actionLabel: "View Pantry",
    icon: JarIcon,
  },
  {
    label: "Grocery List",
    href: "/grocery-list",
    description: "Get a shopping list from your plan.",
    actionLabel: "View List",
    icon: CartIcon,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section aria-label="Shortcuts" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SHORTCUTS.map((shortcut) => (
          <ShortcutCard key={shortcut.href} {...shortcut} />
        ))}
      </section>

      <section aria-label="Your week at a glance" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DinnerPlanCard />
        <PantryOverviewCard />
      </section>

      <RecommendedForYou />
    </div>
  );
}
