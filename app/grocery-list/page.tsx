"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { GROCERY_CATEGORIES } from "@/lib/constants";
import {
  getGuestWeeklyPlan,
  getGuestPurchasedMap,
  setGuestItemPurchased,
  getGuestPantry,
} from "@/lib/guest-storage";
import type { GroceryListView } from "@/lib/grocery-list";
import { CartIcon, RefreshIcon, JarIcon } from "@/components/icons";

type Status = "loading-source" | "no-source" | "ready" | "generating" | "success" | "error";
type GenerateSource = { mealPlanId: string } | { recipeIds: string[] };

export default function GroceryListPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [list, setList] = useState<GroceryListView | null>(null);
  const [status, setStatus] = useState<Status>("loading-source");
  const [source, setSource] = useState<GenerateSource | null>(null);

  async function generateList(src: GenerateSource) {
    setStatus("generating");
    try {
      const response = await fetch("/api/grocery-lists/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(src),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);

      let data: GroceryListView = json.data;
      if (!session?.user) {
        const purchasedMap = getGuestPurchasedMap();
        const pantryIngredientIds = new Set(getGuestPantry().map((item) => item.ingredientId));
        data = {
          ...data,
          items: data.items.map((item) => ({
            ...item,
            purchased: purchasedMap[item.ingredientId] ?? false,
            inPantry: pantryIngredientIds.has(item.ingredientId),
          })),
        };
      }
      setList(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (sessionStatus === "loading") return;

    let cancelled = false;
    async function loadSource() {
      if (session?.user) {
        try {
          const response = await fetch("/api/weekly-planner/current");
          const json = await response.json();
          if (!json.success || !json.data) {
            if (!cancelled) setStatus("no-source");
            return;
          }
          const mealPlanId: string = json.data.mealPlanId;
          if (cancelled) return;
          setSource({ mealPlanId });

          const listResponse = await fetch(`/api/grocery-lists/by-plan/${mealPlanId}`);
          const listJson = await listResponse.json();
          if (cancelled) return;
          if (listJson.success && listJson.data) {
            setList(listJson.data);
            setStatus("success");
          } else {
            setStatus("ready");
          }
        } catch {
          if (!cancelled) setStatus("no-source");
        }
      } else {
        const plan = getGuestWeeklyPlan();
        const recipeIds = plan?.days.flatMap((day) => [day.lunch.recipeId, day.dinner.recipeId]);
        if (recipeIds && recipeIds.length > 0) {
          setSource({ recipeIds });
          await generateList({ recipeIds });
        } else if (!cancelled) {
          setStatus("no-source");
        }
      }
    }
    loadSource();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, sessionStatus]);

  async function handleGenerate() {
    if (!source) return;
    await generateList(source);
  }

  async function handleTogglePurchased(itemId: string, ingredientId: string, purchased: boolean) {
    if (!list) return;
    setList({
      ...list,
      items: list.items.map((item) => (item.id === itemId ? { ...item, purchased } : item)),
    });

    if (session?.user) {
      await fetch(`/api/grocery-lists/${list.groceryListId}/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased }),
      });
    } else {
      setGuestItemPurchased(ingredientId, purchased);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Grocery List</h1>

      {status === "loading-source" && <LoadingIndicator />}

      {status === "no-source" && (
        <EmptyState
          icon={<CartIcon size={32} />}
          message="Generate a weekly meal plan to create your grocery list."
          actionLabel="Generate Weekly Plan"
          actionHref="/weekly-planner"
        />
      )}

      {status === "ready" && (
        <Button type="button" onClick={handleGenerate}>
          <CartIcon size={16} />
          Generate Grocery List
        </Button>
      )}

      {status === "generating" && <LoadingIndicator label="Preparing your grocery list…" />}

      {status === "error" && (
        <ErrorMessage message="We couldn't generate your grocery list." onRetry={handleGenerate} />
      )}

      {status === "success" && list && (
        <div className="space-y-6">
          <Button type="button" variant="secondary" onClick={handleGenerate}>
            <RefreshIcon size={16} />
            Regenerate Grocery List
          </Button>

          {list.items.length === 0 ? (
            <EmptyState icon={<CartIcon size={32} />} message="No grocery items available." />
          ) : (
            GROCERY_CATEGORIES.map((category) => {
              const items = list.items.filter((item) => item.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <h2 className="font-semibold text-text">{category}</h2>
                  <ul className="divide-y divide-border rounded-card border border-border bg-surface shadow-sm">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                        <input
                          type="checkbox"
                          checked={item.purchased}
                          onChange={(event) =>
                            handleTogglePurchased(item.id, item.ingredientId, event.target.checked)
                          }
                          aria-label={`Mark ${item.name} as purchased`}
                          className="h-4 w-4 accent-accent"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-text ${item.purchased ? "text-text-muted line-through" : ""}`}
                          >
                            {item.name}
                          </span>
                          {item.inPantry && (
                            <p className="flex items-center gap-1 text-xs text-accent-dark">
                              <JarIcon size={12} />
                              Already in your pantry — check if you have enough.
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-text-muted">
                          {item.quantity} {item.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
