# Sprint 14: AI & Cloud Cost Optimization (Chapter F)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Supersedes the Sprint 8 stretch line in PLAN.md. AI Cost Optimization reconciles with the three AI contracts already in the portfolio; Cloud Optimizer is a separate AWS dataset (Cloud Engineers persona).

## Tasks
- [x] `/insights/ai-spend`: Spend (KPIs, 3 recommendations, provider/department donut, by model, trend), Usage (API usage, seat tools), Commitments (Anthropic 85% → Start renewal request; OpenAI 61%), Alerts, Setup
- [x] `/cloud/overview` (savings tree, spend by account), `/cloud/optimization` (Optimization Tests), `/cloud/ri-optimizer`, `/cloud/edp` (EDP above commitment → Engage Vertice experts)
- [x] Anthropic commitment renewal request page; EDP booking appears in Expert Engage

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)
- [x] AI spend $1,015,000/yr; potential 8%; cloud $3.48M with $650K savings, never in SaaS totals (tests)

## Notes for Future Developers
- Model names are generic families on purpose; numbers are illustrative.
