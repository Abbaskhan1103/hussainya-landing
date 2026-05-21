import type { ReactNode } from "react";

export function LegalSection({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12 border-b border-[var(--border)]">
      <div className="lg:col-span-3 flex items-baseline gap-4 lg:flex-col lg:gap-2">
        <span className="font-[var(--font-lora)] italic text-3xl text-[var(--color-gold)]">
          {n}
        </span>
        <h2 className="font-[var(--font-lora)] text-xl text-[var(--text)] leading-snug">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-9 space-y-4 text-[var(--text)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5 list-disc marker:text-[var(--color-gold)] text-[var(--subtext)]">
      {items.map((item, i) => (
        <li key={i} className="pl-1 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-[var(--color-gold)] editorial-link hover:text-[var(--color-gold-light)]"
    >
      {children}
    </a>
  );
}
