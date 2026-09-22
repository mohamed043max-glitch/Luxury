"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatGBP, cx } from "@/lib/utils";
import { useStore } from "@/components/store";
import {
  IconHeart,
  IconPlus,
  IconMinus,
  IconCheck,
  IconChevron,
  IconArrowRight,
} from "@/components/icons";
import { ProductCard } from "@/components/product";

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left text-[11px] uppercase tracking-[0.3em] text-ink"
      >
        {title}
        <IconChevron
          className={cx(
            "h-4 w-4 text-gold-deep transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-ink-soft">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart, setCartOpen, wishlist, toggleWishlist, notify } =
    useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [sizeTouched, setSizeTouched] = useState(product.sizes.length === 1);
  const saved = wishlist.includes(product.slug);
  const isSingle = product.sizes.length === 1;

  const add = () => {
    addToCart(product, size, qty);
    notify(`${product.name} added to your selection`);
    setCartOpen(true);
  };

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-36 sm:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Imagery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden bg-parchment">
            <div className="aspect-[3/4] lg:aspect-[4/5]">
              <img
                src={product.image}
                alt={product.name}
                width={900}
                height={1200}
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute left-5 top-5 bg-charcoal/85 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-gold">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Link
              href="/collection"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink-soft transition-colors hover:text-gold-deep"
            >
              <IconArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
              Back to the collection
            </Link>
            <p className="text-[10px] uppercase tracking-[0.25em] text-mist">
              {product.category}
            </p>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
            Hartwell &amp; Co. · {product.category}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl text-ink">
            {formatGBP(product.price)}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-mist">
            {product.fabric}
          </p>

          <p className="mt-7 max-w-xl text-[15px] font-light leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* Size */}
          <div className="mt-9">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink">
                {isSingle ? "Size" : "Select a size"}
              </p>
              {!isSingle && (
                <Link
                  href="/about"
                  className="text-[10px] uppercase tracking-[0.2em] text-gold-deep underline-offset-4 hover:underline"
                >
                  Sizing guide
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeTouched(true);
                  }}
                  className={cx(
                    "min-w-[3.25rem] border px-4 py-3 text-xs tracking-[0.15em] transition-all duration-300",
                    size === s
                      ? "border-gold bg-gold text-charcoal"
                      : "border-line text-ink-soft hover:border-gold hover:text-ink"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-7 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3.5 text-ink-soft transition-colors hover:text-gold-deep"
                aria-label="Decrease quantity"
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                className="p-3.5 text-ink-soft transition-colors hover:text-gold-deep"
                aria-label="Increase quantity"
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={add}
              disabled={!sizeTouched}
              className="btn-sheen group inline-flex flex-1 items-center justify-center gap-3 bg-gold px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors duration-300 hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:basis-72"
            >
              Add to Selection
              <IconCheck className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.slug);
                notify(
                  saved ? "Removed from your wishlist" : "Saved to your wishlist"
                );
              }}
              aria-label="Toggle wishlist"
              className={cx(
                "flex w-[52px] items-center justify-center border transition-all duration-300",
                saved
                  ? "border-gold bg-gold text-charcoal"
                  : "border-line text-ink-soft hover:border-gold hover:text-gold-deep"
              )}
            >
              <IconHeart className="h-5 w-5" filled={saved} />
            </button>
          </div>

          <div className="mt-10">
            <Accordion title="Details & Craft" defaultOpen>
              <ul className="space-y-2.5">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[7px] h-px w-4 shrink-0 bg-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Care & Delivery">
              <p>
                Hand wash or specialist dry clean only. Rest on a broad
                wooden hanger; steam, never iron. Delivered in the house
                box with a cedar press and a note from your tailor.
                Complimentary delivery over £750, otherwise £18 — always
                by signature.
              </p>
            </Accordion>
            <Accordion title="Returns & Repairs">
              <p>
                Forty-eight hours to return unworn pieces, at our cost.
                Beyond that, the garment is yours for life — and our
                workshop keeps its doors open for every repair, re-sole
                and re-button, as it has since 1934.
              </p>
            </Accordion>
          </div>
        </motion.div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream-deep">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                  Complete the wardrobe
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium text-ink">
                  You may also <span className="italic">admire.</span>
                </h2>
              </div>
              <Link
                href={`/collection?category=${encodeURIComponent(product.category)}`}
                className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold-deep sm:inline-flex"
              >
                All {product.category}
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
