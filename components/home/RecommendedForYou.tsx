"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PantryMatchCard } from "@/components/recipe/PantryMatchCard";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { usePantryItems } from "@/lib/hooks/usePantryItems";
import type { PantryRecommendation } from "@/lib/pantry";
import { SearchIcon } from "@/components/icons";

type RecStatus = "idle" | "loading" | "success" | "error";

const MAX_RECOMMENDATIONS = 5;

// "Recommended for You" is pantry-derived, not a black-box guess: it reuses
// the same ranking as the Pantry page's recommendations. With no pantry
// items yet, there's nothing real to recommend, so we say so plainly instead
// of faking a personalized-looking list.
export function RecommendedForYou() {
  const { items: pantryItems, status: pantryStatus } = usePantryItems();
  const [recommendations, setRecommendations] = useState<PantryRecommendation[]>([]);
  const [recStatus, setRecStatus] = useState<RecStatus>("idle");

  async function loadRecommendations() {
    setRecStatus("loading");
    try {
      const response = await fetch("/api/pantry/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientIds: pantryItems.map((item) => item.ingredientId) }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      setRecommendations(json.data.slice(0, MAX_RECOMMENDATIONS));
      setRecStatus("success");
    } catch {
      setRecStatus("error");
    }
  }

  useEffect(() => {
    if (pantryStatus !== "success") return;
    if (pantryItems.length === 0) {
      setRecStatus("idle");
      return;
    }
    loadRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantryStatus, pantryItems.length]);

  return (
    <section aria-label="Recommended for you" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text">Recommended for You</h2>
          <p className="text-sm text-text-muted">Based on what&apos;s in your pantry.</p>
        </div>
        <Link href="/recipes" className="text-sm font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>

      {(pantryStatus === "loading" || recStatus === "loading") && (
        <LoadingIndicator label="Finding recipes for you…" />
      )}

      {pantryStatus === "success" && pantryItems.length === 0 && (
        <EmptyState
          icon={<SearchIcon size={32} />}
          message={"No recommendations yet.\nAdd a few pantry items to see personalized picks here."}
          actionLabel="Add pantry items"
          actionHref="/pantry"
        />
      )}

      {recStatus === "error" && (
        <ErrorMessage message="Unable to load recommendations." onRetry={loadRecommendations} />
      )}

      {recStatus === "success" && recommendations.length === 0 && (
        <EmptyState icon={<SearchIcon size={32} />} message="No recipes match your current pantry." />
      )}

      {recStatus === "success" && recommendations.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {recommendations.map((recipe) => (
            <PantryMatchCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  );
}
