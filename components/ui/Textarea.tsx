import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, name, className = "", ...props },
  ref
) {
  const textareaId = id ?? name;
  return (
    <div className="space-y-1">
      <label htmlFor={textareaId} className="block text-sm font-medium text-text">
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full rounded-card border border-border bg-surface px-3 py-2 text-text transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${className}`}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});
