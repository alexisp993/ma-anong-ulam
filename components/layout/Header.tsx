import Link from "next/link";
import Image from "next/image";
import { AuthActions } from "@/components/layout/AuthActions";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/">
          <Image src="/images/logo.png" alt="Ma, Anong Ulam?" width={36} height={36} className="rounded-card" />
        </Link>
        <AuthActions />
      </div>
    </header>
  );
}
