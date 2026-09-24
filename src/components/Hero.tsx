"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Staggered reveal for headline, description and buttons
    const els = [headingRef.current, subRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(25px)";
      setTimeout(() => {
        el.style.transition =
          "opacity 1.2s cubic-bezier(0.19,1,0.22,1), transform 1.2s cubic-bezier(0.19,1,0.22,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 150 + i * 180);
    });

    // Background video plays exactly once on load (silent), then holds its final frame forever
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is restricted, the poster image simply holds as a still frame
        });
      }
    }
  }, []);

  // Holds the last frame permanently — no replay, no loop, no UI control
  const holdFinalFrame = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0d0f14]"
    >
      {/* Background Cinematic Video: Luxury Menswear Tailoring (plays once, then holds its final frame) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={holdFinalFrame}
          poster="/hero-menswear-poster.jpg"
          className="w-full h-full object-cover object-[center_35%] scale-100 brightness-[0.98] contrast-[1.05]"
        >
          {/* Real MP4 Video Source: ~4.7s Cinematic Luxury Menswear */}
          <source src="/hero-menswear.mp4" type="video/mp4" />
          <source src="/thomas-shelby-office.mp4" type="video/mp4" />

          {/* Final-Frame Poster Image as Fallback for Mobile / Disabled Autoplay */}
          <img
            src="/hero-menswear-poster.jpg"
            alt="Tailoring for a Life Well Lived - Hartwell & Co."
            className="w-full h-full object-cover object-[center_35%]"
          />
        </video>

        {/* Transparent Dark Overlay Layer keeping White Text & Golden Buttons Crystal Clear */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/45 to-black/80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fbf9f5] dark:from-[#0e1014] via-[#fbf9f5]/25 dark:via-[#0e1014]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Luxury Geometric Corner Art — High-End British Bespoke Hallmark */}
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-56 sm:h-56 pointer-events-none z-10 opacity-70 sm:opacity-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="0,0 95,0 0,95" fill="#121418" />
          <line x1="0" y1="95" x2="95" y2="0" stroke="#c9a961" strokeWidth="2.5" />
          <line x1="0" y1="110" x2="110" y2="0" stroke="#c9a961" strokeWidth="1" opacity="0.6" />
          <circle cx="0" cy="0" r="140" fill="none" stroke="#c9a961" strokeWidth="0.8" opacity="0.35" />
          <circle cx="0" cy="0" r="175" fill="none" stroke="#c9a961" strokeWidth="0.6" opacity="0.25" />
          <circle cx="16" cy="40" r="2" fill="#c9a961" />
          <circle cx="16" cy="52" r="2" fill="#c9a961" />
          <circle cx="16" cy="64" r="2" fill="#c9a961" />
        </svg>
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-28 h-28 sm:w-52 sm:h-52 pointer-events-none z-10 opacity-60 sm:opacity-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="200" cy="0" r="100" fill="none" stroke="#c9a961" strokeWidth="0.8" opacity="0.35" />
          <circle cx="200" cy="0" r="140" fill="none" stroke="#c9a961" strokeWidth="0.6" opacity="0.25" />
        </svg>
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-52 sm:h-52 pointer-events-none z-10 opacity-60 sm:opacity-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="0" cy="200" r="110" fill="none" stroke="#c9a961" strokeWidth="0.8" opacity="0.35" />
          <circle cx="0" cy="200" r="150" fill="none" stroke="#c9a961" strokeWidth="0.6" opacity="0.25" />
        </svg>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-56 sm:h-56 pointer-events-none z-10 opacity-70 sm:opacity-90">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="200,200 105,200 200,105" fill="#121418" />
          <line x1="200" y1="105" x2="105" y2="200" stroke="#c9a961" strokeWidth="2.5" />
          <line x1="200" y1="90" x2="90" y2="200" stroke="#c9a961" strokeWidth="1" opacity="0.6" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#c9a961" strokeWidth="0.8" opacity="0.35" />
          <circle cx="200" cy="200" r="175" fill="none" stroke="#c9a961" strokeWidth="0.6" opacity="0.25" />
          <circle cx="184" cy="160" r="2" fill="#c9a961" />
          <circle cx="184" cy="148" r="2" fill="#c9a961" />
          <circle cx="184" cy="136" r="2" fill="#c9a961" />
        </svg>
      </div>

      {/* Perfectly Centered Content: Badge, Headline, Description & Two House Buttons Only */}
      <div className="relative z-20 min-h-[100svh] flex items-center justify-center text-center">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 py-28 sm:py-36">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">

            {/* Pill Tag Badge: — MAYFAIR · LONDON · EST. 1934 — */}
            <div
              className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full border border-white/35 bg-black/45 backdrop-blur-sm shadow-md"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                animation: "fadeUp 1s 0.2s ease forwards",
              }}
            >
              <span className="w-6 sm:w-8 h-[1.5px] bg-white/70" />
              <span className="text-[9.5px] sm:text-[11px] tracking-[0.4em] uppercase text-white font-semibold">
                MAYFAIR &middot; LONDON &middot; EST. 1934
              </span>
              <span className="w-6 sm:w-8 h-[1.5px] bg-white/70" />
            </div>

            {/* High-Impact Headline */}
            <h1
              ref={headingRef}
              className="font-serif text-[42px] xs:text-[52px] sm:text-[72px] md:text-[90px] leading-[0.98] tracking-tight mb-5 sm:mb-7 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              Tailoring for a
              <br />
              <span className="italic font-light">Life Well Lived.</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subRef}
              className="text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed text-[#f3f0e8] max-w-xl mx-auto mb-8 sm:mb-11 font-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
            >
              Modern British menswear, crafted with uncompromising heritage and worn
              with quiet authority. Bespoke three-piece suits, overcoats, and timeless tailoring.
            </p>

            {/* The Two House Invitation Buttons in Light Gold */}
            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a href="#products" className="btn-gold shadow-2xl">
                Shop the Collection
                <ArrowIcon />
              </a>
              <a
                href="#heritage"
                className="btn-outline !text-white !border-white/80 hover:!bg-white hover:!text-ink backdrop-blur-sm shadow-xl"
              >
                Discover the House
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 z-20 pointer-events-none">
        <span className="text-[8px] sm:text-[9px] tracking-[0.4em] uppercase font-semibold">Scroll</span>
        <div className="w-px h-7 sm:h-9 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      {/* Floating Rotating Mayfair Badge */}
      <div className="absolute top-24 right-6 sm:top-28 sm:right-12 z-20 hidden lg:block pointer-events-none">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text fill="#c9a961" fontSize="9" letterSpacing="3" fontFamily="Inter, sans-serif" fontWeight="600">
              <textPath href="#circlePath">
                BESPOKE · MAYFAIR · LONDON · EST. 1934 ·
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-gold rounded-full pulse-gold" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
