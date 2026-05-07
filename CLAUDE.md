# Borderless – Multicurrency Platform Context

> This file is read automatically by Claude Code. It contains system context, architecture decisions, known bugs, and design rules for the Borderless multicurrency platform.

---

## Product Overview

Borderless is a **multicurrency wallet infrastructure** — a markup-layer and orchestration platform, not a pure FX provider.

**Core capabilities:**
- Hold balances in multiple currencies
- Convert between currencies with markup
- Send international transfers
- Receive funds via global rails

**Supported wallets:** USD, AUD, GBP, CAD, EUR, SGD

Each wallet is independently maintained, ledger-backed, and FX-convertible to other wallets.

---

## FX Rate & Markup Logic

### Provider
Rates come from **AWX** (liquidity/provider layer). AWX rates already include AWX's own markup.

### Markup Requirement (Critical)
Borderless must achieve a **final total markup** inclusive of AWX markup — not an additive markup on top.

```
R_awx     = rate already including AWX markup
M_awx     = AWX markup (known or estimated)
M_target  = desired total markup Borderless wants to charge the customer

Borderless additional markup = adjustive, not additive
Final Effective Markup = M_target (inclusive of AWX + Borderless)
```

Borderless is a **rate transformer**, not a raw FX provider.

---

## FX Conversion Flow

Example: USD → AUD

1. Fetch rate from AWX
2. Adjust rate to hit platform-level `M_target`
3. Show final rate to user
4. Execute:
   - Debit USD wallet
   - Credit AUD wallet

---

## Cross-Border Transfer Flow

Example: USD wallet → EUR beneficiary

1. User initiates transfer
2. USD wallet debited
3. Converted internally or via partner
4. Sent externally to beneficiary

---

## ❌ Known Critical Bug: Reversal Goes to Wrong Wallet

### Current (Broken) Behavior
Failed transfers are reversed into the **transaction/destination currency**, not the source wallet.

**Example:**
- USD → EUR transfer fails
- EUR 900 returned to EUR wallet ← WRONG

### Required Behavior
Reversals **must always return funds to the source wallet** in the original currency.

**Example:**
- USD → EUR transfer fails
- EUR 900 received back from external rail
- Convert EUR → USD at stored rate
- Credit USD wallet ← CORRECT

### Why This Is Serious
- **User impact:** User unintentionally holds FX exposure; breaks the mental model of "I sent USD"
- **Platform risk:** FX fluctuation losses, reconciliation mismatches
- **Ledger integrity:** Transaction lifecycle is broken; source-destination chain not preserved

---

## Correct Reversal Design

### Data to Store on Every Transaction
```
source_currency
destination_currency
fx_rate_applied
markup_applied
original_amount_source
converted_amount_destination
```

### Reversal Rate Decision
- **Option A – Reverse at original rate** ✅ RECOMMENDED
  - Deterministic, clean ledger, platform absorbs FX movement
- **Option B – Reverse at current rate** ❌ NOT recommended
  - User takes FX hit/gain, confusing UX

**Use Option A.**

### Reversal Ledger Entries (Correct)
```
External rail → Platform clearing account
Platform clearing → FX reverse engine
FX reverse → Source wallet (original currency)
```

---

## Required Ledger Structure

All transactions must be **strictly double-entry**. Each transaction creates:

### FX Conversion Entries
- Debit: Source wallet
- Credit: FX pool / destination wallet
- Fee entry: Markup revenue account

### Transfer Entries
- Debit: Destination wallet
- Credit: External clearing account

### Reversal Entries (mirror of original)
- External → Platform
- Platform → FX reverse
- FX reverse → Source wallet

---

## Wallet Behavior Rules

- Wallet balances must always match the ledger sum
- Wallets are currency-isolated — no implicit cross-currency balances
- Every FX conversion must be explicit
- No cross-currency credits except via the FX engine

---

## Edge Cases to Handle

### Partial Failures
Only part of a transfer fails → proportional reversal back to source currency

### Multi-step Conversions
`USD → AUD → EUR` — full conversion chain must be tracked for accurate reversal

### Rate Drift
Delay between debit and failure notification → rate-locking mechanism required

---

## Ideal Service Architecture

| Service | Responsibility |
|---|---|
| Wallet Service | Per-currency balance management |
| Ledger Service | Authoritative double-entry ledger |
| FX Service | Rate fetching + markup adjustment |
| Transfer Orchestrator | End-to-end transfer lifecycle |
| Reversal Engine | Correct reversal to source wallet (currently weak/missing) |

---

## Known Missing Features

- [ ] Proper transaction state machine
- [ ] Strong reversal linkage (reversal linked to originating transaction)
- [ ] FX rate locking at time of debit
- [ ] Unified markup abstraction layer

---

## End-to-End Example (Happy Path + Failure)

**Scenario:** User sends USD 1000 → EUR beneficiary

| Step | Action |
|---|---|
| 1 | USD wallet: -1000 |
| 2 | FX applied: AWX rate + Borderless adjusted markup |
| 3 | EUR wallet: +900 (intermediate) |
| 4 | EUR 900 sent externally |
| 5 (fail) | Transfer rejected by external rail |
| ❌ Current | EUR 900 credited back to EUR wallet |
| ✅ Correct | EUR 900 received → convert at stored rate → USD wallet: +1000 |

---

## Key Principles

1. Ledger is the single source of truth
2. Reversal always goes to the source wallet at the original rate
3. Markup is a target (inclusive), not an additive layer
4. Every FX operation must be explicit and recorded
5. FX + ledger coupling must be tight, not loose
