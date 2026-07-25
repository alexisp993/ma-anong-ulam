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
  getLastMealPlanId,
  getGuestPurchasedMap,
  setGuestItemPurchased,
} from "@/lib/guest-storage";
import type { GroceryListView } from "@/lib/grocery-list";
import { CartIcon, WalletIcon, RefreshIcon } from "@/components/icons";

type Status = "loading-source" | "no-source" | "ready" | "generating" | "success" | "error";
type GenerateSource = { mealPlanId: string } | { recipeIds: string[] };

export default function GroceryListPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [list, setList] = useState<GroceryListView | null>(null);
  const [status, setStatus] = useState<Status>("loading-source");
  const [source, setSource] = useState<GenerateSource | null>(null);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (session?.user) {
      const mealPlanId = getLastMealPlanId();
      if (mealPlanId) {
        setSource({ mealPlanId });
        setStatus("ready");
      } else {
        setStatus("no-source");
      }
    } else {
      const plan = getGuestWeeklyPlan();
      const recipeIds = plan?.days.flatMap((day) => [day.lunch.recipeId, day.dinner.recipeId]);
      if (recipeIds && recipeIds.length > 0) {
        setSource({ recipeIds });
        setStatus("ready");
      } else {
        setStatus("no-source");
      }
    }
  }, [session, sessionStatus]);

  async function handleGenerate() {
    if (!source) return;
    setStatus("generating");
    try {
      const response = await fetch("/api/grocery-lists/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(source),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);

      let data: GroceryListView = json.data;
      if (!session?.user) {
        const purchasedMap = getGuestPurchasedMap();
        data = {
          ...data,
          items: data.items.map((item) => ({
            ...item,
            purchased: purchasedMap[item.ingredientId] ?? false,
          })),
        };
      }
      setList(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
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

          <div className="flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-card bg-accent/15 text-accent-dark">
              <WalletIcon size={20} />
            </div>
            <div>
              <p className="text-sm text-text-muted">Estimated Total</p>
              <p className="text-xl font-bold text-text">₱{list.estimatedTotal.toFixed(0)}</p>
            </div>
          </div>

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
                        <span
                          className={`flex-1 text-text ${item.purchased ? "text-text-muted line-through" : ""}`}
                        >
                          {item.name}
                        </span>
                        <span className="text-sm text-text-muted">
                          {item.quantity} {item.unit}
                        </span>
                        <span className="text-sm text-text-muted">₱{item.estimatedCost.toFixed(0)}</span>
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
