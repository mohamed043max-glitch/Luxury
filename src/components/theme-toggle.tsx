"use client";

import { useCallback, useEffect, useState } from "react";
import { IconSun, IconMoon } from "./icons";
import { cx } from "@/lib/utils";

const STORAGE_KEY = "hw-theme";
const THEME_EVENT = "hw-theme-change";

function isDarkNow(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/**
 * Blocking init script — runs during HTML parse, before first paint,
 * so the saved theme applies with zero flash on reload.
 */
export function ThemeInitScript() {
  const js = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

/**
 * Large, high-contrast dark/light toggle built for low-vision users:
 * 48px target, 2px gold ring, solid filled icons, pressed state,
 * tooltip + full ARIA labelling. Every instance stays in sync.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDarkNow());
    const sync = () => setDark(isDarkNow());
    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* private mode — theme still applies for this visit */
    }
    setDark(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cx(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold-deep bg-gold/10 text-ink shadow-sm transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold sm:h-12 sm:w-12 dark:border-gold dark:bg-gold/15",
        className
      )}
    >
      {dark ? (
        <IconSun className="h-6 w-6 sm:h-7 sm:w-7" />
      ) : (
        <IconMoon className="h-6 w-6 sm:h-7 sm:w-7" />
      )}
    </button>
  );
}
