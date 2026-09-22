"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { COLLECTIONS, HERO_IMAGE, ATELIER_FITTING, countForCategory } from "@/lib/products";
import { IconArrowRight, IconArrowUpRight } from "./icons";
import { cx } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "cream";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]",
        tone === "gold" ? "text-gold-deep" : "text-gold",
        className
      )}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="A confident gentleman checking his wristwatch in bright daylight"
          fetchPriority="high"
          className="animate-kenburns h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-44 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <Eyebrow tone="cream" className="text-gold">
            Mayfair, London · Est. 1934
          </Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.04] text-cream sm:text-7xl lg:text-[86px]"
        >
          Tailoring for a
          <br />
          <span className="italic text-gold-pale">Life Well Lived.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
          className="mt-7 max-w-xl text-base font-light leading-relaxed text-cream/75 sm:text-lg"
        >
          Modern British menswear, crafted with heritage and worn with
          confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/collection"
            className="btn-sheen group inline-flex items-center justify-center gap-3 bg-gold px-10 py-[18px] text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors duration-300 hover:bg-gold-pale"
          >
            Shop the Collection
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center justify-center gap-3 border border-gold/70 px-10 py-[18px] text-[11px] font-medium uppercase tracking-[0.3em] text-gold-pale transition-all duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
          >
            Discover the House
            <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-cream/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-14 w-px overflow-hidden bg-cream/20">
          <motion.span
            animate={{ y: [-56, 56] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-7 w-px bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}

const MARQUEE_ITEMS = [
  "Hand-finished in our Mayfair atelier",
  "Est. 1934",
  "Complimentary first alteration",
  "Made to measure, always",
  "Super 150s English cloth",
  "One address, one standard",
];

export function Marquee() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={item + (hidden ? "-b" : "-a")}
          className="flex items-center gap-10 whitespace-nowrap text-[11px] uppercase tracking-[0.35em] text-cream/70"
        >
          {item}
          <span className="text-gold">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-charcoal py-5">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  // Start with the real value: the server-rendered HTML (and Vercel's
  // prerendered page) always shows the correct number, never a stuck 0 —
  // even if JavaScript is slow, cached, or partially blocked.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Respect users who prefer no motion: leave the final value as-is.
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // No Intersection Observer, no scroll timing: count starts the moment
    // the component mounts, identically on localhost and on Vercel.
    const duration = 1800;
    let raf = 0;
    let safety: ReturnType<typeof setTimeout> | undefined;
    setDisplay(0);

    const tick = (now: number, t0: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) {
        raf = requestAnimationFrame((t) => tick(t, t0));
      } else {
        setDisplay(value); // guarantee the exact final number
      }
    };

    if (typeof requestAnimationFrame === "function") {
      raf = requestAnimationFrame((t) =>
        tick(t, typeof performance !== "undefined" ? performance.now() : t)
      );
    }
    // Safety net: the counter can never stay stuck — force the final
    // value shortly after the animation should have finished.
    safety = setTimeout(() => setDisplay(value), duration + 600);

    return () => {
      cancelAnimationFrame(raf);
      if (safety) clearTimeout(safety);
    };
  }, [value]);

  return (
    <span suppressHydrationWarning>
      {display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 1934, suffix: "", label: "Founded", note: "In a single Mayfair room" },
  { value: 90, suffix: "+", label: "Years of Craft", note: "Four generations of hands" },
  { value: 1, suffix: "", label: "Mayfair Address", note: "No. 1, W1K 2QT" },
  { value: 6, suffix: "", label: "Collections", note: "Six ways to dress well" },
];

export function HeritageStats() {
  return (
    <section className="border-b border-line bg-cream-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line px-0 py-14 sm:px-6 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="bg-cream-deep px-6 py-8 text-center">
            <p className="font-display text-6xl font-medium tracking-tight text-ink lg:text-7xl">
              <span className="text-gold-deep">
                <CountUp value={s.value} suffix={s.suffix} />
              </span>
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-ink">
              {s.label}
            </p>
            <p className="mt-2 text-xs text-mist">{s.note}</p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: EASE }}
              className="mx-auto mt-5 block h-px w-10 origin-center bg-gold"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>The Collections</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-[1.1] text-ink sm:text-5xl">
            Six ways to <span className="italic text-gold-deep">dress well.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="md:pb-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="max-w-xs text-[13px] leading-relaxed text-ink-soft">
              Six compact edits — pick a circle and step into the collection.
            </p>
            <Link
              href="/collection"
              className="group inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold-deep"
            >
              View all
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Circular mini grid: 3 per row on phones, 6 in one row on desktop */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-6 md:gap-x-5">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.name} delay={(i % 6) * 0.07} y={18}>
            <Link
              href={`/collection?category=${encodeURIComponent(c.name)}`}
              aria-label={`Shop ${c.name}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular image */}
              <span className="relative block h-24 w-24 overflow-hidden rounded-full border border-line bg-parchment shadow-[0_10px_25px_-14px_rgba(20,22,27,0.4)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:border-gold/70 group-hover:shadow-[0_16px_34px_-14px_rgba(212,175,55,0.55)] group-focus-visible:border-gold sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 18vw, 160px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                {/* soft gold ring on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold/70"
                />
              </span>

              {/* Name below the circle */}
              <span className="mt-3.5 block font-display text-[15px] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-gold-deep sm:mt-4 sm:text-lg">
                {c.name}
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.25em] text-mist transition-colors duration-300 group-hover:text-gold-deep/80">
                {countForCategory(c.name)} pieces
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AtelierBand() {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src={ATELIER_FITTING}
                alt="A fitting in the Hartwell & Co. atelier"
                loading="lazy"
                decoding="async"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden border border-line bg-cream px-8 py-6 shadow-xl sm:block lg:-right-8">
              <p className="font-display text-4xl text-gold-deep">90<span className="text-2xl">+</span></p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                Years at the bench
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>The House in Mayfair</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            Where a cloth becomes
            <br />
            <span className="italic text-gold-deep">a second skin.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Behind the oak doors of No. 1 Mayfair, our tailors still cut on
            the half-inch, still pad lapels by hand, and still press every
            garment the morning it ships. It is slower than the world
            requires. It is also the only way we know to dress a man.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/about"
              className="btn-sheen group inline-flex items-center justify-center gap-3 bg-gold px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors duration-300 hover:bg-gold-deep"
            >
              Discover the House
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-mist">
              Fittings by appointment
              <br className="hidden sm:block" />
              Mon – Sat, 10:00 – 18:00
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
