import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FAQS } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbGraph, faqGraph, jsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "FAQ: cost, prayer times, centres and privacy",
  description:
    "What Hussainya is, what it costs, how prayer times are calculated, how to find a hussainiya or Islamic centre near you, and how to add your centre.",
  path: "/faq",
});

// Every answer is on the page in full, not behind a toggle: a search engine or
// an assistant quotes what it can read without clicking.
export default function FaqPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([faqGraph(FAQS), breadcrumbGraph("Questions", "/faq")]) }}
      />

      <h1 className="max-w-4xl font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
        Questions about Hussainya, answered.
      </h1>

      <dl className="mt-12 md:mt-20 border-t border-[var(--border)]">
        {FAQS.map((faq) => (
          <div
            key={faq.question}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-10 border-b border-[var(--border)] py-8 md:py-10"
          >
            <dt className="lg:col-span-5">
              <h2 className="font-lora text-2xl md:text-3xl leading-[1.15] text-[var(--text)] text-balance">
                {faq.question}
              </h2>
            </dt>
            <dd className="lg:col-span-7 max-w-2xl text-lg leading-relaxed text-[var(--subtext)]">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 md:mt-16 text-lg text-[var(--subtext)]">
        Something else?{" "}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] editorial-link"
        >
          Write to us
          <ArrowUpRight className="size-4" />
        </Link>
      </p>
    </article>
  );
}
