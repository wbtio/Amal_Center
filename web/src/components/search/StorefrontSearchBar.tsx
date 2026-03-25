"use client";

import { Search, X } from "lucide-react";
import { type FormEvent } from "react";

import { cn } from "@/lib/utils";

type StorefrontSearchBarProps = {
  value: string;
  isRTL: boolean;
  placeholder: string;
  helperText?: string | null;
  pending?: boolean;
  variant?: "header" | "page";
  className?: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function StorefrontSearchBar({
  value,
  isRTL,
  placeholder,
  helperText,
  pending = false,
  variant = "page",
  className,
  onChange,
  onClear,
  onSubmit,
}: StorefrontSearchBarProps) {
  const hasValue = value.trim().length > 0;
  const clearLabel = isRTL ? "مسح البحث" : "Clear search";
  const submitLabel = isRTL ? "بحث" : "Search";
  const shellClass =
    variant === "header"
      ? "rounded-[1.35rem] border border-white/75 bg-white/92 p-1 shadow-soft"
      : "rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-1.5 shadow-soft";
  const fieldHeightClass = variant === "header" ? "h-11" : "h-12";
  const submitClass =
    variant === "header"
      ? "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[1rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary"
      : "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[1.2rem] bg-[#1D1D1F] px-4 text-sm font-medium text-white shadow-button transition hover:bg-primary";

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div className={shellClass}>
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 start-4"
            />
            <input
              type="search"
              name="q"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              className={cn(
                fieldHeightClass,
                "w-full rounded-[1.1rem] border-0 bg-transparent text-sm text-[#1D1D1F] outline-none placeholder:text-slate-400 ps-11 text-start",
                hasValue && "pe-10"
              )}
            />
            {hasValue ? (
              <button
                type="button"
                onClick={onClear}
                className="absolute top-1/2 end-2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={clearLabel}
                title={clearLabel}
              >
                <X size={15} />
              </button>
            ) : null}
          </div>

          <button
            type="submit"
            className={submitClass}
            aria-label={submitLabel}
            title={submitLabel}
          >
            <Search size={16} />
            <span className="hidden sm:inline">{submitLabel}</span>
          </button>
        </div>
      </div>

      {helperText ? (
        <p
          className={cn(
            "mt-2 px-1 text-xs text-start",
            pending ? "text-primary" : "text-slate-500"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </form>
  );
}
