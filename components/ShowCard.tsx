import type { CSSProperties } from "react";
import type { ResolvedShow } from "@/lib/schedule";

type ShowCardProps = {
  show: ResolvedShow;
  index: number;
  selected: boolean;
  panelId: string;
  onSelect: () => void;
};

export default function ShowCard({ show, index, selected, panelId, onSelect }: ShowCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const countLabel =
    show.upcomingCount === 0
      ? "אין מועדים קרובים"
      : show.upcomingCount === 1
        ? "מועד אחד"
        : `${show.upcomingCount} מועדים`;

  return (
    <div
      data-show-card
      style={{ animationDelay: `${150 + index * 110}ms` } as CSSProperties}
      className="w-[84%] shrink-0 snap-start animate-rise sm:w-[58%] lg:w-auto"
    >
      <button
        type="button"
        aria-expanded={selected}
        aria-controls={panelId}
        onClick={onSelect}
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-5 text-right transition-[border-color,background-color,box-shadow] duration-500 ease-(--ease-stage) sm:p-6 lg:p-7 ${
          selected
            ? "border-ember bg-stage-2 shadow-[0_24px_60px_-28px_rgb(227_52_44/0.7)]"
            : "border-edge bg-stage hover:border-ember/45 hover:bg-stage-2"
        }`}
      >
        {/* Soft red light that rises on hover */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-ember/25 blur-3xl transition-opacity duration-700 ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          }`}
        />
        {/* Oversized index number, barely there */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -left-1 text-[9rem] leading-none font-black tracking-tighter text-chalk/[0.025] lg:text-[11rem]"
        >
          {number}
        </span>

        <span className="relative flex items-center justify-between">
          <span className="text-sm font-bold text-ember tabular-nums">{number}</span>
          <span className="rounded-full border border-edge bg-night/60 px-2.5 py-1 text-xs text-smoke">{countLabel}</span>
        </span>

        <span className="relative mt-5 block text-[2.1rem] leading-none font-black tracking-[-0.03em] transition-transform duration-500 ease-(--ease-stage) group-hover:-translate-x-1.5 lg:mt-10 lg:text-[2.6rem]">
          {show.title}
        </span>
        <span className="relative mt-2.5 block text-sm font-light text-smoke">{show.tagline}</span>

        {/* Synopsis */}
        <span className="relative mt-4 block border-t border-edge pt-4 lg:mt-6 lg:pt-5">
          {show.synopsis.map((paragraph, i) => (
            <span
              key={i}
              className={`block text-[0.84rem] leading-[1.6] lg:text-[0.9rem] lg:leading-relaxed ${i === 0 ? "font-medium text-chalk/90" : "mt-2 font-light text-smoke lg:mt-2.5"}`}
            >
              {paragraph}
            </span>
          ))}
          <span className="mt-4 block text-[11px] text-ash">מקור: {show.synopsisSource}</span>
        </span>

        <span className="relative mt-auto flex items-center justify-between pt-5 lg:pt-12">
          <span className={`text-sm font-medium transition-colors ${selected ? "text-chalk" : "text-smoke group-hover:text-chalk"}`}>
            {selected ? "סגירה" : "לתאריכים"}
          </span>
          <span
            aria-hidden
            className={`flex size-10 items-center justify-center rounded-full border transition-all duration-500 ease-(--ease-stage) ${
              selected ? "rotate-45 border-ember bg-ember text-chalk" : "border-edge group-hover:border-ember group-hover:text-ember"
            }`}
          >
            <svg viewBox="0 0 16 16" className="size-4">
              <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}
