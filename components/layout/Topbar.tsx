"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";

export function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    router.push(`/recipes?${params.toString()}`);
  }

  return (
    <div className="border-b border-border bg-surface px-4 py-3 sm:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
        <label htmlFor="topbar-search" className="sr-only">
          Search recipes
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <SearchIcon size={16} />
          </span>
          <input
            id="topbar-search"
            type="search"
            placeholder="Search recipes…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-3 text-sm text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </form>
    </div>
  );
}
