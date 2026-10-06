import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Heart,
  Radio,
  CalendarDays,
  Lock,
  Users,
  Compass,
  CircleDot,
  ListTodo,
  Calculator,
  Search,
  Bell,
  Clock,
  Moon,
  PencilLine,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { Medallion, HairlineDots } from "@/components/ornaments";
import { pageMetadata } from "@/lib/seo";
import { APP_STORE_URL } from "@/lib/links";

export const metadata = pageMetadata({
  title: "Features",
  description:
    "What's in Hussainya: Islamic centres, programs, prayer times, the Hijri calendar, and everyday ibadah tools.",
  path: "/features",
});

const centreCapabilities = [
  { Icon: MapPin, title: "Address & directions", body: "The full address, and one tap to get directions." },
  { Icon: Phone, title: "Contact details", body: "Phone, email, website, and social links in one place." },
  { Icon: Radio, title: "Live streams", body: "When a centre goes live on YouTube, watch it in the app." },
  { Icon: CalendarDays, title: "Programs & notices", body: "Each centre's upcoming programs and latest announcements." },
  { Icon: Heart, title: "Favourites", body: "Favourite the centres you attend to fill your Programs tab." },
  { Icon: PencilLine, title: "Suggest an update", body: "Spot something out of date? Send the centre a correction." },
];

const ibadahTools = [
  { Icon: CircleDot, title: "Tasbih", body: "A dhikr counter, including Tasbeeh al-Zahra." },
  {
    Icon: ListTodo,
    title: "Qadha",
    body: "Work out how many prayers you owe, then track them as you make them up.",
  },
  { Icon: Calculator, title: "Khums", body: "Work through your yearly khums one step at a time." },
  { Icon: Compass, title: "Qibla", body: "A compass that points to the Kaaba using your phone's sensors." },
];

const homeTiles = [
  {
    Icon: Moon,
    title: "Today's date",
    body: "Hijri and Gregorian, with the occasion if there is one.",
  },
  {
    Icon: Clock,
    title: "Prayer times",
    body: "The next prayer and the rest of today's times. Calculated on your phone, so they work offline.",
  },
  {
    Icon: Radio,
    title: "Live now",
    body: "Your favourite centres that are streaming right now.",
  },
  {
    Icon: Search,
    title: "What's On",
    body: "Ask what's on near you in plain English. Sign in to use it.",
  },
];

export default function FeaturesPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-12 md:mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Features</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            What&apos;s in the app.
          </h1>
          <p className="mt-6 md:mt-8 max-w-2xl text-lg text-[var(--subtext)] leading-relaxed">
            Islamic centres, their programs, prayer times, and a few everyday ibadah tools. On
            iPhone now, with Android in testing.
          </p>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-12 md:mb-24" />

      {/* § 01 Centres */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-8 md:mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 01</div>
            <div className="eyebrow mt-1">Centres</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Hussainiyas and Islamic centres across Australia.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              Browse by state or search by name. Centre managers keep their own details and
              programs up to date.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {centreCapabilities.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-6 md:p-8 lg:p-10 flex md:flex-col gap-5 md:min-h-[200px]"
            >
              <Icon className="size-7 shrink-0 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div>
                <h3 className="font-lora text-2xl text-[var(--text)] mb-2">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed text-[15px]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* § 02 Programs */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-8 md:mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 02</div>
            <div className="eyebrow mt-1">Programs</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Majalis, classes, and gatherings.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="border border-[var(--border)] rounded-2xl p-6 md:p-10 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <Users className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div className="eyebrow">From your centres</div>
            </div>
            <h3 className="font-lora text-2xl md:text-3xl text-[var(--text)]">
              Everything your centres post, by date.
            </h3>
            <p className="text-[var(--subtext)] leading-relaxed">
              RSVP, add a program to your calendar, or register where the centre takes bookings.
              Times are shown in your own time zone.
            </p>
          </div>

          <div className="border border-[var(--border)] rounded-2xl p-6 md:p-10 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <Lock className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div className="eyebrow">Invite-only</div>
            </div>
            <h3 className="font-lora text-2xl md:text-3xl text-[var(--text)]">
              Hosting a majlis at home? Share one link.
            </h3>
            <p className="text-[var(--subtext)] leading-relaxed">
              Create a private program and send the invite link however you like. Guests sign in,
              accept, and it shows up with the rest of their programs.
            </p>
          </div>
        </div>
      </section>

      {/* § 03 Calendar */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-8 md:mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 03</div>
            <div className="eyebrow mt-1">Calendar</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              The Hijri month, with occasions and programs.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              Each day shows its Gregorian and Hijri date. Shahadat, wiladat, and Eid are marked,
              and days with programs from your centres stand out at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* § 04 Ibadah */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-8 md:mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 04</div>
            <div className="eyebrow mt-1">Ibadah</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Four everyday tools.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {ibadahTools.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-6 md:p-10 lg:p-12 flex md:flex-col gap-5 md:gap-8 md:min-h-[220px]"
            >
              <Icon className="size-7 shrink-0 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div>
                <h3 className="font-lora text-2xl md:text-3xl text-[var(--text)] mb-2 md:mb-3">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* § 05 Home */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-8 md:mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 05</div>
            <div className="eyebrow mt-1">On Home</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Your day, on the first screen.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              Open the app to today&apos;s date and prayer times, any centre that&apos;s live, and
              one tap to your centres, calendar, and tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {homeTiles.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-6 md:p-8 flex md:flex-col gap-5 md:min-h-[200px]"
            >
              <Icon className="size-6 shrink-0 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div>
                <h3 className="font-lora text-xl text-[var(--text)] mb-2">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed text-[14px]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Also */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-3">§ Also</div>
            <h2 className="font-lora text-3xl text-[var(--text)]">The details.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[var(--text)]">
            <div className="flex items-start gap-3">
              <Clock className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                Five calculation methods. Use your current location or pick a city.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                A notification when a favourite centre posts a program or goes live. Turn off
                either.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LayoutGrid className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                Widgets for prayer times, the Hijri date, and today&apos;s programs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                Browse without an account. Sign in with Apple, Google, or email to save
                favourites and RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get the app */}
      <section className="border-t border-[var(--border)] pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-6">§ Get the app</div>
            <h2 className="font-lora text-3xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              On iPhone now. Android is in testing.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-wrap items-center gap-6">
            <a href={APP_STORE_URL} className="inline-flex items-center">
              <Image
                src="/app-store-badge-black.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-12 w-auto"
              />
            </a>
            <Link
              href="/#android-testing"
              className="inline-flex items-center gap-1.5 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] editorial-link"
            >
              Join Android testing
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-16 md:mt-24 flex justify-center">
        <HairlineDots className="w-40 text-[var(--color-gold)]" />
      </div>
      <div className="mt-8 md:mt-10 flex justify-center">
        <Medallion className="w-24 h-24 text-[var(--color-gold)] opacity-50" />
      </div>
    </article>
  );
}
