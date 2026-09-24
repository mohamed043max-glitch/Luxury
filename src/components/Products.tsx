"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { PRODUCTS, CATEGORIES, formatGBP, type Category, type Product } from "@/data/products";
import { useStore } from "@/lib/store";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

export function Products() {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [quickView, setQuickView] = useState<string | null>(null);

  // Listen for external filter events from Collections
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const cat = detail?.category as Category | undefined;
      if (cat && CATEGORIES.includes(cat)) {
        setActiveCategory(cat);
        // Also scroll to category section if in "All" view or if specific section exists
        const el = document.getElementById(`category-row-${cat.toLowerCase().replace(/\s+/g, "-")}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    window.addEventListener("hartwell:filter", handler);
    return () => window.removeEventListener("hartwell:filter", handler);
  }, []);

  const sortItems = useCallback((items: Product[]) => {
    let list = [...items];
    switch (sortMode) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "newest":
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return list;
    }
  }, [sortMode]);

  // Grouped rows: When "All" is active, display independent rows for each category,
  // each with its own isolated left/right arrows!
  // When a specific category is selected, display that category's row alone.
  const activeCategories = useMemo(() => {
    if (activeCategory === "All") {
      return CATEGORIES.filter(cat => PRODUCTS.some(p => p.category === cat));
    }
    return [activeCategory];
  }, [activeCategory]);

  const activeProduct = PRODUCTS.find((p) => p.id === quickView);

  return (
    <section id="products" className="py-16 sm:py-24 md:py-32 bg-cream-warm">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-gold-deep mb-2 sm:mb-3 font-medium">
              <span className="w-6 sm:w-8 h-px bg-gold" />
              <span>The Edit &middot; Autumn / Winter</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl text-ink leading-tight max-w-2xl">
              Fifty-eight pieces, <em className="text-gold-deep italic">zero compromises.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 self-end md:self-auto">
            <label className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-graphite font-medium">
              Sort
            </label>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="bg-transparent border-b border-gold text-ink text-[10px] sm:text-xs tracking-[0.2em] uppercase py-1.5 sm:py-2 pr-6 pl-1 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-10 sm:mb-14 overflow-x-auto no-scrollbar">
          <CategoryPill
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
            count={PRODUCTS.length}
          >
            All Collections
          </CategoryPill>
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              count={PRODUCTS.filter((p) => p.category === cat).length}
            >
              {cat}
            </CategoryPill>
          ))}
        </div>

        {/* Independent Horizontal Rows with Distinct Navigation Arrows */}
        <div className="space-y-12 sm:space-y-16">
          {activeCategories.map((cat) => {
            const catItems = sortItems(PRODUCTS.filter((p) => p.category === cat));
            if (catItems.length === 0) return null;
            return (
              <CategoryRow
                key={cat}
                category={cat}
                items={catItems}
                onView={(id) => setQuickView(id)}
                onWishlist={(id) => toggleWishlist(id)}
                wishlist={wishlist}
                onAdd={(p) => addToCart(p, p.sizes[Math.floor(p.sizes.length / 2)])}
              />
            );
          })}
        </div>

        {activeCategories.length === 0 && (
          <div className="text-center py-20 font-serif text-2xl text-graphite">
            No pieces found.
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {activeProduct && (
        <QuickView
          product={activeProduct}
          onClose={() => setQuickView(null)}
        />
      )}
    </section>
  );
}

interface CategoryRowProps {
  category: Category;
  items: Product[];
  onView: (id: string) => void;
  onWishlist: (id: string) => void;
  wishlist: string[];
  onAdd: (product: Product) => void;
}

function CategoryRow({
  category,
  items,
  onView,
  onWishlist,
  wishlist,
  onAdd,
}: CategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Monitor scroll position to enable/disable arrows
  const checkScroll = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Scroll exactly one view width or 3 cards
  const scroll = (direction: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const anchorId = `category-row-${category.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div id={anchorId} className="group/row flex flex-col scroll-mt-28">
      {/* Category Row Header with Independent Navigation Arrows */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gold/20 mb-4 sm:mb-6">
        <div className="flex items-baseline gap-2.5 sm:gap-4">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink dark:text-[#fbf9f5] font-normal">
            {category}
          </h3>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold-deep dark:text-gold font-medium">
            ({items.length} {items.length === 1 ? "Piece" : "Pieces"})
          </span>
        </div>

        {/* Dedicated Left / Right Navigation Arrows For This Specific Row */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={`Previous ${category} pieces`}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold/40 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "bg-cream dark:bg-[#1a1e26] text-ink dark:text-[#f3f0e8] hover:bg-gold hover:text-ink hover:border-gold shadow-sm cursor-pointer active:scale-95"
                : "bg-transparent text-graphite/30 border-gold/15 cursor-not-allowed opacity-40"
            }`}
          >
            <svg
              width="14"
              height="14"
              className="sm:w-4 sm:h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={`Next ${category} pieces`}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold/40 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "bg-cream dark:bg-[#1a1e26] text-ink dark:text-[#f3f0e8] hover:bg-gold hover:text-ink hover:border-gold shadow-sm cursor-pointer active:scale-95"
                : "bg-transparent text-graphite/30 border-gold/15 cursor-not-allowed opacity-40"
            }`}
          >
            <svg
              width="14"
              height="14"
              className="sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Smooth Horizontal Scrolling Track — Exactly 3 Items Per View on All Devices */}
      <div
        ref={rowRef}
        className="product-row-carousel flex gap-2 sm:gap-3.5 lg:gap-6 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth py-1"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((product) => (
          <div
            key={product.id}
            className="product-carousel-item flex-none"
            style={{
              scrollSnapAlign: "start",
            }}
          >
            <ProductCard
              product={product}
              onView={() => onView(product.id)}
              onWishlist={() => onWishlist(product.id)}
              isWished={wishlist.includes(product.id)}
              onAdd={() => onAdd(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryPill({
  children,
  active,
  onClick,
  count,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-5 py-1.5 sm:py-3 border transition-all duration-500 text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium whitespace-nowrap cursor-pointer ${
        active
          ? "bg-ink dark:bg-gold text-cream dark:text-ink border-ink dark:border-gold"
          : "bg-transparent text-ink dark:text-[#f3f0e8] border-gold/40 hover:border-ink dark:hover:border-gold"
      }`}
    >
      <span>{children}</span>
      <span
        className={`text-[7px] sm:text-[9px] ${
          active ? "text-gold-light dark:text-ink font-bold" : "text-graphite dark:text-[#b0b4be]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ProductCard({
  product,
  onView,
  onWishlist,
  isWished,
  onAdd,
}: {
  product: (typeof PRODUCTS)[number];
  onView: () => void;
  onWishlist: () => void;
  isWished: boolean;
  onAdd: () => void;
}) {
  return (
    <article className="product-card group flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-deep mb-2 sm:mb-3 img-zoom">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover select-none"
          loading="lazy"
          decoding="async"
          width={400}
          height={533}
        />

        {/* Category Pill Tag & Badges - Lightweight zero-blur styling */}
        <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
          <span className="bg-cream/95 dark:bg-[#1a1e26]/95 text-ink dark:text-[#f3f0e8] text-[7px] sm:text-[8.5px] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 shadow-sm border border-gold/20">
            {product.category}
          </span>
          {product.badge && (
            <span className="hidden sm:inline-block bg-ink dark:bg-black text-gold text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 border-l-2 border-gold shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isLimited && !product.badge && (
            <span className="bg-ink dark:bg-black text-gold text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 border border-gold">
              Limited
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="bg-gold text-ink text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button - Clean background without expensive backdrop-filter */}
        <button
          onClick={onWishlist}
          className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cream/95 dark:bg-[#1a1e26]/95 text-ink dark:text-[#f3f0e8] border border-gold/25 flex items-center justify-center hover:bg-gold hover:text-ink transition-colors shadow-sm active:scale-95 cursor-pointer"
          aria-label="Toggle wishlist"
        >
          <svg
            width="12"
            height="12"
            className="sm:w-[14px] sm:h-[14px]"
            viewBox="0 0 24 24"
            fill={isWished ? "#c9a961" : "none"}
            stroke={isWished ? "#c9a961" : "#1a1d24"}
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover overlay (desktop only) */}
        <div className="product-overlay absolute inset-x-0 bottom-0 p-2 sm:p-3 flex gap-1.5 sm:gap-2">
          <button
            onClick={onView}
            className="flex-1 btn-outline !py-1.5 sm:!py-2.5 !px-2 sm:!px-3 !text-[8px] sm:!text-[10px] !bg-cream/95 dark:!bg-[#1a1e26]/95 dark:!text-white !border-cream dark:!border-gold/30 cursor-pointer"
          >
            Details
          </button>
          <button
            onClick={onAdd}
            className="btn-gold !py-1.5 sm:!py-2.5 !px-2.5 sm:!px-3 !text-[8px] sm:!text-[10px] cursor-pointer"
            aria-label="Add to bag"
          >
            <svg width="12" height="12" className="sm:w-[13px] sm:h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>

      <div className="product-info flex-1 flex flex-col">
        <div className="text-[7.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold-deep dark:text-gold mb-0.5 font-medium truncate">
          {product.category}
        </div>
        <h4 className="font-serif text-xs sm:text-base md:text-lg text-ink dark:text-[#fbf9f5] mb-0.5 leading-snug line-clamp-2">
          {product.name}
        </h4>
        <p className="text-[9px] sm:text-xs text-graphite dark:text-[#b0b4be] mb-1.5 sm:mb-2 font-light truncate">
          {product.subtitle}
        </p>
        <div className="flex items-center justify-between mt-auto pt-1.5 sm:pt-2 border-t border-gold/20">
          <div className="font-serif text-xs sm:text-base md:text-lg font-medium text-ink dark:text-gold">
            {formatGBP(product.price)}
          </div>
          <button
            onClick={onView}
            className="luxury-link text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase text-ink dark:text-[#fbf9f5] hover:text-gold-deep dark:hover:text-gold transition-colors font-medium cursor-pointer"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

function QuickView({
  product,
  onClose,
}: {
  product: (typeof PRODUCTS)[number];
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const isWished = wishlist.includes(product.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm modal-active"
        onClick={onClose}
      />
      <div className="relative bg-cream dark:bg-[#161920] text-ink dark:text-[#f3f0e8] border border-gold/30 w-full max-w-5xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 modal-active shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-cream/80 dark:bg-[#121418]/80 text-ink dark:text-[#f3f0e8] border border-gold/30 hover:bg-gold hover:text-ink transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="aspect-[3/4] md:aspect-auto bg-cream-deep dark:bg-[#101216] relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gold text-ink text-[9px] tracking-[0.3em] uppercase font-semibold px-2.5 py-1">
                New
              </span>
            )}
            {product.isSignature && (
              <span className="bg-ink text-cream text-[9px] tracking-[0.3em] uppercase font-semibold px-2.5 py-1 border border-gold/30">
                Signature
              </span>
            )}
            {product.isLimited && (
              <span className="bg-ink text-gold text-[9px] tracking-[0.3em] uppercase font-semibold px-2.5 py-1 border border-gold">
                Limited
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-12 flex flex-col">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep dark:text-gold mb-3 font-medium">
            {product.category}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink dark:text-[#fbf9f5] mb-2">
            {product.name}
          </h2>
          <p className="text-sm text-graphite dark:text-[#b0b4be] mb-6 font-light italic">
            {product.subtitle}
          </p>

          <div className="font-serif text-2xl sm:text-3xl text-ink dark:text-gold mb-8 flex items-baseline gap-3">
            {formatGBP(product.price)}
            <span className="text-xs tracking-[0.3em] uppercase text-graphite dark:text-gray-400 font-sans font-normal">
              Inc. VAT
            </span>
          </div>

          <p className="text-sm leading-relaxed text-graphite dark:text-[#c4c7cf] mb-8 font-light">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-ink dark:text-[#fbf9f5] font-medium mb-3">
              Select Size
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[44px] sm:min-w-[52px] px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs tracking-[0.15em] sm:tracking-[0.2em] border transition-all cursor-pointer ${
                    size === s
                      ? "bg-ink dark:bg-gold text-cream dark:text-ink border-ink dark:border-gold font-bold"
                      : "bg-transparent text-ink dark:text-[#f3f0e8] border-gold/40 hover:border-ink dark:hover:border-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => addToCart(product, size)}
              className="btn-gold flex-1"
            >
              Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-gold/40 hover:border-ink flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isWished ? "#c9a961" : "none"}
                stroke={isWished ? "#c9a961" : "currentColor"}
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="border-t border-gold/20 pt-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-ink dark:text-[#fbf9f5] font-medium mb-3">
              The Details
            </div>
            <ul className="space-y-2">
              {product.details.map((d, i) => (
                <li
                  key={i}
                  className="text-sm text-graphite dark:text-[#b0b4be] font-light flex items-start gap-3"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-deep dark:bg-gold mt-2 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-[10px] tracking-[0.25em] uppercase text-graphite dark:text-gold flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="m22 11-10 5L2 11" />
            </svg>
            Complimentary UK delivery
          </div>
        </div>
      </div>
    </div>
  );
}
