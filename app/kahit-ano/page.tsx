"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { RecommendationCard } from "@/components/recipe/RecommendationCard";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiceIcon, RefreshIcon, HelpIcon } from "@/components/icons";
import { MEAL_STYLES } from "@/lib/constants";
import type { RecommendedRecipe } from "@/lib/recommendation-engine";

type Status = "idle" | "loading" | "success" | "error";

export default function KahitAnoPage() {
  const [budget, setBudget] = useState("300");
  const [familySize, setFamilySize] = useState("4");
  const [mealStyle, setMealStyle] = useState("");
  const [results, setResults] = useState<RecommendedRecipe[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [showHelp, setShowHelp] = useState(false);

  async function generate(excludeIds?: string[]) {
    setStatus("loading");
    try {
      const response = await fetch("/api/kahit-ano", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: Number(budget),
          familySize: Number(familySize),
          mealStyle: mealStyle || undefined,
          excludeIds,
        }),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message);
      setResults(json.data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    generate();
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        as="h1"
        title="Kahit Ano? 🎲"
        subtitle="Tell us your budget and household size and we'll suggest a few recipes."
        action={
          <button
            type="button"
            onClick={() => setShowHelp((open) => !open)}
            aria-expanded={showHelp}
            aria-label="How Kahit Ano works"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-border text-text-muted transition-[background-color,color,transform] duration-150 hover:bg-primary-tint hover:text-primary active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <HelpIcon size={18} />
          </button>
        }
      />

      {showHelp && (
        <Card className="bg-primary-tint text-sm text-text">
          Recipes are ranked by how close they land to your budget and how well the servings fit your
          household, with a nudge toward your chosen meal style. Same answers, same suggestions — no
          randomness.
        </Card>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
        <Input
          label="Budget (₱)"
          name="budget"
          type="number"
          min={1}
          step="1"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
        />
        <Input
          label="Family Size"
          name="familySize"
          type="number"
          min={1}
          max={20}
          step="1"
          value={familySize}
          onChange={(event) => setFamilySize(event.target.value)}
          required
        />
        <Select
          label="Meal Style"
          name="mealStyle"
          placeholder="Any style"
          options={MEAL_STYLES.map((style) => ({ label: style, value: style }))}
          value={mealStyle}
          onChange={(event) => setMealStyle(event.target.value)}
        />
        <div className="sm:col-span-3">
          <Button type="submit" loading={status === "loading"}>
            Generate Recipes
          </Button>
        </div>
      </form>

      {status === "idle" && (
        <EmptyState
          icon={<DiceIcon size={32} />}
          message="Generate recipe recommendations to begin."
        />
      )}

      {status === "loading" && <LoadingIndicator label="Finding recipes for you…" />}

      {status === "error" && (
        <ErrorMessage
          message="We couldn't generate meal suggestions right now."
          onRetry={() => generate()}
        />
      )}

      {status === "success" && results.length === 0 && (
        <EmptyState icon={<DiceIcon size={32} />} message="No recipes match your criteria." />
      )}

      {status === "success" && results.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {results.map((recipe) => (
              <RecommendationCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => generate(results.map((recipe) => recipe.id))}
          >
            <RefreshIcon size={16} />
            Regenerate Recommendations
          </Button>
        </div>
      )}
    </div>
  );
}
