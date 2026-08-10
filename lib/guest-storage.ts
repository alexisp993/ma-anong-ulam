"use client";

import type { DayPlan } from "@/lib/weekly-planner";

// Guest (unauthenticated) client-side persistence — localStorage only, per
// PRODUCT_BLUEPRINT.md's guest-mode storage rules for Favorites, Pantry,
// Weekly Planner, and Grocery List. Cleared if the browser data is cleared.
// Namespaced keys so each feature's guest state stays independent.
const KEYS = {
  favorites: "maul:favorites",
  pantry: "maul:pantry",
  weeklyPlan: "maul:weeklyplan",
  groceryPurchased: "maul:grocery-purchased",
} as const;

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids));
}

export function getGuestFavoriteIds(): string[] {
  return readIds(KEYS.favorites);
}

export function isGuestFavorite(recipeId: string): boolean {
  return getGuestFavoriteIds().includes(recipeId);
}

// Returns the new favorited state (true = now favorited).
export function toggleGuestFavorite(recipeId: string): boolean {
  const ids = getGuestFavoriteIds();
  const index = ids.indexOf(recipeId);
  if (index === -1) {
    writeIds(KEYS.favorites, [...ids, recipeId]);
    return true;
  }
  ids.splice(index, 1);
  writeIds(KEYS.favorites, ids);
  return false;
}

export interface GuestPantryItem {
  ingredientId: string;
  name: string;
  // Optional: entries saved before categories were tracked won't have it.
  category?: string;
}

function readPantry(): GuestPantryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEYS.pantry);
    return raw ? (JSON.parse(raw) as GuestPantryItem[]) : [];
  } catch {
    return [];
  }
}

function writePantry(items: GuestPantryItem[]) {
  window.localStorage.setItem(KEYS.pantry, JSON.stringify(items));
}

export function getGuestPantry(): GuestPantryItem[] {
  return readPantry();
}

export function addGuestPantryItem(item: GuestPantryItem): GuestPantryItem[] {
  const items = readPantry();
  if (items.some((existing) => existing.ingredientId === item.ingredientId)) return items;
  const next = [...items, item];
  writePantry(next);
  return next;
}

export function removeGuestPantryItem(ingredientId: string): GuestPantryItem[] {
  const next = readPantry().filter((item) => item.ingredientId !== ingredientId);
  writePantry(next);
  return next;
}

export interface GuestWeeklyPlan {
  weeklyBudget: number;
  familySize: number;
  days: DayPlan[];
}

export function getGuestWeeklyPlan(): GuestWeeklyPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEYS.weeklyPlan);
    return raw ? (JSON.parse(raw) as GuestWeeklyPlan) : null;
  } catch {
    return null;
  }
}

export function setGuestWeeklyPlan(plan: GuestWeeklyPlan) {
  window.localStorage.setItem(KEYS.weeklyPlan, JSON.stringify(plan));
}

// Grocery items are recomputed fresh each time (so prices/quantities never
// go stale) — only the purchased checkbox state needs to survive a reload.
export function getGuestPurchasedMap(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEYS.groceryPurchased);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function setGuestItemPurchased(ingredientId: string, purchased: boolean) {
  const map = getGuestPurchasedMap();
  map[ingredientId] = purchased;
  window.localStorage.setItem(KEYS.groceryPurchased, JSON.stringify(map));
}
