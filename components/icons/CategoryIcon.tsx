import {
  ChickenIcon,
  PigIcon,
  CowIcon,
  FishIcon,
  CarrotIcon,
  EggIcon,
  NoodleBowlIcon,
  OthersIcon,
  type IconProps,
} from "@/components/icons";
import type { RECIPE_CATEGORIES } from "@/lib/constants";

type Category = (typeof RECIPE_CATEGORIES)[number];

const CATEGORY_ICONS: Record<Category, (props: IconProps) => React.JSX.Element> = {
  Chicken: ChickenIcon,
  Pork: PigIcon,
  Beef: CowIcon,
  Seafood: FishIcon,
  Vegetables: CarrotIcon,
  Egg: EggIcon,
  Noodles: NoodleBowlIcon,
  Others: OthersIcon,
};

export function CategoryIcon({ category, ...props }: { category: string } & IconProps) {
  const IconComponent = CATEGORY_ICONS[category as Category] ?? OthersIcon;
  return <IconComponent {...props} />;
}
