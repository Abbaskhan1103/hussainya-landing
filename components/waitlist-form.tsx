"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { EightPointStar } from "./ornaments";
import { cn } from "@/lib/utils";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm({
  id,
  className,
  source = "landing",
  buttonLabel = "Join the waitlist",
  buttonLabelShort = "Join",
  successMessage = "You’re on the list. We’ll write to you when the doors open, inshaAllah.",
  placeholder = "you@example.com",
}: {
  id: string;
  className?: string;
  source?: string;
  placeholder?: string;
  buttonLabel?: string;
  buttonLabelShort?: string;
  successMessage?: string;
}) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-4 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] px-6 py-5",
          className,
        )}
        role="status"
      >
        <EightPointStar className="mt-1 size-5 shrink-0 text-[var(--color-gold)]" />
        <p className="font-lora italic text-lg leading-snug text-[var(--text)]">
          {state.message ?? successMessage}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={className}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] p-1.5 pl-6 transition-colors focus-within:border-[var(--color-gold)]">
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          disabled={pending}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-[var(--text)] placeholder:text-[var(--subtext)]/70 focus:outline-none disabled:opacity-60"
        />
        <input type="hidden" name="source" value={source} />
        {/* Honeypot: hidden from real users, tempting to bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute size-0 overflow-hidden opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 sm:px-6 text-sm font-semibold tracking-wide text-[#0a1228] transition-colors hover:bg-[var(--color-gold-light)] disabled:opacity-70"
        >
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" strokeWidth={2} />
          ) : (
            <>
              <span className="hidden sm:inline">{buttonLabel}</span>
              <span className="sm:hidden">{buttonLabelShort}</span>
              <ArrowRight className="size-4" strokeWidth={2} />
            </>
          )}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 mt-3 text-sm text-[var(--color-red-live)]">
        {state.status === "error" ? state.message : null}
      </p>
    </form>
  );
}
