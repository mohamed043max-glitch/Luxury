"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  titleAccent,
  sub,
  crumb,
  crumbHref = "/",
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub?: string;
  crumb: string;
  crumbHref?: string;
}) {
  return (
    <section className="border-b border-line bg-cream-deep">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-40 sm:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold-deep"
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-5xl font-medium leading-[1.05] text-ink sm:text-7xl"
        >
          {title}{" "}
          {titleAccent && <span className="italic text-gold-deep">{titleAccent}</span>}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed text-ink-soft"
          >
            {sub}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mist"
        >
          <Link href={crumbHref} className="transition-colors hover:text-gold-deep">
            The House
          </Link>
          <span className="text-gold">/</span>
          <span className="text-ink-soft">{crumb}</span>
        </motion.p>
      </div>
    </section>
  );
}

export function Children({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
