// Joins conditional class names. Deliberately tiny — this codebase has no
// clsx/tailwind-merge dependency, and later classes already win in the
// template-literal pattern used throughout.
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
