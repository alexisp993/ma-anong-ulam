import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
}

export function EmptyState({ message, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="space-y-3 py-10 text-center text-text-muted">
      {icon && <div className="flex justify-center text-border">{icon}</div>}
      <p className="whitespace-pre-line">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block rounded-card bg-primary px-5 py-2.5 font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.97]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
