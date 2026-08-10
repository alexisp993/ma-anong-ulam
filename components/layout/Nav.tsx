"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV_ITEMS, isActiveNavItem } from "@/components/layout/nav-items";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="border-b border-border bg-surface overflow-x-auto">
      <ul className="flex min-w-max gap-1.5 px-4 py-2.5 sm:justify-center sm:px-6">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = isActiveNavItem(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block whitespace-nowrap rounded-pill px-3.5 py-1.5 text-sm font-semibold transition-[background-color,color,opacity] duration-150 active:opacity-70 ${
                  isActive ? "bg-primary text-white" : "text-text-muted hover:bg-primary-tint hover:text-text"
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
