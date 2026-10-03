import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={`min-w-0 ${className}`}>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
          {hint && <span className="text-xs text-slate-400">{hint}</span>}
        </div>
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={`w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 sm:py-2 sm:text-sm ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
