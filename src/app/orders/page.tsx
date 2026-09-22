"use client";

import { Suspense } from "react";
import { PageIntro } from "@/components/intro";
import { OrdersClient } from "./orders-client";

export default function OrdersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Client Services"
        title="Every order,"
        titleAccent="on record."
        sub="Track a parcel with your order reference, or — if the house knows you — find every order you've ever placed, kept on the ledger on this device."
        crumb="Order Tracking"
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl px-6 py-20 text-[11px] uppercase tracking-[0.3em] text-mist">
            Consulting the ledger…
          </div>
        }
      >
        <OrdersClient />
      </Suspense>
    </>
  );
}
