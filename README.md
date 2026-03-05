# Ecoyaan Checkout Flow

A clean, minimal checkout flow for Ecoyaan — an eco-friendly product platform. Built with Next.js 14 App Router, Tailwind CSS, and React Context API.

---

## Features

- **3-step checkout flow** — Cart → Shipping Address → Payment → Success
- **Server-Side Rendering (SSR)** — Cart data is fetched at request time via a Next.js API route + Server Component (`no-store` cache directive)
- **Context API** for cross-step state (cart data, shipping address, order ID)
- **Form validation** — inline errors on blur, full validation on submit
- **Responsive** — mobile-first design, works on all screen sizes
- **Animated** — subtle fade-up transitions, smooth success screen reveal

---

## Architecture

```
ecoyaan-checkout/
├── app/
│   ├── layout.js              # Root layout — loads fonts, wraps with CheckoutProvider
│   ├── page.js                # Step 1: Cart (Server Component — SSR fetch)
│   ├── checkout/page.js       # Step 2: Shipping Address (Client Component)
│   ├── payment/page.js        # Step 3: Payment + Order Review (Client Component)
│   ├── success/page.js        # Order Success screen
│   └── api/cart/route.js      # Mock API route returning cart JSON
├── components/
│   ├── Header.js              # Site header
│   ├── StepIndicator.js       # 3-step progress indicator
│   ├── CartItem.js            # Individual cart product row
│   ├── CartHydrator.js        # Bridges SSR cart data → client context
│   └── OrderSummary.js        # Reusable price breakdown sidebar
└── context/
    └── CheckoutContext.js     # Global state: cart, address, orderId
```

### Key architectural decisions

**SSR approach**: `app/page.js` is a Next.js Server Component that calls the local `/api/cart` endpoint with `cache: 'no-store'`, ensuring data is fetched fresh on every request — this is the App Router equivalent of `getServerSideProps`. The fetched data is passed to `CartHydrator`, a thin client component that seeds the client-side Context store.

**State management**: React Context API (via `CheckoutContext`) holds the shared state: cart data, shipping address, and generated order ID. This persists across all three route changes without prop drilling or heavy libraries — appropriate for the scope of this flow.

**Form validation**: Validation runs on blur (per field) and on submit (all fields). Errors are stored in local component state, keeping validation logic close to the form without external libraries.

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Steps

```bash
# 1. Clone or download the repo
git clone <your-repo-url>
cd ecoyaan-checkout

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

### Building for production

```bash
npm run build
npm start
```

---

## Deployment

The app is deployed on Vercel. The only environment variable required is none — all data is mocked locally via API routes.

To deploy your own:
```bash
npx vercel
```

---

## Design choices

- **Fonts**: Fraunces (display serif) + Plus Jakarta Sans (body) — warm, characterful without being corporate
- **Colors**: Earthy cream background, forest green CTAs, warm amber accents — fits the eco-brand identity
- **No external UI libraries** — custom components built with Tailwind utility classes only
- **Micro-interactions**: Fade-up animations staggered by component, hover states on all interactive elements

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| State | React Context API |
| Fonts | Google Fonts via `next/font` |
| Deployment | Vercel |
