import Image from "next/image";
import { getIngredientImage } from "@/lib/ingredient-images";
import { JarIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

interface IngredientThumbProps {
  name: string;
  size?: 20 | 24 | 32 | 40 | 56;
  className?: string;
}

// Resolves art at build time. Not every ingredient has a thumbnail, so a
// miss deliberately renders an icon rather than a broken image.
export function IngredientThumb({ name, size = 40, className }: IngredientThumbProps) {
  const src = getIngredientImage(name);
  const box = cn("shrink-0 overflow-hidden rounded-xs bg-surface-muted", className);

  if (!src) {
    return (
      <span
        aria-hidden="true"
        className={cn(box, "flex items-center justify-center text-primary")}
        style={{ width: size, height: size }}
      >
        <JarIcon size={Math.round(size * 0.55)} />
      </span>
    );
  }

  return (
    <span className={cn(box, "relative block")} style={{ width: size, height: size }}>
      <Image src={src} alt="" fill sizes={`${size}px`} className="object-contain" />
    </span>
  );
}
