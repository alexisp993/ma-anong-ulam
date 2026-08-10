import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardElement = "div" | "section" | "article" | "li";

interface CardProps {
  as?: CardElement;
  padded?: boolean;
  interactive?: boolean;
  radius?: "card" | "lg";
  className?: string;
  children: ReactNode;
}

// The shared card surface, extracted from the hand-duplicated
// "rounded-card border border-border bg-surface shadow-sm" string that used
// to live in every feature card.
export function Card({
  as: Tag = "div",
  padded = true,
  interactive = false,
  radius = "card",
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "border border-border bg-surface shadow-sm",
        radius === "lg" ? "rounded-lg" : "rounded-card",
        padded && "p-4 sm:p-5",
        interactive && "transition-shadow duration-150 hover:shadow-md",
        className
      )}
    >
      {children}
    </Tag>
  );
}
