import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { YearOpener } from "@/components/year-opener";
import { pageMetadata } from "@/lib/seo";
import { programCountsByDay } from "@/lib/programs";

export const metadata = pageMetadata({ path: "/" });

// Hourly: refreshes the ring's program counts and the date baked into the HTML.
export const revalidate = 3600;

const isoDay = (base: Date, offset: number) =>
  new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + offset))
    .toISOString()
    .slice(0, 10);

export default async function Home() {
  // A Hijri year either side of today, with two days' slack for visitors whose
  // "today" is not the server's.
  const now = new Date();
  const counts = await programCountsByDay(isoDay(now, -356), isoDay(now, 356));

  return (
    <>
      <YearOpener counts={counts} generatedAt={now.toISOString()} />

      {/* Intention */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="font-lora text-2xl md:text-4xl leading-[1.25] text-[var(--text)]">
            Built quietly, in the spirit of{" "}
            <em className="text-[var(--color-gold)]">khidmah</em>. A small, careful tool for the
            daily life of the community.
          </p>
          <p className="mt-6 md:mt-8 text-lg text-[var(--subtext)] leading-relaxed max-w-2xl">
            Hussainya does not replace your centre, your scholar, or your community. It just
            makes the practical part of being a Muslim feel a little less scattered.
          </p>
          <Link
            href="/about"
            className="mt-6 md:mt-8 inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] editorial-link"
          >
            Read more about the project
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
