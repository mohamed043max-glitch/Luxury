"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

export function Header() {
  const {
    cartCount,
    user,
    openCart,
    openMenu,
    menuOpen,
    closeMenu,
    openAuth,
    openTracking,
    logout,
    theme,
    toggleTheme,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when navigation drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 dark:bg-[#0e1014]/95 backdrop-blur-md border-b border-gold/30 shadow-md py-2.5 sm:py-3.5"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3 sm:py-5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-10">
          {/* Strict 3-Column Flexbox Layout: Zero overlap, perfectly centered, accessible */}
          <div className="flex items-center justify-between gap-1 sm:gap-4 w-full">
            
            {/* 1. Left Zone: Menu Button */}
            <div className="flex items-center justify-start w-16 sm:w-28 md:w-36 flex-shrink-0">
              <button
                type="button"
                onClick={openMenu}
                className="group flex items-center gap-2 p-2 -ml-1 rounded-lg text-ink dark:text-[#f3f0e8] hover:text-gold transition-colors cursor-pointer select-none touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold active:scale-95"
                aria-label="Open navigation menu"
              >
                <div className="flex flex-col gap-[4.5px] w-5 sm:w-6">
                  <span className="h-[2px] bg-current w-full transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="h-[2px] bg-current w-4/5 transition-all duration-300 group-hover:w-full" />
                  <span className="h-[2px] bg-current w-3/5 transition-all duration-300 group-hover:w-full" />
                </div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold text-ink dark:text-[#f3f0e8]">
                  Menu
                </span>
              </button>
            </div>

            {/* 2. Center Zone: Brand Identity (HARTWELL & CO. · EST. 1934) */}
            <a
              href="#top"
              className="flex flex-col items-center justify-center flex-1 min-w-0 text-center px-1 select-none group"
              aria-label="Hartwell & Co. — Home"
            >
              <span className="font-serif text-[18px] xs:text-[21px] sm:text-[26px] md:text-[30px] leading-tight tracking-[0.08em] sm:tracking-[0.12em] text-ink dark:text-[#fbf9f5] font-normal truncate max-w-full drop-shadow-sm group-hover:text-gold transition-colors">
                HARTWELL
              </span>
              <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.55em] text-gold-deep dark:text-gold uppercase font-semibold truncate mt-0.5">
                &amp; CO. &middot; EST. 1934
              </span>
            </a>

            {/* 3. Right Zone: Exact High-Contrast Dark Mode Pill Button + Cart */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 w-auto sm:w-28 md:w-36 flex-shrink-0">
              
              {/* High-Contrast Luxury Dark / Light Mode Pill Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={theme === "dark" ? "التبديل للوضع النهاري" : "التبديل للوضع الليلي"}
                className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-300 cursor-pointer select-none touch-manipulation active:scale-95 shadow-md ${
                  theme === "dark"
                    ? "bg-[#c9a961] text-[#121418] border-[#c9a961] hover:bg-[#d9c089]"
                    : "bg-[#121418] text-[#c9a961] border-[#c9a961] hover:bg-black"
                }`}
              >
                {theme === "dark" ? (
                  <>
                    {/* Sun Icon for Light mode */}
                    <svg
                      width="15"
                      height="15"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#121418] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M12 20v2" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="m4.93 4.93 1.41 1.41" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="m17.66 17.66 1.41 1.41" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M2 12h2" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M20 12h2" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="m6.34 17.66-1.41 1.41" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="m19.07 4.93-1.41 1.41" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[9px] sm:text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#121418]">
                      Light
                    </span>
                  </>
                ) : (
                  <>
                    {/* Golden Crescent Moon Icon */}
                    <svg
                      width="15"
                      height="15"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9a961] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                    </svg>
                    <span className="text-[9px] sm:text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#c9a961]">
                      Dark
                    </span>
                  </>
                )}
              </button>

              {/* Shopping Bag Button with Badge */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-ink dark:text-[#f3f0e8] hover:text-gold transition-colors cursor-pointer select-none touch-manipulation active:scale-90 rounded-lg"
                aria-label="Shopping bag"
              >
                <BagIcon />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-gold text-ink text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Full-screen navigation drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <nav
          className={`absolute top-0 left-0 bottom-0 w-full sm:w-[480px] bg-cream dark:bg-[#14171d] text-ink dark:text-[#f3f0e8] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-2xl ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 sm:p-10 min-h-full flex flex-col justify-between">
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-gold/25">
                <div>
                  <div className="font-serif text-2xl text-ink dark:text-[#fbf9f5]">HARTWELL</div>
                  <div className="text-[9px] tracking-[0.55em] text-gold-deep dark:text-gold mt-1 font-semibold">
                    &amp; CO. &middot; EST. 1934
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-ink dark:text-[#f3f0e8] hover:bg-gold hover:text-ink transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Navigation sections */}
              <div className="space-y-7">
                <MenuSection title="The House">
                  <MenuItem onClick={() => scrollTo("heritage")}>Our Heritage</MenuItem>
                  <MenuItem onClick={() => scrollTo("collections")}>The Collections</MenuItem>
                  <MenuItem onClick={() => scrollTo("atelier")}>The Atelier</MenuItem>
                </MenuSection>

                <MenuSection title="The Wardrobe">
                  <MenuItem onClick={() => scrollTo("products")}>All Pieces</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-tailoring")}>Tailoring</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-shirts")}>Shirts</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-outerwear")}>Outerwear</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-knitwear")}>Knitwear</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-evening-wear")}>Evening Wear</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-weekend-edit")}>Weekend Edit</MenuItem>
                </MenuSection>

                <MenuSection title="Accessories & Lifestyle">
                  <MenuItem onClick={() => scrollTo("category-row-leather-goods")}>Leather Goods</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-accessories")}>Accessories</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-horology")}>Horology</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-fragrance")}>Fragrance</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-grooming")}>Grooming</MenuItem>
                  <MenuItem onClick={() => scrollTo("category-row-travel")}>Travel</MenuItem>
                </MenuSection>

                <MenuSection title="Client Services">
                  <MenuItem onClick={() => openTracking()}>Track Your Order</MenuItem>
                  <MenuItem onClick={closeMenu}>Bespoke Commissions</MenuItem>
                  <MenuItem onClick={closeMenu}>Private Appointments</MenuItem>
                </MenuSection>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="pt-6 mt-8 border-t border-gold/25 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase text-graphite dark:text-gray-400 font-medium">
                  Appearance
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="text-xs tracking-[0.15em] uppercase font-bold text-gold flex items-center gap-1.5 cursor-pointer hover:underline"
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>

              {!user ? (
                <div className="flex gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      openAuth("login");
                    }}
                    className="text-xs tracking-[0.2em] uppercase text-ink dark:text-[#f3f0e8] hover:text-gold transition-colors font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                  <span className="text-gold">&middot;</span>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      openAuth("signup");
                    }}
                    className="text-xs tracking-[0.2em] uppercase text-ink dark:text-[#f3f0e8] hover:text-gold transition-colors font-semibold cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>
              ) : (
                <div className="pt-1">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-graphite dark:text-gray-400">
                    Signed in as
                  </div>
                  <div className="font-serif text-lg text-ink dark:text-[#f3f0e8]">{user.name}</div>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="text-xs tracking-[0.2em] uppercase text-gold hover:underline transition-colors mt-1 block cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              <div className="text-[10px] tracking-[0.2em] uppercase text-graphite/70 dark:text-gray-500 pt-2">
                12 Savile Row &middot; Mayfair &middot; London W1S
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold-deep dark:text-gold mb-2.5 font-medium">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block font-serif text-xl sm:text-2xl text-ink dark:text-[#f3f0e8] hover:text-gold dark:hover:text-gold hover:translate-x-1.5 transition-all duration-200 text-left cursor-pointer"
    >
      {children}
    </button>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
