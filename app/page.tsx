import Hero from "@/components/Hero";
import ShowsNavigation from "@/components/ShowsNavigation";
import Footer from "@/components/Footer";
import { shows } from "@/data/shows";
import { resolveShows } from "@/lib/schedule";

// Re-generate hourly so performances that already happened drop off the schedule.
export const revalidate = 3600;

export default function Home() {
  const resolved = resolveShows(shows, new Date());

  return (
    <main className="min-h-dvh">
      <Hero />
      <ShowsNavigation shows={resolved} />
      <Footer />
    </main>
  );
}
