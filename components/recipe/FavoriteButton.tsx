"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { isGuestFavorite, toggleGuestFavorite } from "@/lib/guest-storage";

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
}

export function FavoriteButton({ recipeId, className = "" }: FavoriteButtonProps) {
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

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={busy}
      aria-pressed={favorited}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex items-center gap-1.5 rounded-card border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color,transform] duration-150 active:scale-90 disabled:opacity-60 disabled:active:scale-100 ${
        favorited
          ? "border-primary bg-primary text-white"
          : "border-border bg-surface text-text hover:border-primary"
      } ${className}`}
    >
      <span aria-hidden="true">{favorited ? "♥" : "♡"}</span>
      {favorited ? "Favorited" : "Favorite"}
    </button>
  );
}
