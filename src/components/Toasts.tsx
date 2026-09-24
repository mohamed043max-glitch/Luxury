"use client";

import { useStore } from "@/lib/store";

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 right-6 z-[60] space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-ink text-cream px-5 py-3 shadow-2xl flex items-center gap-3 min-w-[260px] animate-[slideIn_0.4s_cubic-bezier(0.19,1,0.22,1)]"
        >
          <div
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              t.kind === "error"
                ? "bg-red-400"
                : t.kind === "info"
                ? "bg-gold-light"
                : "bg-gold"
            }`}
          />
          <span className="text-xs tracking-[0.15em] uppercase font-light">
            {t.message}
          </span>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
