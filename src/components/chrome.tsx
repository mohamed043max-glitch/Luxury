"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./store";
import { ThemeToggle } from "./theme-toggle";
import {
  IconMenu,
  IconClose,
  IconSearch,
  IconUser,
  IconBag,
  IconArrowRight,
  IconCheck,
  HouseSeal,
} from "./icons";
import { CATEGORIES } from "@/lib/products";
import { cx } from "@/lib/utils";

const NAV = [
  { label: "The Collection", href: "/collection" },
  ...CATEGORIES.map((c) => ({
    label: c,
    href: `/collection?category=${encodeURIComponent(c)}`,
  })),
  { label: "The House", href: "/about" },
  { label: "Order Tracking", href: "/orders" },
];

export function Header() {
  const {
    cartCount,
    setCartOpen,
    menuOpen,
    setMenuOpen,
    setSearchOpen,
    user,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* Announcement */}
        <div className="bg-charcoal text-alabaster/80">
          <p className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-4 text-[10px] uppercase tracking-[0.3em]">
            <span className="hidden sm:inline">
              Complimentary delivery on orders over £750
            </span>
            <span className="hidden h-3 w-px bg-alabaster/30 sm:block" />
            <span>By appointment · No. 1 Mayfair, London</span>
          </p>
        </div>

        {/* Main bar */}
        <div
          className={cx(
            "border-b transition-all duration-500",
            scrolled
              ? "border-line bg-cream/95 shadow-[0_10px_40px_-18px_rgba(20,22,27,0.25)] backdrop-blur-md"
              : "border-line/60 bg-cream/85 backdrop-blur-sm"
          )}
        >
          <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
            {/* Left — menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 py-3 text-ink"
              aria-label="Open menu"
            >
              <IconMenu className="h-6 w-6" />
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.35em] transition-colors group-hover:text-gold-deep sm:block">
                Menu
              </span>
            </button>

            {/* Centre — brand */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-center"
            >
              <span className="font-display text-2xl font-semibold tracking-[0.18em] text-ink sm:text-[27px]">
                HARTWELL <span className="text-gold-deep">&amp;</span> CO.
              </span>
            </Link>

            {/* Right — utilities */}
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-ink transition-colors hover:text-gold-deep"
                aria-label="Search the collection"
              >
                <IconSearch className="h-[21px] w-[21px]" />
              </button>
              <Link
                href="/account"
                className="p-2.5 text-ink transition-colors hover:text-gold-deep"
                aria-label="Client account"
              >
                <IconUser className="h-[21px] w-[21px]" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-ink transition-colors hover:text-gold-deep"
                aria-label="Open your selection"
              >
                <IconBag className="h-[21px] w-[21px]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-charcoal"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Desktop subnav */}
          <nav className="hidden justify-center gap-8 border-t border-line/70 pb-3 pt-2.5 lg:flex">
            {NAV.slice(0, 8).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cx(
                  "relative text-[11px] uppercase tracking-[0.28em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100",
                  item.label === "The Collection"
                    ? "font-medium text-ink"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/account"
                className="text-[11px] uppercase tracking-[0.28em] text-gold-deep hover:text-gold"
              >
                {user.name.split(" ")[0]}
              </Link>
            )}
          </nav>
        </div>
      </header>

      <MenuOverlay />
    </>
  );
}

