import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ProductDetailClient } from "./product-client";

/** Every piece is prerendered at build time — no server, no database. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
