import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    <Card interactive className="flex flex-col gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-pill bg-primary-tint text-primary">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-text">{label}</p>
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      </div>
      <ButtonLink href={href} className="!px-4 !py-2 !text-sm">
        {actionLabel}
      </ButtonLink>
    </Card>
  );
}
