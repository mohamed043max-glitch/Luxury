import { Hero } from "@/components/Hero";
import { HeritageStats } from "@/components/HeritageStats";
import { Collections } from "@/components/Collections";
import { Products } from "@/components/Products";
import {
  Atelier,
  Marquee,
  Makers,
  PriceGuide,
  Newsletter,
} from "@/components/Sections";

/**
 * StoreProvider, Header, Footer and the global overlays now live in
 * `src/app/layout.tsx`, so this page only renders its own sections.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HeritageStats />
      <Collections />
      <Atelier />
      <Makers />
      <Marquee />
      <PriceGuide />
      <Products />
      <Newsletter />
    </>
  );
}
