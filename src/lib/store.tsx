"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  email: string;
  name: string;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
  createdAt: string;
  trackingNumber: string;
}

export interface User {
  email: string;
  name: string;
}

interface Toast {
  id: number;
  message: string;
  kind?: "success" | "info" | "error";
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: User | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  cartOpen: boolean;
  menuOpen: boolean;
  authMode: "login" | "signup" | null;
  checkoutOpen: boolean;
  trackingOpen: boolean;
  toasts: Toast[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openAuth: (mode: "login" | "signup") => void;
  closeAuth: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openTracking: () => void;
  closeTracking: () => void;
  login: (email: string, password: string) => boolean;
  signup: (email: string, name: string, password: string) => boolean;
  logout: () => void;
  placeOrder: (payload: {
    email: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
  }) => Order;
  trackOrder: (email: string, orderId: string) => Order | null;
  toast: (message: string, kind?: Toast["kind"]) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "hartwell.cart";
const WISH_KEY = "hartwell.wishlist";
const ORDERS_KEY = "hartwell.orders";
const USER_KEY = "hartwell.user";
const THEME_KEY = "hartwell.theme";

export const PRESET_USER = {
  email: "support@hartwell-luxury.com",
  password: "SecureLuxury1934!",
  name: "Hartwell Concierge",
};

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(loadJSON<CartItem[]>(CART_KEY, []));
    setWishlist(loadJSON<string[]>(WISH_KEY, []));
    setOrders(loadJSON<Order[]>(ORDERS_KEY, []));
    setUser(loadJSON<User | null>(USER_KEY, null));

    // Theme initialization: check document class & localStorage
    let currentTheme: "light" | "dark" = "light";
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem(THEME_KEY);
      if (savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"))) {
        currentTheme = "dark";
      } else if (savedTheme === "light") {
        currentTheme = "light";
      }
    }
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setHydrated(true);
  }, []);

  const toggleTheme = useCallback(() => {
    if (typeof document !== "undefined") {
      const isDarkNow = document.documentElement.classList.toggle("dark");
      const nextTheme = isDarkNow ? "dark" : "light";
      setTheme(nextTheme);
      try {
        window.localStorage.setItem(THEME_KEY, nextTheme);
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    if (hydrated) saveJSON(CART_KEY, cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(ORDERS_KEY, orders);
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(USER_KEY, user);
  }, [user, hydrated]);

  const toast = useCallback((message: string, kind: Toast["kind"] = "success") => {
    setToasts((prev) => {
      const next = [...prev, { id: Date.now() + Math.random(), message, kind }];
      return next.slice(-3);
    });
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3500);
  }, []);

  const addToCart = useCallback(
    (product: Product, size: string) => {
      setCart((prev) => {
        const idx = prev.findIndex(
          (i) => i.product.id === product.id && i.size === size
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
          return next;
        }
        return [...prev, { product, size, quantity: 1 }];
      });
      toast(`${product.name} added to bag`, "success");
      setCartOpen(true);
    },
    [toast]
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  }, []);

  const updateQty = useCallback(
    (productId: string, size: string, delta: number) => {
      setCart((prev) =>
        prev
          .map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity: Math.max(0, i.quantity + delta) }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        if (has) {
          toast("Removed from wishlist", "info");
          return prev.filter((id) => id !== productId);
        }
        toast("Saved to wishlist", "success");
        return [...prev, productId];
      });
    },
    [toast]
  );

  const login = useCallback(
    (email: string, password: string) => {
      if (
        email.trim().toLowerCase() === PRESET_USER.email.toLowerCase() &&
        password === PRESET_USER.password
      ) {
        setUser({ email: PRESET_USER.email, name: PRESET_USER.name });
        toast(`Welcome back, ${PRESET_USER.name.split(" ")[0]}`, "success");
        setAuthMode(null);
        return true;
      }
      // Accept any password 6+ chars for demo
      if (email && password.length >= 6) {
        setUser({ email, name: email.split("@")[0] });
        toast("Signed in", "success");
        setAuthMode(null);
        return true;
      }
      toast("Invalid credentials", "error");
      return false;
    },
    [toast]
  );

  const signup = useCallback(
    (email: string, name: string, password: string) => {
      if (!email || !name || password.length < 6) {
        toast("Please complete all fields", "error");
        return false;
      }
      setUser({ email, name });
      toast(`Welcome to Hartwell & Co., ${name.split(" ")[0]}`, "success");
      setAuthMode(null);
      return true;
    },
    [toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    toast("You have been signed out", "info");
  }, [toast]);

  const placeOrder = useCallback(
    (payload: {
      email: string;
      name: string;
      address: string;
      city: string;
      postcode: string;
    }) => {
      const total = cart.reduce(
        (s, i) => s + i.product.price * i.quantity,
        0
      );
      const order: Order = {
        id: `HC-${Date.now().toString(36).toUpperCase()}`,
        items: cart,
        total,
        email: payload.email,
        name: payload.name,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        trackingNumber: `GB${Math.floor(Math.random() * 9000000 + 1000000)}HRT`,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      toast(`Order ${order.id} placed — confirmation sent to ${payload.email}`, "success");
      return order;
    },
    [cart, toast]
  );

  const trackOrder = useCallback(
    (email: string, orderId: string) => {
      return (
        orders.find(
          (o) =>
            o.id.toLowerCase() === orderId.trim().toLowerCase() &&
            o.email.toLowerCase() === email.trim().toLowerCase()
        ) || null
      );
    },
    [orders]
  );

  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((s, i) => s + i.quantity, 0),
    [cart]
  );

  const value: StoreContextValue = {
    cart,
    wishlist,
    orders,
    user,
    theme,
    toggleTheme,
    cartOpen,
    menuOpen,
    authMode,
    checkoutOpen,
    trackingOpen,
    toasts,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openMenu: () => setMenuOpen(true),
    closeMenu: () => setMenuOpen(false),
    openAuth: (m) => setAuthMode(m),
    closeAuth: () => setAuthMode(null),
    openCheckout: () => setCheckoutOpen(true),
    closeCheckout: () => setCheckoutOpen(false),
    openTracking: () => setTrackingOpen(true),
    closeTracking: () => setTrackingOpen(false),
    login,
    signup,
    logout,
    placeOrder,
    trackOrder,
    toast,
    cartTotal,
    cartCount,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
