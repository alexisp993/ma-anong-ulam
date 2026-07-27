"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { IngredientPicker } from "@/components/pantry/IngredientPicker";
import { PantryMatchCard } from "@/components/recipe/PantryMatchCard";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { addGuestPantryItem, removeGuestPantryItem } from "@/lib/guest-storage";
import { usePantryItems, type PantryItemLike } from "@/lib/hooks/usePantryItems";
import type { PantryRecommendation } from "@/lib/pantry";
import { JarIcon, TrashIcon, SearchIcon } from "@/components/icons";

type RecStatus = "idle" | "loading" | "success" | "error";

export default function PantryPage() {
  const { data: session } = useSession();
  const { items, setItems, status: pantryStatus, reload: loadPantry } = usePantryItems();
  const [recommendations, setRecommendations] = useState<PantryRecommendation[]>([]);
  const [recStatus, setRecStatus] = useState<RecStatus>("idle");

  async function handleAdd(ingredient: { id: string; name: string }) {
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
          { id: json.data.id, ingredientId: ingredient.id, name: ingredient.name },
        ]);
      }
    } else {
      setItems(addGuestPantryItem({ ingredientId: ingredient.id, name: ingredient.name }));
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
      <h1 className="text-2xl font-bold text-text">Pantry</h1>

      <IngredientPicker onAdd={handleAdd} excludeIds={items.map((item) => item.ingredientId)} />

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
          <ul className="divide-y divide-border rounded-card border border-border bg-surface shadow-sm">
            {items.map((item) => (
              <li key={item.ingredientId} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-text">{item.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.name} from pantry`}
                  className="text-text-muted hover:text-primary"
                >
                  <TrashIcon size={17} />
                </button>
              </li>
            ))}
          </ul>

          <Button type="button" onClick={handleFindRecipes} loading={recStatus === "loading"}>
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recommendations.map((recipe) => (
            <PantryMatchCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
