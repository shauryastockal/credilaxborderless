# Open Items

**Status snapshot** (2026-05-08): prototype complete, polishing underway.

---

## ⏳ Pending

**#1: Replace dummy data with real API calls**
All data is in `app/src/data/dummy.js`. When backend is ready, wire up wallet balances, loan data, transactions, card details.

**#2: Convert page — add all 6 currencies**
Convert page (`app/src/pages/Convert.jsx`) currently only handles USD/EUR pairs. Needs to support all 6 wallet currencies with live AWX rates.

**#3: Send to India — real FX rate**
FX rate is hardcoded as `83.45` in `SendMoney.jsx`. Should fetch live rate.

**#4: Authentication flow**
App assumes logged-in state. Login / onboarding screens not built yet.

**#5: Lien release request — real submission**
Form in `LoanHub.jsx` has UI but no backend call. Needs API integration.

**#6: Repayment page — wire up EMI data**
Repayment tabs are UI-only. Needs loan repayment schedule from Credila API.

**#7: Wallet cards — tap to view transactions**
Tapping a wallet card should filter/navigate to transactions for that currency. Currently no-op.

---

## ✅ Done

*(none yet)*
