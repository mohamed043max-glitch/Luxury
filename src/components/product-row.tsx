"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product";
import { IconArrowLeft, IconArrowRight } from "./icons";
import { cx } from "@/lib/utils";

/**
 * ProductRowCarousel — one fully independent horizontal product row.
 *
 * Every instance owns its own scroll container (via a local ref) and its
 * own arrow/progress state. Pressing a row's arrows calls scrollBy() only
 * on that row's track, so sibling rows never move or share state.
 */
export function ProductRowCarousel({
  id,
  title,
  note,
  count,
  viewAllHref,
  viewAllLabel = "View all",
  products,
}: {
  /** Unique, stable id for this row (used for aria-controls). */
  id: string;
  title: string;
  note?: string;
  count?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
  products: Product[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanLeft(left > 4);
    setCanRight(left < max - 4);
    setProgress(max > 0 ? Math.min(1, left / max) : 0);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, products.length]);

  const scrollRow = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.85,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  const arrowCls =
    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300";

  return (
    <section aria-labelledby={`${id}-title`}>
      {/* Row header: title + this row's own arrows */}
      <div className="mb-6 flex items-end justify-between gap-6">
        <div className="min-w-0">
          <h3
            id={`${id}-title`}
            className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl"
          >
            {title}
            {typeof count === "number" && (
              <span className="ml-3 align-middle font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                {count} pieces
              </span>
            )}
          </h3>
          {note && (
            <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-ink-soft">
              {note}
            </p>
          )}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold-deep"
            >
              {viewAllLabel}
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => scrollRow(-1)}
            disabled={!canLeft}
            aria-label={`Scroll ${title} row left`}
            aria-controls={id}
            className={cx(
              arrowCls,
              canLeft
                ? "border-line text-ink hover:border-gold hover:bg-gold hover:text-charcoal"
                : "cursor-not-allowed border-line/60 text-mist/50"
            )}
          >
            <IconArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollRow(1)}
            disabled={!canRight}
            aria-label={`Scroll ${title} row right`}
            aria-controls={id}
            className={cx(
              arrowCls,
              canRight
                ? "border-line text-ink hover:border-gold hover:bg-gold hover:text-charcoal"
                : "cursor-not-allowed border-line/60 text-mist/50"
            )}
          >
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* This row's own scroll track */}
      <div
        id={id}
        ref={trackRef}
        role="region"
        aria-label={`${title} products`}
        tabIndex={0}
        className="product-row-scroll"
      >
        {products.map((p) => (
          <div key={p.slug} className="product-row-card">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* This row's own progress hairline */}
      <div
        className="mt-5 h-px w-full bg-line"
        role="presentation"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gold transition-[width] duration-200"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>
    </section>
  );
}
