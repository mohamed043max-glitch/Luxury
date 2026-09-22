import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { Header, Footer, ToastViewport } from "@/components/chrome";
import { CartDrawer, SearchOverlay } from "@/components/drawers";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hartwell & Co. — British Tailoring, Mayfair, London",
  description:
    "Modern British menswear, crafted with heritage and worn with confidence. Suits, shirts, outerwear, leather goods, evening wear and the weekend edit — from No. 1 Mayfair since 1934.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <ToastViewport />
        </StoreProvider>
      </body>
    </html>
  );
}
