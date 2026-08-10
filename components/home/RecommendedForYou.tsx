"use client";

import { useEffect, useState } from "react";
import { PantryMatchCard } from "@/components/recipe/PantryMatchCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <SectionHeading
        title="Recommended for You"
        subtitle="Based on what's in your pantry."
        href="/recipes"
      />

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
        // Horizontal snap row on small screens, matching the reference's
        // scrolling strip; a plain grid once there's room for all five.
        <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {recommendations.map((recipe) => (
            <div key={recipe.id} className="w-44 shrink-0 snap-start lg:w-auto">
              <PantryMatchCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
