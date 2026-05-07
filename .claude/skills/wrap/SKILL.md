---
name: wrap
description: End-of-session handoff routine for the Borderless × Credila app. Reconciles the durable doc layer (CHANGELOG, open-items, design-rationale) against actual session work and writes updates. Run before /clear so the next session can pick up cold from docs alone.
---

# Wrap-up — End-of-session doc handoff

Use when the user invokes `/wrap`, or proactively when:
- The user is about to `/clear` or close the session
- The session has gone long with many changes

## What this routine does

Reconciles the three durable docs against actual session work and writes updates. Goal: after `/clear`, a fresh session reads these docs and has ~95% of the context.

## Steps

### 1. Read the durable doc layer

- `docs/CHANGELOG.md`
- `docs/open-items.md`
- `docs/design-rationale.md`

### 2. Inventory this session's work

Scan the current conversation for:
- UI changes made (which pages, what was changed)
- Data/dummy changes
- Bugs fixed or introduced
- Decisions made ("let's go with X", "revert", "keep it as")
- Items deferred ("later", "next session", "come back to")

### 3. Three-pass reconciliation

**Pass A — session gaps:**
- Changes made without CHANGELOG entries → back-fill
- Decisions made but not in design-rationale.md → add them
- New TODOs raised but not in open-items.md → add numbered items

**Pass B — doc-vs-code drift:**
For every ⏳ pending item in `open-items.md`, check if the code already does it. If done → mark DONE.

**Pass C — open-items bounds check:**
If there are 4 or more ✅ DONE items, archive them to `docs/open-items-archive.md` and remove from `open-items.md`.

### 4. Write updates (same turn, no approval round-trip)

**Default mode: auto-write.** Plan and write in the same turn.

**Exception:** if user says `propose-only` or `dry-run` → show proposed changes, wait for approval.

Use Edit / Write to apply updates to docs.

### 5. Output the handoff summary

```
## Session ending state

Shipped this session:
- <what changed and why>
- ...

Doc updates written:
- CHANGELOG: <entries added>
- open-items: <items closed / new items added>
- design-rationale: <new decisions, if any>

Open items remaining:
- #N: <title> — <status>
- ...

Safe to /clear.
```

## What this skill does NOT do

- Does not write a transcript dump — the docs are the artifact
- Does not run `/clear` itself — user's call

## Tone

Terse, why-first. No "I" voice. No emojis. Plain text.
