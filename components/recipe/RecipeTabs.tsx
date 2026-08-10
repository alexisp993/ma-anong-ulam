"use client";

import { useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

type Tab = "ingredients" | "steps";

const TABS = [
  { value: "ingredients" as const, label: "Ingredients" },
  { value: "steps" as const, label: "Steps" },
];

interface RecipeTabsProps {
  ingredients: ReactNode;
  steps: ReactNode;
}

// Takes already-rendered server JSX as props rather than raw recipe data.
// That keeps app/recipes/[id]/page.tsx a server component — the fetch, the
// DB access, and SSR all stay on the server, and only this toggle ships to
// the client. Don't "simplify" this by moving the query in here.
export function RecipeTabs({ ingredients, steps }: RecipeTabsProps) {
  const [tab, setTab] = useState<Tab>("ingredients");

  return (
    <div className="space-y-4">
      <SegmentedControl
        items={TABS}
        value={tab}
        onChange={setTab}
        ariaLabel="Recipe details"
        variant="underline"
        className="w-full"
      />
      <div>{tab === "ingredients" ? ingredients : steps}</div>
    </div>
  );
}
