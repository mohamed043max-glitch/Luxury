"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { PRODUCTS, formatGBP } from "@/data/products";

const PRESET = {
  email: "support@hartwell-luxury.com",
  password: "SecureLuxury1934!",
};

export default function AccountPage() {
  const {
    user,
    login,
    signup,
    logout,
    orders,
    wishlist,
    cartCount,
    openCart,
    openTracking,
    toast,
  } = useStore();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const savedPieces = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok =
      mode === "login"
        ? login(email.trim(), password)
        : signup(email.trim(), name.trim(), password);
    if (ok) {
      setEmail("");
      setName("");
      setPassword("");
    }
  };

  return (
    <div className="pt-32 sm:pt-36 pb-24 bg-cream dark:bg-[#0e1014] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.5em] uppercase text-gold-deep dark:text-gold mb-4 font-medium">
            <span className="w-8 h-px bg-gold" />
            <span>Client Services</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink dark:text-[#fbf9f5] leading-tight">
            {user ? `Welcome, ${user.name.split(" ")[0]}.` : "Client Account"}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-graphite dark:text-[#b0b4be] font-light max-w-xl mx-auto">
            {user
              ? "Your pieces, your selections and the record of every order placed with the house."
              : "Sign in to follow your orders, keep your wishlist, and let the house remember your sizes."}
          </p>
        </div>

        {user ? (
          /* ---------------- SIGNED IN ---------------- */
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              {/* Account card */}
              <div className="border border-gold/30 bg-white/60 dark:bg-[#151820] p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="w-20 h-20 shrink-0 rounded-full border border-gold/50 bg-cream dark:bg-[#0e1014] flex items-center justify-center">
                    <span className="font-serif text-3xl text-gold-deep dark:text-gold">
                      {user.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] tracking-[0.35em] uppercase text-gold-deep dark:text-gold font-medium">
                      Member of the House
                    </div>
                    <div className="mt-2 font-serif text-3xl text-ink dark:text-[#fbf9f5] truncate">
                      {user.name}
                    </div>
                    <div className="mt-1 text-sm text-graphite dark:text-[#b0b4be] truncate">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={openTracking}
                    className="border border-gold/30 bg-cream dark:bg-[#0e1014] p-5 text-left hover:border-gold transition-colors"
                  >
                    <div className="font-serif text-3xl text-gold-deep dark:text-gold">
                      {orders.length}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-ink dark:text-[#f3f0e8]">
                      Orders Placed
                    </div>
                  </button>
                  <button
                    onClick={openCart}
                    className="border border-gold/30 bg-cream dark:bg-[#0e1014] p-5 text-left hover:border-gold transition-colors"
                  >
                    <div className="font-serif text-3xl text-gold-deep dark:text-gold">
                      {cartCount}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-ink dark:text-[#f3f0e8]">
                      In Your Selection
                    </div>
                  </button>
                  <div className="border border-gold/30 bg-cream dark:bg-[#0e1014] p-5">
                    <div className="font-serif text-3xl text-gold-deep dark:text-gold">
                      {wishlist.length}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-ink dark:text-[#f3f0e8]">
                      Wishlist Pieces
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    toast("You have been signed out.", "info");
                  }}
                  className="mt-8 inline-flex items-center justify-center border border-ink/25 dark:border-cream/30 px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase text-ink dark:text-[#f3f0e8] hover:border-gold hover:bg-gold hover:text-ink transition-all"
                >
                  Sign Out
                </button>
              </div>

              {/* Order history */}
              <div className="border border-gold/30 bg-white/60 dark:bg-[#151820] p-8">
                <div className="text-[10px] tracking-[0.35em] uppercase text-gold-deep dark:text-gold font-medium mb-6">
                  Order Ledger
                </div>
                {orders.length === 0 ? (
                  <p className="text-sm text-graphite dark:text-[#b0b4be] font-light">
                    No orders yet. Your first commission will appear here with its
                    reference and tracking number.
                  </p>
                ) : (
                  <div className="divide-y divide-gold/20">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="flex flex-wrap items-center justify-between gap-3 py-4"
                      >
                        <div>
                          <div className="font-serif text-lg text-ink dark:text-[#fbf9f5]">
                            {o.id}
                          </div>
                          <div className="text-[10px] tracking-[0.2em] uppercase text-graphite dark:text-[#b0b4be]">
                            {o.items.length} piece{o.items.length === 1 ? "" : "s"} ·{" "}
                            {o.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-serif text-xl text-ink dark:text-[#fbf9f5]">
                            {formatGBP(o.total)}
                          </div>
                          <button
                            onClick={openTracking}
                            className="text-[10px] tracking-[0.25em] uppercase text-gold-deep dark:text-gold hover:underline"
                          >
                            Track
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <aside className="border border-gold/30 bg-white/60 dark:bg-[#151820] p-8 h-fit">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold-deep dark:text-gold font-medium mb-6">
                Your Wishlist
              </div>
              {savedPieces.length === 0 ? (
                <p className="text-sm text-graphite dark:text-[#b0b4be] font-light">
                  Nothing saved yet. Tap the heart on any piece to keep it here.
                </p>
              ) : (
                <div className="space-y-4">
                  {savedPieces.map((p) => (
                    <div key={p.id} className="flex items-center gap-4">
                      <div className="w-14 h-[72px] shrink-0 overflow-hidden bg-cream-deep dark:bg-[#0e1014]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-serif text-base text-ink dark:text-[#fbf9f5] truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-graphite dark:text-[#b0b4be]">
                          {p.category}
                        </div>
                      </div>
                      <div className="text-sm text-ink dark:text-gold">
                        {formatGBP(p.price)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        ) : (
          /* ---------------- SIGNED OUT ---------------- */
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] max-w-5xl mx-auto">
            <div className="border border-gold/30 bg-white/60 dark:bg-[#151820] p-8 sm:p-10">
              {/* Mode switch */}
              <div className="flex border border-gold/30 mb-8">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-3.5 text-[11px] tracking-[0.3em] uppercase transition-colors ${
                      mode === m
                        ? "bg-ink dark:bg-gold text-cream dark:text-ink"
                        : "text-graphite dark:text-[#b0b4be] hover:text-ink dark:hover:text-gold"
                    }`}
                  >
                    {m === "login" ? "Sign In" : "Create Account"}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-6">
                {mode === "signup" && (
                  <label className="block">
                    <span className="mb-2 block text-[10px] tracking-[0.3em] uppercase text-ink dark:text-[#f3f0e8]">
                      Full Name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Edward Hartwell"
                      className="w-full border border-gold/40 bg-cream dark:bg-[#0e1014] px-4 py-3.5 text-sm text-ink dark:text-[#f3f0e8] focus:border-gold focus:outline-none"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-[10px] tracking-[0.3em] uppercase text-ink dark:text-[#f3f0e8]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full border border-gold/40 bg-cream dark:bg-[#0e1014] px-4 py-3.5 text-sm text-ink dark:text-[#f3f0e8] focus:border-gold focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] tracking-[0.3em] uppercase text-ink dark:text-[#f3f0e8]">
                    Password
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full border border-gold/40 bg-cream dark:bg-[#0e1014] px-4 py-3.5 text-sm text-ink dark:text-[#f3f0e8] focus:border-gold focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep py-4 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#121418] hover:brightness-110 transition"
                >
                  {mode === "login" ? "Sign In" : "Create My Account"}
                </button>
              </form>
            </div>

            {/* Concierge credentials */}
            <aside className="border border-gold/30 bg-white/60 dark:bg-[#151820] p-8 h-fit">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold-deep dark:text-gold font-medium mb-4">
                Demo Credentials
              </div>
              <p className="text-sm text-graphite dark:text-[#b0b4be] font-light leading-relaxed">
                Use the house concierge account to explore the full client area.
              </p>
              <div className="mt-5 space-y-2 border-t border-gold/20 pt-5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-graphite dark:text-[#b0b4be]">Email</span>
                  <span className="text-right text-ink dark:text-[#f3f0e8] break-all">
                    {PRESET.email}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-graphite dark:text-[#b0b4be]">Password</span>
                  <span className="text-right font-medium text-ink dark:text-[#f3f0e8]">
                    {PRESET.password}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setEmail(PRESET.email);
                  setPassword(PRESET.password);
                  toast("Concierge details filled in — press Sign In.", "info");
                }}
                className="mt-5 w-full border border-gold/60 py-3 text-[10px] tracking-[0.3em] uppercase text-gold-deep dark:text-gold hover:bg-gold hover:text-ink transition-colors"
              >
                Use Concierge Details
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
