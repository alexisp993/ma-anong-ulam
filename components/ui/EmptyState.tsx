import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

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
        <div>
          <ButtonLink href={actionHref}>{actionLabel}</ButtonLink>
        </div>
      )}
    </div>
  );
}
