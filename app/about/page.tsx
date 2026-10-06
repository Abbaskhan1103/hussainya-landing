import { Medallion } from "@/components/ornaments";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why Hussainya exists and the intention behind it: a quiet companion for Shia life, built in the spirit of khidmah.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-12 md:mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ About</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Made for the rhythm of{" "}
            <em className="text-[var(--color-gold)]">Shia life</em>, by people who live it.
          </h1>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-12 md:mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-16 md:mb-24">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-3">What it is</div>
          <h2 className="font-lora text-3xl text-[var(--text)]">
            A companion, not a platform.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[var(--text)] text-lg leading-relaxed">
          <p>
            Hussainya is a single, quiet place that holds the things you already do. Finding your
            nearest centre, attending a majlis, checking prayer times. Without scattering them
            across ten apps and a folder of browser bookmarks.
          </p>
          <p className="text-[var(--subtext)]">
            We do not want to replace your centre, your scholar, or your community. We just want
            the practical part of being a Muslim to feel less like group chats and screenshots.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-3">Why</div>
          <h2 className="font-lora text-3xl text-[var(--text)]">In service.</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[var(--text)] text-lg leading-relaxed">
          <p>
            We started this because we kept needing it ourselves, and noticed our friends, our
            parents, and the centres they attend, all needed it too. It exists in the spirit of{" "}
            <em className="font-lora text-[var(--color-gold)]">khidmah</em>. Small,
            quiet, and given freely.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-32 flex justify-center">
        <Medallion className="w-32 h-32 text-[var(--color-gold)] opacity-60" />
      </div>
    </article>
  );
}
