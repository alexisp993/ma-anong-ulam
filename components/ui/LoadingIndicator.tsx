import { LoadingIcon } from "@/components/icons";

export function LoadingIndicator({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-8 text-text-muted">
      <LoadingIcon size={18} className="animate-spin" />
      <span>{label}</span>
    </div>
  );
}
