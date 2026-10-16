# Sprint 10: Intake-to-Procure (Chapter B)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Supersedes Sprint 4. Requests start in Slack, Dynamic Intake pre-fills from the order form, Vertice AI - TPRM flags a fictional high-risk vendor and recommends TeamViewer, Security / AI Compliance / AI Legal run in parallel, Finance approves with budget impact, DocuSign signature (simulated) creates the contract and PO-1042.

## Tasks
- [x] `/intake/slack`: simulated Slack conversation with the Vertice app (order form upload → Review purchase details)
- [x] `/intake/new`: Dynamic Intake with AI pre-fill and source hints, preferred-vendor suggestions, benchmark range, budget question with BudgetBar
- [x] Request Overview: Vendor Risk (RiskGauge, categories, alternatives) → parallel reviews (Slack approval modal for Dana, AI Compliance results, AI Legal flag → Leah redline) → Commercial Approval with budget impact → Sign in DocuSign → completion (contract, PO, cost avoidance)
- [x] Request Workflow tab: live `Purchase New Software (I2P)` canvas with node states from the flow
- [x] Activity feed, people, request details; Tasks and Requests lists reflect each step

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)
- [x] Negotiated $50,400 vs $54,000; 12% of the Support budget; year end 95% (tests)

## Notes for Future Developers
- LinkDesk Remote is fictional by design: negative risk findings never name a real company.
