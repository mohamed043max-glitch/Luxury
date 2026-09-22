"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/components/store";
import { PageIntro } from "@/components/intro";
import {
  IconCheck,
  IconArrowRight,
  IconBag,
  HouseSeal,
} from "@/components/icons";
import { formatGBP, FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, pxThumb } from "@/lib/utils";
import { saveOrder } from "@/lib/local-orders";

const EASE = [0.22, 1, 0.36, 1] as const;

type Placed = {
  orderNumber: string;
  total: number;
  email: string;
  name: string;
};

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, user, notify } = useStore();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    note: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);

  const delivery =
    cartSubtotal === 0 || cartSubtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE;
  const total = cartSubtotal + delivery;

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.address.trim() ||
        !form.city.trim() || !form.postcode.trim()) {
      setError("Kindly complete every delivery field.");
      return;
    }
    setBusy(true);
    /* A moment, for ceremony — then the order is kept on the local ledger. */
    window.setTimeout(() => {
      const order = saveOrder(
        {
          name: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          postcode: form.postcode,
          country: form.country,
          note: form.note || null,
        },
        cart.map((i) => ({
          slug: i.slug,
          name: i.name,
          image: i.image,
          size: i.size,
          qty: i.qty,
          price: i.price,
        }))
      );
      setPlaced({
        orderNumber: order.orderNumber,
        total: order.total,
        email: form.email,
        name: form.name,
      });
      clearCart();
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 650);
  };

  if (placed) {
    return (
      <>
        <PageIntro
          eyebrow="Order Confirmed"
          title="Thank you,"
          titleAccent={`${placed.name.split(" ")[0]}.`}
          crumb="Checkout"
        />
        <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border border-line bg-cream-deep/60 p-10 text-center sm:p-14"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-cream text-gold-deep"
            >
              <IconCheck className="h-9 w-9" />
            </motion.div>
            <h2 className="mt-8 font-display text-4xl font-medium text-ink">
              Your order is <span className="italic">registered.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              A confirmation has been sent to{" "}
              <span className="text-ink">{placed.email}</span>. Your pieces
              will be pressed, boxed and despatched from No. 1 Mayfair
              within 48 hours.
            </p>
            <div className="mt-9 border-y border-line py-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-mist">
                Order Reference
              </p>
              <p className="mt-2 font-display text-4xl tracking-[0.08em] text-gold-deep">
                {placed.orderNumber}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Total settled — {formatGBP(placed.total)}
              </p>
            </div>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={`/orders?number=${encodeURIComponent(placed.orderNumber)}&email=${encodeURIComponent(placed.email)}`}
                className="btn-sheen inline-flex items-center justify-center gap-3 bg-gold px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
              >
                Track Your Order
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collection"
                className="inline-flex items-center justify-center gap-3 border border-ink/25 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-all hover:border-gold hover:bg-gold"
              >
                Continue Shopping
              </Link>
            </div>
            <p className="mt-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-mist">
              <HouseSeal className="h-8 w-8 text-gold-deep" />
              With thanks from the House
            </p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Checkout"
        title="Settle your"
        titleAccent="selection."
        sub="No card required at this stage — orders are registered here and settled with your concierge, by bank transfer, or on delivery."
        crumb="Checkout"
      />

      {cart.length === 0 ? (
        <section className="mx-auto max-w-xl px-6 py-24 text-center">
          <IconBag className="mx-auto h-12 w-12 text-line" strokeWidth={0.8} />
          <h2 className="mt-6 font-display text-4xl text-ink">
            Your selection is empty
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            Choose a piece or two, and they will await you here.
          </p>
          <Link
            href="/collection"
            className="btn-sheen mt-8 inline-flex items-center gap-3 bg-gold px-10 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-gold-deep"
          >
            Shop the Collection
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </section>
      ) : (
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_420px]">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="space-y-10"
          >
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                01 — The Client
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full Name" value={form.name} onChange={set("name")} placeholder="Edward Hartwell" />
                <Input label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                02 — Delivery
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input label="Address" value={form.address} onChange={set("address")} placeholder="1 Mayfair" />
                </div>
                <Input label="City" value={form.city} onChange={set("city")} placeholder="London" />
                <Input label="Postcode" value={form.postcode} onChange={set("postcode")} placeholder="W1K 2QT" />
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink">
                      Country
                    </span>
                    <select
                      value={form.country}
                      onChange={(e) => set("country")(e.target.value)}
                      className="w-full appearance-none border border-line bg-cream px-4 py-3.5 text-sm text-ink focus:border-gold focus:outline-none"
                    >
                      {[
                        "United Kingdom",
                        "United States",
                        "United Arab Emirates",
                        "France",
                        "Italy",
                        "Germany",
                        "Singapore",
                        "Japan",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
                03 — Settlement & Notes
              </p>
              <div className="border border-line bg-cream-deep/60 p-5 text-sm leading-relaxed text-ink-soft">
                Orders are settled with your personal concierge — by bank
                transfer, by card over the telephone, or on delivery. A
                member of the house will write to you before despatch.
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink">
                  Note to your tailor (optional)
                </span>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(e) => set("note")(e.target.value)}
                  placeholder="A wedding in June, a wider break on the trousers…"
                  className="w-full resize-none border border-line bg-cream px-4 py-3.5 text-sm text-ink placeholder:text-mist/70 focus:border-gold focus:outline-none"
                />
              </label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-ink"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={busy}
              className="btn-sheen flex w-full items-center justify-center gap-3 bg-gold py-5 text-[11px] font-medium uppercase tracking-[0.35em] text-charcoal transition-colors hover:bg-gold-deep disabled:opacity-60"
            >
              {busy ? "Registering your order…" : `Register Order · ${formatGBP(total)}`}
              <IconArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => notify("Your selection is safe — return whenever you're ready.")}
              className="w-full text-center text-[10px] uppercase tracking-[0.3em] text-mist hover:text-ink"
            >
              Or continue browsing
            </button>
          </motion.form>

          {/* Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="h-fit border border-line bg-cream-deep/60 lg:sticky lg:top-40"
          >
            <p className="border-b border-line px-7 py-5 text-[11px] uppercase tracking-[0.35em] text-ink">
              Order Summary
            </p>
            <div className="max-h-80 overflow-y-auto px-7">
              {cart.map((i) => (
                <div key={i.key} className="flex items-center gap-4 border-b border-line/70 py-4 last:border-0">
                  <div className="h-[72px] w-14 shrink-0 overflow-hidden bg-parchment">
                    <img src={pxThumb(i.image, 112, 144)} alt={i.name} width={112} height={144} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-base leading-tight text-ink">{i.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-mist">
                      {i.size} · Qty {i.qty}
                    </p>
                  </div>
                  <p className="text-sm text-ink">{formatGBP(i.price * i.qty)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-line px-7 py-6 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatGBP(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Delivery</span>
                <span className={delivery === 0 ? "text-gold-deep" : ""}>
                  {delivery === 0 ? "Complimentary" : formatGBP(delivery)}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-4">
                <span className="text-[11px] uppercase tracking-[0.3em] text-ink">
                  Total
                </span>
                <span className="font-display text-3xl text-ink">
                  {formatGBP(total)}
                </span>
              </div>
              <p className="pt-2 text-[10px] uppercase tracking-[0.2em] text-mist">
                Duties &amp; taxes included
              </p>
            </div>
          </motion.aside>
        </section>
      )}
    </>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-line bg-cream px-4 py-3.5 text-sm text-ink placeholder:text-mist/70 transition-colors focus:border-gold focus:outline-none"
      />
    </label>
  );
}
