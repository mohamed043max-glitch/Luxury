import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
          <Providers> is a Client Component that mounts <StoreProvider> plus the
          site chrome (header, footer, cart drawer, modals, toasts).
          Placing it here in the ROOT layout guarantees every route — including
          /account — renders inside StoreProvider, so `useStore()` always works
          during prerendering and on Vercel.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
