import type { ResolvedPerformance } from "@/lib/schedule";
import TicketButton from "./TicketButton";

type DateRowProps = {
  performance: ResolvedPerformance;
  showTitle: string;
};

export default function DateRow({ performance, showTitle }: DateRowProps) {
  const { dateLabel, dayLabel, time, venue, city, href } = performance;

  return (
    <li className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-0.5 border-t border-edge-soft py-4 [grid-template-areas:'date_place_cta''day_place_cta''time_place_cta'] sm:grid-cols-[5.25rem_4.5rem_minmax(0,1fr)_auto] sm:gap-x-6 sm:[grid-template-areas:'date_time_place_cta''day_time_place_cta']">
      <span className="text-[1.6rem] leading-none font-black tracking-[-0.02em] tabular-nums [grid-area:date] sm:text-3xl">
        {dateLabel}
      </span>
      <span className="text-xs text-smoke [grid-area:day] sm:text-sm">{dayLabel}</span>
      <span className="text-sm font-bold text-ember tabular-nums [grid-area:time] sm:row-span-2 sm:self-center sm:text-lg">
        {time}
      </span>

      <span className="min-w-0 [grid-area:place]">
        <span className="block text-base leading-snug font-semibold sm:text-lg">{city}</span>
        <span className="block text-[0.8rem] leading-snug text-smoke sm:text-sm">{venue}</span>
      </span>

      <span className="[grid-area:cta]">
        <TicketButton href={href} label={`${showTitle}, ${dayLabel} ${dateLabel} בשעה ${time}, ${venue} ${city}`} />
      </span>
    </li>
  );
}
