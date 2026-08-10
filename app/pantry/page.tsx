"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { IngredientPicker } from "@/components/pantry/IngredientPicker";
import { PantryItemCard } from "@/components/pantry/PantryItemCard";
import { PantryMatchCard } from "@/components/recipe/PantryMatchCard";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterPills } from "@/components/ui/FilterPills";
import { addGuestPantryItem, removeGuestPantryItem } from "@/lib/guest-storage";
import { usePantryItems, type PantryItemLike } from "@/lib/hooks/usePantryItems";
import type { PantryRecommendation } from "@/lib/pantry";
import { JarIcon, SearchIcon, PlusIcon, SlidersIcon } from "@/components/icons";

type RecStatus = "idle" | "loading" | "success" | "error";

const ALL = "All";

export default function PantryPage() {
  const { data: session } = useSession();
  const { items, setItems, status: pantryStatus, reload: loadPantry } = usePantryItems();
  const [recommendations, setRecommendations] = useState<PantryRecommendation[]>([]);
  const [recStatus, setRecStatus] = useState<RecStatus>("idle");
  const [category, setCategory] = useState(ALL);
  const [picking, setPicking] = useState(false);

  // Only offer categories the pantry actually contains, most-common first —
  // a fixed list would mostly show empty filters.
  const categoryFilters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      const key = item.category ?? "Other";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value]) => ({ value, label: value }));
    return [{ value: ALL, label: ALL }, ...sorted];
  }, [items]);

  const visibleItems = useMemo(
    () => (category === ALL ? items : items.filter((item) => (item.category ?? "Other") === category)),
    [items, category]
  );

  async function handleAdd(ingredient: { id: string; name: string; category: string }) {
    if (session?.user) {
      const response = await fetch("/api/pantry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientId: ingredient.id }),
      });
      const json = await response.json();
      if (json.success) {
        setItems((prev) => [
          ...prev,
          {
            id: json.data.id,
            ingredientId: ingredient.id,
            name: ingredient.name,
            category: ingredient.category,
          },
        ]);
      }
    } else {
      setItems(
        addGuestPantryItem({
          ingredientId: ingredient.id,
          name: ingredient.name,
          category: ingredient.category,
        })
      );
    }
  }

  async function handleRemove(entry: PantryItemLike) {
    if (session?.user && entry.id) {
      const response = await fetch(`/api/pantry/${entry.id}`, { method: "DELETE" });
      const json = await response.json();
      if (json.success) {
        setItems((prev) => prev.filter((item) => item.id !== entry.id));
      }
    } else {
      setItems(removeGuestPantryItem(entry.ingredientId));
    }
  }

  async function handleFindRecipes() {
    setRecStatus("loading");
    try {
      const response = await fetch("/api/pantry/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientIds: items.map((item) => item.ingredientId) }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      setRecommendations(json.data);
      setRecStatus("success");
    } catch {
      setRecStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Pantry"
        subtitle={items.length > 0 ? `${items.length} ingredient${items.length === 1 ? "" : "s"}` : undefined}
        action={
          <Button
            type="button"
            variant="secondary"
            onClick={() => setPicking((open) => !open)}
            aria-expanded={picking}
            className="!px-3 !py-2"
          >
            {picking ? <SlidersIcon size={16} /> : <PlusIcon size={16} />}
            {picking ? "Done" : "Add"}
          </Button>
        }
      />

      {picking && (
        <Card>
          <IngredientPicker onAdd={handleAdd} excludeIds={items.map((item) => item.ingredientId)} />
        </Card>
      )}

      {pantryStatus === "loading" && <LoadingIndicator label="Loading your pantry…" />}

      {pantryStatus === "error" && <ErrorMessage onRetry={loadPantry} />}

      {pantryStatus === "success" && items.length === 0 && (
        <EmptyState
          icon={<JarIcon size={32} />}
          message={"Your pantry is empty.\nAdd ingredients to receive recipe recommendations."}
        />
      )}

      {pantryStatus === "success" && items.length > 0 && (
        <>
          {categoryFilters.length > 2 && (
            <FilterPills
              items={categoryFilters}
              value={category}
              onChange={setCategory}
              ariaLabel="Filter pantry by category"
            />
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visibleItems.map((item) => (
              <PantryItemCard
                key={item.ingredientId}
                name={item.name}
                category={item.category}
                onRemove={() => handleRemove(item)}
              />
            ))}
          </div>

          <Button
            type="button"
            onClick={handleFindRecipes}
            loading={recStatus === "loading"}
            className="w-full"
          >
            <SearchIcon size={16} />
            Find Recipes
          </Button>
        </>
      )}

      {recStatus === "error" && (
        <ErrorMessage
          message="Unable to generate pantry recommendations."
          onRetry={handleFindRecipes}
        />
      )}

      {recStatus === "success" && recommendations.length === 0 && (
        <EmptyState icon={<SearchIcon size={32} />} message="No recipes match your current pantry." />
      )}

      {recStatus === "success" && recommendations.length > 0 && (
        <section className="space-y-4">
          <SectionHeading title="You can cook these" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {recommendations.map((recipe) => (
              <PantryMatchCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
