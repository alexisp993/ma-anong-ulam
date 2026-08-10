import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "View all",
  as: Tag = "h2",
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <Tag className={Tag === "h1" ? "text-2xl font-extrabold text-text" : "text-lg font-bold text-text"}>
          {title}
        </Tag>
        {subtitle && <p className="mt-0.5 text-sm text-text-muted">{subtitle}</p>}
      </div>
      {action}
      {!action && href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-primary transition-opacity duration-150 hover:underline active:opacity-70"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
