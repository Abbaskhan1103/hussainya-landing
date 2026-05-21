import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-3">
          <div className="eyebrow">§ Contact</div>
        </div>
        <div className="lg:col-span-9">
          <h1 className="font-[var(--font-lora)] text-5xl md:text-7xl leading-[1.02] tracking-[-0.02em] text-[var(--text)]">
            Write to us,{" "}
            <em className="text-[var(--color-gold)]">we read everything</em>.
          </h1>
        </div>
      </div>

      <hr className="border-[var(--border)] mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="size-5 text-[var(--color-gold)]" />
            <div className="eyebrow">Support</div>
          </div>
          <a
            href="mailto:support@hussainya.com"
            className="font-[var(--font-lora)] text-3xl text-[var(--text)] editorial-link"
          >
            support@hussainya.com
          </a>
          <p className="text-[var(--subtext)] mt-4 text-sm leading-relaxed max-w-sm">
            For questions, feedback, listing your centre, or anything else. We read every message
            and reply personally.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form
            className="space-y-8"
            action="mailto:support@hussainya.com"
            method="post"
            encType="text/plain"
          >
            <div>
              <label htmlFor="name" className="eyebrow block mb-3">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full bg-transparent border-b border-[var(--border)] py-3 text-lg text-[var(--text)] placeholder:text-[var(--subtext)]/60 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                placeholder="As you would like to be addressed"
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow block mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full bg-transparent border-b border-[var(--border)] py-3 text-lg text-[var(--text)] placeholder:text-[var(--subtext)]/60 focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                placeholder="you@somewhere.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="eyebrow block mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full bg-transparent border-b border-[var(--border)] py-3 text-lg text-[var(--text)] placeholder:text-[var(--subtext)]/60 focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                placeholder="A few sentences are enough. We will write back."
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-gold)] text-[#070d1f] px-8 font-semibold hover:bg-[var(--color-gold-light)] transition-colors"
            >
              Send
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
