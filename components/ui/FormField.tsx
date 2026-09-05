import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  error,
  hint,
  required = false,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>

      <div className="[&_input]:w-full [&_select]:w-full [&_textarea]:w-full">
        {children}
      </div>

      {hint ? (
        <p id={hintId} className="text-sm text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-red-600 dark:text-red-400"
        >
          <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">
            !
          </span>
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export function getFieldDescribedBy(
  id: string,
  hint?: string,
  error?: string,
): string | undefined {
  const ids = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined,
  ].filter(Boolean);

  return ids.length > 0 ? ids.join(" ") : undefined;
}

export const inputClassName =
  "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950";

export const inputErrorClassName =
  "border-red-500 focus-visible:ring-red-500 dark:border-red-400 dark:focus-visible:ring-red-400";
