"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterBar, ProductGrid, useSortedList } from "@/components/product";
import { ProductRowCarousel } from "@/components/product-row";
import { CATEGORIES, COLLECTIONS, PRODUCTS } from "@/lib/products";
import { IconHanger } from "@/components/icons";

function normalizeCategory(c: string | null): string {
  return c && (CATEGORIES as readonly string[]).includes(c) ? c : "All";
}

function rowId(category: string) {
  return `collection-row-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export function CollectionClient() {
  const params = useSearchParams();
  const catParam = normalizeCategory(params.get("category"));
  const [category, setCategory] = useState(catParam);
  const [sort, setSort] = useState<"featured" | "asc" | "desc">("featured");

  /* Follow deep links (footer, collection tiles) while on the page */
  useEffect(() => {
    setCategory(catParam);
  }, [catParam]);

  const filtered = useMemo(
    () =>
      category === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category),
    [category]
  );
  const list = useSortedList(filtered, sort);

  const showingAll = category === "All";

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <FilterBar
        category={category}
        onCategory={setCategory}
        sort={sort}
        onSort={setSort}
      />
      <div className="mb-10 mt-8 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.3em] text-mist">
          {list.length} piece{list.length === 1 ? "" : "s"}
          {category !== "All" ? ` · ${category}` : " · All collections"}
        </p>
        <p className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-mist sm:flex">
          <IconHanger className="h-4 w-4 text-gold-deep" />
          Pressed to order · Shipped in 48 hours
        </p>
      </div>

      {showingAll ? (
        /* Every collection gets its own row with its own arrows — each
           ProductRowCarousel instance scrolls only its own track. */
        <div className="space-y-14 sm:space-y-20">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat}
              className={i > 0 ? "border-t border-line pt-12 sm:pt-16" : ""}
            >
              <ProductRowCarousel
                id={rowId(cat)}
                title={cat}
                note={COLLECTIONS.find((c) => c.name === cat)?.line}
                count={PRODUCTS.filter((p) => p.category === cat).length}
                viewAllHref={`/collection?category=${encodeURIComponent(cat)}`}
                viewAllLabel={`Shop ${cat}`}
                products={PRODUCTS.filter((p) => p.category === cat)}
              />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </section>
  );
}
