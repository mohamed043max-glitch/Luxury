"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

interface Collection {
  title: string;
  subtitle: string;
  image: string;
  count: string;
}

const COLLECTIONS: Collection[] = [
  {
    title: "Tailoring",
    subtitle: "The Foundation",
    image: "/collection-tailoring.jpg",
    count: "06 Pieces",
  },
  {
    title: "Shirts",
    subtitle: "The Daily Ritual",
    image: "/collection-shirts.jpg",
    count: "06 Pieces",
  },
  {
    title: "Outerwear",
    subtitle: "Against the Elements",
    image: "/collection-outerwear.jpg",
    count: "05 Pieces",
  },
  {
    title: "Knitwear",
    subtitle: "Quiet Warmth",
    image:
      "https://images.pexels.com/photos/30263571/pexels-photo-30263571.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "04 Pieces",
  },
  {
    title: "Leather Goods",
    subtitle: "The Finishing Touch",
    image: "/collection-leather.jpg",
    count: "06 Pieces",
  },
  {
    title: "Evening Wear",
    subtitle: "After Hours",
    image: "/collection-evening.jpg",
    count: "03 Pieces",
  },
  {
    title: "Accessories",
    subtitle: "The Details",
    image:
      "https://images.pexels.com/photos/13273980/pexels-photo-13273980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "08 Pieces",
  },
  {
    title: "Horology",
    subtitle: "Time, Measured",
    image:
      "https://images.pexels.com/photos/13273982/pexels-photo-13273982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "03 Pieces",
  },
  {
    title: "Fragrance",
    subtitle: "The Signature",
    image:
      "https://images.pexels.com/photos/16125025/pexels-photo-16125025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "04 Pieces",
  },
  {
    title: "Grooming",
    subtitle: "The Morning Ritual",
    image:
      "https://images.pexels.com/photos/9230441/pexels-photo-9230441.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "03 Pieces",
  },
  {
    title: "Travel",
    subtitle: "For the Road",
    image:
      "https://images.pexels.com/photos/6601769/pexels-photo-6601769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    count: "04 Pieces",
  },
  {
    title: "Weekend Edit",
    subtitle: "At Leisure",
    image: "/collection-weekend.jpg",
    count: "05 Pieces",
  },
];

export function Collections() {
  const revealRef = useReveal<HTMLElement>();

  const handleCategoryClick = (title: string) => {
    // Dispatch filter event to scroll and highlight the category row smoothly
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hartwell:filter", { detail: { category: title } })
      );
    }
  };

  return (
    <section id="collections" ref={revealRef} className="reveal py-20 sm:py-28 md:py-32 bg-cream">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 md:mb-20 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.5em] uppercase text-gold-deep dark:text-gold mb-3 font-medium">
              <span className="w-8 h-px bg-gold" />
              <span>The Houses &middot; Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink dark:text-[#fbf9f5] leading-tight max-w-2xl">
              Twelve ways to <em className="text-gold-deep dark:text-gold italic">dress well.</em>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-graphite dark:text-[#b0b4be] leading-relaxed font-light">
            Each collection is conceived as an essential chapter in a gentleman&rsquo;s
            wardrobe — crafted in our Mayfair studio and realised by the finest makers.
          </p>
        </div>

        {/* Circular Grid Layout (Organized, Responsive & Fast) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-7 sm:gap-y-9 md:gap-y-12 justify-items-center">
          {COLLECTIONS.map((c) => {
            const rowAnchor = `#category-row-${c.title.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={c.title}
                href={rowAnchor}
                onClick={() => handleCategoryClick(c.title)}
                className="group flex flex-col items-center text-center cursor-pointer select-none transition-transform duration-300 hover:-translate-y-1 w-full max-w-[130px] sm:max-w-[150px]"
                aria-label={`Explore ${c.title} collection`}
              >
                {/* Circular Image Container with Subtle Border and Soft Shadow */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full p-[3px] border border-gold/30 dark:border-gold/40 group-hover:border-gold transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:ring-2 group-hover:ring-gold/25 bg-cream-warm dark:bg-[#151820]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-cream-deep dark:bg-[#101216]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Subtle Luxury Overlay on Hover */}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-gold/15 transition-colors duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Category Title & Piece Count */}
                <span className="font-serif text-xs sm:text-sm md:text-base text-ink dark:text-[#fbf9f5] group-hover:text-gold-deep dark:group-hover:text-gold transition-colors duration-300 font-medium text-center mt-2.5 sm:mt-3 leading-snug">
                  {c.title}
                </span>
                <span className="text-[7.5px] sm:text-[9px] tracking-[0.2em] uppercase text-graphite/70 dark:text-[#b0b4be]/80 group-hover:text-ink dark:group-hover:text-gold transition-colors mt-0.5 font-light">
                  {c.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
