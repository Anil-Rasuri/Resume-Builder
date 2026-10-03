import { forwardRef, type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, required, id, className = "", ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={`min-w-0 ${className}`}>
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 sm:py-2 sm:text-sm ${
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

TextField.displayName = "TextField";
