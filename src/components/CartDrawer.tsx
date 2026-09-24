"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { formatGBP } from "@/data/products";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    removeFromCart,
    updateQty,
    cartTotal,
    cartCount,
    openCheckout,
    openAuth,
    user,
  } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cartOpen) closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!cartOpen}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeCart}
      />
      <aside
        className={`absolute top-0 right-0 bottom-0 w-full md:w-[480px] bg-cream flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gold/20">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep mb-1 font-medium">
              Your Bag
            </div>
            <div className="font-serif text-2xl text-ink">
              {cartCount} {cartCount === 1 ? "Piece" : "Pieces"}
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center hover:text-gold-deep transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16">
              <div className="w-16 h-16 mb-6 rounded-full border border-gold/40 flex items-center justify-center text-gold-deep">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-ink mb-2">
                Your bag awaits.
              </h3>
              <p className="text-sm text-graphite font-light max-w-xs">
                Begin with a piece from our signature collections and let the
                wardrobe build itself.
              </p>
              <button
                onClick={closeCart}
                className="mt-8 btn-outline"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <ul className="p-6 md:p-8 space-y-6">
              {cart.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-6 border-b border-gold/20 last:border-0"
                >
                  <div className="w-20 h-28 bg-cream-deep flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.3em] uppercase text-gold-deep mb-1 font-medium">
                      {item.product.category}
                    </div>
                    <h4 className="font-serif text-base text-ink mb-0.5 leading-tight truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-graphite font-light mb-3">
                      Size {item.size}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gold/40">
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.size, -1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gold/20 transition-colors"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.size, 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gold/20 transition-colors"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-serif text-base text-ink">
                        {formatGBP(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="text-graphite hover:text-gold-deep transition-colors self-start"
                    aria-label="Remove"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gold/20 p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-graphite">
              <span className="tracking-[0.2em] uppercase">Subtotal</span>
              <span className="font-serif text-base text-ink">
                {formatGBP(cartTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-graphite">
              <span className="tracking-[0.2em] uppercase">Delivery</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold-deep">
                Complimentary
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gold/20">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
                Total
              </span>
              <span className="font-serif text-2xl text-ink">
                {formatGBP(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  closeCart();
                  openAuth("login");
                } else {
                  openCheckout();
                }
              }}
              className="btn-gold w-full"
            >
              {user ? "Proceed to Checkout" : "Sign In to Checkout"}
            </button>
            <button
              onClick={closeCart}
              className="w-full text-center text-[10px] tracking-[0.3em] uppercase text-graphite hover:text-ink transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
