import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  CalendarHeart,
  MoonStar,
  Apple,
  Smartphone,
  Globe,
  Clock,
} from "lucide-react";
import { Medallion, EightPointStar, HairlineDots } from "@/components/ornaments";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 lg:pt-32 pb-24 lg:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-8 fade-up inline-flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>§ Coming soon &middot; In the final stretch</span>
            </div>
            <h1 className="font-[var(--font-lora)] text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.02] tracking-[-0.02em] text-[var(--text)] fade-up fade-up-1">
              A digital home
              <br />
              for the{" "}
              <em className="text-[var(--color-gold)] font-[var(--font-lora)] italic font-medium">
                Ahl al-Bayt
              </em>
              <br />
              community.
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--subtext)] fade-up fade-up-2">
              Centres, programs, prayer times, qibla, the daily aamal. Gathered with intention, in
              one quiet place that respects the rhythm of your ibadah.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-5 fade-up fade-up-3">
              <div className="inline-flex h-14 items-center gap-3 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] text-[var(--color-gold)] px-7 text-base font-medium tracking-wide">
                <Clock className="size-5" strokeWidth={1.5} />
                Launching soon
              </div>
              <span className="text-sm text-[var(--subtext)]">
                Coming to{" "}
                <span className="text-[var(--text)] font-medium">iOS</span>,{" "}
                <span className="text-[var(--text)] font-medium">Android</span>, and{" "}
                <span className="text-[var(--text)] font-medium">Web</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pt-8 hidden lg:flex justify-center fade-up fade-up-4">
            <Medallion className="w-full max-w-[360px] text-[var(--color-gold)] opacity-80" />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            color: "var(--text)",
          }}
        />
      </section>

      {/* Quote band */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-10 flex items-center justify-center gap-6 md:gap-8 text-center">
          <EightPointStar className="size-5 text-[var(--color-gold)] shrink-0" />
          <p className="font-[var(--font-lora)] text-xl md:text-2xl italic text-[var(--text)] leading-relaxed">
            &ldquo;Every day is Ashura, every land is Karbala.&rdquo;
          </p>
          <EightPointStar className="size-5 text-[var(--color-gold)] shrink-0" />
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 01</div>
            <div className="eyebrow mt-1">Three Pillars</div>
          </div>
          <h2 className="lg:col-span-9 font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
            Three quiet doorways into the{" "}
            <em className="text-[var(--color-gold)]">same purpose</em>: to make ibadah feel close,
            present, and shared.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              n: "I",
              icon: MapPin,
              title: "Centres",
              body: "Find hussainiyas and Islamic centres near you. Addresses, programs, contact, and how to be there.",
            },
            {
              n: "II",
              icon: CalendarHeart,
              title: "Programs",
              body: "Live and upcoming majalis, classes, and gatherings. Saved, shared, and added to your calendar.",
            },
            {
              n: "III",
              icon: MoonStar,
              title: "Ibadah",
              body: "Prayer times, qibla, daily aamal, tasbih, khums calculator, and a thoughtful guide to the seerah.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.n}
                className="bg-[var(--background)] p-10 lg:p-12 flex flex-col gap-8 min-h-[340px]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-[var(--font-lora)] text-7xl text-[var(--color-gold)] opacity-30 leading-none">
                    {p.n}
                  </span>
                  <Icon className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
                </div>
                <div>
                  <h3 className="font-[var(--font-lora)] text-3xl text-[var(--text)] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[var(--subtext)] leading-relaxed">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Intention */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-3">§ 02</div>
            <div className="eyebrow">Intention</div>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <p className="font-[var(--font-lora)] text-3xl md:text-4xl leading-[1.2] text-[var(--text)]">
              Built quietly, in the spirit of{" "}
              <em className="text-[var(--color-gold)]">khidmah</em>. Not a marketplace. Not a
              feed. A small, careful tool for the daily life of the community.
            </p>
            <p className="text-lg text-[var(--subtext)] leading-relaxed max-w-2xl">
              Hussainya does not replace your centre, your scholar, or your community. It just
              makes the practical part of being a Shia Muslim in 2026 feel a little less
              scattered.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] editorial-link"
            >
              Read more about the project
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* App CTA strip */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="border-t border-[var(--border)] pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6">§ 03 / Arriving soon</div>
            <h2 className="font-[var(--font-lora)] text-5xl md:text-6xl leading-[1.02] tracking-tight text-[var(--text)]">
              Soon, on the device
              <br />
              already in your hand.
            </h2>
            <p className="mt-8 max-w-xl text-[var(--subtext)] leading-relaxed">
              The first builds are in the hands of testers. Public release on iOS, Android, and the
              web follows shortly, inshaAllah.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-1">
            {[
              {
                eyebrow: "Apple",
                title: "iOS, App Store",
                status: "Coming soon",
                Icon: Apple,
              },
              {
                eyebrow: "Google",
                title: "Android, Play Store",
                status: "Coming soon",
                Icon: Smartphone,
              },
              {
                eyebrow: "Browser",
                title: "Web, app.hussainya.com",
                status: "Coming soon",
                Icon: Globe,
              },
            ].map((row) => {
              const Icon = row.Icon;
              return (
                <div
                  key={row.title}
                  className="flex items-center justify-between border-b border-[var(--border)] py-5"
                >
                  <div className="flex items-center gap-5">
                    <Icon className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
                    <div>
                      <div className="eyebrow text-[var(--subtext)]">{row.eyebrow}</div>
                      <div className="font-[var(--font-lora)] text-2xl text-[var(--text)] mt-1">
                        {row.title}
                      </div>
                    </div>
                  </div>
                  <span className="eyebrow text-[var(--color-gold)] whitespace-nowrap">
                    {row.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-20 opacity-60">
        <HairlineDots className="w-40 text-[var(--color-gold)]" />
      </div>
    </>
  );
}
