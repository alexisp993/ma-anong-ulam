"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoutIcon } from "@/components/icons";

// `stacked` is used inside the Sidebar's narrower column; the default
// horizontal layout is unchanged for the mobile Header.
export function AuthActions({ stacked = false }: { stacked?: boolean }) {
  const { data: session, status } = useSession();
  const containerClass = stacked ? "flex flex-col items-stretch gap-2" : "flex items-center gap-2";
  const compact = "!px-3 !py-1.5 !text-sm";

  if (status === "loading") {
    return <div className="h-9 w-20" aria-hidden="true" />;
  }

  if (session?.user) {
    return (
      <div className={`${containerClass} text-sm`}>
        <span className={`truncate text-text-muted ${stacked ? "" : "hidden sm:inline"}`}>
          {session.user.email}
        </span>
        <Button
          type="button"
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
          className={compact}
        >
          <LogoutIcon size={16} />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <ButtonLink href="/login" variant="secondary" className={compact}>
        Sign In
      </ButtonLink>
      <ButtonLink href="/register" className={compact}>
        Register
      </ButtonLink>
    </div>
  );
}
