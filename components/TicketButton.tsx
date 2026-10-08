type TicketButtonProps = {
  href: string;
  /** Accessible description, e.g. "בילי שוורץ, 09.10, חיפה" */
  label: string;
};

export default function TicketButton({ href, label }: TicketButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`לכרטיסים – ${label} (נפתח בחלון חדש)`}
      className="group/ticket inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#ea3d34,#c3241d)] px-4 text-sm font-semibold whitespace-nowrap text-chalk shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] transition-[box-shadow,transform,filter] duration-300 ease-(--ease-stage) hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_30px_-8px_rgb(227_52_44/0.75)] hover:brightness-110 active:scale-[0.97] sm:h-12 sm:px-5"
    >
      לכרטיסים
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className="size-3.5 transition-transform duration-300 ease-(--ease-stage) group-hover/ticket:-translate-x-1"
      >
        <path d="M14 8H2.5M7 3.5 2.5 8 7 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
