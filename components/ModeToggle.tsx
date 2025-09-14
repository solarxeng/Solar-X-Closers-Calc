"use client";
import type { DealMode } from "@/types/deal";

export function ModeToggle({
  value,
  onChange,
}: { value: DealMode; onChange: (m: DealMode) => void }) {
  const isLoan = value === "loan_cash";
  const base =
    "px-4 py-2 text-sm font-medium transition";
  return (
    <div className="inline-flex rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden">
      <button
        type="button"
        aria-pressed={isLoan}
        onClick={() => onChange("loan_cash")}
        className={`${base} ${isLoan ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-transparent text-neutral-700 dark:text-neutral-300"}`}
      >
        Loan / Cash
      </button>
      <button
        type="button"
        aria-pressed={!isLoan}
        onClick={() => onChange("tpo_ppa")}
        className={`${base} ${!isLoan ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-transparent text-neutral-700 dark:text-neutral-300"}`}
      >
        TPO / PPA (Base Only)
      </button>
    </div>
  );
}
