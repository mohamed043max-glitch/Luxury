"use client";

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not available or disabled, immediately show
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    io.observe(el);

    // Safety fallback: reveal after 1.5s regardless
    const timer = setTimeout(() => {
      el.classList.add("is-visible");
    }, 1500);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return ref;
}
