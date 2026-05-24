import Link from "next/link";
import { Apple, Smartphone, Globe } from "lucide-react";
import { EightPointStar } from "./ornaments";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <EightPointStar className="size-6 text-[var(--color-gold)]" />
            <span className="font-[var(--font-lora)] text-2xl text-[var(--text)] leading-none">
              Hussainya
            </span>
          </div>
          <p className="text-[var(--subtext)] max-w-sm text-sm leading-relaxed">
            A quiet, considered home for the Ahl al-Bayt community. Centres, programs, and the
            daily rhythm of ibadah, in one place.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-4">Pages</div>
          <ul className="space-y-3 text-sm text-[var(--subtext)]">
            <li>
              <Link href="/" className="editorial-link hover:text-[var(--text)]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/features" className="editorial-link hover:text-[var(--text)]">
                Features
              </Link>
            </li>
            <li>
              <Link href="/who-we-are" className="editorial-link hover:text-[var(--text)]">
                Who we are
              </Link>
            </li>
            <li>
              <Link href="/about" className="editorial-link hover:text-[var(--text)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="editorial-link hover:text-[var(--text)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Get the app</div>
          <ul className="space-y-3 text-sm text-[var(--subtext)]">
            <li className="flex items-center gap-3">
              <Globe className="size-4 text-[var(--color-gold)]" />
              <a href="https://app.hussainya.com" className="editorial-link hover:text-[var(--text)]">
                app.hussainya.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Apple className="size-4 text-[var(--color-gold)]" />
              <a href="https://apps.apple.com/" className="editorial-link hover:text-[var(--text)]">
                iOS, App Store
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Smartphone className="size-4 text-[var(--color-gold)]" />
              <a href="https://play.google.com/" className="editorial-link hover:text-[var(--text)]">
                Android, Google Play
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--subtext)]">
          <span>© {new Date().getFullYear()} Hussainya. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--text)] editorial-link">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text)] editorial-link">
              Terms
            </Link>
            <span className="font-[var(--font-lora)] italic">In the spirit of khidmah.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
