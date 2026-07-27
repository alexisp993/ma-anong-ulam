"use client";

import Link from "next/link";
import { usePantryItems } from "@/lib/hooks/usePantryItems";
import { JarIcon } from "@/components/icons";

const PREVIEW_COUNT = 5;

export function PantryOverviewCard() {
  const { items, status } = usePantryItems();
  const preview = items.slice(0, PREVIEW_COUNT);
  const remaining = items.length - preview.length;

  return (
    <div className="space-y-3 rounded-card border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-text">
        <JarIcon size={18} />
        <h2 className="font-bold">Pantry Overview</h2>
      </div>

      {status === "loading" ? (
        <p className="text-sm text-text-muted">Loading your pantry…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-text-muted">
          Your pantry is empty. Add ingredients to see them here.
        </p>
      ) : (
        <p className="text-sm text-text-muted">
          <span className="font-semibold text-text">{items.length}</span> item
          {items.length === 1 ? "" : "s"} in your pantry: {preview.map((item) => item.name).join(", ")}
          {remaining > 0 ? `, and ${remaining} more` : ""}.
        </p>
      )}

      <Link
        href="/pantry"
        className="block rounded-card border border-border bg-surface px-4 py-2 text-center text-sm font-semibold text-text transition-colors hover:border-primary"
      >
        View Pantry
      </Link>
    </div>
  );
}
