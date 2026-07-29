"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "Kahit Ano", href: "/kahit-ano" },
  { label: "Pantry", href: "/pantry" },
  { label: "Weekly Planner", href: "/weekly-planner" },
  { label: "Grocery List", href: "/grocery-list" },
  { label: "Favorites", href: "/favorites" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="border-b border-border bg-surface overflow-x-auto"
    >
      <ul className="flex min-w-max gap-1 px-4 sm:justify-center sm:px-6">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-[color,border-color,opacity] duration-150 active:opacity-60 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
