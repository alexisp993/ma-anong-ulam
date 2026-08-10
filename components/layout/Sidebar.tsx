"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AuthActions } from "@/components/layout/AuthActions";
import { TipOfTheDayCard } from "@/components/layout/TipOfTheDayCard";
import { NAV_ITEMS, isActiveNavItem } from "@/components/layout/nav-items";

export function Sidebar({ tip }: { tip: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex flex-col gap-6 p-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt=""
            width={38}
            height={38}
            className="rounded-card"
          />
          <span className="text-lg font-extrabold leading-[1.15] tracking-tight text-text">
            Ma, anong
            <br />
            ulam?
          </span>
        </Link>

        <nav aria-label="Primary" className="flex-1">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isActiveNavItem(pathname, item.href);
              const ItemIcon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-pill px-3.5 py-2.5 text-sm font-semibold transition-[background-color,color] duration-150 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-muted hover:bg-primary-tint hover:text-text active:bg-primary-tint"
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

      <div className="mt-auto space-y-4 border-t border-border p-5">
        <TipOfTheDayCard tip={tip} />
        <AuthActions stacked />
      </div>
    </aside>
  );
}
