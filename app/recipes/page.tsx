"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { RECIPE_CATEGORIES } from "@/lib/constants";
import { SearchIcon } from "@/components/icons";
import type { RecipeSummary } from "@/lib/recipes";

type Status = "loading" | "success" | "error";

export default function RecipesPage() {
  return (
    <Suspense fallback={<LoadingIndicator label="Loading recipes…" />}>
      <RecipesPageContent />
    </Suspense>
  );
}

function RecipesPageContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const [category, setCategory] = useState("");
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setStatus("loading");
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);

        const response = await fetch(`/api/recipes?${params.toString()}`, {
          signal: controller.signal,
        });
        const json = await response.json();
        if (!json.success) throw new Error(json.message);

        setRecipes(json.data);
        setStatus("success");
      } catch (err) {
        if ((err as Error).name !== "AbortError") setStatus("error");
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, category, reloadToken]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Recipes</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Search recipes"
          name="search"
          placeholder="e.g. Adobo"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          icon={<SearchIcon size={16} />}
        />
        <Select
          label="Category"
          name="category"
          placeholder="All categories"
          options={RECIPE_CATEGORIES.map((item) => ({ label: item, value: item }))}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>

      {status === "loading" && <LoadingIndicator label="Loading recipes…" />}

      {status === "error" && (
        <ErrorMessage onRetry={() => setReloadToken((token) => token + 1)} />
      )}

      {status === "success" && recipes.length === 0 && (
        <EmptyState
          icon={<SearchIcon size={32} />}
          message={
            search
              ? "No recipes match your search."
              : category
                ? "No recipes found in this category."
                : "No recipes found."
          }
        />
      )}

      {status === "success" && recipes.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {status === "success" && (
        <p className="pt-2 text-center text-sm text-text-muted">
          Don&apos;t see your recipe?{" "}
          <Link
            href="/recipes/submit"
            className="font-medium text-primary transition-opacity duration-150 hover:underline active:opacity-70"
          >
            Submit a Recipe
          </Link>
        </p>
      )}
    </div>
  );
}
