"use client";

import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { TrackingModal } from "@/components/TrackingModal";
import { Toasts } from "@/components/Toasts";

/**
 * Single client boundary for the whole storefront.
 *
 * Mounted once from the Root Layout (`src/app/layout.tsx`) so it wraps
 * EVERY route in the app — home, /account, /collection, /product, etc.
 *
 * Because this file is a Client Component, `<StoreProvider>` and the
 * consuming client pages/components all live in the same React client tree,
 * which guarantees `useStore()` always resolves the provider — no matter how
 * the tree is prerendered by `next build` or on Vercel.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col bg-cream text-ink dark:bg-[#0e1014] dark:text-[#f3f0e8]">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* Global overlays — all depend on useStore */}
        <CartDrawer />
        <AuthModal />
        <CheckoutModal />
        <TrackingModal />
        <Toasts />
      </div>
    </StoreProvider>
  );
}
