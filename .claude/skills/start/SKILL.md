---
name: start
description: Begin-of-session sync routine for the Borderless × Credila app. Reads the durable doc layer (CHANGELOG, open-items, design-rationale) and outputs a "session starting state" summary. Run after /clear or when picking up after a break.
---

# Start — Begin-of-session sync

Use when the user invokes `/start`, or proactively when:
- Conversation begins fresh
- User mentions "starting a new session" or "just got back to this"
- User runs `/clear` followed by a fresh prompt about the project

## Why this exists

The durable docs (`CHANGELOG`, `open-items`, `design-rationale`) are the cross-session source of truth. This skill brings a fresh session up to speed without reloading the previous transcript.

## Steps

### 1. Read the durable doc layer

Read in this order:

- `docs/CHANGELOG.md` — most recent 3–5 entries only
- `docs/open-items.md` — full read; note pending vs. resolved items
- `docs/design-rationale.md` — skim headings only; deep-read a section only if the user's task references it

### 2. Check working state

```bash
ls app/src/pages/
ls app/src/components/
ls app/src/data/dummy.js
```

### 3. Output the "session starting state" summary

```
## Where we are

Recent changes:
- <entry from CHANGELOG>
- ...

Open items:
- #<N>: <title> — <brief status>
- ...

Suggested first action: <one concrete next step based on open items, or "ready for your direction">
```

### 4. Wait for user direction

Don't preemptively start work after the summary. The summary is the handoff; the user's next message tells you what to do.

## What this skill does NOT do

- Does not start working on anything before the user says so
- Does not push or commit anything
