import Link from "next/link";
import Image from "next/image";
import { AuthActions } from "@/components/layout/AuthActions";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="" width={34} height={34} className="rounded-card" />
          <span className="text-base font-extrabold tracking-tight text-text">Ma, anong ulam?</span>
        </Link>
        <AuthActions />
      </div>
    </header>
  );
}
