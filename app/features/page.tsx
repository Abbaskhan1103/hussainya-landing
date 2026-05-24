import Link from "next/link";
import {
  MapPin,
  Phone,
  Globe,
  Heart,
  Navigation2,
  Radio,
  CalendarDays,
  Lock,
  Share2,
  Users,
  Compass,
  CircleDot,
  ListTodo,
  Calculator,
  Sparkles,
  Search,
  Bell,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Medallion, HairlineDots } from "@/components/ornaments";

export const metadata = {
  title: "Features · Hussainya",
  description:
    "A look at what's inside Hussainya: centres, programs, the Hijri calendar, and the daily ibadah tools.",
};

const centreCapabilities = [
  { Icon: MapPin, title: "Address & directions", body: "Suburb, full address, and one tap to Google Maps." },
  { Icon: Phone, title: "Contact, in one place", body: "Phone, email, website, Instagram, Facebook, YouTube." },
  { Icon: Radio, title: "Live indicator", body: "A subtle badge when a centre is broadcasting on YouTube." },
  { Icon: CalendarDays, title: "Upcoming programs", body: "Each centre's published majalis, classes, and gatherings." },
  { Icon: Heart, title: "Favourite to follow", body: "Favourited centres feed your calendar and Home search." },
  { Icon: Navigation2, title: "Find by closeness", body: "Sorted by distance when you allow location; otherwise alphabetically." },
];

const ibadahTools = [
  {
    n: "I",
    Icon: CircleDot,
    title: "Tasbih",
    body: "A counter for dhikr, with optional milestone tones so you can keep your eyes closed.",
  },
  {
    n: "II",
    Icon: ListTodo,
    title: "Qadha tracker",
    body: "Quietly keep count of missed prayers and chip away at them, day by day.",
  },
  {
    n: "III",
    Icon: Calculator,
    title: "Khums calculator",
    body: "Walk through your annual khums with a small, careful calculator that shows its working.",
  },
  {
    n: "IV",
    Icon: Sparkles,
    title: "Duas & Aamal",
    body: "Arabic, transliteration, English, audio, and repeat counts. Today's aamal surfaced automatically.",
  },
];

const homeTiles = [
  { Icon: Clock, title: "Next prayer", body: "A live countdown to the next salah, with all five times on a single strip." },
  { Icon: Compass, title: "Qibla", body: "A compass that points to the Kaaba, using your device's sensors when allowed." },
  { Icon: Sparkles, title: "Today's aamal", body: "Auto-selected from the Hijri date, in your city's timezone." },
  { Icon: Search, title: "“What's on?”", body: "Ask in plain English. We search your favourited centres' programs and your own events." },
];

