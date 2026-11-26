"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { EightPointStar } from "./ornaments";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

const nav = [
  { href: "/features", label: "Features" },
  { href: "/who-we-are", label: "Who we are" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // While the menu is open: freeze the page behind it, close on Escape, and
  // close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--background)_88%,transparent)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Hussainya">
          <EightPointStar className="size-6 text-[var(--color-gold)] transition-transform group-hover:rotate-45 duration-700" />
          <span className="font-lora text-2xl tracking-tight text-[var(--text)]">
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
          <a href={APP_STORE_URL} className="header-store hidden md:inline-flex items-center">
            <Image
              src="/app-store-badge-black.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </a>
          <a href={PLAY_STORE_URL} className="header-store hidden lg:inline-flex items-center">
            <Image
              src="/google-play-badge.svg"
              alt="Get it on Google Play"
              width={180}
              height={53}
              className="h-10 w-auto"
            />
          </a>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[var(--subtext)] hover:text-[var(--text)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[var(--border)] bg-[var(--background)]">
          <nav className="mx-auto max-w-[1280px] px-6 py-8 flex flex-col gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-lora text-3xl text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={APP_STORE_URL}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex self-start"
            >
              <Image
                src="/app-store-badge-black.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-12 w-auto"
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              onClick={() => setOpen(false)}
              className="inline-flex self-start"
            >
              <Image
                src="/google-play-badge.svg"
                alt="Get it on Google Play"
                width={180}
                height={53}
                className="h-12 w-auto"
              />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
