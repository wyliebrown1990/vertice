# Sprint 13: Procure-to-Pay & Budgets (Chapter D)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Supersedes the rest of Sprint 6. Two-way matching only (Vertice's FAQ lists three-way matching as planned).

## Tasks
- [x] `/purchase-orders`: commitments bar, auto-created PO-1042 (from Chapter B), PO detail modal
- [x] `/invoices` + `/invoices/:id`: invoice document, AI-captured fields, **Contract Price Match** (Zscaler bills $330K vs $240K renewed → +$90,000 → return to vendor with Email-agent draft → corrected invoice), TeamViewer invoice auto-matched → Controls & Permissions rule (≥ $5,000 → Department owner + Finance) → payment run
- [x] `/catalog` punchout (Amazon Business, Staples Advantage, CDW) with approval threshold; `/orders`
- [x] `/offers` built from chapter state; `/savings` ledger separating renewal savings, cost avoidance and invoice errors
- [x] `/insights/budgets`: overview, actual vs projected, Support detail (TeamViewer committed), department cards, project budget

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)

## Notes for Future Developers
- Invoice-error and cost-avoidance amounts never enter dashboard Total savings.
