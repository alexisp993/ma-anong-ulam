"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogoutIcon } from "@/components/icons";

// `stacked` is used inside the Sidebar's narrower column; the default
// horizontal layout is unchanged for the mobile Header.
export function AuthActions({ stacked = false }: { stacked?: boolean }) {
  const { data: session, status } = useSession();
  const containerClass = stacked ? "flex flex-col items-stretch gap-2" : "flex items-center gap-2";

  if (status === "loading") {
    return <div className="h-9 w-20" aria-hidden="true" />;
  }

  if (session?.user) {
    return (
      <div className={`${containerClass} text-sm`}>
        <span className={`truncate text-text-muted ${stacked ? "" : "hidden sm:inline"}`}>
          {session.user.email}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center justify-center gap-1.5 rounded-card border border-border px-3 py-1.5 font-medium text-text transition-[border-color,transform] duration-150 hover:border-primary active:scale-[0.97]"
        >
          <LogoutIcon size={16} />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Link
        href="/login"
        className="rounded-card border border-border px-3 py-1.5 text-center text-sm font-medium text-text transition-[border-color,transform] duration-150 hover:border-primary active:scale-[0.97]"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="rounded-card bg-primary px-3 py-1.5 text-center text-sm font-medium text-white transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.97]"
      >
        Register
      </Link>
    </div>
  );
}
