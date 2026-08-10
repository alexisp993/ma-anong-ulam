"use client";

import { cn } from "@/lib/cn";
import type { IconProps } from "@/components/icons";

interface FilterPillsProps<T extends string> {
  items: { value: T; label: string; icon?: (props: IconProps) => React.JSX.Element }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

// Many options, horizontally scrollable, filter semantics (aria-pressed).
// Distinct from SegmentedControl, which is a small set of tabs.
export function FilterPills<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  className,
}: FilterPillsProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("-mx-1 flex gap-2 overflow-x-auto px-1 pb-1", className)}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        const ItemIcon = item.icon;
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              isActive
                ? "border border-primary bg-primary text-white"
                : "border border-border bg-surface text-text-muted hover:border-primary hover:text-text"
            )}
          >
            {ItemIcon && <ItemIcon size={15} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
