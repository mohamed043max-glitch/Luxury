"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./store";
import {
  IconClose,
  IconPlus,
  IconMinus,
  IconTrash,
  IconBag,
  IconArrowRight,
  IconSearch,
  IconHanger,
} from "./icons";
import { formatGBP, FREE_DELIVERY_THRESHOLD, pxThumb } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";

const slide = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartSubtotal,
    updateQty,
    removeItem,
    cartCount,
  } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const remaining = FREE_DELIVERY_THRESHOLD - cartSubtotal;
  const progress = Math.min(100, (cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={slide.hidden}
            animate={slide.visible}
            exit={slide.exit}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-ink">
                Your Selection
                <span className="ml-2 text-gold-deep">({cartCount})</span>
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-ink transition-colors hover:text-gold-deep"
                aria-label="Close selection"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
                <IconBag className="h-12 w-12 text-line" strokeWidth={0.8} />
                <p className="font-display text-2xl text-ink">
                  Your selection is empty
                </p>
                <p className="text-sm text-ink-soft">
                  Begin with a suit, a shirt, or simply the season&rsquo;s
                  overcoat.
                </p>
                <Link
                  href="/collection"
                  onClick={() => setCartOpen(false)}
                  className="btn-sheen mt-2 inline-flex items-center gap-3 bg-gold px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
                >
                  Shop the Collection
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                    {remaining > 0 ? (
                      <>
                        {formatGBP(remaining)} away from complimentary delivery
                      </>
                    ) : (
                      <span className="text-gold-deep">
                        Complimentary delivery secured
                      </span>
                    )}
                  </p>
                  <div className="h-1 w-full bg-parchment">
                    <motion.div
                      className="h-full bg-gold"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 border-b border-line/70 py-5"
                      >
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="block h-28 w-20 shrink-0 overflow-hidden bg-parchment"
                        >
                          <img
                            src={pxThumb(item.image, 160, 224)}
                            alt={item.name}
                            width={160}
                            height={224}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={() => setCartOpen(false)}
                                className="font-display text-lg leading-tight text-ink hover:text-gold-deep"
                              >
                                {item.name}
                              </Link>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mist">
                                Size {item.size}
                              </p>
                            </div>
                            <p className="text-sm text-ink">
                              {formatGBP(item.price * item.qty)}
                            </p>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-line">
                              <button
                                onClick={() => updateQty(item.key, -1)}
                                className="p-2 text-ink-soft transition-colors hover:text-gold-deep"
                                aria-label="Decrease quantity"
                              >
                                <IconMinus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 text-center text-sm">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.key, 1)}
                                className="p-2 text-ink-soft transition-colors hover:text-gold-deep"
                                aria-label="Increase quantity"
                              >
                                <IconPlus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="p-2 text-mist transition-colors hover:text-ink"
                              aria-label="Remove"
                            >
                              <IconTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-line bg-cream-deep px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">
                      Subtotal
                    </p>
                    <p className="font-display text-2xl text-ink">
                      {formatGBP(cartSubtotal)}
                    </p>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="btn-sheen flex w-full items-center justify-center gap-3 bg-gold py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
                  >
                    Proceed to Checkout
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-mist">
                    Duties &amp; taxes included · Card on delivery
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
      window.setTimeout(() => inputRef.current?.focus(), 320);
    } else {
      document.body.style.overflow = "";
    }
  }, [searchOpen]);

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] mx-auto max-h-[85vh] w-full max-w-3xl overflow-y-auto border-b border-line bg-cream shadow-2xl"
        >
          <div className="flex items-center gap-4 border-b border-line px-6 py-5">
            <IconSearch className="h-5 w-5 text-gold-deep" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search suits, shirts, coats, leather…"
              className="w-full bg-transparent font-display text-2xl text-ink placeholder:font-sans placeholder:text-sm placeholder:tracking-wide placeholder:text-mist focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-ink transition-colors hover:text-gold-deep"
              aria-label="Close search"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-4">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-mist">
              {filtered.length} piece{filtered.length === 1 ? "" : "s"}
            </p>
            {filtered.length === 0 ? (
              <p className="py-10 text-center font-display text-xl text-ink-soft">
                No pieces answer to &ldquo;{query}&rdquo;. Try
                &ldquo;overcoat&rdquo; or &ldquo;oxford&rdquo;.
              </p>
            ) : (
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {filtered.slice(0, 8).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="group flex items-center gap-4"
                  >
                    <div className="h-20 w-14 shrink-0 overflow-hidden bg-parchment">
                      <img
                        src={pxThumb(p.image, 112, 160)}
                        alt={p.name}
                        width={112}
                        height={160}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg leading-tight text-ink group-hover:text-gold-deep">
                        {p.name}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-mist">
                        {p.category}
                      </p>
                      <p className="mt-1 text-sm text-ink">{formatGBP(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-line bg-cream-deep px-6 py-3">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-mist">
              <IconHanger className="h-4 w-4 text-gold-deep" />
              Every piece pressed to order
            </p>
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[10px] uppercase tracking-[0.25em] text-ink-soft hover:text-gold-deep"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
