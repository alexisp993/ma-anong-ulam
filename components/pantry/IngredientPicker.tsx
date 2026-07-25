"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PlusIcon, SearchIcon } from "@/components/icons";

interface IngredientOption {
  id: string;
  name: string;
}

interface IngredientPickerProps {
  onAdd: (ingredient: IngredientOption) => void;
  excludeIds: string[];
}

export function IngredientPicker({ onAdd, excludeIds }: IngredientPickerProps) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<IngredientOption[]>([]);
  const [selected, setSelected] = useState<IngredientOption | null>(null);

  useEffect(() => {
    if (!query || selected) {
      setOptions([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/ingredients?search=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const json = await response.json();
        if (json.success) {
          setOptions(
            (json.data as IngredientOption[]).filter((option) => !excludeIds.includes(option.id))
          );
        }
      } catch {
        // ignore aborted/failed lookups; user can keep typing
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, selected, excludeIds]);

  function handleAdd() {
    if (!selected) return;
    onAdd(selected);
    setSelected(null);
    setQuery("");
    setOptions([]);
  }

  return (
    <div className="space-y-2">
      <Input
        label="Add an ingredient"
        name="ingredientSearch"
        placeholder="e.g. Garlic"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelected(null);
        }}
        icon={<SearchIcon size={16} />}
      />
      {options.length > 0 && (
        <ul className="max-h-40 divide-y divide-border overflow-y-auto rounded-card border border-border bg-surface">
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(option);
                  setQuery(option.name);
                  setOptions([]);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-text hover:bg-background"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <Button type="button" onClick={handleAdd} disabled={!selected}>
        <PlusIcon size={16} />
        Add Ingredient
      </Button>
    </div>
  );
}
