import { CATEGORIES, COLLECTIONS, PRODUCTS } from "@/lib/products";
import {
  Hero,
  Marquee,
  HeritageStats,
  CollectionsGrid,
  AtelierBand,
  Reveal,
  Eyebrow,
} from "@/components/home";
import { ProductRowCarousel } from "@/components/product-row";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

function rowId(prefix: string, category: string) {
  return `${prefix}-row-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <HeritageStats />
      <CollectionsGrid />

      {/* The Edit — one independent scrolling row per collection */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 border-t border-line pt-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>The Edit · Autumn / Winter</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
                Sixty pieces,
                <br />
                <span className="italic text-gold-deep">zero compromises.</span>
              </h2>
            </div>
            <Link
              href="/collection"
              className="group inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold-deep sm:self-end"
            >
              Browse all
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
        <div className="space-y-14 sm:space-y-20">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat}
              className={i > 0 ? "border-t border-line pt-12 sm:pt-16" : ""}
            >
              <ProductRowCarousel
                id={rowId("home", cat)}
                title={cat}
                note={COLLECTIONS.find((c) => c.name === cat)?.line}
                count={PRODUCTS.filter((p) => p.category === cat).length}
                viewAllHref={`/collection?category=${encodeURIComponent(cat)}`}
                viewAllLabel={`Shop ${cat}`}
                products={PRODUCTS.filter((p) => p.category === cat)}
              />
            </div>
          ))}
        </div>
      </section>

      <AtelierBand />

      {/* Closing invitation */}
      <section className="border-t border-line bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-display text-3xl italic leading-snug text-ink-soft sm:text-4xl">
              &ldquo;A man should own three suits, six shirts, one great coat —
              and a tailor he trusts with the rest of his life.&rdquo;
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-gold-deep">
              A. Hartwell, Founder · 1934
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/collection"
                className="btn-sheen group inline-flex items-center justify-center gap-3 bg-gold px-10 py-[18px] text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal transition-colors duration-300 hover:bg-gold-deep"
              >
                Shop the Collection
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 border border-ink/25 px-10 py-[18px] text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-all duration-300 hover:border-gold hover:bg-gold"
              >
                Discover the House
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
