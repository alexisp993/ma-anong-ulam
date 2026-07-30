import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TrashIcon } from "@/components/icons";
import { ALLOWED_UNITS } from "@/scripts/units";

export interface IngredientLine {
  ingredientId: string;
  name: string;
  quantity: string;
  unit: string;
}

interface IngredientLineRowProps {
  line: IngredientLine;
  onChange: (line: IngredientLine) => void;
  onRemove: () => void;
}

export function IngredientLineRow({ line, onChange, onRemove }: IngredientLineRowProps) {
  return (
    <div className="flex items-end gap-2 rounded-card border border-border bg-surface p-3">
      <p className="flex-1 text-sm font-medium text-text">{line.name}</p>
      <div className="w-24">
        <Input
          label="Qty"
          name={`quantity-${line.ingredientId}`}
          type="number"
          min={0}
          step="any"
          value={line.quantity}
          onChange={(event) => onChange({ ...line, quantity: event.target.value })}
          required
        />
      </div>
      <div className="w-28">
        <Select
          label="Unit"
          name={`unit-${line.ingredientId}`}
          options={ALLOWED_UNITS.map((unit) => ({ label: unit, value: unit }))}
          value={line.unit}
          onChange={(event) => onChange({ ...line, unit: event.target.value })}
        />
      </div>
      <Button type="button" variant="secondary" onClick={onRemove} aria-label={`Remove ${line.name}`}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
}
