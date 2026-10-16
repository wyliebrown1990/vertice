# Sprint 11: Insights Hub, Usage & Workflow Builder (Chapters E, E2)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Supersedes Sprint 5's insights, usage and workflow work. Analytics with the real 20-tab strip (9 built), Procurement insights with the AI bottleneck answer, Usage insights with shadow IT and the Asana/monday.com consolidation, and the no-code Workflow Builder fix that moves the metrics.

## Tasks
- [x] `/analytics/:tab`: Recommendations, Benchmarking, Savings and ROI, Renewals Timeline, Spend Insights (6 donuts), TPRM Analysis, Cost/Cash Forecast (reacts to signed renewals), SaaS Stack Matrix, AI Cost Optimization; other 11 tabs show an honest full-product card
- [x] `/insights/procurement`: KPI tiles, active tasks, cycle time, histogram, spend and on-time bars; before/after the fix
- [x] `/insights/usage`: utilization table (Default / All / Needs attention, Atlassian expands), Stack Review (shadow IT), Stack Consolidation → consolidation request
- [x] `/workflows` (Configuration), `/workflows/templates` (preview modal), `/workflows/edit/:id` with palette (exact real names), Workflow Health, Page layout tab
- [x] Bottleneck story: AI “Take me to the flow” → IT Approval flagged → drag/click **Create Jira Ticket** → Set as Live → Security Review 4.8 → 1.9 days, overdue 3 → 0

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)

## Notes for Future Developers
- The workflow canvas is hand-rolled (no React Flow); fixed layouts are enough for the demo.
