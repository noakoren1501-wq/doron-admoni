"use client";

import { useId, useState } from "react";
import type { MonthGroup } from "@/lib/schedule";
import DateRow from "./DateRow";

type MonthAccordionProps = {
  month: MonthGroup;
  showTitle: string;
};

export default function MonthAccordion({ month, showTitle }: MonthAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const count = month.performances.length;

  return (
    <div
      className={`rounded-xl border transition-colors duration-500 ${
        open ? "border-edge bg-night/70" : "border-edge-soft bg-night/40 hover:border-edge"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3.5 text-right sm:px-5"
        >
          <span className="flex items-baseline gap-2.5">
            <span className="text-2xl leading-none font-extrabold tracking-[-0.02em] transition-colors duration-300 group-hover:text-ember sm:text-[1.7rem]">
              {month.month}
            </span>
            <span className="text-sm text-ash tabular-nums">{month.year}</span>
          </span>

          <span className="flex items-center gap-3">
            <span className="text-xs text-smoke">{count === 1 ? "הופעה אחת" : `${count} הופעות`}</span>
            <span
              aria-hidden
              className={`flex size-9 items-center justify-center rounded-full border transition-all duration-500 ease-(--ease-stage) ${
                open ? "rotate-180 border-ember bg-ember text-chalk" : "border-edge group-hover:border-ember"
              }`}
            >
              <svg viewBox="0 0 16 16" className="size-3.5">
                <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-label={`${month.month} ${month.year}`}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-stage) ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="px-4 pb-2 sm:px-5">
            {month.performances.map((p) => (
              <DateRow key={p.id} performance={p} showTitle={showTitle} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
