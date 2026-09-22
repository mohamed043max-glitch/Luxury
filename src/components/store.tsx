"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";
import { hashPassword, CONCIERGE_EMAIL, CONCIERGE_PASSWORD } from "@/lib/utils";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

export type SessionUser = { name: string; email: string };
export type Toast = { id: number; message: string };

type StoredAccount = { name: string; hash: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type StoreValue = {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, size: string, qty?: number) => void;
  updateQty: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  user: SessionUser | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  toasts: Toast[];
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — carry on in memory */
  }
}

/** Client-side account ledger, with the house concierge pre-registered. */
function readAccounts(): Record<string, StoredAccount> {
  const base: Record<string, StoredAccount> = {
    [CONCIERGE_EMAIL]: {
      name: "Hartwell Concierge",
      hash: hashPassword(CONCIERGE_PASSWORD),
    },
  };
  return { ...base, ...readLS<Record<string, StoredAccount>>("hw_accounts", {}) };
}

function writeAccounts(accounts: Record<string, StoredAccount>) {
  const { [CONCIERGE_EMAIL]: _preset, ...custom } = accounts;
  writeLS("hw_accounts", custom);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readLS("hw_cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readLS("hw_wishlist", [])
  );
  const [user, setUser] = useState<SessionUser | null>(() =>
    readLS("hw_user", null)
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => writeLS("hw_cart", cart), [cart]);
  useEffect(() => writeLS("hw_wishlist", wishlist), [wishlist]);
  useEffect(() => {
    if (user) writeLS("hw_user", user);
    else window.localStorage.removeItem("hw_user");
  }, [user]);

  const notify = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(
      () => setToasts((t) => t.filter((x) => x.id !== id)),
      3200
    );
  }, []);

  const addToCart = useCallback((product: Product, size: string, qty = 1) => {
    const key = `${product.slug}__${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(9, i.qty + qty) } : i
        );
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.key === key ? { ...i, qty: Math.max(0, Math.min(9, i.qty + delta)) } : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const key = email.trim().toLowerCase();
      if (!EMAIL_RE.test(key)) return "Please provide a valid email address.";
      const account = readAccounts()[key];
      if (!account || account.hash !== hashPassword(password)) {
        return "Those details do not match the house ledger.";
      }
      setUser({ name: account.name, email: key });
      return null;
    },
    []
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const key = email.trim().toLowerCase();
      if (!name.trim()) return "Please tell us your name.";
      if (!EMAIL_RE.test(key)) return "Please provide a valid email address.";
      if (password.length < 8)
        return "Passwords require at least 8 characters.";
      const accounts = readAccounts();
      if (accounts[key]) {
        return "An account already exists at this address. Kindly sign in.";
      }
      accounts[key] = { name: name.trim(), hash: hashPassword(password) };
      writeAccounts(accounts);
      setUser({ name: name.trim(), email: key });
      return null;
    },
    []
  );

  const signOut = useCallback(() => setUser(null), []);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((n, i) => n + i.qty * i.price, 0),
    [cart]
  );

  const value: StoreValue = {
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    cartOpen,
    setCartOpen,
    menuOpen,
    setMenuOpen,
    searchOpen,
    setSearchOpen,
    wishlist,
    toggleWishlist,
    user,
    signIn,
    signUp,
    signOut,
    toasts,
    notify,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
