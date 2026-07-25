"use client";

import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function RecipesError({ reset }: { reset: () => void }) {
  return <ErrorMessage message="Unable to load recipes.\nPlease try again." onRetry={reset} />;
}
