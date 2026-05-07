# Changelog

## 2026-05-08 — Initial prototype build

### App scaffold
- Created React + Vite 5 app in `app/` subdirectory (Node 22.11.0 required Vite 5 downgrade from 8)
- Tailwind CSS v3 with classic PostCSS config (not `@tailwindcss/vite`)
- React Router DOM v6, Lucide React icons, Inter font

### Layout
- Mobile-first: sticky bottom nav (5 items) on mobile, sidebar on desktop
- Header: Borderless SVG logo | divider | Credila SVG logo | user avatar
- Nav items use Lucide icons: Home, GraduationCap, Send, CreditCard, TrendingUp

### Pages built
- **Home** — greeting section, horizontally scrollable wallet cards (6 currencies), Credila loan lien/release widget, quick actions, card snapshot, recent transactions
- **Loan Hub** — loan summary card, lien/unlien status, expandable lien release form with upload, tranche tracker, debt breakdown, report upload
- **Repayment** — 3 tabs: EMI / Bullet Payment / Balance Transfer
- **Send Money** — International (IBAN/SWIFT) + Send to India 3-step flow (beneficiary → amount → review)
- **Convert** — 6-currency FX conversion with live rate display
- **Card** — visual debit card with freeze toggle, show/hide number, debit/max mode toggle, spend limit slider; Borderless favicon at top-right of card; VISA at bottom-right
- **Wealth** — US FICO credit score gauge, round-up investing toggle, referral program, MCA interest reminder

### Data layer
- `app/src/data/dummy.js` — all dummy data: user, wallets (6 currencies: USD, EUR, GBP, AUD, CAD, SGD), loan, card, transactions, fxRates, indianBeneficiaries, investments, referral

### Assets
- `app/src/assets/logo_borderless.svg` — Borderless wordmark
- `app/src/assets/credila.svg` — Credila logo
- `app/src/assets/borderless_favicon.png` — fetched from borderless.world, used as browser tab favicon and card visual icon
- `app/src/assets/borderless_favicon.ico` — original ICO source

### Key design decisions
- Brand color: `#0062db` (Borderless blue)
- MCA interest (4.2% p.a.) shown as subtle pill in greeting row, links to /wealth
- Zero-balance wallets shown as dashed empty cards in scroll row
- Scrollbar hidden on wallet row via `.no-scrollbar` CSS class
