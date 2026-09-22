import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from "./utils";

export type OrderLine = {
  slug: string;
  name: string;
  image: string;
  size: string;
  qty: number;
  price: number;
};

export type LocalOrder = {
  orderNumber: string;
  email: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  note: string | null;
  items: OrderLine[];
  subtotal: number;
  delivery: number;
  total: number;
  status: string;
  createdAt: string;
};

const KEY = "hw_orders";

function readAll(): LocalOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as LocalOrder[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(orders: LocalOrder[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(orders));
}

function makeOrderNumber(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(10000 + Math.random() * 89999);
  return `HW-${year}-${n}`;
}

export function saveOrder(
  data: {
    name: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    note: string | null;
  },
  lines: OrderLine[]
): LocalOrder {
  const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const order: LocalOrder = {
    orderNumber: makeOrderNumber(),
    email: data.email.trim().toLowerCase(),
    name: data.name,
    address: data.address,
    city: data.city,
    postcode: data.postcode,
    country: data.country,
    note: data.note,
    items: lines,
    subtotal,
    delivery,
    total: subtotal + delivery,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.push(order);
  writeAll(all);
  return order;
}

export function findOrder(email: string, number: string): LocalOrder | null {
  const e = email.trim().toLowerCase();
  const n = number.trim().toUpperCase();
  return (
    readAll().find(
      (o) => o.email === e && o.orderNumber === n
    ) ?? null
  );
}

export function ordersFor(email: string): LocalOrder[] {
  const e = email.trim().toLowerCase();
  return readAll()
    .filter((o) => o.email === e)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
