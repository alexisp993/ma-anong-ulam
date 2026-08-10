"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

interface SegmentedControlProps<T extends string> {
  items: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  variant?: "underline" | "pill";
  className?: string;
}

// Two or three mutually exclusive views of the same content. For many
// filter options use FilterPills instead — this one carries tab semantics
// and roving-tabindex keyboard support.
export function SegmentedControl<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  variant = "pill",
  className,
}: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    onChange(items[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1",
        variant === "pill" && "rounded-pill bg-surface-muted p-1",
        variant === "underline" && "border-b border-border",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold transition-[background-color,color,border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              variant === "pill" && "rounded-pill",
              variant === "pill" && (isActive ? "bg-primary text-white" : "text-text-muted hover:text-text"),
              variant === "underline" && "-mb-px border-b-2 px-3 pb-2.5",
              variant === "underline" &&
                (isActive ? "border-text text-text" : "border-transparent text-text-muted hover:text-text")
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span className={cn("ml-1.5 text-xs", isActive ? "opacity-80" : "text-text-muted")}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
