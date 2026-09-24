# HARTWELL & CO. — Static Luxury E-commerce

A pure front-end luxury e-commerce showcase for a fictional British menswear house.
**No database, no backend, no environment variables required.**

## 📦 Tech Stack

- **Next.js 16** (App Router)
- **React 19** with Client Components for interactivity
- **Tailwind CSS 4** for styling
- **TypeScript** for type safety
- All cart / wishlist / auth / orders state lives in the browser via `localStorage`

## 🚀 Quick Start (local)

```bash
npm install
npm run dev         # → http://localhost:3000
```

## 🌍 Deploy (pick one)

### Option A — Vercel / Netlify (one click, zero config)

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. **No environment variables** — just click **Deploy**.
4. The platform runs `npm run build` and serves the site.

### Option B — Pure Static Export (HTML/CSS/JS, deploy anywhere)

For a fully static bundle you can upload to **GitHub Pages**, **Cloudflare Pages**, **S3 + CloudFront**, **Nginx**, or any static host:

1. Edit `next.config.ts` and uncomment:
   ```ts
   output: "export",
   ```
2. Delete `src/app/api/health/route.ts` (API routes are not supported in static export).
3. Build:
   ```bash
   npm run build
   ```
4. Upload the `out/` folder to your static host of choice.

```bash
# Preview locally
npx serve out

# Cloudflare Pages
npx wrangler pages deploy out

# GitHub Pages
npx gh-pages -d out

# S3 + CloudFront
aws s3 sync out/ s3://your-bucket --delete
```

## 📊 Catalog Overview (58 products · 12 collections)

| Collection | Pieces | Price range |
|---|---|---|
| Tailoring | 6 | £1,695 – £2,895 |
| Shirts | 6 | £225 – £325 |
| Outerwear | 5 | £795 – £2,595 |
| Knitwear | 4 | £395 – £695 |
| Leather Goods | 6 | £245 – £1,495 |
| Evening Wear | 3 | £425 – £3,195 |
| Accessories | 8 | £45 – £395 |
| **Horology** | 3 | £6,950 – £24,500 |
| **Fragrance** | 4 | £245 – £385 |
| **Grooming** | 3 | £95 – £485 |
| **Travel** | 4 | £245 – £2,295 |
| Weekend Edit | 5 | £195 – £895 |

## 🏛 What's Inside

- **43 products** across **8 collections** with authentic British luxury pricing
- Full shopping cart, wishlist, checkout flow, order tracking (all client-side)
- Login demo credentials: `support@hartwell-luxury.com` / `SecureLuxury1934!`
- Fully responsive mobile / tablet / desktop layouts
- Smooth scroll animations, Ken Burns hero, shimmer gold effects, marquee

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Main page composition
│   └── globals.css      # Luxury theme + animations
├── components/          # UI components (header, hero, products, cart, modals…)
├── data/products.ts     # The 43-product catalog
└── lib/
    ├── store.tsx        # Client-side cart / auth / order state
    └── useReveal.ts     # Scroll animation hooks
```

## 🔐 Demo Credentials

```
Email:    support@hartwell-luxury.com
Password: SecureLuxury1934!
```

These are pre-filled in the login modal. Any email + password ≥ 6 chars also works for demo signups.

## 📜 License

This is a design showcase. All brand names, products and pricing are fictional.
