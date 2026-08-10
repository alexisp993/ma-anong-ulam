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
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl items-center gap-2">
        <label htmlFor="topbar-search" className="sr-only">
          Search recipes
        </label>
        <input
          id="topbar-search"
          type="search"
          placeholder="Search recipes or ingredients…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-pill border border-border bg-background px-4 py-2.5 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-10 w-11 shrink-0 items-center justify-center rounded-pill bg-primary text-white transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <SearchIcon size={18} />
        </button>
      </form>
    </div>
  );
}
