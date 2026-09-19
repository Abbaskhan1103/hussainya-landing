import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, CalendarHeart, MoonStar } from "lucide-react";
import {
  Medallion,
  EightPointStar,
  HairlineDots,
  AppleMark,
  AndroidMark,
} from "@/components/ornaments";
import { WaitlistForm } from "@/components/waitlist-form";
import { pageMetadata } from "@/lib/seo";

const APP_STORE_URL = "https://apps.apple.com/app/id6774542995";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 lg:pt-32 pb-24 lg:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-8 fade-up inline-flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>§ Live on iOS &middot; Android testing open</span>
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
            <div className="mt-12 max-w-xl fade-up fade-up-3">
              <div className="flex flex-wrap items-center gap-4">
                <a href={APP_STORE_URL} className="inline-flex items-center">
                  <Image
                    src="/app-store-badge-black.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-[52px] w-auto"
                    priority
                  />
                </a>
                <Link
                  href="#android-testing"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--subtext)] hover:text-[var(--text)] editorial-link"
                >
                  Android testing is open
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-[var(--subtext)]">
                The web app is next. No noise, just the launch.
              </p>
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
              icon: MapPin,
              title: "Centres",
              body: "Find hussainiyas and Islamic centres near you. Addresses, programs, contact, and how to be there.",
            },
            {
              icon: CalendarHeart,
              title: "Programs",
              body: "Live and upcoming majalis, classes, and gatherings. Saved, shared, and added to your calendar.",
            },
            {
              icon: MoonStar,
              title: "Ibadah",
              body: "Prayer times, qibla, daily aamal, tasbih, khums calculator, and a thoughtful guide to the seerah.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-[var(--background)] p-10 lg:p-12 flex flex-col gap-8 min-h-[340px]"
              >
                <Icon className="size-8 text-[var(--color-gold)]" strokeWidth={1.25} />
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
      <section id="android-testing" className="mx-auto max-w-[1280px] px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="border-t border-[var(--border)] pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6">§ 03 / Android testing</div>
            <h2 className="font-[var(--font-lora)] text-5xl md:text-6xl leading-[1.02] tracking-tight text-[var(--text)]">
              Android testing
              <br />
              is open now.
            </h2>
            <p className="mt-8 max-w-xl text-[var(--subtext)] leading-relaxed">
              Leave your email and we&rsquo;ll send you the join link the same day. The web app
              follows shortly after, inshaAllah &mdash; already on iPhone? Get it from the App
              Store above.
            </p>
            <WaitlistForm
              id="android-testing-form"
              className="mt-8 max-w-xl"
              source="android_testing"
              buttonLabel="Send me the join link"
              buttonLabelShort="Join"
              successMessage="You're on the Android testing list. We'll email you the join link shortly."
            />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-[var(--border)] py-5">
              <div className="flex items-center gap-5">
                <AppleMark className="size-6 text-[var(--color-gold)]" />
                <div>
                  <div className="eyebrow text-[var(--subtext)]">Apple</div>
                  <div className="font-[var(--font-lora)] text-2xl text-[var(--text)] mt-1">
                    iOS, App Store
                  </div>
                </div>
              </div>
              <a
                href={APP_STORE_URL}
                className="eyebrow text-[var(--color-gold)] hover:text-[var(--color-gold-light)] whitespace-nowrap"
              >
                Live now
              </a>
            </div>

            <div className="flex items-center justify-between border-b border-[var(--border)] py-5">
              <div className="flex items-center gap-5">
                <AndroidMark className="size-6 text-[var(--color-gold)]" />
                <div>
                  <div className="eyebrow text-[var(--subtext)]">Google</div>
                  <div className="font-[var(--font-lora)] text-2xl text-[var(--text)] mt-1">
                    Android, Play Store
                  </div>
                </div>
              </div>
              <span className="eyebrow text-[var(--color-gold)] whitespace-nowrap">
                In testing
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-20 opacity-60">
        <HairlineDots className="w-40 text-[var(--color-gold)]" />
      </div>
    </>
  );
}
