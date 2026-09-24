import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { TrackingModal } from "@/components/TrackingModal";
import { Toasts } from "@/components/Toasts";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hartwell & Co. — Bespoke British Menswear",
  description:
    "Established 1934. Modern British menswear, crafted with heritage and worn with confidence. Tailoring, shirting, outerwear and leather goods from our Mayfair atelier.",
  keywords: [
    "bespoke tailoring",
    "British menswear",
    "luxury suits",
    "Mayfair",
    "Hartwell & Co",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('hartwell.theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-cream dark:bg-[#0e1014] text-ink dark:text-[#f3f0e8] antialiased font-sans">
        {/*
          The store is mounted at the ROOT layout so every route — home, account,
          collection, product, checkout — is guaranteed to sit inside StoreProvider.
        */}
        <StoreProvider>
          <div className="min-h-screen bg-cream text-ink dark:bg-[#0e1014] dark:text-[#f3f0e8] flex flex-col">
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />

            {/* Global overlays — all rely on useStore */}
            <CartDrawer />
            <AuthModal />
            <CheckoutModal />
            <TrackingModal />
            <Toasts />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
