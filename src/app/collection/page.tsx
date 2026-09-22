"use client";

import { Suspense } from "react";
import { PageIntro } from "@/components/intro";
import { CollectionClient } from "./collection-client";

export default function CollectionPage() {
  return (
    <>
      <PageIntro
        eyebrow="The Collection"
        title="Dress well,"
        titleAccent="in every light."
        sub="Sixty pieces, ten in every collection — each one cut, pressed and finished in our Mayfair atelier, and each one made to be repaired, not replaced."
        crumb="The Collection"
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-6 py-20 text-[11px] uppercase tracking-[0.3em] text-mist">
            Consulting the ledger…
          </div>
        }
      >
        <CollectionClient />
      </Suspense>
    </>
  );
}
