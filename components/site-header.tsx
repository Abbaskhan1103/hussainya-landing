"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { EightPointStar } from "./ornaments";

const nav = [
  { href: "/features", label: "Features" },
  { href: "/who-we-are", label: "Who we are" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--background)_88%,transparent)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Hussainya">
          <EightPointStar className="size-6 text-[var(--color-gold)] transition-transform group-hover:rotate-45 duration-700" />
          <span className="font-[var(--font-lora)] text-2xl tracking-tight text-[var(--text)]">
            Hussainya
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--subtext)] hover:text-[var(--text)] transition-colors editorial-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="hidden md:inline-flex h-10 items-center gap-2 px-4 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] text-[var(--color-gold)] text-xs font-medium uppercase tracking-[0.18em]">
            <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            Coming soon
          </span>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[var(--subtext)] hover:text-[var(--text)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <nav className="mx-auto max-w-[1280px] px-6 py-6 flex flex-col gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
            <span className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/[0.06] text-[var(--color-gold)] text-xs font-medium uppercase tracking-[0.18em]">
              <span className="inline-block size-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              Coming soon
            </span>
          </nav>
        </div>
      )}
    </header>
  );
}
