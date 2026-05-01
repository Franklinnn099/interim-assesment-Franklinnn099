# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo contains a **Coinbase Clone** frontend (React/Vite) in `Coinbase-clone/` and requires a **Node.js + MongoDB backend** to be built per the `README.md` instructions. The assignment integrates both into a full-stack crypto platform.

## Commands

All commands run from inside `Coinbase-clone/`:

```bash
npm run dev        # Start dev server (Vite, port 5173)
npm run build      # Production build → dist/
npm run lint       # ESLint check
npm run preview    # Preview production build locally
npm run deploy     # Build + deploy to Netlify
```

## Architecture

### Frontend (`Coinbase-clone/src/`)

**Routing** — `App.jsx` defines two layout tiers:
- `MarketingLayout`: wraps all public pages with `Navbar`, `Footer`, `WarningBanner`, `FooterDisclaimer`
- Standalone dark layout: `/signin`, `/signup`, `/signup/create` (no navbar/footer)

**Component folders:**
- `components/auth/` — Auth form primitives (`AuthLayout`, `AuthInput`, `PrimaryButton`, etc.). `AuthLayout` shows a 1800ms loading animation before rendering.
- `components/layout/` — `Navbar` (sticky, mega-menu, global search), `Footer`, banners. Navbar sub-components live in `components/layout/navbar/`.
- `components/explore/` — Static explore page with sparkline charts and a market table (`CryptoPricesSection` reads from `data/exploreCryptoData.js`).
- `components/market/` — Live market widget used on Home; `useMarketData.js` fetches from **CoinGecko API** and converts USD → GHS via exchangerate-api.com (fallback: 14.5 GHS/USD), polling every 60s. Curated coin lists are in `curatedCoinConfig.js`.
- `components/search/` — Global search overlay with tabs, dropdown results, and mobile overlay.
- `components/home/` — Landing page sections (Hero, CryptoTable, AdvancedTrading, PlatformCapabilities, LearnSection, CtaBanner).

**Static data** (`src/data/`):
- `exploreCryptoData.js` — Hardcoded assets, market stats, movers, new listings for the Explore page.
- `navData.jsx` — Mega-menu structure (6 top-level sections, icons, images).
- `searchData.jsx` — Search result configuration.

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (no separate config file needed). Design uses `#0A0B0D` as dark background and `#1652F0` / `#0052FF` as Coinbase blue.

### Backend (to be built per README.md)

The backend must be **Node.js + MongoDB** with the following RESTful endpoints:

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/register` | Create user (name, email, password) |
| POST | `/login` | Authenticate, return JWT (HTTP-only cookie), redirect to home |
| GET | `/profile` | Protected — return current user info (requires valid JWT) |
| GET | `/crypto` | All cryptocurrencies |
| GET | `/crypto/gainers` | Top gainers sorted by % change descending |
| GET | `/crypto/new` | Newest listings sorted by date descending |
| POST | `/crypto` | Add crypto (name, symbol, price, image, 24h change) |

Structure with: **models**, **routes**, **controllers**.

### Frontend Integration Points

When wiring the frontend to the backend:

- **Auth pages** (`SignIn.jsx`, `SignUp.jsx`) are currently non-functional UI shells — add form `onSubmit` handlers calling the backend `/login` and `/register` endpoints.
- **Profile page** needs to be created as a protected route (redirect to `/signin` if no JWT).
- **Explore page** (`CryptoPricesSection.jsx`) currently uses static `marketAssets` from `exploreCryptoData.js` — replace with a `fetch('/crypto')` call.
- **Market tabs** (Tradable / Gainers / New) in `components/market/MarketTabs.jsx` map to `/crypto`, `/crypto/gainers`, `/crypto/new`.
- For JWT: store in HTTP-only cookie (backend sets it); frontend reads auth state from the `/profile` endpoint or a `/me` equivalent.

### Key Constraints

- The README specifies `GET /register` and `GET /login` but these should be `POST` for data submission — implement as `POST`.
- Currency is displayed in **GHS (Ghana Cedis)** throughout the UI.
- Deployed backend should be integrated into the frontend before deploying the frontend (update API base URL accordingly).
