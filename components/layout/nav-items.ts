import {
  HomeIcon,
  SearchIcon,
  DiceIcon,
  JarIcon,
  CalendarIcon,
  CartIcon,
  HeartIcon,
  PersonIcon,
  SlidersIcon,
  type IconProps,
} from "@/components/icons";

export interface NavItem {
  label: string;
  href: string;
  icon: (props: IconProps) => React.JSX.Element;
}

// Single source of truth — Sidebar and Nav used to each carry their own copy
// of this list and their own active-state logic, which could drift.
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Recipes", href: "/recipes", icon: SearchIcon },
  { label: "Kahit Ano", href: "/kahit-ano", icon: DiceIcon },
  { label: "Pantry", href: "/pantry", icon: JarIcon },
  { label: "Weekly Planner", href: "/weekly-planner", icon: CalendarIcon },
  { label: "Grocery List", href: "/grocery-list", icon: CartIcon },
  { label: "Favorites", href: "/favorites", icon: HeartIcon },
  { label: "Profile", href: "/profile", icon: PersonIcon },
  { label: "Settings", href: "/settings", icon: SlidersIcon },
];

// The mobile tab strip stays scoped to the seven task features — Profile and
// Settings are account chrome and don't earn a slot in a scrolling row.
export const MOBILE_NAV_ITEMS: NavItem[] = NAV_ITEMS.slice(0, 7);

export function isActiveNavItem(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
