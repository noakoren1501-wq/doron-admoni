import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PHOTO_SRC = "/images/doron-admoni.jpg";

function photoExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", PHOTO_SRC));
  } catch {
    return false;
  }
}

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-2 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-edge px-2 text-center text-smoke">
      <span className="text-xs font-bold text-chalk">תמונה של דורון</span>
      <code dir="ltr" className="font-mono text-[9px] leading-tight break-all">
        public/images/
        <br />
        doron-admoni.jpg
      </code>
    </div>
  );
}

export default function Hero() {
  const hasPhoto = photoExists();

  return (
    <header className="relative isolate overflow-x-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between pt-5 pb-3 text-xs text-smoke animate-rise md:pt-8">
          <span className="font-semibold text-chalk">דורון אדמוני</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ember" aria-hidden />
            עונת 2026 / 27
          </span>
        </div>

        <div className="flex items-center gap-5 pt-8 pb-12 sm:gap-7 md:gap-10 md:pt-14 md:pb-20">
          {/* Portrait */}
          <figure className="relative w-28 shrink-0 sm:w-36 md:w-44">
            {/* Stage light behind the portrait */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 animate-spotlight rounded-full bg-ember/30 blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-edge bg-black shadow-[0_20px_50px_-20px_rgb(227_52_44/0.55)]">
              {hasPhoto ? (
                <Image
                  src={PHOTO_SRC}
                  alt="דורון אדמוני"
                  fill
                  priority
                  sizes="(min-width: 768px) 176px, (min-width: 640px) 144px, 112px"
                  className="object-cover object-[50%_20%] animate-portrait"
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
          </figure>

          {/* Name */}
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-night/60 px-3 py-1 text-[11px] font-medium text-chalk animate-rise [animation-delay:200ms] md:text-xs">
              <span className="size-1.5 rounded-full bg-ember animate-pulse-dot" aria-hidden />
              על הבמה עכשיו
            </p>

            <h1 className="mt-3 text-[clamp(2.1rem,9.5vw,2.75rem)] leading-[0.95] font-black tracking-[-0.03em] animate-rise [animation-delay:300ms] md:mt-4 md:text-6xl">
              דורון אדמוני
            </h1>

            <p className="mt-2 text-sm text-smoke animate-rise [animation-delay:420ms] md:mt-3 md:text-lg">
              לוח הצגות ומופעים
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
