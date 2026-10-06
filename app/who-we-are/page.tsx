import { HairlineDots } from "@/components/ornaments";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Who we are",
  description:
    "A small team and three working principles: reverence first, verified sources, and privacy by default.",
  path: "/who-we-are",
});

const principles = [
  {
    title: "Reverence first",
    body: "Design that does not fight the content. Quiet UI, generous space, restraint over ornament.",
  },
  {
    title: "From sources",
    body: "Religious content rests on verified texts. Programs and centres on the people who run them.",
  },
  {
    title: "Privacy as default",
    body: "We collect only what we need. Your location stays on your device. Nothing is sold.",
  },
];

export default function WhoWeArePage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-12 md:mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Who we are</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            A small group, building one thing,{" "}
            <em className="text-[var(--color-gold)]">carefully</em>.
          </h1>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-12 md:mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-16 md:mb-24">
        <div className="lg:col-span-9 lg:col-start-3 space-y-8 text-[var(--text)] text-lg leading-relaxed">
          <p className="font-lora text-2xl md:text-3xl text-[var(--text)] leading-snug">
            Hussainya is built by a small, distributed group of engineers, designers, and
            community members. Most grew up between Islamic centres on both sides of the world.
          </p>
          <p className="text-[var(--subtext)]">
            We work evenings and weekends. Before we ship anything that might shape how the
            community gathers, we consult majalis goers and centre administrators.
          </p>
          <p className="text-[var(--subtext)]">
            We are not a company. We are not seeking investment. We do not run ads.
          </p>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-12 md:mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="eyebrow mb-3">Our principles</div>
        </div>
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 md:gap-y-12">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-[var(--border)] pt-6">
              <h3 className="font-lora text-2xl text-[var(--text)] mb-2">
                {p.title}
              </h3>
              <p className="text-[var(--subtext)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-32 flex justify-center opacity-60">
        <HairlineDots className="w-40 text-[var(--color-gold)]" />
      </div>
    </article>
  );
}
