"use client";

import { useEffect, useState } from "react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function Stat({ value, suffix = "", label, duration = 1400 }: StatProps) {
  // Initialize with target value for SSR / SEO / no-JS,
  // then animate smoothly from 0 to target on client mount immediately.
  const [count, setCount] = useState<number>(value);

  useEffect(() => {
    let frameId: number;
    const startTime = performance.now();

    // Start counter immediately upon mount without any IntersectionObserver
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth ease-out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    // Begin count animation directly
    frameId = requestAnimationFrame(step);

    // Guaranteed fallback: ensure target value is set after duration
    const timeoutId = setTimeout(() => {
      setCount(value);
    }, duration + 100);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [value, duration]);

  return (
    <div className="text-center group transition-transform duration-500 hover:-translate-y-1">
      <div className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink leading-none mb-4 tracking-tight tabular-nums select-none">
        <span>{count}</span>
        <span className="text-gold-deep">{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-graphite font-medium">
        {label}
      </div>
    </div>
  );
}

export function HeritageStats() {
  return (
    <section
      id="heritage"
      className="py-24 md:py-32 border-y border-gold/20 bg-cream-warm relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep mb-4 font-medium">
            Heritage
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-ink leading-tight max-w-3xl mx-auto">
            A legacy measured in <em className="text-gold-deep italic">decades,</em>
            <br />
            not seasons.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
          <Stat value={1934} label="Founded" />
          <Stat value={90} suffix="+" label="Years of Craft" />
          <Stat value={1} label="Mayfair Address" />
          <Stat value={12} label="Collections" />
          <Stat value={58} label="Pieces in Catalogue" />
        </div>
      </div>
    </section>
  );
}
