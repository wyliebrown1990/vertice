# Sprint 9: Ana (A2) + Contract Center AI

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Chapter A2: Ana negotiates the Gong renewal within guardrails Alex approves. Contract Center AI: Documents tab with AI summary and AI Comparison, a Documents page with Create contract from file and liability Q&A. Also expands the scripted assistant with chapter intents.

## Tasks
- [x] Gong contract: **Negotiate with Ana** (contract header) → request page
- [x] Ana workspace: contract read by Ana, negotiation plan (checklist, 3 scenarios, guardrails) → human approval → email thread (Sent/Received, demo transition for vendor replies) → **Negotiation complete** card ($50,000 · 24% · 2-year lock · ~28 h) → Approve offer
- [x] Gong outcome tab; dashboard $1,484,400 → $1,534,400 with S1; Gong secured in pipeline; seeded Gong task replaced
- [x] Contract › Documents tab for every contract (AI-generated summary, documents, AI Comparison for Salesforce, Gong and the uploaded Asana form)
- [x] Documents page: Create contract from file (animated extraction → comparison flags +10% uplift, longer notice, reduced liability cap) and document Q&A
- [x] Vertice AI: 8 new intents (Ana, liability, bottleneck, leverage, consolidation, AI spend, budget, cloud), page-aware chips, actions that advance flows; tests updated (Gong now routes to Ana, other vendors still fall back)

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)

## Notes for Future Developers
- Ana's numbers live in `data/chapters/ana.ts`; the plan doc's earlier ~$42K estimate was replaced by $50,000 (160 × $1,000).
