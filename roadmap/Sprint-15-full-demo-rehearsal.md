# Sprint 15: Full-Demo Polish & Rehearsal

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-15 by Claude (Beans-bot): built and verified

## Overview
Presenter notes for every chapter beat, notifications, copy fixes, a full regression and the automated half of rehearsal. Wylie's spoken, timed rehearsals remain open.

## Tasks
- [x] Presenter notes for 21 chapter beats (`presenter/chapterNotes.ts`) with proof points cited to the 2026-10-15 audit; beat detection by route and flow step
- [x] Notification bell: Ana state, Zscaler invoice mismatch, Anthropic commitment
- [x] Outdated S1-only copy removed; remaining unbuilt surfaces (11 Analytics tabs, Help, Page layout) show an explicit “Available in the full product” card or toast
- [x] Fixed: state updates inside updater functions (upload/pre-fill animations); canvas fit-zoom and focus scrolling; overflow in RFP and intake cards
- [x] Route sweep: 56 routes, no page-not-found, crash or placeholder
- [x] Fresh-session regression of S1 + every chapter with zero console errors; reload persistence verified
- [x] Production build served by `bun run preview` (http://localhost:4173)
- [ ] Timed spoken full-tour rehearsal (25–30 min) and each persona cut, by Wylie

## Validation (front-end-only adaptation)
- [x] `bun run typecheck`, `bun run lint` and `bun run test` (41 tests) pass; production build passes
- [x] Driven end to end with `agent-browser` on the dev build, with zero console errors (fresh-session regression run, 2026-10-15)
- [x] On the production build: S1 three consecutive clean runs (13–15 s automated), recovery pass, three checkpoints, no external network requests

## Notes for Future Developers
- Fallback screenshots for S1: `qa/fallback/` (git-ignored with the other QA captures).
