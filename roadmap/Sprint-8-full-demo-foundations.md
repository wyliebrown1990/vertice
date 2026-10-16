# Sprint 8: Full-Demo Foundations

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Shared foundations for every chapter in [FULL-DEMO-PLAN.md](FULL-DEMO-PLAN.md): one state slice for chapter flows, canonical chapter data with reconciliation tests, the real-app sidebar, presenter chapter checkpoints, Settings, shared UI kit and a read-only workflow canvas. The S1 state machine and its tests are untouched.

## Tasks
### State & data
- [x] `DemoState.flows` + `bookings` (store v2; v1 saves migrate in place, keeping S1). Guarded linear flows in `domain/flows.ts` (repeat = no-op)
- [x] Chapter data in `data/chapters/*` (ana, i2p, rfp, p2p, budgets, insights, analytics, aiSpend, cloud) + `data/directory.ts`, `data/platform.ts`, `data/workflows.ts`
- [x] Outcomes derived in `domain/chapters.ts`: savings ledger, future terms, not-yet-live contracts, POs, invoices, requests, tasks, other benefits
- [x] Reconciliation tests (`domain/chapters.test.ts`, 19 tests): S1 $1,484,400 → +Ana $1,534,400; I2P 12% of Support budget / 95% year end; Zscaler +$90,000; cloud never enters SaaS totals
### Shell
- [x] Sidebar matches the Jul 2026 real app: Documents, Offers…Savings, Insights ▾ (Analytics · Procurement · Usage · Budgets · AI spend), Vendors ▾, Workflows ▾ (Configuration · Templates), Cloud Optimizer ▾, Settings
- [x] Presenter **Chapters** picker: Start / Mid / End per chapter; Reset still returns to the clean S1 start
- [x] Requests list (status filters, My requests only, seeded history) and Tasks list driven by chapter state; New request modal enables all three request types
- [x] Dashboard: Not-yet-live count, Requests table, Savings opportunity card
- [x] Settings: Integrations (9 categories), Compliance and Legal preferences (drive the AI agents), Company profile, Manage users
- [x] Shared kit (`components/ui/kit.tsx`), charts (`components/charts/charts.tsx`), `WorkflowCanvas`, request shell

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)

## Notes for Future Developers
- Chapter checkpoints set only that chapter's flows so chapters can be stacked in lifecycle order.
- Never add a chapter outcome to `savingsEntries`; derive it from flow steps.
