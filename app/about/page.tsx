import { Medallion } from "@/components/ornaments";

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ About</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-[var(--font-lora)] text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Made for the rhythm of{" "}
            <em className="text-[var(--color-gold)]">Shia life</em>, by people who live it.
          </h1>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-3">What it is</div>
          <h2 className="font-[var(--font-lora)] text-3xl text-[var(--text)]">
            A companion, not a platform.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[var(--text)] text-lg leading-relaxed">
          <p>
            Hussainya is a single, quiet place that holds the things you already do. Finding your
            nearest centre, attending a majlis, checking prayer times, remembering an aamal.
            Without scattering them across ten apps and a folder of browser bookmarks.
          </p>
          <p className="text-[var(--subtext)]">
            We do not want to replace your centre, your scholar, or your community. We just want
            the practical part of being a Shia Muslim in 2026 to feel less like group chats and
            screenshots.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-3">Why</div>
          <h2 className="font-[var(--font-lora)] text-3xl text-[var(--text)]">In service.</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-[var(--text)] text-lg leading-relaxed">
          <p>
            We started this because we kept needing it ourselves, and noticed our friends, our
            parents, and the centres they attend, all needed it too. It exists in the spirit of{" "}
            <em className="font-[var(--font-lora)] text-[var(--color-gold)]">khidmah</em>. Small,
            quiet, and given freely.
          </p>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4">
          <div className="eyebrow">Acknowledgements</div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 text-sm text-[var(--subtext)] leading-relaxed">
          <p>
            With thanks to{" "}
            <a
              href="https://shiaa.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] editorial-link"
            >
              shiaa.com.au
            </a>
            , whose careful work informed parts of ours.
          </p>
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <Medallion className="w-32 h-32 text-[var(--color-gold)] opacity-60" />
      </div>
    </article>
  );
}
