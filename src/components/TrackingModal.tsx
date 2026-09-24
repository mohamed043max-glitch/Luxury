"use client";

import { useEffect, useState } from "react";
import { useStore, type Order } from "@/lib/store";
import { formatGBP } from "@/data/products";

export function TrackingModal() {
  const { trackingOpen, closeTracking, trackOrder } = useStore();
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<Order | null | "not-found">(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTracking();
    };
    if (trackingOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [trackingOpen, closeTracking]);

  if (!trackingOpen) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = trackOrder(email, orderId);
    setResult(order || "not-found");
  };

  const reset = () => {
    setResult(null);
    setEmail("");
    setOrderId("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm modal-active"
        onClick={closeTracking}
      />
      <div className="relative bg-cream w-full max-w-lg p-8 md:p-12 modal-active">
        <button
          onClick={closeTracking}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:text-gold-deep transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {result === null && (
          <>
            <div className="text-center mb-10">
              <div className="font-serif text-sm tracking-[0.5em] text-gold-deep mb-3">
                ORDER TRACKING
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">
                Follow Your Order
              </h2>
              <p className="text-sm text-graphite font-light">
                Enter the email and order ID from your confirmation.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="luxury-input"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-graphite font-medium block mb-1">
                  Order ID (e.g. HC-XXXXXX)
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="luxury-input"
                  placeholder="HC-"
                  required
                />
              </div>
              <button type="submit" className="btn-gold w-full">
                Track Order
              </button>
            </form>
          </>
        )}

        {result === "not-found" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/40 flex items-center justify-center text-gold-deep">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-ink mb-2">
              Order not found.
            </h3>
            <p className="text-sm text-graphite font-light mb-6">
              Please double-check your email and order ID.
            </p>
            <button onClick={reset} className="btn-outline">
              Try Again
            </button>
          </div>
        )}

        {result && result !== "not-found" && (
          <div>
            <div className="text-center mb-8">
              <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-2 font-medium">
                Order {result.id}
              </div>
              <h2 className="font-serif text-3xl text-ink mb-1">
                {result.status}
              </h2>
              <p className="text-xs text-graphite font-light">
                Placed {new Date(result.createdAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <StatusBar status={result.status} />
            </div>

            <div className="bg-cream-warm border border-gold/30 p-4 mb-6">
              <div className="text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 font-medium">
                Tracking Number
              </div>
              <div className="font-serif text-lg text-ink">
                {result.trackingNumber}
              </div>
            </div>

            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {result.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-16 bg-cream-deep overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-sm text-ink truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-graphite">
                      Size {item.size} × {item.quantity}
                    </div>
                  </div>
                  <div className="font-serif text-sm">
                    {formatGBP(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
                Total
              </span>
              <span className="font-serif text-xl text-ink">
                {formatGBP(result.total)}
              </span>
            </div>

            <button onClick={reset} className="btn-outline w-full mt-6">
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBar({ status }: { status: Order["status"] }) {
  const stages: Order["status"][] = [
    "Pending",
    "Confirmed",
    "Dispatched",
    "Delivered",
  ];
  const idx = stages.indexOf(status);

  return (
    <div className="relative">
      <div className="h-px bg-gold/30 relative">
        <div
          className="absolute top-0 left-0 h-px bg-gold transition-all duration-700"
          style={{ width: `${(idx / (stages.length - 1)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                i <= idx ? "bg-gold" : "bg-cream-deep border border-gold/40"
              }`}
            />
            <div
              className={`text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-2 font-medium text-center ${
                i <= idx ? "text-ink" : "text-graphite"
              }`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
