import { cn } from "@/lib/utils";

export function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn(className)} aria-hidden>
      <path
        d="M16 1.5l4.243 10.257L31 16l-10.757 4.243L16 30.5l-4.243-10.257L1 16l10.757-4.243L16 1.5z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M5 5l8.485 8.485M27 5l-8.485 8.485M27 27l-8.485-8.485M5 27l8.485-8.485"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.7"
      />
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="0.75" fill="none" />
    </svg>
  );
}

export function Medallion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn(className)} aria-hidden>
      <g className="slow-spin">
        <circle cx="120" cy="120" r="118" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        <path
          d="M120 12 L141 79 L228 120 L141 161 L120 228 L99 161 L12 120 L99 79 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.55"
          fill="none"
        />
        <path
          d="M120 12 L141 79 L228 120 L141 161 L120 228 L99 161 L12 120 L99 79 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.35"
          fill="none"
          transform="rotate(22.5 120 120)"
        />
      </g>
      <circle cx="120" cy="120" r="58" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path
        d="M120 72 L130 108 L166 120 L130 132 L120 168 L110 132 L74 120 L110 108 Z"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.75"
        fill="none"
      />
      <path
        d="M120 72 L130 108 L166 120 L130 132 L120 168 L110 132 L74 120 L110 108 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
        fill="none"
        transform="rotate(45 120 120)"
      />
      <circle cx="120" cy="120" r="5" stroke="currentColor" strokeWidth="1" fill="currentColor" />
    </svg>
  );
}

export function HairlineDots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 8" fill="none" className={cn(className)} aria-hidden>
      <line x1="0" y1="4" x2="55" y2="4" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="60" cy="4" r="1.5" fill="currentColor" />
      <line x1="65" y1="4" x2="120" y2="4" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}
