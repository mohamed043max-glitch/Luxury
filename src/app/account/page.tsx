"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/components/store";
import { PageIntro } from "@/components/intro";
import {
  IconCheck,
  IconArrowRight,
  IconBag,
  IconHeart,
  HouseSeal,
} from "@/components/icons";
import { CONCIERGE_EMAIL, CONCIERGE_PASSWORD } from "@/lib/utils";
import { cx } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AccountPage() {
  const { user, signIn, signUp, signOut, notify, cartCount, wishlist } =
    useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      setError("Kindly complete every field.");
      return;
    }
    setBusy(true);
    try {
      const err =
        mode === "login"
          ? await signIn(email.trim(), password)
          : await signUp(name.trim(), email.trim(), password);
      if (err) setError(err);
      else
        notify(
          mode === "login"
            ? "Welcome back to the House."
            : "Your account has been opened. Welcome."
        );
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <>
        <PageIntro
          eyebrow="Client Account"
          title="Welcome back,"
          titleAccent={`${user.name.split(" ")[0]}.`}
          sub="Your account holds your selection, your wishlist and the record of every order placed with the house."
          crumb="Client Account"
        />
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border border-line bg-cream-deep/60 p-8 sm:p-12"
          >
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-cream">
                <span className="font-display text-3xl text-gold-deep">
                  {user.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">
                  Member of the House
                </p>
                <h2 className="mt-2 font-display text-3xl text-ink">{user.name}</h2>
                <p className="mt-1 text-sm text-ink-soft">{user.email}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Link
                href="/orders"
                className="group border border-line bg-cream p-5 transition-colors hover:border-gold"
              >
                <IconBag className="h-5 w-5 text-gold-deep" />
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-ink">
                  Your Orders
                </p>
                <p className="mt-1 text-xs text-mist">Track every parcel</p>
              </Link>
              <Link
                href="/collection"
                className="group border border-line bg-cream p-5 transition-colors hover:border-gold"
              >
                <IconArrowRight className="h-5 w-5 text-gold-deep" />
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-ink">
                  Continue Shopping
                </p>
                <p className="mt-1 text-xs text-mist">
                  {cartCount} in your selection
                </p>
              </Link>
              <div className="border border-line bg-cream p-5">
                <IconHeart className="h-5 w-5 text-gold-deep" />
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-ink">
                  Wishlist
                </p>
                <p className="mt-1 text-xs text-mist">
                  {wishlist.length} piece{wishlist.length === 1 ? "" : "s"} saved
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                signOut();
                notify("You have been signed out. The door stays open.");
              }}
              className="mt-10 inline-flex items-center gap-3 border border-ink/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:border-gold hover:bg-gold"
            >
              Sign Out
            </button>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Client Account"
        title="The House,"
        titleAccent="by name."
        sub="Sign in to follow your orders, or open an account and let the house remember your sizes."
        crumb="Client Account"
      />
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_320px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="border border-line bg-cream-deep/60 p-8 sm:p-12"
        >
          <div className="mb-9 flex border border-line">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={cx(
                  "flex-1 py-3.5 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300",
                  mode === m
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-6">
            {mode === "register" && (
              <Field
                label="Full Name"
                type="text"
                placeholder="Edward Hartwell"
                value={name}
                onChange={setName}
              />
            )}
            <Field
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={setPassword}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-ink"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-sheen flex w-full items-center justify-center gap-3 bg-gold py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors duration-300 hover:bg-gold-deep disabled:opacity-60"
            >
              {busy
                ? "Consulting the ledger…"
                : mode === "login"
                  ? "Sign In"
                  : "Create My Account"}
              <IconArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <div className="border border-line bg-cream p-7">
            <div className="flex items-center gap-3 text-gold-deep">
              <HouseSeal className="h-10 w-10" />
              <p className="text-[10px] uppercase tracking-[0.3em]">
                Concierge Access
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              For a private tour of the account system, sign in with the
              house concierge account:
            </p>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-mist">Email</dt>
                <dd className="text-right text-ink">{CONCIERGE_EMAIL}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-mist">Password</dt>
                <dd className="text-right font-medium text-ink">
                  {CONCIERGE_PASSWORD}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => {
                setMode("login");
                setEmail(CONCIERGE_EMAIL);
                setPassword(CONCIERGE_PASSWORD);
                setError(null);
                notify("Concierge details entered — simply sign in.");
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 border border-gold/60 py-3 text-[10px] uppercase tracking-[0.3em] text-gold-deep transition-colors hover:bg-gold hover:text-charcoal"
            >
              <IconCheck className="h-3.5 w-3.5" />
              Use Concierge Details
            </button>
          </div>
          <div className="border border-line bg-cream-deep p-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold-deep">
              Why an account
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li className="flex gap-3">
                <span className="mt-[7px] h-px w-4 shrink-0 bg-gold" />
                Your sizes remembered at every fitting
              </li>
              <li className="flex gap-3">
                <span className="mt-[7px] h-px w-4 shrink-0 bg-gold" />
                One place for every order and delivery note
              </li>
              <li className="flex gap-3">
                <span className="mt-[7px] h-px w-4 shrink-0 bg-gold" />
                Your wishlist, kept safe on the house ledger
              </li>
            </ul>
          </div>
        </motion.aside>
      </section>
    </>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
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
