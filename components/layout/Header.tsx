import Link from "next/link";
import { AuthActions } from "@/components/layout/AuthActions";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-primary">
          Ma, Anong Ulam?
        </Link>
        <AuthActions />
      </div>
    </header>
  );
}
