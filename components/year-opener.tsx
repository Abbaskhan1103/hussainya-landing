"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import {
  HIJRI_MONTHS,
  HIJRI_MONTHS_AR,
  HIJRI_MONTHS_SHORT,
  MONTH_LENGTHS,
  MONTH_START,
  SIGNIFICANT_BY_INDEX,
  YEAR_DAYS,
  fromRingIndex,
  hijriDate,
  ringIndex,
  type HijriDay,
} from "@/lib/hijri";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";
import type { DayCounts } from "@/lib/programs";

// The home page opener: the Hijri year as a ring, with today under the needle.
// Scrolling pins the stage, zooms into the ring and turns it through a few
// dates; the page's colours follow the season under the needle. Everything
// that moves is drawn imperatively from one scroll handler, so React renders
// this once and never again per frame.
//
// Three modes, set on the section as data-mode:
//   (none)  no JavaScript yet: the headline, badges and the stops as plain text
//   still   reduced motion: the same, plus the ring drawn once on today
//   live    the pinned, scroll-driven version

const DEFAULT_TZ = "Australia/Melbourne";
const TAU = Math.PI * 2;
const STEP = TAU / YEAR_DAYS;
const WIDE = 900;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mod = (n: number, m: number) => ((n % m) + m) % m;
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const px = (v: number) => `${Math.round(v * 10) / 10}px`;

/* ── Stops ── */

interface Stop {
  index: number;
  /** What the stop is showing: one of the app's three parts. */
  pillar: string;
  /** Why the ring stopped on this date. */
  occasion: string;
  copy: string;
}

const RAMADAN = ringIndex(9, 1);
const ASHURA = ringIndex(1, 10);

/** The next date on the calendar, then Ramadan and Ashura, in the order they come. */
function pickStops(today: HijriDay): Stop[] {
  const t0 = ringIndex(today.month, today.day);
  const ahead = (i: number) => mod(i - t0, YEAR_DAYS) || YEAR_DAYS;
  const next = [...SIGNIFICANT_BY_INDEX.keys()]
    .filter((i) => i !== ASHURA)
    .sort((a, b) => ahead(a) - ahead(b))[0];
  const stops: Stop[] = [
    {
      index: next,
      pillar: "Programs",
      occasion: SIGNIFICANT_BY_INDEX.get(next)?.label ?? "",
      copy: "Every majlis, class and celebration near you, live and upcoming. Save one, share it, or add it to your calendar.",
    },
    {
      index: RAMADAN,
      pillar: "Ibadah",
      occasion: "The first day of Ramadan",
      copy: "Fajr and Maghrib to the minute, worked out on your phone, with qibla, tasbih, a qadha tracker and a khums calculator.",
    },
    {
      index: ASHURA,
      pillar: "Centres",
      occasion: SIGNIFICANT_BY_INDEX.get(ASHURA)?.label ?? "Ashura",
      copy: "Find the hussainiyas and Islamic centres near you: addresses, programs, contact details and how to be there.",
    },
  ];
  return stops.sort((a, b) => ahead(a.index) - ahead(b.index));
}

/* ── Mood: the page's colours by season, for each theme ── */

type RGB = readonly [number, number, number];
interface Mood {
  background: RGB;
  surface: RGB;
  border: RGB;
  text: RGB;
  subtext: RGB;
  gold: RGB;
  accent: RGB;
}
type Season = "day" | "night" | "mourn";

