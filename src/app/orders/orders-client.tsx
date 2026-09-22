"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/components/store";
import { IconCheck, IconArrowRight, IconPin, HouseSeal } from "@/components/icons";
import { formatGBP, formatDate, cx, pxThumb } from "@/lib/utils";
import { findOrder, ordersFor, type LocalOrder } from "@/lib/local-orders";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = ["Confirmed", "In the Atelier", "Dispatched", "Delivered"];
const STEP_NOTES = [
  "Your order has been registered with the house.",
  "Your pieces are being pressed and boxed in Mayfair.",
  "Your parcel is in the hands of our courier.",
  "Delivered. Wear it well, and bring it back to us forever.",
];

function statusIndex(status: string): number {
  const i = STEPS.indexOf(status);
  return i === -1 ? 0 : i;
}

export function OrdersClient() {
  const { user } = useStore();
  const params = useSearchParams();
  const [tab, setTab] = useState<"track" | "mine">("track");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [number, setNumber] = useState(params.get("number") ?? "");
  const [result, setResult] = useState<LocalOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mine, setMine] = useState<LocalOrder[]>([]);
  const [openOrder, setOpenOrder] = useState<string | null>(
    params.get("number") ?? null
  );

  useEffect(() => {
    if (tab !== "mine" || !user) return;
    setMine(ordersFor(user.email));
  }, [tab, user]);

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !number.trim()) return;
    setNotFound(false);
    setResult(null);
    const found = findOrder(email, number);
    if (found) {
      setResult(found);
      setOpenOrder(found.orderNumber);
    } else {
      setNotFound(true);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      {/* Tabs */}
      <div className="mb-10 flex border-b border-line">
        <button
          onClick={() => setTab("track")}
          className={cx(
            "relative px-6 py-4 text-[11px] uppercase tracking-[0.3em] transition-colors",
            tab === "track" ? "text-ink" : "text-mist hover:text-ink"
          )}
        >
          Track an Order
          <span
            className={cx(
              "absolute inset-x-4 bottom-0 h-px bg-gold transition-transform duration-500",
              tab === "track" ? "scale-x-100" : "scale-x-0"
            )}
          />
        </button>
        {user && (
          <button
            onClick={() => setTab("mine")}
            className={cx(
              "relative px-6 py-4 text-[11px] uppercase tracking-[0.3em] transition-colors",
              tab === "mine" ? "text-ink" : "text-mist hover:text-ink"
            )}
          >
            Your Orders
            <span
              className={cx(
                "absolute inset-x-4 bottom-0 h-px bg-gold transition-transform duration-500",
                tab === "mine" ? "scale-x-100" : "scale-x-0"
              )}
            />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {tab === "track" ? (
          <motion.div
            key="track"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <form
              onSubmit={track}
              className="grid gap-5 border border-line bg-cream-deep/60 p-7 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-9"
            >
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink">
                  Email Address
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-line bg-cream px-4 py-3.5 text-sm focus:border-gold focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink">
                  Order Reference
                </span>
                <input
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="HW-2026-00000"
                  className="w-full border border-line bg-cream px-4 py-3.5 text-sm uppercase tracking-[0.1em] focus:border-gold focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="btn-sheen inline-flex items-center justify-center gap-3 bg-gold px-8 py-[15px] text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
              >
                Track
                <IconArrowRight className="h-4 w-4" />
              </button>
            </form>

            <AnimatePresence>
              {notFound && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 border border-gold/50 bg-gold/10 px-6 py-4 text-sm text-ink"
                >
                  No order answers to that reference. Kindly check your
                  confirmation letter, or write to
                  <span className="font-medium"> support@hartwell-luxury.com</span>.
                </motion.div>
              )}
            </AnimatePresence>

            {result && (
              <div className="mt-10">
                <OrderCard order={result} open={openOrder === result.orderNumber} />
              </div>
            )}

            {!result && !notFound && (
              <div className="mt-10 border border-line bg-cream p-8 text-center">
                <HouseSeal className="mx-auto h-12 w-12 text-gold-deep" />
                <p className="mt-4 font-display text-2xl text-ink">
                  Every parcel leaves Mayfair with a reference.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                  Enter the reference from your confirmation letter above —
                  or place an order first and we will keep it on file.
                </p>
                <Link
                  href="/collection"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold-deep hover:text-gold"
                >
                  Shop the Collection <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="mine"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {mine.length === 0 ? (
              <div className="border border-line bg-cream p-10 text-center">
                <p className="font-display text-3xl text-ink">
                  The ledger is waiting.
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Orders you place under{" "}
                  <span className="text-ink">{user?.email}</span> will appear
                  here.
                </p>
                <Link
                  href="/collection"
                  className="btn-sheen mt-7 inline-flex items-center gap-3 bg-gold px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
                >
                  Begin with the Collection
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {mine.map((o) => (
                  <OrderCard
                    key={o.orderNumber}
                    order={o}
                    open={openOrder === o.orderNumber}
                    onToggle={() =>
                      setOpenOrder(
                        openOrder === o.orderNumber ? null : o.orderNumber
                      )
                    }
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function OrderCard({
  order,
  open,
  onToggle,
}: {
  order: LocalOrder;
  open: boolean;
  onToggle?: () => void;
}) {
  const idx = statusIndex(order.status);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="border border-line bg-cream"
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full flex-wrap items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <div className="flex items-center gap-5">
          <span className="font-display text-xl tracking-[0.05em] text-gold-deep">
            {order.orderNumber}
          </span>
          <span className="hidden text-xs text-mist sm:inline">
            {formatDate(order.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="border border-gold/60 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-gold-deep">
            {order.status}
          </span>
          <span className="font-display text-xl text-ink">
            {formatGBP(order.total)}
          </span>
          <IconArrowRight
            className={cx(
              "h-4 w-4 rotate-90 text-mist transition-transform duration-300",
              open && "rotate-[270deg] text-gold-deep"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-7 py-7">
              {/* Stepper */}
              <div className="mb-8 grid grid-cols-4 gap-2">
                {STEPS.map((s, i) => (
                  <div key={s} className="text-center sm:text-left">
                    <div className="flex items-center gap-2">
                      <span
                        className={cx(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px]",
                          i < idx
                            ? "border-gold bg-gold text-charcoal"
                            : i === idx
                              ? "border-gold bg-cream text-gold-deep"
                              : "border-line bg-cream text-mist"
                        )}
                      >
                        {i < idx ? <IconCheck className="h-3 w-3" /> : i + 1}
                      </span>
                      <span
                        className={cx(
                          "h-px flex-1",
                          i < idx ? "bg-gold" : "bg-line"
                        )}
                      />
                    </div>
                    <p
                      className={cx(
                        "mt-2 hidden text-[9px] uppercase tracking-[0.2em] sm:block",
                        i === idx ? "text-gold-deep" : "text-mist"
                      )}
                    >
                      {s}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mb-8 text-sm text-ink-soft">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                  {STEPS[idx]} —
                </span>{" "}
                {STEP_NOTES[idx]}
              </p>

              {/* Items */}
              <div className="grid gap-8 md:grid-cols-[1fr_260px]">
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-mist">
                    Pieces in this order
                  </p>
                  {order.items.map((it) => (
                    <Link
                      key={`${it.slug}-${it.size}`}
                      href={`/product/${it.slug}`}
                      className="group flex items-center gap-4 border-b border-line/70 py-3"
                    >
                      <div className="h-16 w-12 shrink-0 overflow-hidden bg-parchment">
                        <img
                          src={pxThumb(it.image, 96, 128)}
                          alt={it.name}
                          width={96}
                          height={128}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-lg text-ink group-hover:text-gold-deep">
                          {it.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-mist">
                          Size {it.size} · Qty {it.qty}
                        </p>
                      </div>
                      <p className="text-sm text-ink">
                        {formatGBP(it.price * it.qty)}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mist">
                      <IconPin className="h-4 w-4 text-gold-deep" />
                      Delivered to
                    </p>
                    <p className="leading-relaxed text-ink-soft">
                      {order.name}
                      <br />
                      {order.address}
                      <br />
                      {order.city} {order.postcode}
                      <br />
                      {order.country}
                    </p>
                  </div>
                  <div className="border-t border-line pt-4">
                    <div className="flex justify-between text-ink-soft">
                      <span>Subtotal</span>
                      <span>{formatGBP(order.subtotal)}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-ink-soft">
                      <span>Delivery</span>
                      <span>
                        {order.delivery === 0
                          ? "Complimentary"
                          : formatGBP(order.delivery)}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between border-t border-line pt-3">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-ink">
                        Total
                      </span>
                      <span className="font-display text-2xl text-ink">
                        {formatGBP(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
