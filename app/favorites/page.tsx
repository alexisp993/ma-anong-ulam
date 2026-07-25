"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getGuestFavoriteIds } from "@/lib/guest-storage";
import type { RecipeSummary } from "@/lib/recipes";
import { HeartIcon } from "@/components/icons";

type Status = "loading" | "success" | "error";

export default function FavoritesPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    const controller = new AbortController();
    (async () => {
      setStatus("loading");
      try {
        if (session?.user) {
          const response = await fetch("/api/favorites", { signal: controller.signal });
          const json = await response.json();
          if (!json.success) throw new Error(json.message);
          // The Favorite object's own `id` is the favorite row's id, not
          // the recipe's — RecipeCard/FavoriteButton need the recipe's id.
          type FavoriteResponseItem = RecipeSummary & { recipeId: string };
          setRecipes(
            (json.data as FavoriteResponseItem[]).map((favorite) => ({
              ...favorite,
              id: favorite.recipeId,
            }))
          );
        } else {
          const ids = getGuestFavoriteIds();
          if (ids.length === 0) {
            setRecipes([]);
            setStatus("success");
            return;
          }
          const response = await fetch("/api/recipes", { signal: controller.signal });
          const json = await response.json();
          if (!json.success) throw new Error(json.message);
          setRecipes(
            (json.data as RecipeSummary[]).filter((recipe) => ids.includes(recipe.id))
          );
        }
        setStatus("success");
      } catch (err) {
        if ((err as Error).name !== "AbortError") setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [session, sessionStatus, reloadToken]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Favorites</h1>

      {status === "loading" && <LoadingIndicator label="Loading your favorites…" />}

      {status === "error" && (
        <ErrorMessage
          message="Unable to load your favorite recipes."
          onRetry={() => setReloadToken((token) => token + 1)}
        />
      )}

      {status === "success" && recipes.length === 0 && (
        <EmptyState
          icon={<HeartIcon size={32} />}
          message="You haven't added any favorite recipes yet."
          actionLabel="Browse Recipes"
          actionHref="/recipes"
        />
      )}

      {status === "success" && recipes.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
