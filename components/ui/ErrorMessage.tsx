import { Button } from "@/components/ui/Button";
import { XCircleIcon } from "@/components/icons";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

// Standard fallback copy per FRONTEND_SPEC.md §16.5.
export function ErrorMessage({
  message = "Unable to complete the request.\nPlease try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div role="alert" className="space-y-3 py-10 text-center">
      <div className="flex justify-center text-primary">
        <XCircleIcon size={28} />
      </div>
      <p className="whitespace-pre-line text-text-muted">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
