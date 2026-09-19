"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { EightPointStar } from "./ornaments";

const APP_STORE_URL = "https://apps.apple.com/app/id6774542995";

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
          <a href={APP_STORE_URL} className="hidden md:inline-flex items-center">
            <Image
              src="/app-store-badge-black.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </a>
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
            <a
              href={APP_STORE_URL}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center"
            >
              <Image
                src="/app-store-badge-black.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-12 w-auto"
              />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
