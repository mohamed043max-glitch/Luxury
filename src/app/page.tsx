import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeritageStats } from "@/components/HeritageStats";
import { Collections } from "@/components/Collections";
import { Products } from "@/components/Products";
import { Atelier, Marquee, Makers, PriceGuide, Newsletter, Footer } from "@/components/Sections";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { TrackingModal } from "@/components/TrackingModal";
import { Toasts } from "@/components/Toasts";

export default function Home() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-cream text-ink">
        <Header />
        <main>
          <Hero />
          <HeritageStats />
          <Collections />
          <Atelier />
          <Makers />
          <Marquee />
          <PriceGuide />
          <Products />
          <Newsletter />
        </main>
        <Footer />

        {/* Overlays */}
        <CartDrawer />
        <AuthModal />
        <CheckoutModal />
        <TrackingModal />
        <Toasts />
      </div>
    </StoreProvider>
  );
}
