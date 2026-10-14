# Sprint 1: App Shell, Dashboard & Presenter Notes

> **PROGRESS TRACKING**: Update this document as you complete tasks.
> Mark checkboxes `[x]` when done. Do NOT create separate status docs.
> Last updated: 2026-10-13 by Codex — demo scope and narrative review

## Overview
Deliver the recognisable Vertice opening and make Salesforce easy to find. The dashboard's purpose is to show Alex where to act, not to explain every metric. Depends on Sprint 0's scenario and tokens; links into the renewal are completed in Sprint 2. Platform: standalone web demo only.

Verified references: `research/tours/unique/18_overview_f1_s01.png` and `29_finance_f3_s00.png` are dashboard/pipeline screens; `research/contact/nav_zoom.png` shows navigation. `01_finance_f3_s02.png` is contract AI, not a dashboard.

## Tasks

### App shell
- [ ] `AppLayout`: familiar sidebar, light canvas, white cards and violet active state using shared tokens. Preserve desktop navigation groups from PLAN.md; collapsing the rail is optional.
- [ ] Implement dashboard and contracts navigation; reserve request/task links for the S1 request. Deferred modules reuse one `Outside this demo` view with a concise value statement and `Return to renewal` / `Back to dashboard` links. No “Coming in this demo” promise, fake functionality or separate placeholder pages per module.
- [ ] Reusable page header: breadcrumb, title/status and one obvious primary action. Add extra controls only when they have a defined supported behaviour or are clearly disabled with explanation.
- [ ] Search vendors/contracts by name through the sidebar input; no results gives a clear reset action. cmdk/⌘K is optional polish, sharing the same search data and navigation.
- [ ] Floating Vertice AI orb opens the panel shell with an honest unavailable-until-Sprint-3 message during development. The finished S1 build contains no empty AI drawer.
- [ ] Bell opens a small seeded notification list; each item opens a contract or S1 request context. Do not create a notification system.
- [ ] Subtle persistent demo disclosure from PLAN.md; load directly into the dashboard, with no login or splash screen.

### Dashboard (`/dashboard`)
- [ ] Header `Welcome, Alex!`; `New request` opens a small chooser whose supported action is `Renew existing software → Salesforce`. New purchase and sourcing are clearly outside the demo; do not depend on Sprint 4's intake modal.
- [ ] **Total savings** gradient card: selector-derived annualized savings, `April 2026 to date`, and weighted reduction %. A tooltip explains that these are contracted annualized reductions from completed sample renewals, not cash already received.
- [ ] **Annualized spend**: SVG gauge and department legend computed from the 42 current strategic contracts. Label scope `Strategic SaaS portfolio`; omit the All/SaaS selector and TCV subline if the fixture does not support a meaningful distinction.
- [ ] **Live contracts**: count from current terms; show future signed renewals separately after completion, without counting the replacement term as another live vendor.
- [ ] **My active tasks**: a few believable cards, with the Salesforce request's next action when present. `All tasks` opens a compact S1 task summary or the shared scope view, not a Sprint 4 dependency.
- [ ] **Pipeline**: 12 month columns for Nov 2026–Oct 2027, vendor tiles, month totals and working overflow. Salesforce remains visible in January; do not bury the flagship behind `+N`. Hover/focus/click shows annual cost, renewal date and notice deadline separately; click opens contract detail.
- [ ] `In progress / Upcoming` is derived from request state. A request moves to in-progress when created; a secured renewal is marked accordingly. Handle an empty filter with `Show upcoming renewals`. Monthly amounts reflect current contracts pending renewal, not a mixture of old and future terms.
- [ ] Bottom request strip is optional; if included, reuse the same S1 request data and destination rather than building a second request list.

### Presenter Notes framework
- [ ] Small data map keyed by S1 route/beat: `{ headline, evidence, proofSource, discovery, transition }`. One short note per beat is enough; no general presentation framework.
- [ ] In presenter mode, a visible Notes button or `.` toggles a readable panel; closed by default, including after reload. Ignore shortcuts while typing; Escape closes it and restores focus.
- [ ] Dashboard note: renewals need attention before notice deadlines; Salesforce has 50 days to its notice date. The three-day ZoomInfo/Gong notices establish portfolio pressure but do not pretend Salesforce is due in three days.
- [ ] Use The AA as the primary sourced proof point; ask “How do you find out about a renewal today?” Keep guarantee and ROI details in the notes/playbook, not as unsupported Northwind KPIs.

## Validation (front-end-only adaptation)
- [ ] Production build and local preview; use `/Browser` → `agent-browser` at `/dashboard`.
- [ ] Compare dashboard hierarchy, savings card and pipeline with the verified references at 1440×900 and 1280×800. Meaningful labels/actions must be readable; supporting content may scroll.
- [ ] Hover and keyboard-focus Salesforce, exercise overflow/filter/search, and follow its route (a temporary route shell is acceptable until Sprint 2).
- [ ] Check all visible nav destinations, New request and notification links; no 404s or inert apparent actions. Check no-result/empty-filter recovery.
- [ ] Notes hidden by default; shortcut typing does not open notes or reset the demo. Capture dashboard and pipeline evidence here.

## Acceptance Criteria
- [ ] The dashboard is recognisably Vertice, readable on screen share and leads naturally to Salesforce.
- [ ] Counts, spend, savings and pipeline sums use the same scoped fixtures/selectors.
- [ ] Deferred navigation is intentional, with a clear route back to S1; it does not create more implementation work.

## Notes for Future Developers
- Prioritise the savings hero, pipeline and flagship contract entry over peripheral chrome.
- Presenter Notes are visible to the audience if opened while screen sharing; use the script/playbook for private notes where possible.
- The AI orb must not obscure the current primary action; avoid ongoing pulse animations while presenting.
