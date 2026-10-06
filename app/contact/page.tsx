import { Mail } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Questions, feedback, or a centre to add? Write to the Hussainya team. We read everything.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 mb-12 md:mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Contact</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-lora text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Write to us,{" "}
            <em className="text-[var(--color-gold)]">we read everything</em>.
          </h1>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-12 md:mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="size-5 text-[var(--color-gold)]" />
            <div className="eyebrow">Support</div>
          </div>
          <a
            href="mailto:support@hussainya.com"
            className="font-lora text-3xl text-[var(--text)] editorial-link"
          >
            support@hussainya.com
          </a>
          <p className="text-[var(--subtext)] mt-4 text-sm leading-relaxed max-w-sm">
            For questions, feedback, listing your centre, or anything else. We read every message
            and reply personally.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </article>
  );
}
