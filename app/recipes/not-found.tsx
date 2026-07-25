import { EmptyState } from "@/components/ui/EmptyState";
import { SearchIcon } from "@/components/icons";

export default function RecipeNotFound() {
  return (
    <EmptyState
      icon={<SearchIcon size={32} />}
      message="Recipe not found."
      actionLabel="Browse Recipes"
      actionHref="/recipes"
    />
  );
}
