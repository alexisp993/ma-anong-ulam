import { ButtonHTMLAttributes } from "react";
import { LoadingIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "border border-border bg-surface text-text hover:border-primary",
  outline: "border border-border bg-transparent text-text hover:bg-primary-tint",
};

// Shared so ButtonLink renders an identical-looking anchor without
// re-implementing these classes (they used to be hand-copied into
// EmptyState, ShortcutCard, DinnerPlanCard, and AuthActions).
export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-card px-5 py-2.5 font-semibold transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
    VARIANT_CLASSES[variant],
    className
  );
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} disabled={disabled || loading} {...props}>
      {loading && <LoadingIcon size={16} className="animate-spin" />}
      {loading ? "Please wait…" : children}
    </button>
  );
}
