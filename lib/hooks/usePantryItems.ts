"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getGuestPantry } from "@/lib/guest-storage";

export interface PantryItemLike {
  id?: string;
  ingredientId: string;
  name: string;
  // Absent on guest entries saved before categories were tracked, so
  // consumers must tolerate undefined rather than assume it.
  category?: string;
}

type Status = "loading" | "success" | "error";

// Shared guest(localStorage)/authed(DB) pantry read, reused by the Pantry
// page and the Home page's pantry-derived widgets so the branching logic
// lives in one place.
export function usePantryItems() {
  const { data: session, status: sessionStatus } = useSession();
  const [items, setItems] = useState<PantryItemLike[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      if (session?.user) {
        const response = await fetch("/api/pantry");
        const json = await response.json();
        if (!json.success) throw new Error(json.message);
        setItems(json.data);
      } else {
        setItems(getGuestPantry());
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [session]);

  useEffect(() => {
    if (sessionStatus === "loading") return;
    load();
  }, [sessionStatus, load]);

  return { items, setItems, status, reload: load };
}
