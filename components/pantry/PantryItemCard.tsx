import { IngredientThumb } from "@/components/ui/IngredientThumb";
import { TrashIcon } from "@/components/icons";

interface PantryItemCardProps {
  name: string;
  category?: string;
  onRemove: () => void;
}

export function PantryItemCard({ name, category, onRemove }: PantryItemCardProps) {
  return (
    <div className="relative flex flex-col items-center gap-2 rounded-card border border-border bg-surface p-3 text-center shadow-sm">
      <IngredientThumb name={name} size={56} />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-text" title={name}>
          {name}
        </p>
        {/* The reference shows a quantity here. The pantry is presence-only
            (no quantity in the schema), so the category fills the slot
            rather than inventing a number. */}
        {category && <p className="truncate text-xs text-text-muted">{category}</p>}
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name} from pantry`}
        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-pill text-text-muted transition-[background-color,color,transform] duration-150 hover:bg-surface-muted hover:text-primary active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <TrashIcon size={15} />
      </button>
    </div>
  );
}