export default function FeaturesPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow inline-flex items-center gap-3">
            <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            <span>§ Features · Coming soon</span>
          </div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-[var(--font-lora)] text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            What you'll find{" "}
            <em className="text-[var(--color-gold)]">inside</em>, in plain words.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[var(--subtext)] leading-relaxed">
            Five small areas that quietly cover most of the practical part of being a Shia Muslim in
            2026. None of them shout; together they save a lot of group chats and screenshots.
          </p>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-24" />

      {/* § 01 Centres */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 01</div>
            <div className="eyebrow mt-1">Centres</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Every hussainiya and Islamic centre,{" "}
              <em className="text-[var(--color-gold)]">on one page each</em>.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              Find a centre near you, learn how to get there, and follow the ones you attend so
              their programs reach your calendar. No feeds, no ads.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {centreCapabilities.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-8 lg:p-10 flex flex-col gap-5 min-h-[220px]"
            >
              <Icon className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div>
                <h3 className="font-[var(--font-lora)] text-2xl text-[var(--text)] mb-2">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed text-[15px]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* § 02 Programs */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 02</div>
            <div className="eyebrow mt-1">Programs</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Public majalis you can{" "}
              <em className="text-[var(--color-gold)]">find</em>, private ones you can{" "}
              <em className="text-[var(--color-gold)]">share</em>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="border border-[var(--border)] rounded-2xl p-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Users className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div className="eyebrow">From your centres</div>
            </div>
            <h3 className="font-[var(--font-lora)] text-3xl text-[var(--text)]">
              Public programs, posted by centres you follow.
            </h3>
            <p className="text-[var(--subtext)] leading-relaxed">
              Title, date, time, venue, a poster image if there is one, and a link to book or ask.
              When a centre is broadcasting on its YouTube, you'll see the live indicator on its
              page, and that's where the stream lives.
            </p>
          </div>

          <div className="border border-[var(--border)] rounded-2xl p-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Lock className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div className="eyebrow">Invite-only</div>
            </div>
            <h3 className="font-[var(--font-lora)] text-3xl text-[var(--text)]">
              Host a majlis at home, and share a single link.
            </h3>
            <p className="text-[var(--subtext)] leading-relaxed">
              Create your own program at a favourited centre or at your own address, set it to
              private, and share the invite link with anyone. They sign in, accept, and it lands in
              their calendar alongside their centres' programs.
            </p>
            <div className="pt-4 border-t border-[var(--border)] flex items-start gap-3 text-sm text-[var(--subtext)] leading-relaxed">
              <Share2 className="size-4 text-[var(--color-gold)] mt-0.5 shrink-0" strokeWidth={1.5} />
              <span>
                One unguessable link. Share it by WhatsApp, message, or email, wherever you'd
                already send it.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* § 03 Calendar */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 03</div>
            <div className="eyebrow mt-1">Calendar</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              A Hijri month at a glance, with the{" "}
              <em className="text-[var(--color-gold)]">occasions</em> and{" "}
              <em className="text-[var(--color-gold)]">programs from the centres you follow</em>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 lg:col-start-3 space-y-6 text-[var(--text)] text-lg leading-relaxed">
            <p>
              Every cell shows the Gregorian date and its Hijri equivalent. Today is marked in gold.
              Days of shahadat are tinted red; days of wiladat and Eid are tinted green. Small dots
              mark the days that have programs: gold for public ones from your favourited centres,
              indigo for the private ones you've been invited to.
            </p>
            <p className="text-[var(--subtext)]">
              Below the grid: every significant date in the month, then every program from today
              onwards. If you haven't favourited any centres yet, it nudges you to do so, because
              that's how the calendar fills up.
            </p>
          </div>
        </div>
      </section>

      {/* § 04 Ibadah */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 04</div>
            <div className="eyebrow mt-1">Ibadah</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              Four small tools, made to{" "}
              <em className="text-[var(--color-gold)]">disappear</em> while you use them.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {ibadahTools.map(({ n, Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-10 lg:p-12 flex flex-col gap-8 min-h-[280px]"
            >
              <div className="flex items-start justify-between">
                <span className="font-[var(--font-lora)] text-6xl text-[var(--color-gold)] opacity-30 leading-none">
                  {n}
                </span>
                <Icon className="size-7 text-[var(--color-gold)]" strokeWidth={1.25} />
              </div>
              <div>
                <h3 className="font-[var(--font-lora)] text-3xl text-[var(--text)] mb-3">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* § 05 Home */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">§ 05</div>
            <div className="eyebrow mt-1">On Home</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              The first screen, set to your{" "}
              <em className="text-[var(--color-gold)]">city</em>.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              Open the app and the day is already laid out: the next prayer, the qibla, today's
              aamal, and a search bar that understands plain language.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {homeTiles.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--background)] p-8 flex flex-col gap-5 min-h-[220px]"
            >
              <Icon className="size-6 text-[var(--color-gold)]" strokeWidth={1.25} />
              <div>
                <h3 className="font-[var(--font-lora)] text-xl text-[var(--text)] mb-2">{title}</h3>
                <p className="text-[var(--subtext)] leading-relaxed text-[14px]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiet things */}
      <section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-3">§ Also</div>
            <h2 className="font-[var(--font-lora)] text-3xl text-[var(--text)]">
              Small things that matter.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-[var(--text)]">
            <div className="flex items-start gap-3">
              <Bell className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                Notification preferences so you only hear from us when something is yours.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                One city setting drives prayer times, qibla, and today's aamal.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="size-4 text-[var(--color-gold)] mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed">
                Your favourite centres travel with you across web, iOS, and Android.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming-soon close */}
      <section className="border-t border-[var(--border)] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-6 inline-flex items-center gap-3">
              <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>§ Launching soon</span>
            </div>
            <h2 className="font-[var(--font-lora)] text-4xl md:text-5xl leading-[1.05] tracking-tight text-[var(--text)]">
              These are the things being polished, right now.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--subtext)] text-lg leading-relaxed">
              The first builds are in the hands of testers. Public release on iOS, Android, and the
              web follows shortly, inshaAllah.
            </p>
          </div>
          <div className="lg:col-span-4">
            <Link
              href="/who-we-are"
              className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] editorial-link"
            >
              Read about who's making it
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-24 flex justify-center">
        <HairlineDots className="w-40 text-[var(--color-gold)]" />
      </div>
      <div className="mt-10 flex justify-center">
        <Medallion className="w-24 h-24 text-[var(--color-gold)] opacity-50" />
      </div>
    </article>
  );
}
