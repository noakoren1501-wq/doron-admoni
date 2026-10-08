"use client";

import { useId, useRef, useState } from "react";
import type { ResolvedShow } from "@/lib/schedule";
import ShowCard from "./ShowCard";
import ShowSchedule from "./ShowSchedule";

export default function ShowsNavigation({ shows }: { shows: ResolvedShow[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  // Keep the last opened show rendered while the panel animates closed.
  const [displayed, setDisplayed] = useState<string | null>(null);
  // Which card is in view in the mobile carousel
  const [active, setActive] = useState(0);
  const panelId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = selected !== null;
  const displayedShow = shows.find((s) => s.slug === displayed) ?? null;

  function cards() {
    return Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-show-card]") ?? []);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const { left, right } = track.getBoundingClientRect();
    const center = (left + right) / 2;
    let closest = 0;
    let best = Infinity;
    cards().forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const distance = Math.abs((r.left + r.right) / 2 - center);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    setActive(closest);
  }

  function goTo(index: number) {
    cards()[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function toggle(slug: string) {
    if (selected === slug) {
      setSelected(null);
      return;
    }
    setSelected(slug);
    setDisplayed(slug);

    // On phones the dates open below the carousel – bring them into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      window.setTimeout(() => {
        const panel = panelRef.current;
        if (panel && panel.getBoundingClientRect().top > window.innerHeight * 0.6) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    }
  }

  return (
    <section id="shows" aria-labelledby="shows-title" className="mx-auto max-w-6xl scroll-mt-4 px-4 pb-20 sm:px-6 md:px-10 md:pb-32">
      <div className="mb-6 flex items-end justify-between gap-4 animate-rise md:mb-10">
        <div>
          <span className="mb-3 block h-[3px] w-10 rounded-full bg-ember" aria-hidden />
          <h2 id="shows-title" className="text-[2.6rem] leading-none font-black tracking-[-0.03em] md:text-7xl">
            ההצגות שלי
          </h2>
        </div>
        <p className="pb-1 text-xs text-smoke md:text-sm">
          <span className="lg:hidden">החליקו ובחרו הצגה</span>
          <span className="hidden lg:inline">בחרו הצגה</span>
        </p>
      </div>

      {/* Phones/tablets: a swipeable row. Desktop: three columns. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pt-1 pb-6 lg:pt-0 lg:pb-0 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {shows.map((show, index) => (
          <ShowCard
            key={show.slug}
            show={show}
            index={index}
            selected={selected === show.slug}
            panelId={panelId}
            onSelect={() => toggle(show.slug)}
          />
        ))}
      </div>

      {/* Carousel position */}
      <div className="-mt-3 flex justify-center gap-1 lg:hidden">
        {shows.map((show, index) => (
          <button
            key={show.slug}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`מעבר להצגה ${show.title}`}
            aria-current={active === index}
            className="flex h-6 items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ease-(--ease-stage) ${
                active === index ? "w-6 bg-ember" : "w-1.5 bg-edge"
              }`}
            />
          </button>
        ))}
      </div>

      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-label={displayedShow ? `תאריכים – ${displayedShow.title}` : undefined}
        inert={!open}
        className={`grid scroll-mt-4 transition-[grid-template-rows,opacity] duration-700 ease-(--ease-stage) ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-3">
            <div className="rounded-2xl border border-edge bg-stage">
              {displayedShow && <ShowSchedule key={displayedShow.slug} show={displayedShow} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
