import type { IconProps } from "@/components/icons";

interface StatRowProps {
  items: {
    icon: (props: IconProps) => React.JSX.Element;
    label: string;
    value: string;
  }[];
}

export function StatRow({ items }: StatRowProps) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => {
        const ItemIcon = item.icon;
        return (
          <div key={item.label} className="flex flex-col items-center gap-1 text-center">
            <ItemIcon size={20} className="text-primary" />
            <dd className="text-sm font-bold text-text">{item.value}</dd>
            <dt className="text-xs text-text-muted">{item.label}</dt>
          </div>
        );
      })}
    </dl>
  );
}
