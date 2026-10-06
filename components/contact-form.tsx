"use client";

import { useActionState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { EightPointStar } from "./ornaments";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full bg-transparent border-b border-[var(--border)] py-3 text-lg text-[var(--text)] placeholder:text-[var(--subtext)]/60 focus:outline-none focus:border-[var(--color-gold)] transition-colors disabled:opacity-60";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div
        className="flex items-start gap-4 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] px-6 py-5"
        role="status"
      >
        <EightPointStar className="mt-1 size-5 shrink-0 text-[var(--color-gold)]" />
        <p className="font-lora italic text-lg leading-snug text-[var(--text)]">
          Message sent. We&rsquo;ll reply to your email.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <label htmlFor="name" className="eyebrow block mb-3">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          disabled={pending}
          className={fieldClass}
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
          required
          autoComplete="email"
          disabled={pending}
          className={fieldClass}
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
          required
          minLength={3}
          maxLength={2000}
          disabled={pending}
          className={`${fieldClass} resize-none`}
          placeholder="A few sentences are enough. We will write back."
        />
      </div>
      {/* Honeypot: hidden from real users, tempting to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute size-0 overflow-hidden opacity-0"
      />
      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-gold)] text-[#070d1f] px-8 font-semibold hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-70"
        >
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" strokeWidth={2} />
          ) : (
            <>
              Send message
              <Send className="size-4" />
            </>
          )}
        </button>
        <p aria-live="polite" className="min-h-5 mt-3 text-sm text-[var(--color-red-live)]">
          {state.status === "error" ? state.message : null}
        </p>
      </div>
    </form>
  );
}
