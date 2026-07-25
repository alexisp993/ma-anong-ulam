"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  DiceIcon,
  JarIcon,
  CalendarIcon,
  CartIcon,
  HeartIcon,
  PotIcon,
  type IconProps,
} from "@/components/icons";
import { AuthActions } from "@/components/layout/AuthActions";

const NAV_ITEMS: { label: string; href: string; icon: (props: IconProps) => React.JSX.Element }[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Recipes", href: "/recipes", icon: SearchIcon },
  { label: "Kahit Ano", href: "/kahit-ano", icon: DiceIcon },
  { label: "Pantry", href: "/pantry", icon: JarIcon },
  { label: "Weekly Planner", href: "/weekly-planner", icon: CalendarIcon },
  { label: "Grocery List", href: "/grocery-list", icon: CartIcon },
  { label: "Favorites", href: "/favorites", icon: HeartIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex flex-col gap-6 p-5">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <PotIcon size={28} />
          <span className="text-lg font-bold leading-tight">Ma, Anong Ulam?</span>
        </Link>

        <nav aria-label="Primary" className="flex-1">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const ItemIcon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/15 text-accent-dark"
                        : "text-text-muted hover:bg-background hover:text-text"
                    }`}
                  >
                    <ItemIcon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t border-border p-5">
        <AuthActions stacked />
      </div>
    </aside>
  );
}
