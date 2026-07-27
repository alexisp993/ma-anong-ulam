import Link from "next/link";
import type { IconProps } from "@/components/icons";

interface ShortcutCardProps {
  label: string;
  href: string;
  description: string;
  actionLabel: string;
  icon: (props: IconProps) => React.JSX.Element;
}

export function ShortcutCard({ label, href, description, actionLabel, icon: Icon }: ShortcutCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-card bg-accent/15 text-accent-dark">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-text">{label}</p>
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-block rounded-card bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
