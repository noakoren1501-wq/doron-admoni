import type { ResolvedShow } from "@/lib/schedule";
import MonthAccordion from "./MonthAccordion";

export default function ShowSchedule({ show }: { show: ResolvedShow }) {
  return (
    <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-10">
      <div className="lg:col-span-4">
        <p className="flex items-center gap-2 text-xs font-medium text-ember">
          <span className="h-px w-5 bg-ember" aria-hidden />
          לוח הופעות
        </p>
        <p className="mt-2 text-3xl leading-none font-black tracking-[-0.03em] lg:mt-3 lg:text-5xl">{show.title}</p>
        <p className="mt-2 text-sm text-smoke lg:mt-4">
          {show.months.length > 0 ? "בחרו חודש כדי לראות את התאריכים" : "אין כרגע הופעות קרובות"}
        </p>
      </div>

      <div className="lg:col-span-8">
        {show.months.length > 0 ? (
          <div className="flex flex-col gap-2">
            {show.months.map((month) => (
              <MonthAccordion key={month.key} month={month} showTitle={show.title} />
            ))}
          </div>
        ) : (
          <a
            href={show.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-chalk pb-1 text-sm font-medium transition-colors hover:border-ember hover:text-ember"
          >
            לעמוד ההצגה
            <span aria-hidden>←</span>
          </a>
        )}
      </div>
    </div>
  );
}
