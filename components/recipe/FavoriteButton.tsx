"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { isGuestFavorite, toggleGuestFavorite } from "@/lib/guest-storage";
import { HeartIcon } from "@/components/icons";

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
  // Icon-only circular badge for use on top of a recipe image, where a
  // labelled pill would cover too much of the photo.
  compact?: boolean;
}

export function FavoriteButton({ recipeId, className = "", compact = false }: FavoriteButtonProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [favorited, setFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (session?.user) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((json) => {
          if (!json.success) return;
          const match = (
            json.data as { id: string; recipeId: string }[]
          ).find((favorite) => favorite.recipeId === recipeId);
          setFavorited(Boolean(match));
          setFavoriteId(match?.id ?? null);
        })
        .catch(() => undefined);
    } else {
      setFavorited(isGuestFavorite(recipeId));
    }
  }, [session, sessionStatus, recipeId]);

  async function handleToggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    setBusy(true);

    try {
      if (session?.user) {
        if (favorited && favoriteId) {
          const response = await fetch(`/api/favorites/${favoriteId}`, { method: "DELETE" });
          const json = await response.json();
          if (json.success) {
            setFavorited(false);
            setFavoriteId(null);
          }
        } else {
          const response = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId }),
          });
          const json = await response.json();
          if (json.success) {
            setFavorited(true);
            setFavoriteId(json.data.id);
          }
        }
      } else {
        setFavorited(toggleGuestFavorite(recipeId));
      }
    } finally {
      setBusy(false);
    }
  }

  const shared =
    "inline-flex items-center justify-center transition-[background-color,border-color,color,transform] duration-150 active:scale-90 disabled:opacity-60 disabled:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={busy}
        aria-pressed={favorited}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        className={`${shared} h-8 w-8 rounded-pill bg-surface/95 shadow-sm ${
          favorited ? "text-primary" : "text-text-muted hover:text-primary"
        } ${className}`}
      >
        <HeartIcon size={17} fill={favorited ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={busy}
      aria-pressed={favorited}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`${shared} gap-1.5 rounded-pill border px-3.5 py-1.5 text-sm font-semibold ${
        favorited
          ? "border-primary bg-primary text-white"
          : "border-border bg-surface text-text hover:border-primary"
      } ${className}`}
    >
      <HeartIcon size={16} fill={favorited ? "currentColor" : "none"} />
      {favorited ? "Favorited" : "Favorite"}
    </button>
  );
}