function MenuOverlay() {
  const { menuOpen, setMenuOpen, setCartOpen, setSearchOpen } = useStore();
  const close = () => setMenuOpen(false);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex flex-col bg-cream lg:flex-row"
        >
          <div className="absolute right-5 top-5 z-10 flex items-center gap-1 sm:right-8 sm:top-7">
            <ThemeToggle />
            <button
              onClick={() => {
                close();
                setSearchOpen(true);
              }}
              className="p-3 text-ink hover:text-gold-deep"
              aria-label="Search"
            >
              <IconSearch className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                close();
                setCartOpen(true);
              }}
              className="p-3 text-ink hover:text-gold-deep"
              aria-label="Cart"
            >
              <IconBag className="h-5 w-5" />
            </button>
            <button
              onClick={close}
              className="p-3 text-ink hover:text-gold-deep"
              aria-label="Close menu"
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-col justify-center px-8 pt-20 sm:px-14 lg:px-24">
            {NAV.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className={cx(
                    "group inline-flex items-baseline gap-4 py-1.5 font-display text-4xl leading-tight text-ink transition-colors hover:text-gold-deep sm:text-5xl lg:text-6xl",
                    item.label === "The House" ||
                      item.label === "Order Tracking"
                      ? "mt-6 text-2xl italic text-ink-soft sm:text-3xl"
                      : ""
                  )}
                >
                  <span className="font-sans text-[10px] tracking-[0.35em] text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="hidden w-[34%] flex-col justify-between border-t border-line bg-cream-deep p-12 lg:flex lg:border-l lg:border-t-0"
          >
            <div className="space-y-10">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-gold-deep">
                  The Atelier
                </p>
                <p className="font-display text-2xl leading-snug text-ink">
                  No. 1 Mayfair, London
                  <br />
                  W1K 2QT
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Monday – Saturday, 10:00 – 18:00
                  <br />
                  Fittings by appointment
                </p>
              </div>
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-gold-deep">
                  Client Concierge
                </p>
                <p className="text-sm text-ink-soft">
                  support@hartwell-luxury.com
                  <br />
                  +44 (0)20 7946 0934
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gold-deep">
              <HouseSeal className="h-14 w-14" />
              <p className="font-display text-lg italic text-ink-soft">
                Est. 1934 · Made in England
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    notify("Welcome to the House. Your first letter is on its way.");
    setEmail("");
  };

  return (
    <footer className="bg-charcoal text-alabaster">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-3xl font-semibold tracking-[0.15em]">
            HARTWELL <span className="text-gold">&amp;</span> CO.
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-alabaster/60">
            British tailors and makers of considered clothing. One address in
            Mayfair, one standard of craft, since 1934.
          </p>
          <div className="mt-8 flex items-center gap-4 text-gold/80">
            <HouseSeal className="h-12 w-12" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-alabaster/50">
              No. 1 Mayfair · London
              <br />
              W1K 2QT
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-gold">
            Shop
          </p>
          <ul className="space-y-3 text-sm text-alabaster/65">
            <li>
              <Link href="/collection" className="transition-colors hover:text-gold">
                The Collection
              </Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  href={`/collection?category=${encodeURIComponent(c)}`}
                  className="transition-colors hover:text-gold"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-gold">
            The House
          </p>
          <ul className="space-y-3 text-sm text-alabaster/65">
            <li>
              <Link href="/about" className="transition-colors hover:text-gold">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/orders" className="transition-colors hover:text-gold">
                Order Tracking
              </Link>
            </li>
            <li>
              <Link href="/account" className="transition-colors hover:text-gold">
                Client Account
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="transition-colors hover:text-gold">
                Your Selection
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-gold">
            The Letters
          </p>
          <p className="mb-5 text-sm leading-relaxed text-alabaster/60">
            Six letters a year on cloth, craft and the seasons. Never more.
          </p>
          <form onSubmit={subscribe} className="flex border-b border-alabaster/30 focus-within:border-gold">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-transparent py-3 text-sm text-alabaster placeholder:text-alabaster/35 focus:outline-none"
            />
            <button
              type="submit"
              className="group flex items-center gap-2 px-2 text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              Join
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-alabaster/35">
            +44 (0)20 7946 0934 · support@hartwell-luxury.com
          </p>
        </div>
      </div>
      <div className="border-t border-alabaster/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-[10px] uppercase tracking-[0.25em] text-alabaster/35 sm:flex-row">
          <p>© 1934 – 2026 Hartwell &amp; Co. All rights reserved.</p>
          <p>Tailored in England · Worn everywhere</p>
        </div>
      </div>
    </footer>
  );
}

export function ToastViewport() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 border border-gold/40 bg-charcoal/95 px-5 py-3 text-xs tracking-wide text-alabaster shadow-2xl backdrop-blur"
          >
            <IconCheck className="h-4 w-4 text-gold" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
