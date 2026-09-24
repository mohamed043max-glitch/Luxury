"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { formatGBP } from "@/data/products";

export function CheckoutModal() {
  const {
    checkoutOpen,
    closeCheckout,
    cart,
    cartTotal,
    user,
    placeOrder,
  } = useStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (checkoutOpen && user) {
      setForm((f) => ({
        ...f,
        name: user.name,
        email: user.email,
      }));
    }
  }, [checkoutOpen, user]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    if (checkoutOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [checkoutOpen, closeCheckout]);

  if (!checkoutOpen) return null;

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const placeFinal = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      placeOrder({
        email: form.email,
        name: form.name,
        address: form.address,
        city: form.city,
        postcode: form.postcode,
      });
      setProcessing(false);
      setStep(1);
      setForm({
        name: "",
        email: "",
        address: "",
        city: "",
        postcode: "",
        country: "United Kingdom",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
      });
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm modal-active"
        onClick={closeCheckout}
      />
      <div className="relative bg-cream w-full max-w-4xl max-h-[92vh] overflow-y-auto modal-active">
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-cream/80 hover:bg-gold transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="p-8 md:p-12">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-3 font-medium">
              Secure Checkout
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">
              {step === 1 ? "Delivery Details" : "Payment"}
            </h2>
            <p className="text-sm text-graphite font-light mb-8">
              Step {step} of 2 — All transactions are encrypted end-to-end.
            </p>

            {/* Steps indicator */}
            <div className="flex items-center gap-3 mb-8">
              <StepDot active={step >= 1} done={step > 1} label="Delivery" />
              <div className="flex-1 h-px bg-gold/40" />
              <StepDot active={step >= 2} label="Payment" />
            </div>

            {step === 1 ? (
              <form onSubmit={submitStep1} className="space-y-5">
                <Field label="Full Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="luxury-input"
                    required
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="luxury-input"
                    required
                  />
                </Field>
                <Field label="Address">
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="luxury-input"
                    placeholder="12 Savile Row"
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City">
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="luxury-input"
                      placeholder="London"
                      required
                    />
                  </Field>
                  <Field label="Postcode">
                    <input
                      type="text"
                      value={form.postcode}
                      onChange={(e) => update("postcode", e.target.value)}
                      className="luxury-input"
                      placeholder="W1S 3PR"
                      required
                    />
                  </Field>
                </div>

                <button type="submit" className="btn-gold w-full mt-6">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={placeFinal} className="space-y-5">
                <Field label="Card Number">
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={(e) => update("cardNumber", e.target.value)}
                    className="luxury-input"
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry">
                    <input
                      type="text"
                      value={form.cardExpiry}
                      onChange={(e) => update("cardExpiry", e.target.value)}
                      className="luxury-input"
                      placeholder="MM / YY"
                      required
                    />
                  </Field>
                  <Field label="CVC">
                    <input
                      type="text"
                      value={form.cardCVC}
                      onChange={(e) => update("cardCVC", e.target.value)}
                      className="luxury-input"
                      placeholder="123"
                      required
                    />
                  </Field>
                </div>

                <div className="bg-cream-warm border border-gold/30 p-4 text-xs text-graphite font-light mt-4">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 font-medium">
                    Demo Mode
                  </div>
                  Use any test card number (e.g. 4242 4242 4242 4242). No real
                  charge is made.
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={processing} className="btn-gold flex-1">
                    {processing ? "Processing..." : `Pay ${formatGBP(cartTotal)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Summary */}
          <div className="bg-ink text-cream p-8 md:p-12">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-medium">
              Order Summary
            </div>

            <ul className="space-y-4 mb-8">
              {cart.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="relative w-14 h-20 flex-shrink-0 bg-charcoal overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-gold text-ink text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.3em] uppercase text-gold mb-0.5">
                      {item.product.category}
                    </div>
                    <div className="font-serif text-sm mb-0.5 truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-cream/60">
                      Size {item.size}
                    </div>
                  </div>
                  <div className="font-serif text-sm">
                    {formatGBP(item.product.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-cream/20 pt-6 space-y-2">
              <Row label="Subtotal" value={formatGBP(cartTotal)} />
              <Row label="Delivery" value="Complimentary" />
              <Row label="VAT (incl.)" value={`—`} />
            </div>
            <div className="border-t border-gold mt-4 pt-6 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
                Total
              </span>
              <span className="font-serif text-3xl gold-shimmer">
                {formatGBP(cartTotal)}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-cream/70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-cream/70">{label}</span>
      <span className="font-serif">{value}</span>
    </div>
  );
}

function StepDot({
  active,
  done,
  label,
}: {
  active: boolean;
  done?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all ${
          done
            ? "bg-gold text-ink"
            : active
            ? "bg-ink text-cream ring-2 ring-gold"
            : "bg-cream-deep text-graphite"
        }`}
      >
        {done ? "✓" : active ? "2" : "1"}
      </div>
      <span
        className={`text-[10px] tracking-[0.3em] uppercase hidden sm:inline ${
          active ? "text-ink font-medium" : "text-graphite"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