const hex = (h: number): RGB => [(h >> 16) & 255, (h >> 8) & 255, h & 255];
const rgba = (c: RGB, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

// "day" is the site's own palette (globals.css). "night" is Ramadan; "mourn"
// runs from 1 Muharram to 8 Rabi' al-Awwal.
const MOODS: Record<"light" | "dark", Record<Season, Mood>> = {
  light: {
    day: mood(0xeff3fa, 0xffffff, 0xcdd7ee, 0x0a1228, 0x4a5568, 0xc9a84c, 0x8c6f22),
    night: mood(0x0c1736, 0x14214a, 0x24356b, 0xeef1f8, 0x9eabcb, 0xd9b95c, 0xd9b95c),
    mourn: mood(0x0a0a0c, 0x161618, 0x2a2a2e, 0xece9e4, 0x9a968f, 0xb84a4a, 0xc25a5a),
  },
  dark: {
    day: mood(0x070d1f, 0x0d1530, 0x1e2d52, 0xedf0f7, 0x8a9ab8, 0xc9a84c, 0xc9a84c),
    night: mood(0x0b1744, 0x132158, 0x26387a, 0xf1f3fa, 0xa3b0d0, 0xe2c267, 0xe2c267),
    mourn: mood(0x000000, 0x121212, 0x262626, 0xece9e4, 0x9a9a9a, 0xb84a4a, 0xc25a5a),
  },
};

function mood(
  background: number,
  surface: number,
  border: number,
  text: number,
  subtext: number,
  gold: number,
  accent: number,
): Mood {
  return {
    background: hex(background),
    surface: hex(surface),
    border: hex(border),
    text: hex(text),
    subtext: hex(subtext),
    gold: hex(gold),
    accent: hex(accent),
  };
}

const MOOD_VARS: readonly (readonly [keyof Mood, string])[] = [
  ["background", "--background"],
  ["surface", "--surface"],
  ["border", "--border"],
  ["text", "--text"],
  ["subtext", "--subtext"],
  ["gold", "--color-gold"],
  ["accent", "--year-accent"],
];

function mixMood(a: Mood, b: Mood, t: number): Mood {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const mix = (x: RGB, y: RGB): RGB => [lerp(x[0], y[0], t), lerp(x[1], y[1], t), lerp(x[2], y[2], t)];
  return {
    background: mix(a.background, b.background),
    surface: mix(a.surface, b.surface),
    border: mix(a.border, b.border),
    text: mix(a.text, b.text),
    subtext: mix(a.subtext, b.subtext),
    gold: mix(a.gold, b.gold),
    accent: mix(a.accent, b.accent),
  };
}

/** 1 inside [from, to] on the ring, easing to 0 over `edge` days either side. */
function band(day: number, from: number, to: number, edge: number): number {
  let best = 0;
  for (const shift of [-YEAR_DAYS, 0, YEAR_DAYS]) {
    const x = day + shift;
    const v = x >= from && x <= to ? 1 : x < from ? clamp(1 - (from - x) / edge) : clamp(1 - (x - to) / edge);
    best = Math.max(best, v);
  }
  return smooth(best);
}

const MOURN_END = ringIndex(3, 8);
const RAMADAN_START = MONTH_START[8];

function moodAt(theme: "light" | "dark", position: number): Mood {
  const set = MOODS[theme];
  const day = mod(position, YEAR_DAYS);
  const mourning = mixMood(set.day, set.mourn, band(day, 0, MOURN_END, 5));
  return mixMood(mourning, set.night, band(day, RAMADAN_START, RAMADAN_START + 29, 4));
}

/* ── Scroll timeline ── */

interface Node {
  body: number;
  position: number;
}
interface Segment {
  kind: "dwell" | "zoom" | "travel" | "out";
  start: number;
  length: number;
  from: number;
  to: number;
}
interface Frame {
  position: number;
  zoom: number;
  body: number;
  bodyOpacity: number;
}

function buildTimeline(nodes: Node[]) {
  const segments: Segment[] = [];
  let total = 0;
  const add = (kind: Segment["kind"], length: number, from: number, to: number) => {
    segments.push({ kind, start: total, length, from, to });
    total += length;
  };
  const last = nodes.length - 1;
  add("dwell", 0.4, 0, 0);
  add("zoom", 0.7, 0, 0);
  for (let i = 1; i < last; i++) {
    add("travel", 0.9, i - 1, i);
    add("dwell", 0.6, i, i);
  }
  add("out", 1, last - 1, last);
  add("dwell", 0.15, last, last);
  return { segments, total };
}

function frameAt(nodes: Node[], timeline: ReturnType<typeof buildTimeline>, progress: number): Frame {
  const u = clamp(progress) * timeline.total;
  const last = nodes.length - 1;
  let seg = timeline.segments[timeline.segments.length - 1];
  for (const s of timeline.segments) {
    if (u < s.start + s.length) {
      seg = s;
      break;
    }
  }
  const t = clamp((u - seg.start) / seg.length);
  const fade = t < 0.2 ? 1 - t / 0.2 : t > 0.8 ? (t - 0.8) / 0.2 : 0;
  if (seg.kind === "dwell") {
    const zoomedOut = seg.from === 0 || seg.from === last;
    return { position: nodes[seg.from].position, zoom: zoomedOut ? 0 : 1, body: nodes[seg.from].body, bodyOpacity: 1 };
  }
  if (seg.kind === "zoom") {
    return { position: nodes[0].position, zoom: easeInOut(t), body: nodes[0].body, bodyOpacity: 1 };
  }
  return {
    position: lerp(nodes[seg.from].position, nodes[seg.to].position, easeInOut(t)),
    zoom: seg.kind === "out" ? 1 - easeInOut(clamp((t - 0.3) / 0.7)) : 1,
    body: nodes[t < 0.5 ? seg.from : seg.to].body,
    bodyOpacity: fade,
  };
}

/* ── Geometry and drawing ── */

interface Geometry {
  width: number;
  height: number;
  wide: boolean;
  left: number;
  /** Angle of the needle, and which way the year runs past it. */
  angle: number;
  direction: 1 | -1;
  restRadius: number;
  zoomRadius: number;
  /** The point on the ring under the needle, at rest and zoomed in. */
  restX: number;
  restY: number;
  zoomX: number;
  zoomY: number;
  barCap: number;
  panelWidth: number;
}

function measure(width: number, height: number): Geometry {
  const wide = width >= WIDE;
  const gutter = width >= 1024 ? 40 : 24;
  const left = Math.max(gutter, (width - 1280) / 2 + gutter);
  const content = width - left * 2;
  if (wide) {
    const restRadius = Math.min(0.25 * content, 0.36 * height);
    const restX = left + 0.72 * content - restRadius;
    const zoomX = left + 0.57 * content;
    return {
      width, height, wide, left,
      angle: Math.PI,
      direction: -1,
      restRadius,
      zoomRadius: Math.max(0.95 * height, 0.55 * content),
      restX,
      restY: 0.52 * height,
      zoomX,
      zoomY: 0.5 * height,
      barCap: 0.2 * height,
      panelWidth: Math.min(restX, zoomX) - left - 64,
    };
  }
  const restRadius = Math.min(0.36 * width, 0.2 * height);
  return {
    width, height, wide, left,
    angle: -Math.PI / 2,
    direction: 1,
    restRadius,
    zoomRadius: 1.7 * width,
    restX: 0.5 * width,
    restY: 0.76 * height - restRadius,
    zoomX: 0.5 * width,
    zoomY: 0.62 * height,
    barCap: 0.15 * height,
    panelWidth: width - left * 2,
  };
}

interface Scene {
  position: number;
  zoom: number;
  today: number;
  mood: Mood;
  density: Float32Array;
  font: string;
}

/** Draws the ring and returns where the needle point sits, for the text beside it. */
function drawRing(ctx: CanvasRenderingContext2D, g: Geometry, scene: Scene) {
  const { width, height, wide, angle, direction } = g;
  const { position, zoom, mood: m, density } = scene;
  const radius = g.restRadius * Math.pow(g.zoomRadius / g.restRadius, zoom);
  const needleX = lerp(g.restX, g.zoomX, zoom);
  const needleY = lerp(g.restY, g.zoomY, zoom);
  const cx = needleX - radius * Math.cos(angle);
  const cy = needleY - radius * Math.sin(angle);
  const barMax = Math.min(radius * 0.17, g.barCap);
  const gap = clamp(radius * 0.02, 5, 10);
  const markOffset = clamp(radius * 0.05, 9, 18);
  const off = (x: number, y: number, margin: number) =>
    x < -margin || x > width + margin || y < -margin || y > height + margin;
  const angleOf = (day: number) => angle + direction * (day - position) * STEP;

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = "butt";

  ctx.strokeStyle = rgba(m.text, 0.42);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, TAU);
  ctx.stroke();
  ctx.strokeStyle = rgba(m.text, 0.1);
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(1, radius - gap - barMax - 5), 0, TAU);
  ctx.stroke();

  // One bar per day: its length is how many programs are listed that day. A
  // day with none still gets a short tick, so the ring reads as days.
  const base = Math.round(position);
  const barWidth = clamp(radius * STEP * 0.34, 1, 3.4);
  const tick = clamp(radius * 0.012, 2.5, 6);
  const marks: { day: number; cos: number; sin: number; length: number }[] = [];
  ctx.lineWidth = barWidth;
  ctx.strokeStyle = rgba(m.text, 0.5);
  ctx.beginPath();
  for (let o = -177; o < 177; o++) {
    const day = base + o;
    const index = mod(day, YEAR_DAYS);
    const a = angleOf(day);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const x = cx + (radius - gap) * cos;
    const y = cy + (radius - gap) * sin;
    if (off(x, y, barMax + 60)) continue;
    const length = Math.max(tick, density[index] * barMax);
    const significant = SIGNIFICANT_BY_INDEX.has(index);
    if (significant || index === scene.today) marks.push({ day, cos, sin, length });
    if (significant) continue;
    ctx.moveTo(x, y);
    ctx.lineTo(cx + (radius - gap - length) * cos, cy + (radius - gap - length) * sin);
  }
  ctx.stroke();

  const dot = clamp(radius * 0.013, 2.3, 4.6);
  const numerals = clamp((zoom - 0.45) / 0.4);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const mark of marks) {
    const index = mod(mark.day, YEAR_DAYS);
    const significant = SIGNIFICANT_BY_INDEX.get(index);
    const { cos, sin } = mark;
    if (significant) {
      const celebration = significant.kind !== "shahadat";
      ctx.strokeStyle = celebration ? rgba(m.gold) : rgba(m.text, 0.95);
      ctx.lineWidth = barWidth + 0.6;
      ctx.beginPath();
      ctx.moveTo(cx + (radius - gap) * cos, cy + (radius - gap) * sin);
      ctx.lineTo(cx + (radius - gap - mark.length) * cos, cy + (radius - gap - mark.length) * sin);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + (radius + markOffset) * cos, cy + (radius + markOffset) * sin, dot, 0, TAU);
      if (celebration) {
        ctx.fillStyle = rgba(m.gold);
        ctx.fill();
      } else {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = rgba(m.text, 0.95);
        ctx.stroke();
      }
      if (numerals > 0 && Math.abs(mark.day - position) > 1.6) {
        ctx.font = `600 11px ${scene.font}`;
        ctx.fillStyle = rgba(m.subtext, numerals);
        ctx.fillText(
          String(significant.day),
          cx + (radius + markOffset + 17) * cos,
          cy + (radius + markOffset + 17) * sin,
        );
      }
    }
    if (index === scene.today) {
      // Today: a diamond on the ring itself.
      const x = cx + radius * cos;
      const y = cy + radius * sin;
      const q = dot + 2.2;
      ctx.fillStyle = rgba(m.gold);
      ctx.beginPath();
      ctx.moveTo(x, y - q);
      ctx.lineTo(x + q, y);
      ctx.lineTo(x, y + q);
      ctx.lineTo(x - q, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = rgba(m.background);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // Month names: along the radius on wide screens, along the arc on narrow
  // ones, where they only appear once the ring is big enough to hold them.
  const labelAlpha = wide ? 1 : clamp((zoom - 0.35) / 0.3);
  const fontSize = clamp(radius * 0.042, 9.5, 13);
  const labelRadius = radius - gap - barMax - 14;
  ctx.font = `600 ${fontSize}px ${scene.font}`;
  ctx.letterSpacing = "1.2px";
  for (let month = 0; month < 12; month++) {
    const start = MONTH_START[month] + YEAR_DAYS * Math.round((position - MONTH_START[month]) / YEAR_DAYS);
    const boundary = angleOf(start - 0.5);
    const bx = Math.cos(boundary);
    const by = Math.sin(boundary);
    if (!off(cx + radius * bx, cy + radius * by, barMax + 80)) {
      ctx.strokeStyle = rgba(m.text, 0.32);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + (radius + 5) * bx, cy + (radius + 5) * by);
      ctx.lineTo(cx + (labelRadius + 6) * bx, cy + (labelRadius + 6) * by);
      ctx.stroke();
    }
    if (labelAlpha <= 0) continue;
    const name = HIJRI_MONTHS_SHORT[month].toUpperCase();
    ctx.fillStyle = rgba(m.text, 0.62 * labelAlpha);
    if (wide) {
      const a = angleOf(start + 0.9);
      const cos = Math.cos(a);
      if (off(cx + labelRadius * cos, cy + labelRadius * Math.sin(a), 160)) continue;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.textBaseline = "middle";
      if (cos < 0) {
        ctx.rotate(a + Math.PI);
        ctx.textAlign = "left";
        ctx.fillText(name, -labelRadius, 0);
      } else {
        ctx.rotate(a);
        ctx.textAlign = "right";
        ctx.fillText(name, labelRadius, 0);
      }
      ctx.restore();
    } else {
      const a = angleOf(start + MONTH_LENGTHS[month] / 2 - 0.5);
      const sin = Math.sin(a);
      const x = cx + labelRadius * Math.cos(a);
      const y = cy + labelRadius * sin;
      if (off(x, y, 120)) continue;
      ctx.save();
      ctx.translate(x, y);
      ctx.textAlign = "center";
      if (sin < 0) {
        ctx.rotate(a + Math.PI / 2);
        ctx.textBaseline = "top";
      } else {
        ctx.rotate(a - Math.PI / 2);
        ctx.textBaseline = "bottom";
      }
      ctx.fillText(name, 0, 0);
      ctx.restore();
    }
  }
  ctx.letterSpacing = "0px";

  // The needle: the line the ring is read against.
  ctx.strokeStyle = rgba(m.accent);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (wide) {
    ctx.moveTo(g.left, needleY);
    ctx.lineTo(needleX - markOffset - 9, needleY);
  } else {
    ctx.moveTo(needleX, needleY - markOffset - 9);
    ctx.lineTo(needleX, needleY - markOffset - 34);
  }
  ctx.stroke();
  ctx.fillStyle = rgba(m.accent);
  ctx.beginPath();
  ctx.arc(wide ? needleX - markOffset - 9 : needleX, wide ? needleY : needleY - markOffset - 9, 2.6, 0, TAU);
  ctx.fill();

  return { cx, cy, needleY, markOffset };
}

