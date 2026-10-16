# Sprint 12: Sourcing, Vendor Onboarding & Expert Engage (Chapter C)

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
New scope from the 2026-10-15 audit (Vendor Onboarding was in no earlier sprint) plus Sprint 6's sourcing line and Sprint 5's vendor directory and Expert Engage.

## Tasks
- [x] `/sourcing/rfp`: 7-step RFP Builder (suggested vendors with badges, must-have integrations + weighting sliders, 12 AI-drafted questions, progress with reminders, scored comparison, Vertice Recommendation 9.1/10, Onboard Lexora); all four bidders fictional
- [x] RFP request page with progress chain
- [x] `/vendors` directory (status: Active / Onboarding / Prospect / Bidder / Rejected; risk) and `/vendors/:id` record: Overview + risk assessment, Contracts & Requests, Documents, **Vendor Portal** (onboarding tasks, questionnaire), Notes
- [x] `/expert-engage`: 11 services in 3 groups, booking modal with expert and slots; bookings persist

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)
- [x] Lexora weighted score 9.1; $120K = $30K below list, $20K under budget (tests)

## Notes for Future Developers
- Vendor scores and risk ratings are illustrative.
