# Design Rationale

## Brand & ownership
Borderless owns the app. Both Borderless and Credila logos appear in the header (Borderless | Credila). Brand color is `#0062db` (Borderless blue). Credila red (`#c0392b`) used sparingly.

## Assumed logged-in state
Prototype skips auth entirely. All screens assume a logged-in student user (Arjun Mehta, NYU).

## Wallet display — horizontal scroll over grid
6 wallets (USD, EUR, GBP, AUD, CAD, SGD) don't fit a 2-column grid cleanly. Switched to a horizontally scrollable row with fixed-width cards. Zero-balance currencies shown as dashed empty cards — not hidden — so users know the wallets exist and can receive funds.

## MCA interest pill
4.2% p.a. passive interest on idle USD balance shown as a subtle pill in the greeting row (not a prominent banner). Tapping navigates to /wealth. Kept understated intentionally — informational, not promotional.

## Reversal bug (critical, not in UI yet)
Per CLAUDE.md: failed transfers currently reverse to destination currency (wrong). Correct behavior is to reverse at stored rate back to source wallet. This is a backend concern; the UI doesn't expose it but API integration must account for it.

## No back button on top-level screens
Home, Loan, Send, Card, Wealth are top-level nav screens — no back button. Sub-screens (Convert, Repayment) have back buttons. Decided based on standard mobile nav convention.

## Borderless favicon on card visual
Top-right of the debit card visual uses the Borderless favicon (wing icon from borderless.world) instead of a generic chip SVG. VISA text retained at bottom-right as the network identifier.

## Send to India — no INR wallet
India remittance is a transfer flow, not a wallet. USD debited, converted at live rate, sent via NEFT/IMPS. No INR wallet held on-platform.

## Vite 5 (not 8)
Node 22.11.0 on this machine requires Vite ≤5. Vite 8 requires Node ≥22.12.0. Locked to Vite 5 + `@vitejs/plugin-react@4` + Tailwind v3.