/* ── Mounting ── */

const isoDay = (base: Date, offset: number) =>
  new Date(Date.UTC(base.getFullYear(), base.getMonth(), base.getDate() + offset)).toISOString().slice(0, 10);

const longDate = (base: Date, offset: number) =>
  new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(base.getFullYear(), base.getMonth(), base.getDate() + offset)))
    .replace(/,/g, "");

const arabicDigits = (n: number) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

function mountYear(root: HTMLElement, counts: DayCounts, stops: Stop[]): () => void {
  const q = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  const stage = q(".year-stage");
  const canvas = q<HTMLCanvasElement>("canvas");
  const kicker = q(".year-kick");
  const dateDay = q("[data-year-day]");
  const dateYear = q("[data-year-num]");
  const dateLine = q(".year-date");
  const significance = q(".year-sig");
  const hub = q(".year-hub");
  const arabic = q(".year-ar");
  const cue = q(".year-cue");
  const bodies = [...root.querySelectorAll<HTMLElement>("[data-stop]")];
  const tabs = [...root.querySelectorAll<HTMLButtonElement>("[data-tab]")];
  const ctx = canvas?.getContext("2d");
  if (!stage || !canvas || !ctx || !kicker || !dateDay || !dateYear || !dateLine || !significance || !hub || !arabic) {
    return () => {};
  }

  const html = document.documentElement;
  const header = document.querySelector<HTMLElement>("header");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TZ;
  const today = hijriDate(now, timeZone);
  const t0 = ringIndex(today.month, today.day);

  // A day on the ring takes the count for that date this coming year, or the
  // same day a Hijri year ago where nothing is listed yet.
  const density = new Float32Array(YEAR_DAYS);
  let busiest = 0;
  for (let k = 0; k < YEAR_DAYS; k++) {
    const count = Math.max(counts[isoDay(now, k)] ?? 0, counts[isoDay(now, k - YEAR_DAYS)] ?? 0);
    density[mod(t0 + k, YEAR_DAYS)] = count;
    busiest = Math.max(busiest, count);
  }
  const listed = Float32Array.from(density);
  if (busiest > 0) for (let i = 0; i < YEAR_DAYS; i++) density[i] = Math.pow(density[i] / busiest, 0.62);

  const nodes: Node[] = [
    { body: 0, position: t0 },
    ...stops
      .map((stop, i) => ({ body: i + 1, position: t0 + (mod(stop.index - t0, YEAR_DAYS) || YEAR_DAYS) }))
      .sort((a, b) => a.position - b.position),
    { body: 0, position: t0 + YEAR_DAYS },
  ];
  const timeline = buildTimeline(nodes);

  $text(q("[data-hub-year]"), String(today.year));
  $text(q("[data-hub-ar]"), `${arabicDigits(today.year)} هـ`);
  bodies.forEach((body, i) => {
    const stop = stops[i - 1];
    const count = stop ? listed[stop.index] : 0;
    const line = body.querySelector<HTMLElement>("[data-count]");
    if (line && count > 0) {
      line.hidden = false;
      line.textContent = `${count} ${count === 1 ? "program" : "programs"} listed that day.`;
    }
  });

  let geometry: Geometry | null = null;
  let live = false;
  let scheduled = 0;
  const shown = { kicker: "", day: "", year: "", body: -1, tab: -1, month: 0, past: null as boolean | null, vars: new Map<string, string>() };

  // The stop the needle is closest to, ignoring the full-turn node that ends the sequence.
  const stopNodes = nodes.slice(1, -1);
  function nearestBody(position: number): number {
    let best = stopNodes[0];
    for (const node of stopNodes) {
      if (Math.abs(node.position - position) < Math.abs(best.position - position)) best = node;
    }
    return best ? best.body : 0;
  }

  /** Scrolls to the middle of a stop's dwell, or back to the top for today. */
  function jumpTo(body: number) {
    const at = nodes.findIndex((node, i) => node.body === body && i < nodes.length - 1);
    const dwell = timeline.segments.find((seg) => seg.kind === "dwell" && seg.from === at);
    const travel = root.offsetHeight - stage!.offsetHeight;
    if (at < 0 || !dwell || travel <= 0) return;
    const progress = at === 0 ? 0 : (dwell.start + dwell.length / 2) / timeline.total;
    const top = parseFloat(getComputedStyle(stage!).top) || 0;
    const start = root.getBoundingClientRect().top + window.scrollY - top;
    window.scrollTo({ top: start + travel * progress, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
  const onTab = (event: Event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-tab]");
    if (button) jumpTo(Number(button.dataset.tab));
  };

  function layout() {
    const width = stage!.clientWidth;
    const height = stage!.clientHeight;
    if (!width || !height) return;
    const g = measure(width, height);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas!.width = Math.round(width * dpr);
    canvas!.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // One date size for the whole year: the longest date has to fit the panel.
    ctx!.font = `500 100px ${getComputedStyle(dateLine!).fontFamily}`;
    ctx!.letterSpacing = "0px";
    const longest = Math.max(...HIJRI_MONTHS.map((name) => ctx!.measureText(`30 ${name} ${today.year}`).width));
    const dateSize = Math.min(
      g.wide ? clamp(g.panelWidth * 0.104, 30, 60) : clamp(width * 0.082, 25, 40),
      ((g.panelWidth - 8) / longest) * 100,
    );
    const set = (name: string, value: string) => root.style.setProperty(name, value);
    set("--year-left", px(g.left));
    set("--year-panel", px(g.panelWidth));
    set("--year-date", px(dateSize));
    set("--year-title", px(g.wide ? clamp(g.panelWidth * 0.07, 24, 36) : clamp(width * 0.058, 21, 28)));
    set("--year-hub", px(g.restRadius * 0.3));
    const a = arabic!.style;
    a.fontSize = px(g.wide ? 0.3 * height : 0.23 * width);
    delete root.dataset.cramped;
    const hero = bodies[0];
    if (!g.wide && hero) {
      const room = g.restY - 60;
      if (hero.getBoundingClientRect().bottom - stage!.getBoundingClientRect().top > room) root.dataset.cramped = "";
    }
    geometry = g;
  }

  function render() {
    scheduled = 0;
    const g = geometry;
    if (!g) return;
    const top = parseFloat(getComputedStyle(stage!).top) || 0;
    const travel = root.offsetHeight - stage!.offsetHeight;
    const progress = live && travel > 0 ? clamp((top - root.getBoundingClientRect().top) / travel) : 0;
    const frame = frameAt(nodes, timeline, progress);

    // The header hides its store badges while the opener, which has its own,
    // is on screen (see .header-store in globals.css).
    const past = root.getBoundingClientRect().bottom <= (header?.offsetHeight ?? 0) + 1;
    if (shown.past !== past) {
      shown.past = past;
      html.toggleAttribute("data-year-past", past);
    }
    const theme = html.classList.contains("dark") ? "dark" : "light";
    const m = moodAt(theme, frame.position);

    for (const [key, name] of MOOD_VARS) {
      const value = rgba(m[key]);
      if (shown.vars.get(name) !== value) {
        shown.vars.set(name, value);
        html.style.setProperty(name, value);
      }
    }

    const drawn = drawRing(ctx!, g, {
      position: frame.position,
      zoom: frame.zoom,
      today: t0,
      mood: m,
      density,
      font: getComputedStyle(root).fontFamily,
    });
    root.style.setProperty("--year-needle", px(drawn.needleY));

    // The turn ends a full year on, which is today again: say so, not next year's date.
    const reached = Math.round(frame.position);
    const day = reached === t0 + YEAR_DAYS ? t0 : reached;
    const index = mod(day, YEAR_DAYS);
    const [month, dayOfMonth] = fromRingIndex(index);
    const kick = `${day === t0 ? "Today · " : ""}${longDate(now, day - t0)}`;
    if (shown.kicker !== kick) kicker!.textContent = shown.kicker = kick;
    const dayText = `${dayOfMonth} ${HIJRI_MONTHS[month - 1]}`;
    if (shown.day !== dayText) dateDay!.textContent = shown.day = dayText;
    const yearText = String(today.year + Math.floor(day / YEAR_DAYS));
    if (shown.year !== yearText) dateYear!.textContent = shown.year = yearText;

    if (shown.body !== frame.body) {
      shown.body = frame.body;
      bodies.forEach((body, i) => body.toggleAttribute("data-on", i === frame.body));
    }
    // The tab follows the needle, not the fading text, so it never flickers mid-turn.
    const tab = frame.zoom < 0.5 ? 0 : nearestBody(frame.position);
    if (shown.tab !== tab) {
      shown.tab = tab;
      tabs.forEach((button, i) => {
        if (i === tab) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    }
    const active = bodies[frame.body];
    if (active) active.style.opacity = frame.bodyOpacity.toFixed(3);

    // Between stops, name the date the needle is passing.
    const passing = SIGNIFICANT_BY_INDEX.get(index);
    if (passing && significance!.textContent !== passing.label) significance!.textContent = passing.label;
    significance!.style.opacity = (passing ? clamp(1 - frame.bodyOpacity * 2.5) : 0).toFixed(3);

    hub!.style.opacity = clamp(1 - frame.zoom * 2.6).toFixed(3);
    hub!.style.transform = `translate(${px(drawn.cx)},${px(drawn.cy)}) translate(-50%,-50%)`;
    if (shown.month !== month) {
      shown.month = month;
      arabic!.textContent = HIJRI_MONTHS_AR[month - 1];
    }
    arabic!.style.opacity = (clamp((frame.zoom - 0.3) / 0.6) * 0.085).toFixed(3);
    if (cue) cue.style.opacity = clamp(1 - progress * 40).toFixed(3);
  }

  const schedule = () => {
    if (!scheduled) scheduled = requestAnimationFrame(render);
  };
  const relayout = () => {
    layout();
    schedule();
  };
  function setMode() {
    live = !reducedMotion.matches;
    root.dataset.mode = live ? "live" : "still";
    root.style.setProperty("--year-len", live ? String(1 + timeline.total * 0.55) : "1");
    relayout();
  }

  const resize = new ResizeObserver(relayout);
  resize.observe(stage);
  const themeWatch = new MutationObserver(schedule);
  themeWatch.observe(html, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("scroll", schedule, { passive: true });
  root.addEventListener("click", onTab);
  reducedMotion.addEventListener("change", setMode);
  document.fonts?.ready.then(relayout).catch(() => {});
  setMode();

  return () => {
    cancelAnimationFrame(scheduled);
    resize.disconnect();
    themeWatch.disconnect();
    window.removeEventListener("scroll", schedule);
    root.removeEventListener("click", onTab);
    reducedMotion.removeEventListener("change", setMode);
    delete root.dataset.mode;
    delete root.dataset.cramped;
    html.removeAttribute("data-year-past");
    for (const [, name] of MOOD_VARS) html.style.removeProperty(name);
  };
}

function $text(el: HTMLElement | null, value: string) {
  if (el) el.textContent = value;
}

/* ── Markup ── */

function StoreBadges() {
  return (
    <div className="year-badges">
      <a href={APP_STORE_URL} className="inline-flex items-center">
        <Image src="/app-store-badge-black.svg" alt="Download on the App Store" width={120} height={40} priority />
      </a>
      <a href={PLAY_STORE_URL} className="inline-flex items-center">
        <Image src="/google-play-badge.svg" alt="Get it on Google Play" width={180} height={53} priority />
      </a>
    </div>
  );
}

function StopText({ stop }: { stop: Stop }) {
  return (
    <>
      <h2>{stop.pillar}</h2>
      <p className="year-occasion">{stop.occasion}</p>
      <p>{stop.copy}</p>
    </>
  );
}

export function YearOpener({ counts, generatedAt }: { counts: DayCounts; generatedAt: string }) {
  const root = useRef<HTMLElement>(null);

  // What the server can know: the date in the site's home timezone. The
  // browser redraws for the visitor's own day as soon as it mounts.
  const { today, stops, kicker } = useMemo(() => {
    const at = new Date(generatedAt);
    const hijri = hijriDate(at, DEFAULT_TZ);
    const gregorian = new Intl.DateTimeFormat("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: DEFAULT_TZ,
    })
      .format(at)
      .replace(/,/g, "");
    return { today: hijri, stops: pickStops(hijri), kicker: `Today · ${gregorian}` };
  }, [generatedAt]);

  useEffect(() => {
    if (!root.current) return;
    return mountYear(root.current, counts, stops);
  }, [counts, stops]);

  return (
    <section ref={root} className="year" aria-label="The Hijri year">
      <div className="year-stage">
        <div className="year-ar" lang="ar" dir="rtl" aria-hidden />
        <canvas aria-hidden />
        <div className="year-hub" aria-hidden>
          <b data-hub-year>{today.year}</b>
          <span lang="ar" dir="rtl" data-hub-ar />
        </div>

        <div className="year-panel">
          <div className="year-top">
            <p className="year-kick">{kicker}</p>
            <p className="year-date">
              <span data-year-day>
                {today.day} {HIJRI_MONTHS[today.month - 1]}
              </span>{" "}
              <em data-year-num>{today.year}</em>
            </p>
          </div>
          <div className="year-under">
            <nav className="year-tabs" aria-label="What the year shows">
              <button type="button" data-tab="0" aria-current="true">
                Today
              </button>
              {stops.map((stop, i) => (
                <button type="button" data-tab={i + 1} key={stop.index}>
                  {stop.pillar}
                </button>
              ))}
            </nav>
            <div className="year-stack">
            <p className="year-sig" aria-hidden />
            <div className="year-body" data-stop="0" data-on>
              <h1>A digital home for the Ahl al-Bayt community.</h1>
              <p>
                Hussainya is a free app for the Shia community: Islamic centres, majlis programs, prayer times
                and qibla, in one place.
              </p>
              <StoreBadges />
            </div>
            {stops.map((stop, i) => (
              <div className="year-body" data-stop={i + 1} key={stop.index}>
                <StopText stop={stop} />
                <p className="year-count" data-count hidden />
              </div>
            ))}
            </div>
          </div>
        </div>

        <ul className="year-legend" aria-hidden>
          <li>
            <i className="year-key-gold" />
            Wiladat and Eid
          </li>
          <li>
            <i className="year-key-ring" />
            Shahadat
          </li>
          <li>
            <i className="year-key-bar" />
            Programs listed that day
          </li>
        </ul>
        <p className="year-cue" aria-hidden>
          Scroll to turn the year
        </p>
      </div>

      {/* The same three stops as plain text, for when the ring is not driving. */}
      <div className="year-static">
        {stops.map((stop) => (
          <div key={stop.index}>
            <StopText stop={stop} />
          </div>
        ))}
      </div>
    </section>
  );
}
