"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "./store";
import { IconHeart, IconArrowRight } from "./icons";
import { CATEGORIES, type Product } from "@/lib/products";
import { formatGBP, cx, pxThumb } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, notify } = useStore();
  const saved = wishlist.includes(product.slug);
  // Grid thumbnails: small crop for phones, full file for large screens.
  const imgSmall = pxThumb(product.image, 400, 533);

  return (
    // Plain article on purpose: no per-card JS animation observers, so
    // scrolling 60 cards stays smooth. Off-screen cards skip rendering
    // entirely via .product-card { content-visibility: auto }.
    <article className="product-card group">
      <div className="relative overflow-hidden bg-parchment">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={imgSmall}
              srcSet={`${imgSmall} 400w, ${product.image} 900w`}
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 31vw, 380px"
              width={400}
              height={533}
              alt={product.name}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="card-zoom h-full w-full object-cover"
            />
          </div>
          {/* Hover veil + VIEW DETAILS (hover-capable devices only, via CSS) */}
          <div className="card-veil absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent pt-8 sm:pt-14">
            <span className="btn-sheen mx-auto flex items-center justify-center gap-1.5 bg-gold py-2 text-[7px] font-medium uppercase tracking-[0.18em] text-charcoal sm:gap-3 sm:py-3.5 sm:text-[10px] sm:tracking-[0.3em]">
              View Details
              <IconArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </div>
        </Link>

        {/* Category tag (blur only on large screens — costly on mobile GPUs) */}
        <span className="absolute left-2 top-2 max-w-[calc(100%-2.75rem)] bg-cream/95 px-1.5 py-1 text-[7px] uppercase leading-tight tracking-[0.14em] text-ink sm:left-4 sm:top-4 sm:max-w-[calc(100%-5rem)] sm:bg-cream/90 sm:px-3 sm:py-1.5 sm:text-[9px] sm:leading-relaxed sm:tracking-[0.3em] lg:backdrop-blur-sm">
          {product.category}
        </span>

        {product.badge && (
          <span className="absolute left-2 top-9 max-w-[calc(100%-2.75rem)] bg-charcoal/90 px-1.5 py-1 text-[7px] uppercase leading-tight tracking-[0.14em] text-gold sm:left-4 sm:top-14 sm:max-w-[calc(100%-5rem)] sm:bg-charcoal/85 sm:px-3 sm:py-1.5 sm:text-[9px] sm:leading-relaxed sm:tracking-[0.25em] lg:backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => {
            toggleWishlist(product.slug);
            notify(
              saved
                ? "Removed from your wishlist"
                : `${product.name} saved to your wishlist`
            );
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={cx(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 sm:right-4 sm:top-4 sm:h-9 sm:w-9 lg:backdrop-blur-sm",
            saved
              ? "bg-gold text-charcoal opacity-100"
              : "bg-cream/95 text-ink opacity-100 hover:bg-gold hover:text-charcoal sm:bg-cream/85 lg:opacity-0 lg:group-hover:opacity-100"
          )}
        >
          <IconHeart className="h-4 w-4 sm:h-[18px] sm:w-[18px]" filled={saved} />
        </button>
      </div>

      <div className="mt-2 flex flex-col sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-[13px] leading-snug text-ink transition-colors group-hover:text-gold-deep sm:text-[17px] sm:leading-snug md:text-xl md:leading-tight"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 line-clamp-2 text-[7px] uppercase leading-relaxed tracking-[0.14em] text-mist sm:mt-1 sm:text-[9px] sm:tracking-[0.2em] md:text-[10px] md:tracking-[0.25em]">
            {product.fabric}
          </p>
        </div>
        <p className="mt-1 shrink-0 text-[13px] text-ink sm:mt-0 sm:pt-0.5 sm:text-sm md:pt-1 md:text-[15px]">{formatGBP(product.price)}</p>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="products-grid">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

type SortKey = "featured" | "asc" | "desc";

export function FilterBar({
  category,
  onCategory,
  sort,
  onSort,
}: {
  category: string;
  onCategory: (c: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}) {
  const tabs = ["All", ...CATEGORIES];
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
      <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => onCategory(t)}
            className={cx(
              "relative whitespace-nowrap px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] transition-colors",
              category === t
                ? "text-ink"
                : "text-ink-soft hover:text-ink"
            )}
          >
            {t}
            <span
              className={cx(
                "absolute inset-x-3 bottom-0 h-px bg-gold transition-transform duration-500",
                category === t
                  ? "scale-x-100"
                  : "scale-x-0 hover:scale-x-100"
              )}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-mist">
          Order by
        </span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="appearance-none border border-line bg-transparent py-2 pl-4 pr-10 text-[11px] uppercase tracking-[0.2em] text-ink focus:border-gold focus:outline-none"
          >
            <option value="featured">The House Edit</option>
            <option value="asc">Price · Low to High</option>
            <option value="desc">Price · High to Low</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold-deep">
            ▾
          </span>
        </div>
      </div>
    </div>
  );
}

export function useSortedList(products: Product[], sort: SortKey) {
  return useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);
}
